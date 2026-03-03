
'use client';

import { NewsPortal } from "@/components/news/news-portal";

export default function GeneralNewsPage() {
  return (
    <div className="p-4 sm:p-6 h-full">
      <NewsPortal view="general" />
    </div>
  );
}
