import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://nexumarquitectura.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NEXUM Arquitectura — Arquitectura que conecta ideas, espacios y personas",
    template: "%s · NEXUM Arquitectura",
  },
  description:
    "NEXUM Arquitectura es un despacho de arquitectura especializado en arquitectura residencial, desarrollo habitacional, diseño de interiores, visualización arquitectónica, proyecto ejecutivo y construcción.",
  keywords: [
    "NEXUM Arquitectura",
    "despacho de arquitectura",
    "arquitectura residencial",
    "diseño de casas",
    "diseño de departamentos",
    "diseño de interiores",
    "renders arquitectónicos",
    "visualización arquitectónica",
    "proyecto ejecutivo",
    "construcción",
    "arquitectura Estado de México",
    "arquitectura Chimalhuacán",
  ],
  authors: [{ name: "NEXUM Arquitectura" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "NEXUM Arquitectura",
    title: "NEXUM Arquitectura — Arquitectura que conecta ideas, espacios y personas",
    description:
      "Diseñamos, visualizamos y construimos espacios donde arquitectura, funcionalidad y tecnología convergen.",
    images: [{ url: "/logos/nexum-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUM Arquitectura",
    description: "Arquitectura que conecta ideas, espacios y personas.",
    images: ["/logos/nexum-logo.jpg"],
  },
  icons: {
    icon: "/logos/nexum-logo.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-nexum-white font-body text-nexum-black antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
