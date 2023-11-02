import { axiosClient } from "./axiosClient"

export const handleProduct = {
	getProduct: async (filter) =>
		await axiosClient.post(
			"/Product/GetProduct",
			filter
		),
}
