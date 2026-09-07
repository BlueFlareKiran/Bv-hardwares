import { NextRequest, NextResponse } from 'next/server';
import { requestHasAdminSession } from '@/lib/server/auth';
import { deleteJob, setJobPublished, updateJob } from '@/lib/server/careers-store';
import { parseCareerJobInput } from '@/lib/careers/validation';
import { isSameOriginRequest } from '@/lib/server/request-origin';

export const runtime = 'nodejs';

function authorized(request: NextRequest) {
  return requestHasAdminSession(request) && isSameOriginRequest(request);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const { id } = await context.params;
    const parsed = parseCareerJobInput(await request.json());
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const job = await updateJob(id, parsed.value);
    if (!job) return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    return NextResponse.json({ job });
  } catch (error) {
    console.error('Could not update careers job:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not save the job.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const { id } = await context.params;
    const body = (await request.json()) as { published?: unknown };
    if (typeof body.published !== 'boolean') {
      return NextResponse.json({ error: 'Published state is required.' }, { status: 400 });
    }
    const job = await setJobPublished(id, body.published);
    if (!job) return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    return NextResponse.json({ job });
  } catch (error) {
    console.error('Could not update job visibility:', error);
    return NextResponse.json({ error: 'Could not update this job.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  try {
    const { id } = await context.params;
    const deleted = await deleteJob(id);
    if (!deleted) return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Could not delete careers job:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not delete the job.' },
      { status: 500 }
    );
  }
}
