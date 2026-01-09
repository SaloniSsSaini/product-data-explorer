import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private service: ProductService) {}

  @Get()
  findByCategory(@Query('category') slug: string) {
    return this.service.findByCategory(slug);
  }

  @Get(':sourceId')
  findOne(@Param('sourceId') sourceId: string) {
    return this.service.findOne(sourceId);
  }
}
