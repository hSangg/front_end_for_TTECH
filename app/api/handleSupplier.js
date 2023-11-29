import { axiosClient } from "./axiosClient"

export const handleSupplier = {
	getAllSupplier: async () =>
		await axiosClient.get("/Supplier"),
	addSupplier: async (data) =>
		axiosClient.post("/Supplier", data, {
			headers: { "Content-Type": "application/json" },
		}),
	updateSupplier: async (data) =>
		await axiosClient.put("/Supplier/Update", data, {
			headers: { "Content-Type": "application/json" },
		}),
	deleteSupplier: async (id) =>
		await axiosClient.delete(
			"/Supplier/DeleteSupplier?id=" + id
		),
}
