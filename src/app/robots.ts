import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://talk2-me-six.vercel.app';
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/about', '/demo', '/sponsors', '/login', '/signup'],
      disallow: [
        '/channel/', 
        '/dm/', 
        '/profile/', 
        '/settings/', 
        '/news/',
        '/friends',
        '/coworkers',
        '/foryou',
        '/company-news',
        '/add-contact'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
