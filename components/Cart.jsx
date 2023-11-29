"use client"

import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { CiShoppingCart } from "react-icons/ci"
const Cart = () => {
	const router = useRouter()
	const { user } = UserAuth()

	const handleOnClick = () => {
		if (user?.user_id) {
			router.push("/cart")
			return
		}

		router.push("/login")
	}

	return (
		<motion.div
			onClick={handleOnClick}
			whileHover={{ scale: 1.1, color: "#dc2626" }}
			className='relative cursor-pointer'
		>
			<CiShoppingCart size={25} />
		</motion.div>
	)
}

export default Cart
