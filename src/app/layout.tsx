import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { LayoutProvider } from "@/components/layout-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talk2Me",
  description: "Una aplicación de chat moderna en tiempo real.",
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
      <body className="font-body antialiased text-sm h-full">
        <LayoutProvider>{children}</LayoutProvider>
        <Toaster />
      </body>
    </html>
  );
}
