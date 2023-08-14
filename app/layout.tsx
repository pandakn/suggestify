import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/context/AuthContext";
import ToasterContext from "@/context/ToastContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suggestify",
  description:
    "Recommends 12 awesome Spotify tracks that come from your taste – and lets you add them to your playlist hassle-free!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="container mx-auto">
              <ToasterContext />
              <Header />
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
