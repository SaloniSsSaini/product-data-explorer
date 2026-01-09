import { scrapeQueue } from '../src/scrape/scrape.queue';

describe('Scrape Queue Integration', () => {
  it('should enqueue scrape job', async () => {
    const job = await scrapeQueue.add('scrape', {
      targetUrl: 'https://example.com',
      targetType: 'test',
    });

    expect(job.id).toBeDefined();
  });
});
