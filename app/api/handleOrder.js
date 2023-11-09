import { BASE_URL } from "@/constants/constant"
import { axiosClient } from "./axiosClient"

export const handleOrder = {
	getOrderByUserId: (userId) => {},
	addNewOrder: async (data, token) =>
		await axiosClient.post("/Order/AddNewOrder", data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
}
