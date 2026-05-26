import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import FloatingContact from "./components/FloatingContact";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <CustomCursor />
        <Navbar />
        <FloatingContact />
        {children}
      </body>
    </html>
  );
}