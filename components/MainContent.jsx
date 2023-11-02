"use client"

import { useEffect, useState } from "react"
import Advertisement from "./Advertisement"
import BestSaleCategory from "./BestSaleCategory"
import BestSaleProduct from "./BestSaleProduct"
import ImageSlide from "./ImageSlide"
import ProductListAbs from "./ProductListAbs"
import RealTimeMessage from "./RealTimeMessage"
import AdvertisementShipping from "./advertisement/AdvertisementShipping"
import { CiStar } from "react-icons/ci"
import { useRouter } from "next/navigation"

const MainContent = () => {
	const [imageSlideHeight, setImageSlideHeight] =
		useState("auto")

	const router = useRouter()

	useEffect(() => {}, [])

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				const imageSlideElement =
					document.querySelector(".image-slide")
				if (imageSlideElement) {
					const height = imageSlideElement.offsetHeight
					setImageSlideHeight(height)
				}
			} else {
				setImageSlideHeight("auto")
			}
		}

		handleResize()

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener(
				"resize",
				handleResize
			)
		}
	}, [imageSlideHeight])

	return (
		<div>
			{/* <Advertisement /> */}
			<div className='m-2 '>
				<div className='md:flex gap-5'>
					<div className='md:flex-1'>
						<div>
							<RealTimeMessage />
						</div>
						<ImageSlide />
					</div>
					<BestSaleProduct height={imageSlideHeight} />
				</div>
				<BestSaleCategory />
				<div className='text-center'>
					<div className='text-3xl'>
						Bạn chưa tìm được sản phẩm ưng ý?
					</div>
					<div className='flex gap-2 items-center justify-center text-2xl'>
						<CiStar size={30} /> Xem toàn bộ sản phẩm{" "}
						<span
							onClick={() => {
								router.push("/products")
							}}
							className='text-blue-500 cursor-pointer underline'
						>
							tại đây
						</span>
					</div>
				</div>
				<AdvertisementShipping />\
				<Advertisement />
				<ProductListAbs />
			</div>
		</div>
	)
}

export default MainContent
