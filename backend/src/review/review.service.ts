import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  save(productId: number, text: string) {
    return this.prisma.review.create({
      data: { productId, text },
    });
  }
}
