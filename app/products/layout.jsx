import Header from "@/components/uncategory/Header"
import Navigator from "@/components/uncategory/Navigator"

export default function LoginLayout({ children }) {
	return (
		<section>
			<div>
				<Header />
			</div>
			<div>
				<Navigator />
			</div>
			{children}
		</section>
	)
}
