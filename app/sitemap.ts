import type { MetadataRoute } from 'next';
import { productCategories } from '@/lib/data/products';
import { hprtProductSlugs } from '@/lib/data/partners';
import { getCareerJobs } from '@/lib/server/careers-store';
import { siteConfig } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ['', '/about', '/products', '/partners', '/partners/hprt', '/careers', '/contact', '/privacy', '/terms'];
  const categoryRoutes = Object.keys(productCategories).map((slug) => `/products/${slug}`);
  const productRoutes = Object.values(productCategories).flatMap((category) =>
    category.products.map((product) => `/products/${category.slug}/${product.id}`)
  );
  const hprtRoutes = hprtProductSlugs.map((slug) => `/partners/hprt/products/${slug}`);
  const careerRoutes = (await getCareerJobs())
    .filter((job) => job.published)
    .map((job) => `/careers/${job.slug}`);

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...hprtRoutes, ...careerRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency:
      route.startsWith('/products') || route.startsWith('/partners') || route.startsWith('/careers')
        ? 'weekly'
        : 'monthly',
    priority: route === '' ? 1 : route === '/products' || route === '/partners' || route === '/careers' ? 0.9 : 0.7,
  }));
}
