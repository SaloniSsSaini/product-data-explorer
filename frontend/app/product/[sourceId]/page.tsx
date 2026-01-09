'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';

import { useProductDetail } from '/hooks/useProductDetail';
import { useViewHistory } from '/hooks/useViewHistory';
import RelatedProducts from '/components/product/RelatedProducts';
import Skeleton from '/components/ui/Skeleton';

export default function ProductDetailPage() {
  const params = useParams();
  const sourceId = params.sourceId as string;

  const { data, isLoading, error } = useProductDetail(sourceId);
  const { addToHistory } = useViewHistory();

  useEffect(() => {
    if (data) {
      addToHistory({
        sourceId: data.sourceId,
        title: data.title,
        imageUrl: data.imageUrl,
      });
    }
  }, [data, addToHistory]);

  if (isLoading) return <Skeleton height="400px" />;

  if (error || !data) {
    return <p className="p-6 text-red-600">Failed to load product</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image
          src={data.imageUrl}
          alt={data.title}
          width={400}
          height={500}
          className="rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

          <p className="text-2xl text-blue-600 font-semibold mb-4">
            £{data.price}
          </p>

          {data.ratingsAvg && (
            <p className="mb-2">⭐ {data.ratingsAvg} / 5</p>
          )}

          <p className="text-gray-700 leading-relaxed">
            {data.description || 'No description available.'}
          </p>
        </div>
      </div>

      {/* Reviews */}
      {data.reviews?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>

          <div className="space-y-4">
            {data.reviews.map((r) => (
              <div key={r.id} className="border rounded p-4">
                <p className="font-semibold">
                  {r.author || 'Anonymous'} ⭐ {r.rating ?? '-'}
                </p>
                <p className="text-sm text-gray-600">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related products */}
      {data.related?.length > 0 && (
        <RelatedProducts products={data.related} />
      )}
    </main>
  );
}
