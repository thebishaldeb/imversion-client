"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

function MobileNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-28 mb-20 text-center text-2xl">
          <Link href={"/"}>
            <h1 className="text-4xl font-bold">
              Blogs <span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        <nav className="flex flex-col justify-center items-center gap-8">
          {NAV_LINKS?.map((link, idx) => (
            <Link
              key={idx}
              href={link.path}
              className={`${
                link.path === pathname && "text-accent border-b-2 border-accent"
              } text-xl capitalize font-medium hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
