import { data } from "autoprefixer"
import { axiosClient } from "./axiosClient"

export const handleCategory = {
	getAllCategories: async () =>
		await axiosClient.get("/Category"),
	getCategoryById: async (id) =>
		await axiosClient.get("/Category/" + id),
	updateCategory: async (data, token) =>
		await axiosClient.put(
			`/Category/${data.categoryId}`, data.categoryName, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
	addCategory: async (data, token) =>
		await axiosClient.post("/Category", data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
	deleteCategory: async (id, token) =>
		await axiosClient.delete(`/Category/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
}
