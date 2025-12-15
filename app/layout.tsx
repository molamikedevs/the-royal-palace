import type { Metadata } from "next";

import { ReservationProvider } from "@/context/ReservationContext";
import Header from "@/components/ui/Header";
import "@/styles/globals.css";
import { outfit } from "@/config/font";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.title}`,
    default: `Welcome | ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <Header />
        <main className="flex-1">
          <ReservationProvider>{children}</ReservationProvider>
        </main>
      </body>
    </html>
  );
}
