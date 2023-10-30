import { BASE_URL } from "@/constants/constant"
import { axiosClient } from "./axiosClient"

export const handleAuth = {
	register: async (formData) =>
		await axiosClient.post(
			BASE_URL + "/User/register",
			formData
		),
	login: async (formData) =>
		await axiosClient.post(
			BASE_URL + "/User/login",
			formData
		),
}
