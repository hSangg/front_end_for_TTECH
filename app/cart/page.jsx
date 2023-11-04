"use client"

import CartDetail from "@/components/CartDetail"
import { useEffect, useState } from "react"
import { handleCart } from "../api/handleCart"
import OrderBill from "@/components/OrderBill"

const Page = () => {
	const [cart, setCart] = useState()

	const getCurrentProductInCart = async () => {
		const result = await handleCart.GetCartProduct(
			"001",
			"001"
		)

		setCart(result)
	}

	useEffect(() => {
		getCurrentProductInCart()
	}, [])

	return (
		<div className='mt-20 mx-auto container mb-24'>
			<div className='w-full flex justify-center flex-col md:flex-row '>
				<CartDetail cart={cart} setCart={setCart} />

				<OrderBill cart={cart} />
			</div>
		</div>
	)
}

export default Page
