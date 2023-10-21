"use client"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
const Advertisement = () => {
	const [show, setShow] = useState(true)
	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false)
		}, 5000)

		return () => {
			clearTimeout(timer)
		}
	}, [])
	return (
		<>
			<AnimatePresence>
				{show && (
					<motion.div
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						className='fixed inset-0 flex z-[99] items-center justify-center bg-black/50 backdrop-blur-md'
					>
						<div className='relative w-[400px] h-[400px] '>
							<Image
								src={"/images/ads_images/ifalsexx.png"}
								fill
								style={{
									objectFit: "contain",
									borderRadius: "20px",
								}}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default Advertisement
