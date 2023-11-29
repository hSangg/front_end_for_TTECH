import { data } from "autoprefixer"
import { axiosClient } from "./axiosClient"

export const handleCategory = {
	getAllCategories: async () =>
		await axiosClient.get("/Category"),
	getCategoryById: async (id) =>
		await axiosClient.get("/Category/" + id),
	updateCategory: async (id, caterogy_name) =>
		await axiosClient.put(
			`/Category/${id}?updatedCategoryName=${caterogy_name}`
		),
	addCategory: async (data) =>
		await axiosClient.post("/Category", data, {
			headers: { "Content-Type": "application/json" },
		}),
	deleteCategory: async (id) =>
		await axiosClient.delete(`/Category/${id}`),
}
