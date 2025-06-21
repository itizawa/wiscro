"use client";

import { useEffect } from "react";

export default function ScrollHandler() {
  useEffect(() => {
    // URLハッシュを確認してスクロール処理を実行
    const hash = window.location.hash.slice(1);
    if (hash) {
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        const headerHeight = 64;
        const elementPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return null;
}