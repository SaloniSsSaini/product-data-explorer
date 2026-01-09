"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function ProductDetail({
  sourceId,
}: {
  sourceId: string;
}) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    api.get(`/products/${sourceId}`).then((res) => {
      setProduct(res.data);
    });
  }, [sourceId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">{product.title}</h1>
      <p className="mt-2">{product.detail?.description}</p>
    </div>
  );
}
