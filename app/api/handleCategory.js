import { BASE_URL } from "@/constants/constant"
import { axiosClient } from "./axiosClient"

export const handleCategory = {
	getAllCategories: async () =>
		await axiosClient.get(BASE_URL + "/Category"),
}
