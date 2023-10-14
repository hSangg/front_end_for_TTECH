import Navigator from "@/components/Navigator";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { AuthContextProvider } from "@/context/AuthContext";
import RealTimeMessage from "@/components/RealTimeMessage";

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
        <body className={inter.className}>
          {/* <div className="h-[70px]"></div>
          
          <div>
            <Header />
          </div>
          <div>
            <Navigator />
          </div> */}

          {children}
        </body>
      </AuthContextProvider>
    </html>
  );
}
