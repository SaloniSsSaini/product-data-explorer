import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  findByNavigation(slug: string) {
    return this.prisma.category.findMany({
      where: { navigation: { slug }, parentId: null },
      include: { children: true },
    });
  }
}
