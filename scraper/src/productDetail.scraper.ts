import { PlaywrightCrawler } from 'crawlee';
import { selectors } from './utils/selectors';
import { cleanText } from './utils/normalize';
import { delay } from './utils/delay';

export async function runProductDetailScraper(productPath: string) {
  const url = `${process.env.BASE_URL}${productPath}`;

  const crawler = new PlaywrightCrawler({
    headless: true,
    async requestHandler({ page }) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      const description = await page
        .$eval(selectors.productDescription, (el) => el.textContent)
        .catch(() => null);

      console.log({
        description: cleanText(description),
      });

      await delay(Number(process.env.SCRAPE_DELAY_MS));
    },
  });

  await crawler.run([url]);
}
