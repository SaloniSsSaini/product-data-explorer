"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../lib/api";

export default function NavigationMenu() {
  const [nav, setNav] = useState<any[]>([]);

  useEffect(() => {
    api.get("/navigation").then((res) => setNav(res.data));
  }, []);

  return (
    <ul className="space-y-2">
      {nav.map((n) => (
        <li key={n.id}>
          <Link
            href={`/category/${n.slug}`}
            className="text-blue-600"
          >
            {n.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
