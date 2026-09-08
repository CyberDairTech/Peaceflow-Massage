import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const defaultDescription =
  "Deep tissue, therapeutic, and prenatal massage in Grand Junction, CO. Book one-on-one sessions with licensed massage therapist Maranda Jones.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PeaceFlow Massage | Grand Junction, CO",
    template: "%s | PeaceFlow Massage",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "PeaceFlow Massage",
    title: "PeaceFlow Massage | Grand Junction, CO",
    description: defaultDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeaceFlow Massage | Grand Junction, CO",
    description: defaultDescription,
  },
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
        <ScrollToTop />
      </body>
    </html>
  );
}
