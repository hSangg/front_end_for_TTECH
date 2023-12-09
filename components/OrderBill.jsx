"use client"

import { convertToVND } from "@/utils/until"
import { useEffect, useState } from "react"
import OrderFormData from "./OrderFormData"
import { handleDiscount } from "@/app/api/handleDiscount."

const OrderBill = ({ cart, setCart }) => {
	const [totalPrice, setTotalPrice] = useState(() => {
		let total = 0
		cart
			.map((x) => x?.quantity * x?.product?.price || 0)
			.forEach((x) => {
				total += x
			})
		return total
	})
	const [discount, setDiscount] = useState({
		discountId: null,
		discountCode: "",
		discountAmount: 0,
		discountDateFrom: "",
		discountDateTo: "",
	})

	useEffect(() => {
		let total = 0
		cart
			?.map((x) => x?.quantity * x?.product?.price || 0)
			.forEach((x) => {
				total += x
			})

		setTotalPrice(total)
	}, [cart])

	const getCurrentDiscount = async () => {
		const date = new Date().toLocaleString()

		const response = await handleDiscount.getCurrentDiscount(
			date
		)

		if (response.discountId) setDiscount(response)
	}

	useEffect(() => {
		getCurrentDiscount()
	}, [])

	return (
		<div className='flex flex-col items-center p-8 shrink-0  bg-white min-w-[300px] max-w-[500px] '>
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
								{x?.product?.name_pr || "loading"}
							</td>
							<td className='p-2'>{x.quantity}</td>
							<td className='p-2'>
								{convertToVND(x?.quantity * x?.product?.price || 0)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{discount.discountId && (
				<div className='text-white mt-4 text-2xl w-3/4 text-center bg-blue-400 p-2 rounded-xl'>
					Quý khách được áp dụng mã:{" "}
					<span className='font-bold'>
						{discount.discountCode}
					</span>{" "}
					giảm <span>{discount.discountAmount}%</span> cho đơn
					hàng
				</div>
			)}

			<div className='text-black text-3xl grid grid-cols-2 px-[100px]  py-8 w-full rounded-full font-[600] mt-2'>
				<div className=' '>Tổng:</div>{" "}
				<div>{convertToVND(totalPrice)}</div>
				{discount.discountId && (
					<>
						<div className=''>Giảm:</div>
						<div className='text-red-500'>
							{convertToVND(
								Math.ceil(
									totalPrice *
										(Number.parseInt(discount.discountAmount) / 100)
								)
							)}
						</div>
						<div className=''>=</div>
						<div>
							{convertToVND(
								Math.ceil(
									totalPrice -
										totalPrice *
											(Number.parseInt(discount.discountAmount) / 100)
								)
							)}
						</div>
					</>
				)}
			</div>

			<div className='h-[1px] bg-black/40 w-full mt-[12px]'></div>

			<OrderFormData
				cart={cart}
				setCart={setCart}
				discount={discount}
				totalPrice={
					totalPrice -
					totalPrice *
						(Number.parseInt(discount.discountAmount) / 100)
				}
			/>
		</div>
	)
}

export default OrderBill
