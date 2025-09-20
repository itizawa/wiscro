"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setIsSheetOpen(false);

    if (!isHomePage) {
      // トップページ以外の場合、ハッシュ付きでトップページに遷移
      window.location.href = `/#${targetId}`;
      return;
    }

    // トップページの場合、直接スクロール
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 64;
      const elementPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <header className="bg-gray-50 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">wiscro</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/representative"
              className="text-gray-700 hover:text-gray-900"
              onClick={(e) => handleLinkClick(e, "representative")}
            >
              代表紹介
            </a>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-gray-900"
              onClick={(e) => handleLinkClick(e, "blogs")}
            >
              コンテンツ
            </Link>
            <a
              href="/products"
              className="text-gray-700 hover:text-gray-900"
              onClick={(e) => handleLinkClick(e, "products")}
            >
              サービス一覧
            </a>
            <a
              href="/achievements"
              className="text-gray-700 hover:text-gray-900"
              onClick={(e) => handleLinkClick(e, "achievements")}
            >
              開発実績
            </a>

            <a
              href="/company-overview"
              className="text-gray-700 hover:text-gray-900"
              onClick={(e) => handleLinkClick(e, "company-overview")}
            >
              概要
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeNmuXo7-05iU_m5ge4pq_1pysVTqcis8JWOgrupso1foOZpw/viewform?usp=dialogo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-blue-700 hover:bg-blue-800 text-white font-bold">
                お問い合わせ
              </Button>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="pt-10">
                <div className="flex flex-col space-y-4 mt-6 px-2">
                  <a
                    href="/representative"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={(e) => handleLinkClick(e, "representative")}
                  >
                    代表紹介
                  </a>
                  <Link
                    href="/blog"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={(e) => handleLinkClick(e, "blogs")}
                  >
                    コンテンツ
                  </Link>
                  <a
                    href="/products"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={(e) => handleLinkClick(e, "products")}
                  >
                    サービス一覧
                  </a>
                  <a
                    href="/achievements"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={(e) => handleLinkClick(e, "achievements")}
                  >
                    開発実績
                  </a>
                  <a
                    href="/company-overview"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={(e) => handleLinkClick(e, "company-overview")}
                  >
                    概要
                  </a>
                  <div className="pt-4 flex flex-col items-center justify-center">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeNmuXo7-05iU_m5ge4pq_1pysVTqcis8JWOgrupso1foOZpw/viewform?usp=dialogo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-2 rounded">
                        お問い合わせ
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
