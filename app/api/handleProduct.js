import { axiosClient } from "./axiosClient"

export const handleProduct = {
	getProduct: async (filter) =>
		await axiosClient.post("/product/getProduct", filter),

	getProductBySearchParam: async (searchParam) =>
		await axiosClient.post(
			"/Product/GetProductBySearchQuery",
			searchParam,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		),
	getProducctById: async (id) =>
		await axiosClient.post("/Product/getProductById", id, {
			headers: {
				"Content-Type": "application/json",
			},
		}),

	getAllImageOfProduct: async (id) =>
		await axiosClient.post(
			"/Product/GetAllImageOfProduct",
			id,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		),
}
