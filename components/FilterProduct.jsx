"use client"

import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
	CiFilter,
	CiPercent,
} from "react-icons/ci"

const FilterProduct = ({ onFilterChange }) => {
	const [show, setShow] = useState(false)
	const [current, setCurrent] = useState({})

	useEffect(() => {
		onFilterChange((pre) => {
			const { id, ...rest } = current

			return { ...pre, ...rest }
		})
	}, [current])

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				setShow(false)
			}
		}

		window.addEventListener(
			"keydown",
			handleKeyDown
		)

		return () => {
			window.removeEventListener(
				"keydown",
				handleKeyDown
			)
		}
	}, [])

	return (
		<div>
			<div className='flex gap-5 mt-24 mb-10 items-center justify-center'>
				<div
					onClick={() => {
						setShow(true)
					}}
					className='flex cursor-pointer gap-2 items-center justify-center mx-[20px]'
				>
					<CiFilter
						size={30}
						color='white'
						className='bg-blue-500 p-1 rounded-2xl'
					/>
					<div>
						<h1 className='text-2xl text-black/70 font-[400]'>
							Sử dụng tính năng lọc <br></br> để tìm ra{" "}
							<span className='text-black'>
								sản phẩm ưng ý nhất
							</span>
						</h1>
					</div>
				</div>

				<div
					className='flex justify-center gap-2 items-center'
					onClick={() => {}}
				>
					<CiPercent
						className='bg-red-500 px-2 py-1 rounded-2xl'
						color='white'
						size={30}
					/>
					<h1 className='text-2xl text-black/70  font-[400]'>
						Ưu đãi ngập tràng, <br></br> khuyễn mại đến
						60%
					</h1>
				</div>
			</div>

			<AnimatePresence>
				{show && (
					<motion.div
						initial={{ scaleY: 0 }}
						whileInView={{ scaleY: 1 }}
						exit={{ scaleY: 0 }}
						transition={{
							duration: 0.4,
							type: "spring",
						}}
						className='fixed inset-0 z-30 origin-top'
					>
						<div className='absolute top-0 bottom-40 inset-x-0 bg-white z-40 grid grid-cols-2 '>
							{filterData.map((x, i) => (
								<div
									key={i}
									className='text-center mt-36'
								>
									<h1 className='text-5xl font-bold'>
										{x.name}
									</h1>
									<div className='mt-5'>
										{x.filter.map((y, j) => (
											<div key={j}>
												<motion.div
													variants={variant}
													initial='init'
													animate={() => {
														if (x.id === 1) {
															if (
																current.priceIdentify ==
																`${x.id} ${y.id}`
															)
																return "click"
														}

														return "init"
													}}
													onClick={() => {
														setCurrent((prevFilter) => {
															if (x.id === 1) {
																return {
																	...prevFilter,
																	SortBy: "price",
																	IsDescending: y.type === "Desc",
																	priceIdentify: `${x.id} ${y.id}`,
																}
															}

															return prevFilter
														})
													}}
													className='text-2xl'
												>
													{y.name}
												</motion.div>
											</div>
										))}
									</div>
								</div>
							))}

							<div className='absolute hidden sm:block bottom-10 left-1/2 z-40 text-2xl -translate-x-1/2'>
								Pres{" "}
								<span className='bg-blue-500 px-2 py-1 text-white rounded-2xl'>
									ESC
								</span>{" "}
								to quit
							</div>
						</div>
						<div
							onClick={() => {
								setShow(false)
							}}
							className='bg-white/20  backdrop-blur-md absolute inset-0'
						></div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default FilterProduct

const filterData = [
	{
		id: 1,
		name: "Giá",
		filter: [
			{
				id: 1,
				name: "Từ thấp đến cao",
				type: "Asc",
			},
			{
				id: 2,
				name: "Từ cao đến thấp",
				type: "Desc",
			},
		],
	},
]

const variant = {
	init: {
		opacity: 0.5,
	},
	click: {
		opacity: 1,
	},
}
