"use client"

import { handleProduct } from "@/app/api/handleProduct"
import {
	openNewWindow,
	smoothScrollHorizotal,
} from "../utils/until"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
	useEffect,
	useRef,
	useState,
} from "react"
import {
	GoChevronLeft,
	GoChevronRight,
} from "react-icons/go"

const ProductSlide = ({
	title,
	imageHref,
	styleForImage = {},
	categoryId,
}) => {
	const [list, setList] = useState([])

	const getProduct = async () => {
		const result = await handleProduct.getProduct({
			categoryId: categoryId,
			pageNumber: 1,
			pageSize: 999,
		})
		const { products, ...rest } = result
		console.log("products:", products)
		setList(products)
	}

	useEffect(() => {
		getProduct()
	}, [])

	const containerRef = useRef()
	const itemRef = useRef()
	const bannerRef = useRef()

	const formattedTitle = {
		__html: title,
	}

	const handleNextClick = () => {
		const itemWidth =
			itemRef.current.offsetWidth * 1.5
		const scrollLeft =
			containerRef.current.scrollLeft
		const targetScrollLeft = scrollLeft + itemWidth
		smoothScrollHorizotal(
			containerRef.current,
			scrollLeft,
			targetScrollLeft,
			300
		)
	}

	const handlePreClick = () => {
		const itemWidth = itemRef.current.offsetWidth
		const scrollLeft =
			containerRef.current.scrollLeft
		const targetScrollLeft = scrollLeft - itemWidth
		smoothScrollHorizotal(
			containerRef.current,
			scrollLeft,
			targetScrollLeft,
			300
		)
	}

	return (
		<div className='mt-3 bg-slate-200/90 py-4 md:flex overflow-hidden relative '>
			<div ref={bannerRef} className='md:w-1/3 p-2'>
				<div className='flex gap-3 flex-col items-center'>
					<div
						className='text-center w-[70%]'
						dangerouslySetInnerHTML={formattedTitle}
					></div>
					<Link
						className='text-blue-500 text-[1.1rem] flex
             items-center underline underline-offset-2 mb-4'
						href={""}
					>
						<div> Tìm hiểu thêm</div>{" "}
						<GoChevronRight scale={25} />
					</Link>

					<div className='relative w-[200px] h-[200px]'>
						<Image
							src={imageHref}
							alt=''
							fill
							style={{
								...styleForImage,
								objectFit: "contain",
							}}
						/>
					</div>
				</div>
			</div>

			<div className='relative'>
				<div
					onClick={handlePreClick}
					className=' absolute top-1/2 -translate-y-1/2 
          hidden md:inline-flex -translate-x-1/2  text-5xl
           bg-black/10 backdrop-blur-lg z-20  items-center
            justify-center p-3 rounded-full'
				>
					<GoChevronLeft size={25} />
				</div>
			</div>

			{list.length !== 0 && (
				<motion.div
					ref={containerRef}
					className='hidden flex-1 gap-6 md:flex 
          md:overflow-scroll scroll-smooth relative'
				>
					{list?.map((x, i) => (
						<div
							ref={itemRef}
							key={i}
							className={`w-[40%] lg:w-1/3 h-full 
              flex flex-col items-center justify-center bg-white shrink-0 rounded-[26px] `}
						>
							<div className='w-[200px] h-[200px] mt-8 mb-4 rounded-[32px]'>
								<img
									src={x?.image?.image_href}
									style={{
										objectFit: "cover",
										borderRadius: "32px",
										margin: "auto",
										maxWidth: "100%",
										maxHeight: "100%",
									}}
								/>
							</div>
							<div
								className='flex flex-col gap-2 
              items-center text-[1.3rem] mt-[auto] flex-1'
							>
								<div className='font-[600] text-[2.2rem] max-w-[85%] overflow-hidden whitespace-nowrap overflow-ellipsis'>
									{x?.product?.name_pr}
								</div>

								<div className='font-[300]'>
									Từ{" "}
									<span className='font-[500]'>
										{x?.product?.price.toLocaleString(
											"it-IT",
											{
												style: "currency",
												currency: "VND",
											}
										)}
									</span>
								</div>
								<div
									className='px-[11px] cursor-pointer
                 py-2 bg-blue-500 rounded-full text-white'
								>
									Mua
								</div>
								<Link
									href=''
									onClick={() => {
										openNewWindow(x.informationLink)
									}}
									className='text-blue-500 flex items-center gap-1 pb-4'
								>
									Tìm hiểu thêm{" "}
									<GoChevronRight scale={15} />
								</Link>
							</div>
						</div>
					))}
				</motion.div>
			)}

			<div
				onClick={handleNextClick}
				className='absolute text-5xl hidden md:flex
         -translate-x-5  top-1/2 right-0 -translate-y-1/2
          bg-black/10 backdrop-blur-lg z-20  items-center 
          justify-center p-3 rounded-full'
			>
				<GoChevronRight size={25} />
			</div>
		</div>
	)
}

export default ProductSlide

const productList = [
	{
		name: "Airpods Max",
		price: 10000000,
		imageLink:
			"/images/product_images/headphone-review.png",
		informationLink: "google.com.vn",
	},

	{
		name: "Airpods Max",
		price: 10000000,
		imageLink:
			"/images/product_images/headphone-review.png",
		informationLink: "google.com.vn",
	},

	{
		name: "Airpods Max",
		price: 10000000,
		imageLink:
			"/images/product_images/headphone-review.png",
		informationLink: "google.com.vn",
	},

	{
		name: "Airpods Max",
		price: 10000000,
		imageLink:
			"/images/product_images/headphone-review.png",
		informationLink: "google.com.vn",
	},
]
