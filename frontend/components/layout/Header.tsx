import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="bg-white shadow p-4">
      <nav className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
