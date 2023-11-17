import { axiosClient } from "./axiosClient"

export const handleDetailOrder = {
	addNewDetailOrder: async (data, token) =>
		await axiosClient.post(
			"/DetailOrder/AddNewDetailOrder",
			data,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		),
	getOrderDetailByOrderId: async (orderId) =>
		axiosClient.get(
			"/DetailOrder/GetOderDetailByOrderId?order_id=" + orderId
		),
}
