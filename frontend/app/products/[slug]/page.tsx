'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';

const LIMIT = 12;

export default function ProductsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useProducts(slug, page, LIMIT);

  if (isLoading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load products</p>;

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data.items.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.sourceId}`}
            className="border rounded-lg p-4 hover:shadow-md"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-40 w-full object-cover mb-3 rounded"
            />
            <h3 className="font-semibold text-sm">{product.title}</h3>
            <p className="text-blue-600 font-bold">£{product.price}</p>
          </Link>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <button
          disabled={page * LIMIT >= data.total}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
