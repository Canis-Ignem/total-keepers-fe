import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ReduxProvider from "@/components/ReduxProvider";
import Header from "@/components/Header";



import { NextIntlClientProvider, useMessages } from "next-intl";



import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Total Keepers Bilbao Website",
  description: "Campus de Tecnificación de Porteros en Bilbao",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "layout" });
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}>
        <NextIntlClientProvider locale={locale} >
          <ReduxProvider>
            <Header locale={locale} />
            {children}
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
