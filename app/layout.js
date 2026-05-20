import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Manish Verma | Full Stack Developer",
  description: "Portfolio of Manish Verma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0b1220] text-white">
        <Navbar />
        <div className="pt-24">{children}</div>
        <Footer />
      </body>
    </html>
  );
}