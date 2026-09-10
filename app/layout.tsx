import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import ContactModal from "./components/ContactModal";


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
        <ContactModal />
        {children}
        <Analytics />
      </body>
    </html>
  );
}