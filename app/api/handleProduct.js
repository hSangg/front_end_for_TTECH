import { axiosClient } from "./axiosClient"

export const handleProduct = {
	getProduct: async (filter) =>
		await axiosClient.post("/product/getProduct", filter),

	getProductBySearchParam: async (filter) =>
		await axiosClient.post(
			"/product/getProduct",
			filter,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		),
	getProducctById: async (id) =>
		await axiosClient.get("/product/" + id),

	getAllImageOfProduct: async (id) =>
		await axiosClient.get(
			"/product/getImagesByProductId/" + id,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		),
}
