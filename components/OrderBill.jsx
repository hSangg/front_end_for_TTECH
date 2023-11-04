"use client"

import { convertToVND } from "@/utils/until"
import { useEffect, useState } from "react"

const OrderBill = ({
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
}) => {
	const [totalPrice, setTotalPrice] = useState(
		() => {
			let total = 0
			cart
				.map((x) => x.quantity * x.product.price)
				.forEach((x) => {
					total += x
				})
			return total
		}
	)

	useEffect(() => {
		let total = 0
		cart
			.map((x) => x.quantity * x.product.price)
			.forEach((x) => {
				total += x
			})
		setTotalPrice(total)
	}, [cart])

	return (
		<div className='flex flex-col items-center p-8 shrink-0  bg-white min-w-[400px] pb-[500px]'>
			<h1 className='text-black font-semibold text-4xl text-center'>
				Chi tiết hóa đơn
			</h1>

			<h1 className='text-black font-[300] w-full text-xl text-center whitespace-nowrap overflow-hidden'>
				--------------------------------------------------------------------------
			</h1>

			<table className='w-full text-2xl text-left '>
				<thead>
					<tr>
						<th className='p-2'>Sản phẩm</th>
						<th className='p-2'>Số lượng</th>
						<th className='p-2'>Tổng tiền</th>
					</tr>
				</thead>
				<tbody className=''>
					{cart.map((x, i) => (
						<tr
							key={i}
							className='border-t border-slate-500/60 my-2'
						>
							<td className='p-2'>
								{x.product.name_pr}
							</td>
							<td className='p-2'>{x.quantity}</td>
							<td className='p-2'>
								{convertToVND(
									x.quantity * x.product.price
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className='bg-sky-500 text-3xl text-white text-center p-2 w-full rounded-full font-[600] mt-2'>
				Tổng: {convertToVND(totalPrice)}
			</div>
		</div>
	)
}

export default OrderBill
