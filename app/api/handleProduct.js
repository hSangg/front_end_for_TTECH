import { axiosClient } from "./axiosClient"

export const handleProduct = {
	addNewProduct: async (data) =>
		await axiosClient.post("/Product", data),
	addImage: async (data, product_id) =>
		await axiosClient.post(`/Product/${product_id}/images`, data, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		}),
	getProduct: async (filter) =>
		await axiosClient.post("/Product/filter", filter),
	getProductById: async (id) =>
		await axiosClient.get("/Product/" + id),

	getAllImageOfProduct: async (id) =>
		await axiosClient.get(`/Product/${id}/images`),
	updateProduct: async (data) =>
		await axiosClient.put("/Product", data, {
			headers: {
				"Content-Type": "application/json",
			},
		}),
	deleteProduct: async (product_id) =>
		await axiosClient.delete("/Product/" + product_id),
	deleteImageOfProduct: async (product_id, file_name) =>
		await axiosClient.delete(`/Product/${product_id}/images`),
}
