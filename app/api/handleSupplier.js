import { axiosClient } from "./axiosClient"

export const handleSupplier = {
	getAllSupplier: async (token) =>
		await axiosClient.get("/Supplier", {
			headers: { Authorization: `Bearer ${token}` },
		}),
	addSupplier: async (data, token) =>
		axiosClient.post("/Supplier", data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
	updateSupplier: async (data, token) =>
		await axiosClient.put(`/Supplier?id=${data.supplierId}`, data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
	deleteSupplier: async (id, token) =>
		await axiosClient.delete(
			"/Supplier?id=" + id, {
				headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			}
		}),
}
