import { headers } from "@/next.config"
import { axiosClient } from "./axiosClient"

export const handleCart = {
	getCountProductOnCart: async (user_id, token) =>
		await axiosClient.post(
			"/Cart/GetUserTotalProduct",
			user_id,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		),

	GetCartProduct: async (token) =>
		await axiosClient.post("/Cart/GetCartProduct", {}, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}),

	AddToCart: async (data, token) =>
		await axiosClient.post("/Cart/AddToCart", data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}),

	UpdateQuantity: async (data, token) =>
		await axiosClient.put("/Cart/UpdateQuantity", data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}),
	EmptyCartUser: async (userId, token) =>
		await axiosClient.delete(
			"/Cart/EmptyCart",
			{ headers: { Authorization: `Bearer ${token}` } }
		),
}
