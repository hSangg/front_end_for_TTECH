import { axiosClient } from "./axiosClient"

export const handleSupplier = {
	getAllSupplier: async () =>
		await axiosClient.get("/Supplier"),
}
