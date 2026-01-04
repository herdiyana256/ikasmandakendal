import type { Metadata } from "next";
import { Bebas_Neue, Poppins, Inter, Roboto } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import FloatingCTA from "@/components/FloatingCTA";
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "IKA SMANDA KENDAL",
  description: "Website Resmi Ikatan Alumni SMA Negeri 1 Kendal",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`antialiased bg-gray-50 text-gray-900 ${bebas.variable} ${poppins.variable} ${inter.variable} ${roboto.variable} font-sans`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingCTA />
        </Providers>
      </body>
    </html>
  );
}
