import RecoilContext from "@/context/RecoilContext"
import { Inter } from "next/font/google"
import { AuthContextProvider } from "../context/AuthContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Tech Products",
	description: "E-comerce",
	icons: {
		url: "/icon.png",
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<RecoilContext>
				<AuthContextProvider>
					<body className={inter.className}>
						{children}
					</body>
				</AuthContextProvider>
			</RecoilContext>
		</html>
	)
}
