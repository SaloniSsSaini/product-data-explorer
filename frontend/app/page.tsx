'use client';

import Link from 'next/link';
import { useNavigation } from '../hooks/useNavigation';
import { useQueryClient } from '@tanstack/react-query';

export default function HomePage() {
  const { data, isLoading, error } = useNavigation();
  const queryClient = useQueryClient();

  const handleScrape = async () => {
    await fetch('http://localhost:4000/scrape', {
      method: 'POST',
    });

    // 🔥 React Query refetch
    queryClient.invalidateQueries({ queryKey: ['navigation'] });

    alert('🚀 Scraping started & data will refresh');
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">
        Product Data Explorer
      </h1>

      <button
        onClick={handleScrape}
        className="mb-8 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        🔄 Refresh Data
      </button>

      {isLoading && <p>Loading navigation...</p>}
      {error && (
        <p className="text-red-600">
          Failed to load navigation
        </p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="border rounded-lg p-5 hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Explore →
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
