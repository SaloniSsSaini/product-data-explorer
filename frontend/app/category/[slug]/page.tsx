'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCategories } from '../../../hooks/useCategories';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading, error } = useCategories(slug);

  if (isLoading) {
    return <p className="p-6">Loading categories...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">Failed to load categories</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Categories
      </h1>

      {data && data.length === 0 && (
        <p>No categories found.</p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((cat) => (
          <Link
            key={cat.id}
            href={`/products/${cat.slug}`}
            className="border rounded-lg p-5 hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{cat.title}</h2>

            {cat.productCount !== undefined && (
              <p className="text-sm text-gray-500 mt-1">
                {cat.productCount} products
              </p>
            )}
          </Link>
        ))}
      </section>
    </main>
  );
}
