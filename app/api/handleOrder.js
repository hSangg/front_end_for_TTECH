import { BASE_URL } from "@/constants/constant"
import { axiosClient } from "./axiosClient"

export const handleOrder = {
	getOrderByUserId: async (userId, token) =>
		await axiosClient.post(
			"/Order/GetOrderByUserId",
			userId,
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
}
