"use client"

import { handleCart } from "@/app/api/handleCart"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CiShoppingCart } from "react-icons/ci"
const Cart = () => {
	const router = useRouter()
	const [totalProduct, setTotalProduct] =
		useState(0)

	const getUserTotalProduct = async (
		userId,
		token
	) => {
		try {
			const result =
				await handleCart.getCountProductOnCart(
					userId,
					token
				)

			setTotalProduct(result)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		const user = JSON.parse(
			localStorage.getItem("user")
		)

		const token = JSON.parse(
			localStorage.getItem("token")
		)

		getUserTotalProduct(user.user_id, token)
	}, [])

	return (
		<motion.div
			onClick={() => {
				router.push("cart")
			}}
			className='relative cursor-pointer'
		>
			<CiShoppingCart size={25} />
			<div className='absolute top-0 right-0 translate-x-1/2 rounded-xl bg-blue-500/90 px-2 text-[10px] font-semibold text-white'>
				{totalProduct}
			</div>
		</motion.div>
	)
}

export default Cart
