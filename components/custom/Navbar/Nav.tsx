"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants";

function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-8">
      {NAV_LINKS?.map((link, idx) => (
        <Link
          key={idx}
          href={link.path}
          className={`${
            link.path === pathname && "text-accent border-b-2 border-accent"
          } capitalize font-medium text-xl hover:text-accent transition-all`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

export default Nav;
