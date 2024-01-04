"use client";
import {
  AlignLeft,
  ChevronRight,
  File,
  Globe,
  MessagesSquare,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideMenu() {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const NAV_ITEMS = [
    {
      name: "Files",
      icon: <File />,
      path: "/files",
    },
    {
      name: "Text",
      icon: <AlignLeft />,
      path: "/text",
    },
    {
      name: "Website",
      icon: <Globe />,
      path: "/web-scraper",
    },
    {
      name: "Q&A",
      icon: <MessagesSquare />,
      path: "/q-n-a",
    },
  ];

  // close menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathName]);

  return (
    <div
      className={`${
        isMenuOpen ? "" : "translate-x-[calc(-100%+24px)]"
      } duration-300 lg:translate-x-0 flex z-10`}
    >
      <div
        className={`bg-white lg:static lg:block w-56 ml-2 px-6 pt-32 h-screen min-h-max overflow-y-auto border-r `}
      >
        <nav className="w-full">
          <ul className="w-full flex flex-col gap-y-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <Button
                    variant={"ghost"}
                    className={`w-full justify-start gap-x-2 text-base ${
                      item.path === pathName
                        ? "bg-gray-100 text-purple-700 hover:text-purple-700"
                        : ""
                    }`}
                  >
                    {item.icon}
                    <span className="text-black">{item.name}</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute right-0 top-0 z-20"></div>
      </div>

      <div
        className="mt-4 w-6 px-1 py-2 bg-gray-100 h-max rounded-r-2xl flex justify-center itc cursor-pointer lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <ChevronRight
          className={`relative duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
        />
      </div>
    </div>
  );
}
