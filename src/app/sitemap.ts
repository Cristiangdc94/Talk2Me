import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://talk2-me-six.vercel.app';
  const lastModified = new Date();

  const routes = [
    '',
    '/about',
    '/demo',
    '/sponsors',
    '/login',
    '/signup',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  })) as MetadataRoute.Sitemap;
}
