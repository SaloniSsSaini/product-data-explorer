import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { runNavigationScraper } from '../../../scraper/src/navigation.scraper';

@Injectable()
export class ScrapeService {
  constructor(private prisma: PrismaService) {}

  async scrapeNavigation() {
    const items = await runNavigationScraper();

    for (const item of items) {
      await this.prisma.navigation.upsert({
        where: { slug: item.slug },
        update: {
          title: item.title,
          url: item.url,
        },
        create: {
          title: item.title,
          slug: item.slug,
          url: item.url,
        },
      });
    }

    return {
      success: true,
      count: items.length,
    };
  }
}
