"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
	CiDesktop,
	CiDesktopMouse2,
	CiHardDrive,
	CiHeadphones,
	CiKeyboard,
	CiLaptop,
	CiMobile2,
	CiStreamOn,
} from "react-icons/ci"

const BestSaleCategory = () => {
	const router = useRouter()
	return (
		<div className='hidden md:flex justify-center gap-[30px] lg:gap-[60px] items-start my-10'>
			{categoryBestSeller.map((x, i) => (
				<motion.div
					onClick={() => {
						router.push(
							"/products?" + "category=" + x.name
						)
					}}
					initial={{ color: "black" }}
					whileHover={{ color: "red" }}
					transition={{
						type: "spring",
						duration: 0.3,
					}}
					key={i}
					className='cursor-pointer flex flex-col start items-center'
				>
					<div
						className='shrink-0
       
           min-h-[60px] justify-self-start'
					>
						<x.icon size={45} />
					</div>
					<div
						className='flex flex-col 
          justify-start'
					>
						<h1
							className='capitalize 
            text-center text-[1.5rem] font-[300] leading-4 '
						>
							{x.name}
						</h1>
						<h2
							className='capitalize 
            text-center text-[1.2rem] font-[300] text-red-400 mt-1'
						>
							{x.isNew && "Mới"}
						</h2>
					</div>
				</motion.div>
			))}
		</div>
	)
}

export default BestSaleCategory

const categoryBestSeller = [
	{
		id: 0,
		name: "Điện thoại",
		icon: CiMobile2,
		isNew: false,
	},
	{
		id: 1,
		name: "Chuột",
		icon: CiDesktopMouse2,
		isNew: true,
	},

	{
		id: 2,
		name: "Tai nghe",
		icon: CiHeadphones,
		isNew: false,
	},

	{
		id: 3,
		name: "Laptop",
		icon: CiLaptop,
		isNew: true,
	},

	{
		id: 4,
		name: "Màng hình",
		icon: CiDesktop,
		isNew: true,
	},

	{
		id: 5,
		name: "Bàn phím",
		icon: CiKeyboard,
		isNew: true,
	},

	{
		id: 6,
		name: "Ổ cứng",
		icon: CiHardDrive,
		isNew: true,
	},

	{
		id: 7,
		name: "Smart home",
		icon: CiStreamOn,
		isNew: true,
	},
]
