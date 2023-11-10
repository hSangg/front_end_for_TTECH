"use client"

import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { CiShoppingCart } from "react-icons/ci"
const Cart = () => {
	const router = useRouter()
	const { user } = UserAuth()

	return (
		<motion.div
			onClick={() => {
				router.push(user?.user_id ? "cart" : "login")
			}}
			className='relative cursor-pointer'
		>
			<CiShoppingCart size={25} />
		</motion.div>
	)
}

export default Cart
