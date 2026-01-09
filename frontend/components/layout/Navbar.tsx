'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b p-4 flex gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`font-medium ${
              isActive
                ? 'text-blue-600 underline'
                : 'text-gray-700 hover:text-blue-500'
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
