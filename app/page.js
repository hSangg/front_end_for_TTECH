import Header from "../components/uncategory/Header"
import Navigator from "../components/uncategory/Navigator"
import MainContent from "../components/uncategory/MainContent"
import Footer from "@/components/uncategory/Footer"

export default function Home() {
	return (
		<>
			<div className='h-[70px]'></div>

			<div>
				<Header />
			</div>
			<div>
				<Navigator />
			</div>

			<MainContent />

			<div>
				<Footer />
			</div>
		</>
	)
}
