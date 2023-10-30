"use client"

import { motion } from "framer-motion"
import UserDataForm from "../../components/UserDataForm"
import { useRouter } from "next/navigation"
const Page = () => {
	const router = useRouter()
	const user = JSON.parse(
		window.localStorage.getItem("user")
	)

	if (!user) {
		router.push("/login")
		return
	}

	return (
		<div className='container mx-auto'>
			<motion.div className='text-[5rem] font-[300] uppercase h-[60px] leading-[60px]'>
				<motion.div
					initial='offscreen'
					whileInView='onscreen'
					transition={{ staggerChildren: 0.1 }}
					className='w-[100vw] font-[600] '
				>
					{`HY! ${user?.name}`
						.split("")
						.map((t, i) => (
							<motion.span
								variants={textAnimate}
								key={i}
							>
								{t}
							</motion.span>
						))}
				</motion.div>
			</motion.div>
			<UserDataForm />
		</div>
	)
}

export default Page

const textAnimate = {
	offscreen: { opacity: 0 },
	onscreen: {
		opacity: 1,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 1,
		},
	},
}
