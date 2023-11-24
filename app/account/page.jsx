"use client"

import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import UserDataForm from "../../components/UserDataForm"
import UserOrder from "../../components/UserOrder"
import { CiLogout } from "react-icons/ci"
const Page = () => {
	const { token, user, logout } = UserAuth()

	return (
		<div onClick={() => {}} className='container mx-auto'>
			<div className='flex justify-between items-center'>
				<motion.div className='text-[5rem] font-[300] uppercase h-[60px] leading-[60px]'>
					<motion.div
						initial='offscreen'
						whileInView='onscreen'
						transition={{ staggerChildren: 0.1 }}
						className='font-[600] '
					>
						HY! {user?.name}{" "}
					</motion.div>
				</motion.div>
				<CiLogout
					size={25}
					onClick={() => logout()}
					className='bg-red-500 text-white p-2 rounded-3xl cursor-pointer'
				/>
			</div>
			<UserDataForm />
			<UserOrder />
		</div>
	)
}

export default Page
