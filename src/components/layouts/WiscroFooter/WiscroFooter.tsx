import React from 'react';
import { Link } from '@nextui-org/link';

export const WiscroFooter = () => {
  return (
    <div className="bg-[#1f2937] drop-shadow-sm">
      <div className="max-w-[1024px] mx-auto p-[24px]">
        <Link href="/" className="text-slate-50 font-bold">
          Wiscro
        </Link>
        <p className="mt-[8px] text-slate-50 text-sm">あなたの切り口で記事をまとめよう</p>
        <div className="mt-[24px] flex gap-[16px]">
          <Link href="https://www.wiscro.app/terms" className="text-slate-50">
            利用規約
          </Link>
          <Link href="https://www.wiscro.app/policy" className="text-slate-50">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </div>
  );
};
