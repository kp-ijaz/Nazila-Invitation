import type { Metadata, Viewport } from "next";
import { Allura, Amiri, Cormorant_Garamond, Noto_Serif_Malayalam } from "next/font/google";
import { COUPLE, EVENT } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
  display: "swap",
});

const malayalam = Noto_Serif_Malayalam({
  subsets: ["malayalam"],
  weight: ["400", "500"],
  variable: "--font-noto-malayalam",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const description = `You are cordially invited to celebrate the Nikah of ${COUPLE.shortName} on ${EVENT.date}.`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: `${COUPLE.shortName} — Nikah Invitation`,
  description,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `Nikah Invitation — ${COUPLE.shortName}`,
    description,
    images: ["/og-image.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Nikah Invitation — ${COUPLE.shortName}`,
    description,
    images: ["/og-image.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${allura.variable} ${amiri.variable} ${malayalam.variable}`}
    >
      <head>
        <link
          rel="preload"
          href="/audio/wedding-nasheed.mp3"
          as="audio"
          type="audio/mpeg"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
