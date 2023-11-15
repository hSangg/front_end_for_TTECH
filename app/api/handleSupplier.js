import { axiosClient } from "./axiosClient"

export const handleSupplier = {
	getAllSupplier: async (token) => (
		console.log(token),
		await axiosClient.get("/supplier/"),
		{ Headers: { Authorization: `Bearer ${token}` } }
	)

}
