
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/src/components/nav/Nav";

export const metadata: Metadata = {
  title: "Learning NextJS",
  description: "Learning NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body>
        <div className="flex bg-white w-full h-12 text-black items-center gap-3">
          <section className="flex flex-row gap-2 justify-start items-center">
            <Nav />
          </section>
        </div>
        {children}
      </body>
    </html>
  );
}
