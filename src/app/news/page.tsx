'use client';

import { NewsPortal } from "@/components/news/news-portal";

/**
 * Página dedicada a las noticias internacionales para usuarios autenticados.
 */
export default function GeneralNewsPage() {
  return (
    <div className="p-4 sm:p-6 h-full overflow-auto">
      <NewsPortal view="general" />
    </div>
  );
}
