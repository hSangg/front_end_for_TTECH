"use client"

import { handleOrder } from "@/app/api/handleOrder"
import { useEffect, useState } from "react"
import OrderRenderList from "./orderManagement/OrderRenderList"
import { AnimatePresence, motion } from "framer-motion"
import DetailOrder from "./orderManagement/DetailOrder"
import OrderFeatures from "./orderManagement/OrderFeatures"
import useDebounce from "@/customHook/useDeboune"

const AdminOrderManagement = () => {
	const [searchOrder, setSearchOrder] = useState("")

	const [orderList, setOrderList] = useState([
		{
			customerInfor: {
				user_id: "001",
				name: "Cao Hoài Sang",
				email: "Sang@gmail.com",
				phone: "0944552050",
				password:
					"$2a$11$/VyLbThx9mdMq1AXmqhSpuDQcEQOn0Q3IcQH04mfksGgbBE4MgBsS",
				role: "1",
				create_at: "2023-11-04T05:35:56",
			},
			orderInfor: {
				orderId: "11e77c53-c765-4c13-88a5-a5d8e4ef1d2f",
				userId: "001",
				createOrderAt: "2023-11-13T12:57:56",
				name: "CAO HOAI SANG",
				email: "sangfc347@gmail.com",
				phone: "0944552050",
				address: "Kí túc xá khu B, ĐHQG",
				state: "pending",
				note: "Che tên sản phẩm",
				total: 17000000,
				discount: "2",
				deliveryFee: 0,
			},
			discountInfor: {
				discountId: "2",
				discountCode: "FALL20",
				discountAmount: 20,
				discountDateFrom: "2022-09-01T07:00:00",
				discountDateTo: "2022-10-01T06:59:59",
			},
		},
	])

	const orderSearchId = useDebounce(searchOrder, 500)

	useEffect(() => {
		handleSearch()
	}, [orderSearchId])

	const [trigger, setTrigger] = useState(false)

	const getAllOrder = async () => {
		const result = await handleOrder.getAllOrder()
		if (Array.isArray(result)) setOrderList(result)
	}

	const handleSearch = async () => {
		if (
			orderSearchId == "" ||
			orderSearchId == null ||
			orderSearchId == undefined
		) {
			getAllOrder()
			return
		}
		const response = await handleOrder.getOrderById(
			orderSearchId
		)
		if (Array.isArray(response)) setOrderList(response)
		else alert("order không tồn tại")
	}

	useEffect(() => {
		getAllOrder()
	}, [trigger])

	const [currentOrderClick, setCurrentOrderClick] = useState(
		{}
	)

	useEffect(() => {}, [currentOrderClick])

	return (
		<div className='mx-auto mt-10 container'>
			<OrderFeatures
				searchOrder={searchOrder}
				setSearchOrder={setSearchOrder}
				handleSearch={handleSearch}
			/>

			<div>
				<OrderRenderList
					orderList={orderList}
					setOrderList={setOrderList}
					currentOrderClick={currentOrderClick}
					setCurrentOrderClick={setCurrentOrderClick}
				/>
			</div>

			<AnimatePresence>
				{currentOrderClick?.orderInfor?.orderId && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						whileInView={{
							opacity: 1,
							height: "auto",
						}}
						exit={{ opacity: 0, height: 0 }}
						className='fixed inset-0 bg-white origin-top'
					>
						<DetailOrder
							currentOrderClick={currentOrderClick}
							setCurrentOrderClick={setCurrentOrderClick}
							setTrigger={setTrigger}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default AdminOrderManagement
