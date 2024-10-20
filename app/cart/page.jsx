"use client"

import CartDetail from "@/components/CartDetail"
import OrderBill from "@/components/OrderBill"
import { useEffect, useState } from "react"
import { handleCart } from "../api/handleCart"
import { handleDiscount } from "../api/handleDiscount."

const Page = () => {
	const [cart, setCart] = useState([1, 1, 1, 1, 1])

	const getCurrentProductInCart = async (id, token) => {
		const result = await handleCart.GetCartProduct(id, token)
		setCart(result)
	}

	useEffect(() => {
		try {
			const user = JSON.parse(localStorage.getItem("user"))
			const token = JSON.parse(localStorage.getItem("token"))
			if (user?.user_id) {
				getCurrentProductInCart(user.user_id, token)
			}
		} catch (error) {}
	}, [])

	return (
		<div className='mt-20 mx-auto container mb-24'>
			<div className='w-full flex gap-10 justify-center flex-col md:flex-row '>
				<CartDetail cart={cart} setCart={setCart} />
				<OrderBill cart={cart} setCart={setCart} />
			</div>
		</div>
	)
}

export default Page
