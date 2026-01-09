import 'dotenv/config';
import { runNavigationScraper } from './navigation.scraper';

async function main() {
  console.log('🚀 Scraper started');

  const data = await runNavigationScraper();

  console.log(`✅ Scraped ${data.length} navigation items`);
  console.log(data.slice(0, 5)); // preview
}

main().catch(console.error);
