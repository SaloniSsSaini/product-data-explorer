import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Get(':navigationSlug')
  findByNavigation(@Param('navigationSlug') slug: string) {
    return this.service.findByNavigation(slug);
  }
}
