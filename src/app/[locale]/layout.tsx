
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/app/components/nav/Nav";
import { NextIntlClientProvider } from "next-intl";
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: "Learning NextJS",
  description: "Learning NextJS",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="flex bg-white w-full h-12 text-black items-center gap-3">
            <section className="flex flex-row gap-2 justify-start items-center">
              <Nav />
            </section>
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
