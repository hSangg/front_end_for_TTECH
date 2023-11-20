import { axiosClient } from "./axiosClient"

export const handleProductCategory = {
	addNewProductCategory: async (data) =>
		await axiosClient.post(
			"/ProductCategory/AddNewProductCategory",
			data,
			{ headers: { "Content-Type": "application/json" } }
		),
	updateProductCategory: async (
		oldProductCategory,
		newCategoryId
	) =>
		await axiosClient.put(
			"/ProductCategory/UpdateProductCategory?new_category_id=" +
				newCategoryId,
			oldProductCategory
		),
}
