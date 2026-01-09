import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryService {
  save(data: any) {
    return { saved: true, data };
  }
}
