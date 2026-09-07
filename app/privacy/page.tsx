import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy information for enquiries submitted to ${siteConfig.name}.`,
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How information submitted through this website is used when you contact Bhagyashree Ventures."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />
      <section className="section-space bg-background">
        <article className="container-shell max-w-4xl">
          <div className="premium-card space-y-8 p-6 sm:p-9">
            <section>
              <h2 className="text-xl font-bold text-foreground">Information we receive</h2>
              <p className="prose-copy mt-3">
                When you submit an enquiry, we may receive the details you choose to provide, such as your name, company, email address, phone number, product interest, estimated volume and message. When you apply for a job, we may also receive employment-related information such as your experience, current company, profile links, cover note and resume.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-foreground">How we use it</h2>
              <p className="prose-copy mt-3">
                We use enquiry information to understand your requirement, respond to you, prepare quotations, discuss products or services and maintain normal business correspondence. Job-application information is used for recruitment and hiring communication. We do not ask for payment-card details through these forms.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-foreground">Service providers</h2>
              <p className="prose-copy mt-3">
                Website hosting and email-delivery providers may process technical or enquiry data only as needed to operate the website and deliver messages. Their handling of information is subject to their own terms and privacy practices.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-foreground">Retention and requests</h2>
              <p className="prose-copy mt-3">
                Business enquiries and recruitment correspondence may be retained for a reasonable period for follow-up, quotations, support, hiring processes and record keeping. Candidate resumes submitted through the careers form are delivered to the configured hiring inbox rather than being published on the website. To ask about information you submitted, contact us at{' '}
                <a className="font-semibold text-brand-blue dark:text-brand-blue-light" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-foreground">Updates</h2>
              <p className="prose-copy mt-3">
                This policy may be updated as the website, service providers or business processes change. Material changes should be reflected on this page.
              </p>
            </section>
            <p className="text-sm text-muted-foreground">
              For general business enquiries, visit the <Link href="/contact" className="font-semibold text-foreground underline underline-offset-4">contact page</Link>.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
