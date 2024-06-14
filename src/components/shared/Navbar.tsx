"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { navigationPaths } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { setTheme } = useTheme();
  const path = usePathname();

  return (
    <section className="text-slate-900 dark:text-slate-200">
      <nav className="flex items-center justify-between sm:justify-center h-20">
        <div className="flex items-center gap-2 font-semibold w-1/2 sm:w-full text-lg text-primary">
          <h1 className="text-xl">
            Fawad{" "}
            <span className="text-slate-900 dark:text-slate-200">Ali</span>
          </h1>
        </div>
        <ul className="hidden sm:flex sm:justify-between sm:w-full sm:items-center ">
          {navigationPaths.map((navPath) => (
            <Link
              href={navPath.route}
              key={navPath.index}
              className={`transition-colors ${
                path === navPath.route
                  ? "border-b-2 border-slate-900 dark:border-slate-200"
                  : "border-b-2 border-transparent hover:border-slate-700 dark:hover:border-slate-400"
              }`}
            >
              {navPath.pathname}
            </Link>
          ))}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
        <div className="flex sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="flex justify-center">
              <SheetHeader>
                <SheetTitle className="flex mb-8">
                  <span className="text-primary">Fawad&nbsp;</span> Ali
                </SheetTitle>
                <SheetDescription className="flex flex-col items-center gap-y-8">
                  {navigationPaths.map((navPath) => (
                    <Link key={navPath.index} href={navPath.route}>
                      {navPath.pathname}
                    </Link>
                  ))}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <hr className="mt-6 border border-slate-300 dark:border-slate-400" />
    </section>
  );
};

export default Navbar;
