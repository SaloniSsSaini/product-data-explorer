import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <Link
      href={`/product/${product.sourceId}`}
      className="border p-2 rounded"
    >
      <h3 className="font-medium">{product.title}</h3>
    </Link>
  );
}
