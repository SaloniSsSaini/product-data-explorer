'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface Category {
  id: string;
  title: string;
  slug: string;
  productCount?: number;
}

async function fetchCategories(slug: string): Promise<Category[]> {
  const res = await api.get(`/categories/${slug}`);
  return res.data;
}

export function useCategories(navigationSlug: string) {
  return useQuery<Category[]>({
    queryKey: ['categories', navigationSlug],
    queryFn: () => fetchCategories(navigationSlug),
    enabled: !!navigationSlug,
  });
}
