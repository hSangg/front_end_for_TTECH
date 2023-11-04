"use client"

import { convertToVND } from "@/utils/until"
import {
	CiCircleMinus,
	CiCirclePlus,
} from "react-icons/ci"

const CartDetail = ({
	cart = [
		{
			product: {
				product_id: "ABC123",
				name_pr: "Samsung Galaxy S21",
				name_serial: "GA007",
				detail:
					"6.2-inch display, 12GB RAM, 256GB storage, 64MP camera",
				price: 12000000,
				quantity_pr: 50,
				guarantee_period: 12,
				supplier_id: "SUPLLIER001",
			},
			quantity: 2,
			category: {
				category_id: "0PbC1aL2mN3oPqRs",
				category_name: "Điện thoại di động",
			},
			supplier: {
				supplier_id: "SUPLLIER001",
				supplier_name: "Samsung",
			},
			image: {
				image_id: "ABC123001",
				product_id: "ABC123",
				image_href:
					"https://localhost:7067/Upload/product/ABC123/ABC123_1.jpg",
			},
		},
	],
	setCart,
}) => {
	const handleDecreaseQuantity = (productId) => {
		const productIndex = cart.findIndex(
			(item) => item.product.product_id === productId
		)
		const product = cart[productIndex]

		const newQuantity = product.quantity - 1

		if (newQuantity === 0) {
			const updatedCart = [...cart]
			updatedCart.splice(productIndex, 1)
			setCart(updatedCart)
		} else if (newQuantity > 0) {
			const updatedCart = [...cart]
			updatedCart[productIndex] = {
				...product,
				quantity: newQuantity,
			}
			setCart(updatedCart)
		}
	}

	const handleIncreaseQuantity = (productId) => {
		const productIndex = cart.findIndex(
			(item) => item.product.product_id === productId
		)
		const product = cart[productIndex]

		const newQuantity = product.quantity + 1
		const updatedCart = [...cart]
		updatedCart[productIndex] = {
			...product,
			quantity: newQuantity,
		}

		setCart(updatedCart)
	}

	return (
		<div className='flex flex-row gap-10 flex-wrap justify-center'>
			{cart?.map((x, i) => {
				return (
					<div
						key={i}
						className='flex flex-col items-center p-4 rounded-3xl bg-white'
					>
						<div className='w-[200px] h-[200px] rounded-3xl'>
							<img
								src={x.image.image_href}
								className='w-full h-full object-cover p-4 rounded-2xl'
							/>
						</div>
						<h2 className='text-[1.6rem] w-[80%] text-center text-ellipsis whitespace-nowrap font-semibold '>
							{x.product.name_pr}
						</h2>

						<h3 className='text-[1.4rem] mt-4 text-black/80 font-semibold'>
							{convertToVND(x.product.price)}
						</h3>

						<div className='inline-flex mt-2 bg-blue-500/80 px-2 py-1 text-white rounded-full items-center text-xl justify-center gap-2'>
							<div
								onClick={() =>
									handleDecreaseQuantity(
										x.product.product_id
									)
								}
							>
								<CiCircleMinus size={25} />
							</div>
							<h3>{x.quantity}</h3>
							<div
								onClick={() =>
									handleIncreaseQuantity(
										x.product.product_id
									)
								}
							>
								<CiCirclePlus size={25} />
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CartDetail
