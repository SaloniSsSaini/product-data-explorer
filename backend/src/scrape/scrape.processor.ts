import { Worker } from 'bullmq';
import { SCRAPE_QUEUE_NAME, redisConnection } from './scrape.queue';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import * as path from 'path';

const prisma = new PrismaClient();

export const scrapeWorker = new Worker(
  SCRAPE_QUEUE_NAME,
  async (job) => {
    const { targetUrl, targetType } = job.data;

    const scrapeJob = await prisma.scrapeJob.create({
      data: {
        targetUrl,
        targetType,
        status: 'running',
        startedAt: new Date(),
      },
    });

    try {
      console.log(`🔍 Scraping started → ${targetType}`);

      // ✅ RUN SCRAPER AS SEPARATE PROCESS
      const scraperPath = path.join(
        __dirname,
        '../../../../scraper',
      );

      await new Promise<void>((resolve, reject) => {
        exec('npm run start', { cwd: scraperPath }, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      await prisma.scrapeJob.update({
        where: { id: scrapeJob.id },
        data: {
          status: 'completed',
          finishedAt: new Date(),
        },
      });

      console.log('✅ Scraping completed');
    } catch (error: any) {
      await prisma.scrapeJob.update({
        where: { id: scrapeJob.id },
        data: {
          status: 'failed',
          errorLog: error.message,
          finishedAt: new Date(),
        },
      });

      throw error;
    }
  },
  { connection: redisConnection },
);

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
});
