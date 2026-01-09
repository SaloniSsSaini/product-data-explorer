import { PlaywrightCrawler } from 'crawlee';
import { selectors } from './utils/selectors';
import { cleanText } from './utils/normalize';
import { delay } from './utils/delay';

export async function runProductScraper(categorySlug: string) {
  const url = `${process.env.BASE_URL}/${categorySlug}`;

  const crawler = new PlaywrightCrawler({
    headless: true,
    async requestHandler({ page }) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      const products = await page.$$eval(
        selectors.productTile,
        (tiles) =>
          tiles.map((el) => ({
            title: el.querySelector('h3')?.textContent,
            author: el.querySelector('.author')?.textContent,
            price: el.querySelector('.price')?.textContent,
            link: el.querySelector('a')?.getAttribute('href'),
          })),
      );

      for (const p of products) {
        const title = cleanText(p.title);
        if (!title || !p.link) continue;

        console.log({
          title,
          author: cleanText(p.author),
          price: cleanText(p.price),
          link: p.link,
        });

        await delay(Number(process.env.SCRAPE_DELAY_MS));
      }
    },
  });

  await crawler.run([url]);
}
