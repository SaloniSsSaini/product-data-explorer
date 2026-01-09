import Link from 'next/link';

export default function RelatedProducts({
  products,
}: {
  products: {
    sourceId: string;
    title: string;
    imageUrl: string;
  }[];
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">
        Related Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link
            key={p.sourceId}
            href={`/product/${p.sourceId}`}
            className="border rounded p-3 hover:shadow-md"
          >
            <img
              src={p.imageUrl}
              alt={p.title}
              className="h-40 w-full object-cover rounded"
            />
            <p className="text-sm mt-2 line-clamp-2">
              {p.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
