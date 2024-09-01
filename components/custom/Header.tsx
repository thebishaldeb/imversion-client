import Link from "next/link";
import Nav from "./Navbar/Nav";
import MobileNav from "./Navbar/MobileNav";

function Header() {
  return (
    <>
      <div className="w-full h-[100px]"></div>
      <header className="pt-4 pb-4 text-foreground fixed top-0 w-full bg-primary/80 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={"/"}>
            <h1 className="text-4xl font-bold">
              Blogs <span className="text-accent">.</span>
            </h1>
          </Link>

          <div className="hidden xl:flex items-center gap-8">
            <Nav />
          </div>

          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
