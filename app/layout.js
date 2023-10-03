import Navigator from "@/components/Navigator";
import "./globals.css";
import { Inter } from "next/font/google";

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
      <body className={inter.className}>
        <div>
          <Navigator />
        </div>

        {children}
      </body>
    </html>
  );
}
