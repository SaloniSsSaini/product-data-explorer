export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function cleanText(text?: string | null) {
  return text?.replace(/\s+/g, ' ').trim() || '';
}
