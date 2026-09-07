import type { CareerJobInput } from '@/lib/careers/types';
import { slugifyJobTitle } from '@/lib/careers/slug';

type ValidationResult =
  | { ok: true; value: CareerJobInput }
  | { ok: false; error: string };

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/\0/g, '').replace(/\r\n/g, '\n').trim().slice(0, maxLength);
}

function cleanList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanText(item, 320)).filter(Boolean).slice(0, 30);
}

export function parseCareerJobInput(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Invalid job data.' };
  }

  const record = body as Record<string, unknown>;
  const title = cleanText(record.title, 140);
  const rawSlug = cleanText(record.slug, 160);
  const department = cleanText(record.department, 120);
  const location = cleanText(record.location, 160);
  const employmentType = cleanText(record.employmentType, 80);
  const experience = cleanText(record.experience, 100);
  const summary = cleanText(record.summary, 420);
  const description = cleanText(record.description, 6000);
  const responsibilities = cleanList(record.responsibilities);
  const requirements = cleanList(record.requirements);
  const niceToHave = cleanList(record.niceToHave);
  const published = record.published;

  if (!title || !department || !location || !employmentType || !experience || !summary || !description) {
    return { ok: false, error: 'Please complete every required job field.' };
  }
  if (typeof published !== 'boolean') {
    return { ok: false, error: 'Select whether the job is published or a draft.' };
  }
  if (!responsibilities.length || !requirements.length) {
    return { ok: false, error: 'Add at least one responsibility and one requirement.' };
  }

  return {
    ok: true,
    value: {
      slug: slugifyJobTitle(rawSlug || title),
      title,
      department,
      location,
      employmentType,
      experience,
      summary,
      description,
      responsibilities,
      requirements,
      niceToHave,
      published,
    },
  };
}
