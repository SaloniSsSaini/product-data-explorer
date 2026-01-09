import { Controller, Get } from '@nestjs/common';
import { NavigationService } from './navigation.service';

@Controller('navigation')
export class NavigationController {
  constructor(private service: NavigationService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
