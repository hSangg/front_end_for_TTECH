import Footer from "@/components/uncategory/Footer"
import Header from "@/components/uncategory/Header"
import Navigator from "@/components/uncategory/Navigator"

export default function DashboardLayout({
	children,
}) {
	return (
		<section className=''>
			<div>
				<Header />
			</div>
			<div>
				<Navigator />
			</div>

			{children}

			<Footer />
		</section>
	)
}
