import { data } from "autoprefixer"
import { axiosClient } from "./axiosClient"

export const handleDiscount = {
	getCurrentDiscount: async (currentDate) =>
		await axiosClient.get(
			"/Discount/GetCurrentDiscount?currentDate=" + currentDate
		),
	getAllDiscount: async () =>
		await axiosClient.get("/Discount"),
	addDiscount: async (discount) =>
		await axiosClient.post("/Discount", discount, {
			headers: { "Content-Type": "application/json" },
		}),
	updateDiscount: async (discount) =>
		axiosClient.put("/Discount", discount, {
			headers: { "Content-Type": "application/json" },
		}),
	deleteDiscount: async (id) =>
		await axiosClient.delete(`/Discount?discountId=${id}`),
}
