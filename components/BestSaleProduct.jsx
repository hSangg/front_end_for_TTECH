"use client"
import { saleProductList } from "../data"
import { smoothScrollVertical } from "../utils/until"
import Image from "next/image"
import { useRef } from "react"
import {
	GoChevronDown,
	GoChevronUp,
} from "react-icons/go"

const BestSaleProduct = ({ height }) => {
	const containerRef = useRef()
	const itemRef = useRef()

	const handleScrollToBottom = () => {
		const itemHeight = itemRef.current.offsetHeight
		const currentScrollTop =
			containerRef.current.scrollTop
		const targetScrollTop =
			currentScrollTop + itemHeight
		smoothScrollVertical(
			containerRef.current,
			currentScrollTop,
			targetScrollTop,
			300
		)
	}

	const handleScrollToTop = () => {
		const itemHeight = itemRef.current.offsetHeight
		const currentScrollTop =
			containerRef.current.scrollTop
		const targetScrollTop =
			currentScrollTop - itemHeight
		smoothScrollVertical(
			containerRef.current,
			currentScrollTop,
			targetScrollTop,
			300
		)
	}

	return (
		<div className='w-full bg-slate-500/20 md:w-[260.115606936px] rounded-[25px] mt-4 relative'>
			<div
				style={{ height }}
				ref={containerRef}
				className={`flex overflow-scroll flex-nowrap md:flex-col gap-6`}
			>
				{saleProductList.map((item, index) => (
					<div
						ref={itemRef}
						className='w-[260.115606936px] h-[100px] relative shrink-0'
						key={index}
					>
						<Image
							src={item.imageRef}
							alt='banner'
							fill
							style={{ objectFit: "contain" }}
						/>
					</div>
				))}

				<button
					onClick={handleScrollToTop}
					className='absolute
          left-1/2 -translate-x-1/2 -translate-y-1/2
          hidden md:flex items-center p-2 justify-center rounded-full top-0 bg-white/10 backdrop-blur-lg'
				>
					<GoChevronUp size={25} />
				</button>

				<button
					onClick={handleScrollToBottom}
					className='absolute
          left-1/2 -translate-x-1/2 
          hidden md:flex items-center p-2 justify-center rounded-full bottom-0 bg-white/10 backdrop-blur-lg'
				>
					<GoChevronDown size={25} />
				</button>
			</div>
		</div>
	)
}

export default BestSaleProduct
