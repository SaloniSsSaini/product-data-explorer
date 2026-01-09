import { Controller, Post, Body } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private service: HistoryService) {}

  @Post()
  save(@Body() body: any) {
    return this.service.save(body);
  }
}
