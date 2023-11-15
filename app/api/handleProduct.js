import { axiosClient } from "./axiosClient"

export const handleProduct = {
	addNewProduct: async (data) =>
		await axiosClient.post("/Product/AddProduct", data),
	addImage: async (data, product_id) =>
		await axiosClient.post(
			"/Product/AddMoreImageForProduct?product_id=" +
				product_id,
			data,
			{
				headers: {
					Accept: "application/json",
					"Accept-Language": "en-US,en;q=0.8",
					"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
				},
			}
		),
	getProduct: async (filter) =>
		await axiosClient.post("/Product/GetProduct", filter),
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
	getProductById: async (id) =>
		await axiosClient.get("/Product/getProductById?id=" + id),

	getAllImageOfProduct: async (id) =>
		await axiosClient.get(
			"/Product/GetAllImageOfProduct?product_id=" + id
		),
	updateProduct: async (data) =>
		await axiosClient.put("/Product/UpdateProduct", data, {
			headers: {
				"Content-Type": "application/json",
			},
		}),
	deleteProduct: async (product_id) =>
		await axiosClient.delete(
			"/Product?product_id=" + product_id
		),
	deleteImageOfProduct: async (product_id, file_name) =>
		await axiosClient.delete(
			"/Product/DeleteImageOfProduct?product_id=" +
				product_id +
				"&file_name=" +
				file_name
		),
}
