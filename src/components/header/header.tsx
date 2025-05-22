"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">wiscro</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#company-overview"
              className="text-gray-700 hover:text-gray-900"
            >
              概要
            </Link>
            <Link
              href="#representative"
              className="text-gray-700 hover:text-gray-900"
            >
              代表紹介
            </Link>
            <Link
              href="#products"
              className="text-gray-700 hover:text-gray-900"
            >
              プロダクト一覧
            </Link>
            <Link
              href="#achievements"
              className="text-gray-700 hover:text-gray-900"
            >
              開発実績
            </Link>
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
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="pt-10">
                <div className="flex flex-col space-y-4 mt-6 px-2">
                  <Link
                    href="#company-overview"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    会社概要
                  </Link>
                  <Link
                    href="#representative"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    代表紹介
                  </Link>
                  <Link
                    href="#products"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    プロダクト一覧
                  </Link>
                  <Link
                    href="#achievements"
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    開発実績
                  </Link>
                  <div className="pt-4">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeNmuXo7-05iU_m5ge4pq_1pysVTqcis8JWOgrupso1foOZpw/viewform?usp=dialogo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold">
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
