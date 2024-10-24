import { BASE_URL } from "@/constants/constant"
import { axiosClient } from "./axiosClient"

export const handleOrder = {
	getOrderByUserId: async (userId, token) =>
		await axiosClient.post(
			"/Order/GetOrderByUserId",
			`"${userId}"`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		),
	addNewOrder: async (data, token) =>
		await axiosClient.post("/Order/AddNewOrder", data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
	getAllOrder: async () =>
		await axiosClient.get("/Order/GetAllOrder"),
	updateStateOrder: async (order_id, state) =>
		await axiosClient.put(
			"/Order/UpdateStateOrder?orderId=" +
			order_id +
			"&state=" +
			state
		),
	getExcelFile: async () =>
		await axiosClient.get("/Order/GetExcelFileData"),
	getOrderById: async (id) =>
		await axiosClient.get(
			"/Order/GetOrderById?order_id=" + id
		),
}
