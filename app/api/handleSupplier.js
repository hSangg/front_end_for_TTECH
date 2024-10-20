import { axiosClient } from "./axiosClient"

export const handleSupplier = {
	getAllSupplier: async (token) =>
		await axiosClient.get("/Supplier", {
			headers: { Authorization: `Bearer ${token}` },
		}),
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
