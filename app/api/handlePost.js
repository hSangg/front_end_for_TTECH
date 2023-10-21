import { BASE_URL } from "@/constants/constant"

const { axiosClient } = require("./axiosClient")

export const handlePost = {
	getPosts: async (url) =>
		axiosClient.get(BASE_URL + url),
}
