import { Queue } from 'bullmq';

export const SCRAPE_QUEUE_NAME = 'scrape-queue';

export const redisConnection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

export const scrapeQueue = new Queue(SCRAPE_QUEUE_NAME, {
  connection: redisConnection,
});
