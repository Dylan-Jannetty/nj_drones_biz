export async function GET() {
  const baseURL = 'https://njdrones.com';
  
  const urls = [
    {
      url: `${baseURL}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: `${baseURL}/about`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseURL}/contact`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseURL}/portfolio`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseURL}/services/real-estate`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseURL}/services/wedding`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseURL}/services/engagement`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseURL}/services/automotive`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseURL}/services/marine`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseURL}/services/business`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}