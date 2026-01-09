'use client';

export default function Skeleton({
  height = '200px',
}: {
  height?: string;
}) {
  return (
    <div
      className="animate-pulse bg-gray-200 rounded"
      style={{ height }}
    />
  );
}
