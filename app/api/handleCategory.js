import { axiosClient } from "./axiosClient"

export const handleCategory = {
	getAllCategories: async () =>
		await axiosClient.get("/Category"),
	getCategoryById: async (id) =>
		await axiosClient.get("/Category/" + id),
}
