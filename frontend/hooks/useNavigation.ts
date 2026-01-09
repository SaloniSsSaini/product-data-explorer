'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface NavigationItem {
  id: string;
  title: string;
  slug: string;
}

async function fetchNavigation(): Promise<NavigationItem[]> {
  const res = await api.get('/navigation');
  return res.data;
}

export function useNavigation() {
  return useQuery<NavigationItem[]>({
    queryKey: ['navigation'],
    queryFn: fetchNavigation,
  });
}
