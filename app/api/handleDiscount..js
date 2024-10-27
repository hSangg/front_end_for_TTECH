import { data } from "autoprefixer"
import { axiosClient } from "./axiosClient"

export const handleDiscount = {
	getCurrentDiscount: async (currentDate) =>
		await axiosClient.get(
			"/Discount/GetCurrentDiscount?currentDate=" + currentDate
		),
	getAllDiscount: async () =>
		await axiosClient.get("/Discount"),
	addDiscount: async (discount, token) =>
		await axiosClient.post("/Discount", discount, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
	updateDiscount: async (discount, token) =>
		axiosClient.put("/Discount", discount, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
	deleteDiscount: async (id, token) =>
		await axiosClient.delete(`/Discount?discountId=${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
}
