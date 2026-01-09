import { Controller, Post } from '@nestjs/common';
import { ScrapeService } from './scrape.service';

@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post('navigation')
  scrapeNavigation() {
    return this.scrapeService.scrapeNavigation();
  }
}
