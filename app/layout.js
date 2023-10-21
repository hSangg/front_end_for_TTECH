import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tech Products",
  description: "E-comerce",
  icons: {
    url: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={inter.className}>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
