import { NextRequest, NextResponse } from 'next/server';
import { requestHasAdminSession } from '@/lib/server/auth';
import { createJob, getJobs } from '@/lib/server/careers-store';
import { parseCareerJobInput } from '@/lib/careers/validation';
import { isSameOriginRequest } from '@/lib/server/request-origin';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!requestHasAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    return NextResponse.json({ jobs: await getJobs() });
  } catch (error) {
    console.error('Could not load careers jobs:', error);
    return NextResponse.json({ error: 'Could not load jobs.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!requestHasAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  try {
    const parsed = parseCareerJobInput(await request.json());
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const job = await createJob(parsed.value);
    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error('Could not create careers job:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not save the job.' },
      { status: 500 }
    );
  }
}
