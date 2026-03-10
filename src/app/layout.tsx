import type { Metadata } from "next";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { AppLayout } from "@/components/app-layout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://talk2-me-six.vercel.app'),
  title: {
    default: "Talk2Me - Comunicación y Noticias en Tiempo Real",
    template: "%s | Talk2Me"
  },
  description: "Una aplicación de chat moderna en tiempo real que combina mensajería para equipos y un portal de noticias internacionales verídicas de El País.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: 'Talk2Me - Comunicación en tiempo real',
    description: 'Conecta con tus amigos y mantente al día con tu empresa.',
    url: 'https://talk2-me-six.vercel.app',
    siteName: 'Talk2Me',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talk2Me - Comunicación en tiempo real',
    description: 'Conecta con tus amigos y mantente al día con tu empresa.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-body antialiased text-sm min-h-screen bg-background">
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
