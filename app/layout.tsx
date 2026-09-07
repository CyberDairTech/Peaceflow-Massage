import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeaceFlow Massage | Grand Junction, CO",
  description:
    "Deep tissue massage in Grand Junction, CO. Book with Maranda Jones — recovery-focused sessions for gym-goers and everyday tension.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
