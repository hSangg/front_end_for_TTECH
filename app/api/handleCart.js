import { headers } from "@/next.config"
import { axiosClient } from "./axiosClient"

export const handleCart = {
	getCountProductOnCart: async (user_id, token) =>
		await axiosClient.post(
			"/cart/GetUserTotalProduct",
			user_id,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		),

	GetCartProduct: async (user_id, token) =>
		await axiosClient.post("/cart/GetCartProduct", user_id, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}),

	AddToCart: async (data, token) =>
		await axiosClient.post("/cart/AddToCart", data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}),

	UpdateQuantity: async (data, token) => {
		console.log(data)
		await axiosClient.put("/cart/UpdateQuantity", data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
	},
	EmptyCartUser: async (userId, token) =>
		await axiosClient.delete(
			"/Cart/EmptyCart?user_id=" + userId,
			{ headers: { Authorization: `Bearer ${token}` } }
		),

}
