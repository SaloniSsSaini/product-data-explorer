import { PlaywrightCrawler } from 'crawlee';
import { selectors } from './utils/selectors';
import { cleanText, slugify } from './utils/normalize';
import { delay } from './utils/delay';

export async function runCategoryScraper(navigationSlug: string) {
  const url = `${process.env.BASE_URL}/${navigationSlug}`;

  const crawler = new PlaywrightCrawler({
    headless: true,
    async requestHandler({ page }) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      const categories = await page.$$eval(
        selectors.category,
        (links) =>
          links.map((a) => ({
            title: a.textContent,
            url: a.getAttribute('href'),
          })),
      );

      for (const c of categories) {
        const title = cleanText(c.title);
        if (!title || !c.url) continue;

        console.log({
          title,
          slug: slugify(title),
          url: c.url,
        });

        await delay(Number(process.env.SCRAPE_DELAY_MS));
      }
    },
  });

  await crawler.run([url]);
}
