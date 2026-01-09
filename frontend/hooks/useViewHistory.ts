'use client';

export interface ViewedProduct {
  sourceId: string;
  title: string;
  imageUrl: string;
}

const KEY = 'view-history';

export function useViewHistory() {
  const getHistory = (): ViewedProduct[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  };

  const addToHistory = (product: ViewedProduct) => {
    const history = getHistory();
    const filtered = history.filter(
      (p) => p.sourceId !== product.sourceId
    );
    const updated = [product, ...filtered].slice(0, 8);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  return { getHistory, addToHistory };
}
