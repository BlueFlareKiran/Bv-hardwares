import type { MetadataRoute } from 'next';
import { productCategories } from '@/lib/data/products';
import { hprtProductSlugs } from '@/lib/data/partners';
import { getCareerJobs } from '@/lib/server/careers-store';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/about', '/products', '/partners', '/partners/hprt', '/careers', '/contact', '/privacy', '/terms'];
  const categoryRoutes = Object.keys(productCategories).map((slug) => `/products/${slug}`);
  const hprtRoutes = hprtProductSlugs.map((slug) => `/partners/hprt/products/${slug}`);
  const careerRoutes: MetadataRoute.Sitemap = (await getCareerJobs())
    .filter((job) => job.published)
    .map((job) => ({
      url: `${siteConfig.url}/careers/${job.slug}`,
      lastModified: new Date(job.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  const publicRoutes: MetadataRoute.Sitemap = [...staticRoutes, ...categoryRoutes, ...hprtRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route.startsWith('/products') || route.startsWith('/partners') ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/products' || route === '/partners' || route === '/careers' ? 0.9 : 0.7,
  }));

  return [...publicRoutes, ...careerRoutes];
}
