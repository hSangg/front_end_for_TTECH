"use client"
import { convertDate, copy } from "@/components/user/UserOrder"
import { convertToVND } from "@/utils/until"
import { motion } from "framer-motion"
import { IoCopyOutline } from "react-icons/io5"
const OrderRenderList = ({
	orderList,
	setOrderList,
	currentOrderClick,
	setCurrentOrderClick,
}) => {
	const handleCurrentClick = (x) => {
		setCurrentOrderClick(x)
	}
	return (
		<table className='w-full border-spacing-1 border-separate table-auto text-xl bg-white relative'>
			<thead class=' text-black uppercase sticky top-2'>
				<tr className=''>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Mã đơn hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Tên khách hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Email
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Số điện thoại
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Địa chỉ
					</th>

					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Thơi gian đặt hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Trạng thái
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Tổng tiền
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Ghi chú
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Khuyến mãi
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Phí giao hàng
					</th>
				</tr>
			</thead>
			<tbody>
				{orderList.map((x, i) => (
					<motion.tr
						onClick={() => handleCurrentClick(x)}
						initial={{
							backgroundColor: "#f8fafc",
							padding: 0,
						}}
						whileHover={{
							backgroundColor: "#cbd5e1",
							padding: "10px 0px",
						}}
						transition={{ type: "spring" }}
						key={i}
						className='cursor-pointer'
					>
						<motion.th
							whileTap={{ color: "red" }}
							className='px-4 py-2 flex-1 font-[400] shrink-0 flex items-center gap-2 text-center'
						>
							{x.orderInfor.orderId.slice(0, 5)}...{" "}
							<IoCopyOutline
								size={15}
								onClick={() => {
									copy(x.orderInfor.orderId)
								}}
							/>
						</motion.th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.orderInfor.name}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.orderInfor.email}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.orderInfor.phone}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.orderInfor.address}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertDate(x.orderInfor.createOrderAt)}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							<span
								style={{
									backgroundColor:
										x.orderInfor.state.toLocaleLowerCase() ===
										"pending"
											? "#8b5cf6"
											: x.orderInfor.state.toLocaleLowerCase() ===
											  "completed"
											? "#3b82f6"
											: x.orderInfor.state.toLocaleLowerCase() ===
											  "banked"
											? "#06b6d4"
											: "#ef4444",
								}}
								className='p-2 rounded-xl text-white'
							>
								{x.orderInfor.state}
							</span>
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertToVND(x.orderInfor.total || 0)}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.orderInfor.note}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.discountInfor.discountCode}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.orderInfor.deliveryFee}
						</th>
					</motion.tr>
				))}
			</tbody>
		</table>
	)
}

export default OrderRenderList
