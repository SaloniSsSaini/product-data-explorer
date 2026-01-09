import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Navigation
  await prisma.navigation.createMany({
    data: [
      { title: 'Fiction', slug: 'fiction' },
      { title: 'Non-Fiction', slug: 'non-fiction' },
      { title: "Children's Books", slug: 'children' },
    ],
    skipDuplicates: true,
  });

  // Categories
  await prisma.category.createMany({
    data: [
      {
        title: 'Romance',
        slug: 'romance',
        navigationSlug: 'fiction',
      },
      {
        title: 'Mystery',
        slug: 'mystery',
        navigationSlug: 'fiction',
      },
      {
        title: 'Biography',
        slug: 'biography',
        navigationSlug: 'non-fiction',
      },
    ],
    skipDuplicates: true,
  });

  // Products
  await prisma.product.createMany({
    data: [
      {
        sourceId: 'demo-1',
        title: 'Demo Romance Book',
        price: 9.99,
        imageUrl:
          'https://dummyimage.com/300x400/cccccc/000000&text=Book',
        sourceUrl: 'https://worldofbooks.com/demo-1',
        categorySlug: 'romance',
      },
      {
        sourceId: 'demo-2',
        title: 'Demo Mystery Book',
        price: 12.5,
        imageUrl:
          'https://dummyimage.com/300x400/cccccc/000000&text=Book',
        sourceUrl: 'https://worldofbooks.com/demo-2',
        categorySlug: 'mystery',
      },
    ],
    skipDuplicates: true,
  });

  // Product detail
  await prisma.productDetail.createMany({
    data: [
      {
        productSourceId: 'demo-1',
        description:
          'This is a demo romance book description.',
        ratingsAvg: 4.2,
        reviewsCount: 12,
      },
      {
        productSourceId: 'demo-2',
        description:
          'This is a demo mystery book description.',
        ratingsAvg: 4.6,
        reviewsCount: 8,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log('✅ Seed data inserted'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
