import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import CareersWorkspace from '@/components/careers/CareersWorkspace';
import { adminAuthConfigured, CAREERS_SESSION_COOKIE, readAdminSessionValue } from '@/lib/server/auth';
import { getJobs } from '@/lib/server/careers-store';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Explore current career opportunities at Bhagyashree Ventures in Bengaluru across sales, technical services, support and operations.',
  alternates: { canonical: '/careers' },
};

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
  const cookieStore = await cookies();
  const session = readAdminSessionValue(cookieStore.get(CAREERS_SESSION_COOKIE)?.value);
  const allJobs = await getJobs();
  const jobs = session ? allJobs : allJobs.filter((job) => job.published);

  return (
    <CareersWorkspace
      key={session ? 'admin' : 'public'}
      initialJobs={jobs}
      isAdmin={Boolean(session)}
      adminUsername={session?.username}
      adminConfigured={adminAuthConfigured()}
    />
  );
}
