import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar"; 
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aashika Shah — Biologist & Researcher",
  description: "Undergraduate biologist, researcher, and leader at Ithaca College.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body style={{ cursor: "none", backgroundColor: "#0C0A0B"}}>   {/* hides default cursor */}
        <CustomCursor />                   {/* our crimson cursor lives here */}
        <Navbar />  
        {children}
      </body>
    </html>
  );
}


