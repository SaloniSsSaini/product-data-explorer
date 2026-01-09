import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  findByCategory(slug: string) {
    return this.prisma.product.findMany({
      where: { category: { slug } },
    });
  }

  findOne(sourceId: string) {
    return this.prisma.product.findUnique({
      where: { sourceId },
      include: { detail: true, reviews: true },
    });
  }
}
