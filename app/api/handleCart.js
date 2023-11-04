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

	GetCartProduct: async (user_id, token) =>
		await axiosClient.post(
			"/Cart/GetCartProduct",
			user_id,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		),
}
