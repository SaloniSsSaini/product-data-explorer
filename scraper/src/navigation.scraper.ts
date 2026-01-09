import { PlaywrightCrawler, Request } from 'crawlee';
import { selectors } from './utils/selectors';
import { cleanText, slugify } from './utils/normalize';
import { delay } from './utils/delay';

export async function runNavigationScraper() {
  if (!process.env.BASE_URL) {
    throw new Error('❌ BASE_URL missing in scraper .env');
  }

  const results: {
    title: string;
    slug: string;
    url: string;
  }[] = [];

  const crawler = new PlaywrightCrawler({
  headless: true,
  requestHandlerTimeoutSecs: 120, // ⬅️ increase timeout
  maxRequestsPerCrawl: 1,

  async requestHandler({ page }) {
    await page.goto(process.env.BASE_URL!, {
      waitUntil: 'networkidle',
      timeout: 120000,
    });

    const items = await page.$$eval(
      selectors.navigation,
      (links) =>
        links.map((a) => ({
          title: a.textContent,
          url: a.getAttribute('href'),
        })),
    );

    for (const item of items) {
      if (!item.title || !item.url || item.url === '#') continue;

      results.push({
        title: cleanText(item.title),
        slug: slugify(item.title),
        url: item.url,
      });
    }
  },
});


  // ✅ PROPER Crawlee request
  await crawler.run([
    new Request({ url: process.env.BASE_URL }),
  ]);

  return results;
}
