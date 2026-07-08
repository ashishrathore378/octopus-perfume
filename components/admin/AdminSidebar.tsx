"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    name: "Orders",
    href: "/admin/orders",
  },
  {
    name: "Products",
    href: "/admin/products",
  },
  {
    name: "Customers",
    href: "/admin/customers",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-yellow-400 mb-10">
        OCTOPUS
      </h1>

      <nav className="space-y-3">

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-xl px-4 py-3 transition ${
              pathname === link.href
                ? "bg-yellow-400 text-black font-bold"
                : "text-gray-300 hover:bg-zinc-800"
            }`}
          >
            {link.name}
          </Link>
        ))}

      </nav>

    </aside>
  );
}