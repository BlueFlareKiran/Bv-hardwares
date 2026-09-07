import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { CareerJob, CareerJobInput } from '@/lib/careers/types';
import { slugifyJobTitle } from '@/lib/careers/slug';

const LOCAL_FILE = path.join(process.cwd(), 'data', 'careers.json');
const DEFAULT_REMOTE_PATH = 'data/careers.json';

function githubConfig() {
  return {
    repo: process.env.GITHUB_CAREERS_REPO?.trim() || '',
    token: process.env.GITHUB_CAREERS_TOKEN?.trim() || '',
    branch: process.env.GITHUB_CAREERS_BRANCH?.trim() || 'main',
    filePath: process.env.GITHUB_CAREERS_PATH?.trim() || DEFAULT_REMOTE_PATH,
  };
}

function normalizeStoredJob(value: unknown): CareerJob | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const job = value as Record<string, unknown>;
  const title = typeof job.title === 'string' ? job.title.trim() : '';
  if (!title) return null;
  const strings = (input: unknown) =>
    Array.isArray(input) ? input.map(String).map((item) => item.trim()).filter(Boolean) : [];
  const createdAt = typeof job.createdAt === 'string' ? job.createdAt : new Date().toISOString();

  return {
    id: typeof job.id === 'string' && job.id ? job.id : randomUUID(),
    slug: slugifyJobTitle(typeof job.slug === 'string' ? job.slug : title),
    title,
    department: typeof job.department === 'string' ? job.department : 'General',
    location: typeof job.location === 'string' ? job.location : 'Bengaluru, Karnataka',
    employmentType:
      typeof job.employmentType === 'string' ? job.employmentType : String(job.type || 'Full-time'),
    experience: typeof job.experience === 'string' ? job.experience : '',
    summary: typeof job.summary === 'string' ? job.summary : String(job.shortDescription || ''),
    description: typeof job.description === 'string' ? job.description : '',
    responsibilities: strings(job.responsibilities),
    requirements: strings(job.requirements),
    niceToHave: strings(job.niceToHave),
    published: typeof job.published === 'boolean' ? job.published : job.status === 'active',
    createdAt,
    updatedAt: typeof job.updatedAt === 'string' ? job.updatedAt : createdAt,
  };
}

function parseJobs(raw: string): CareerJob[] {
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error('Careers storage must contain a JSON array.');
  return parsed.map(normalizeStoredJob).filter((job): job is CareerJob => Boolean(job));
}

async function readLocalJobs() {
  return parseJobs(await readFile(LOCAL_FILE, 'utf8'));
}

async function readGithubJobs() {
  const { repo, token, branch, filePath } = githubConfig();
  if (!repo) return null;
  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${encodeURIComponent(branch)}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'X-GitHub-Api-Version': '2022-11-28',
      },
      cache: 'no-store',
    }
  );
  if (!response.ok) throw new Error(`Could not read careers data from GitHub (${response.status}).`);
  const payload = (await response.json()) as { content?: string; encoding?: string; sha?: string };
  if (!payload.content || payload.encoding !== 'base64') {
    throw new Error('GitHub careers file response was invalid.');
  }
  return {
    jobs: parseJobs(Buffer.from(payload.content.replace(/\n/g, ''), 'base64').toString('utf8')),
    sha: payload.sha || '',
  };
}

export async function getJobs() {
  const config = githubConfig();
  if (config.repo) {
    try {
      const remote = await readGithubJobs();
      if (remote) return remote.jobs;
    } catch (error) {
      console.error('Careers GitHub read failed; using bundled careers data.', error);
    }
  }
  return readLocalJobs();
}

export async function getPublishedJobs() {
  return (await getJobs()).filter((job) => job.published);
}

export async function getJobBySlug(slug: string, includeDrafts = false) {
  return (await getJobs()).find((job) => job.slug === slug && (includeDrafts || job.published)) ?? null;
}

async function saveLocalJobs(jobs: CareerJob[]) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Production careers persistence requires GitHub storage configuration.');
  }
  await writeFile(LOCAL_FILE, `${JSON.stringify(jobs, null, 2)}\n`, 'utf8');
}

async function saveGithubJobs(jobs: CareerJob[], message: string) {
  const { repo, token, branch, filePath } = githubConfig();
  if (!repo || !token) throw new Error('GitHub careers storage is not fully configured.');
  const current = await readGithubJobs();
  if (!current) throw new Error('Unable to read the careers file before saving.');

  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      message,
      branch,
      sha: current.sha,
      content: Buffer.from(`${JSON.stringify(jobs, null, 2)}\n`, 'utf8').toString('base64'),
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const detail =
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : `status ${response.status}`;
    throw new Error(`Could not save careers data to GitHub: ${detail}`);
  }
}

async function saveJobs(jobs: CareerJob[], message: string) {
  const config = githubConfig();
  if (config.repo && config.token) return saveGithubJobs(jobs, message);
  return saveLocalJobs(jobs);
}

function uniqueSlug(requested: string, jobs: CareerJob[], exceptId?: string) {
  const base = slugifyJobTitle(requested);
  const used = new Set(jobs.filter((job) => job.id !== exceptId).map((job) => job.slug));
  if (!used.has(base)) return base;
  let suffix = 2;
  while (used.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

export async function createJob(input: CareerJobInput) {
  const jobs = await getJobs();
  const now = new Date().toISOString();
  const job: CareerJob = {
    ...input,
    id: randomUUID(),
    slug: uniqueSlug(input.slug || input.title, jobs),
    createdAt: now,
    updatedAt: now,
  };
  await saveJobs([job, ...jobs], `careers: add ${job.title}`);
  return job;
}

export async function updateJob(id: string, input: CareerJobInput) {
  const jobs = await getJobs();
  const index = jobs.findIndex((job) => job.id === id);
  if (index === -1) return null;
  const updated: CareerJob = {
    ...jobs[index],
    ...input,
    slug: uniqueSlug(input.slug || input.title, jobs, id),
    updatedAt: new Date().toISOString(),
  };
  jobs[index] = updated;
  await saveJobs(jobs, `careers: update ${updated.title}`);
  return updated;
}

export async function setJobPublished(id: string, published: boolean) {
  const jobs = await getJobs();
  const index = jobs.findIndex((job) => job.id === id);
  if (index === -1) return null;
  jobs[index] = { ...jobs[index], published, updatedAt: new Date().toISOString() };
  await saveJobs(jobs, `careers: ${published ? 'publish' : 'unpublish'} ${jobs[index].title}`);
  return jobs[index];
}

export async function deleteJob(id: string) {
  const jobs = await getJobs();
  const target = jobs.find((job) => job.id === id);
  if (!target) return false;
  await saveJobs(jobs.filter((job) => job.id !== id), `careers: remove ${target.title}`);
  return true;
}

export const getCareerJobs = getJobs;
