'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sourceId: string;
}

interface ProductResponse {
  items: Product[];
  total: number;
}

async function fetchProducts(
  slug: string,
  page: number,
  limit: number
): Promise<ProductResponse> {
  const res = await api.get(
    `/products?categorySlug=${slug}&page=${page}&limit=${limit}`
  );
  return res.data;
}

export function useProducts(slug: string, page: number, limit: number) {
  return useQuery<ProductResponse>({
    queryKey: ['products', slug, page],
    queryFn: () => fetchProducts(slug, page, limit),
    enabled: !!slug,
    keepPreviousData: true,
  });
}
