'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
}

export interface ProductDetail {
  id: string;
  sourceId: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  ratingsAvg?: number;
  reviews?: Review[];
  related?: {
    sourceId: string;
    title: string;
    imageUrl: string;
  }[];
}

async function fetchProduct(sourceId: string): Promise<ProductDetail> {
  const res = await api.get(`/products/${sourceId}`);
  return res.data;
}

export function useProductDetail(sourceId: string) {
  return useQuery<ProductDetail>({
    queryKey: ['product', sourceId],
    queryFn: () => fetchProduct(sourceId),
    enabled: !!sourceId,
  });
}
