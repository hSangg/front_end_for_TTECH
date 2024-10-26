import { handleDetailOrder } from "@/app/api/handleDetailOrder"
import { handleOrder } from "@/app/api/handleOrder"
import Notification from "@/components/uncategory/Notification"
import { useEffect, useState } from "react"
import { CiMinimize1 } from "react-icons/ci"

const DetailOrder = ({
	currentOrderClick,
	setCurrentOrderClick,
	setTrigger,
}) => {
	const [data, setData] = useState({
		state: currentOrderClick?.orderInfor?.state,
	})
	const [notifications, setNotifications] = useState(false)

	const [orderDetailList, setOrderDetailList] = useState([])

	const handleValueChange = (e) => {
		const { id, value } = e.target
		if (id === "state") {
			setData((pre) => ({ ...pre, [id]: value }))
		}
	}

	const getOrderDetailByOrderId = async () => {
		const orderId = currentOrderClick.orderInfor.orderId
		const result =
			await handleDetailOrder.getOrderDetailByOrderId(orderId)
		setOrderDetailList(result)
	}

	useEffect(() => {
		getOrderDetailByOrderId()
	}, [])

	const handleSubmit = async () => {
		const order_id = currentOrderClick.orderInfor.orderId
		const state = data.state
		await handleOrder.updateStateOrder(order_id, state)
		setCurrentOrderClick({})
		setTrigger((pre) => !pre)
	}

	return (
		<div className='container mx-auto'>
			{notifications && (
				<Notification
					notifications={notifications}
					setNotifications={setNotifications}
					notification={{
						text: "Cập nhật thành công",
						style: "success",
					}}
				/>
			)}
			<div className='flex justify-between mt-10'>
				<h1 className='text-4xl capitalize font-[700]'>
					Chi tiết hóa đơn
				</h1>

				<div
					className='mt-10 mr-10 p-2 bg-gradient-to-bl from-blue-400 rounded-xl to-blue-700'
					onClick={() => setCurrentOrderClick({})}
				>
					<CiMinimize1 size={18} className='text-white' />
				</div>
			</div>
			<div className='flex mt-5 h-[500px]'>
				<form
					onSubmit={(e) => e.preventDefault()}
					className='grow-[2] shrink-0 text-2xl'
				>
					<select
						id='state'
						onChange={handleValueChange}
						className='w-full'
					>
						{state.map((x, i) => (
							<option
								value={x}
								key={i}
								selected={
									x.toLowerCase() ===
									currentOrderClick.orderInfor.state.toLowerCase()
								}
							>
								{x}
							</option>
						))}
					</select>
					<button
						className='bg-blue-500 w-full mt-2 text-white py-1 px-2 rounded-3xl'
						onClick={handleSubmit}
					>
						Xác nhận
					</button>
				</form>
				<div className='grow-[5] text-2xl shrink-0 flex flex-wrap'>
					{orderDetailList.map((x, i) => (
						<div
							className='flex flex-col items-center gap-4'
							key={i}
						>
							<div className='w-[200px] h-[200px]'>
								<img
									src={x.image.image_href}
									className='w-full h-full object-cover'
								/>
							</div>
							<h1 className='w-[150px] overflow-ellipsis whitespace-nowrap text-center'>
								{x.product.name_pr.slice(0, 20)}...
							</h1>
							<h2 className='px-2 text-white bg-blue-500 font-bold'>
								{x.quantity}
							</h2>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default DetailOrder

const state = [
	"pending",
	"completed",
	"cancelled",
	"banked",
]
