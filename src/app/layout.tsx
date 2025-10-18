import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finny - AI-Powered Personal Finance Manager",
  description: "Your intelligent financial assistant powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-background text-foreground min-h-screen`}
      >
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-card md:block">
            <Sidebar />
          </div>
          <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              {children}
            </main>
          </div>
        </div>
        
        {/* OmniDimension Voice Agent Widget */}
        <Script
          id="omnidimension-web-widget"
          src="https://backend.omnidim.io/web_widget.js?secret_key=24a7e4ebc0b8925120857cca8eb4dd5c"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}