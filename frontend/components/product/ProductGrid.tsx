"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api
      .get(`/products?category=${categorySlug}`)
      .then((res) => setProducts(res.data));
  }, [categorySlug]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
