import { axiosClient } from "./axiosClient"

export const handleDiscount = {
	getAllDiscount: async () =>
		await axiosClient.get("/Discount"),
}
