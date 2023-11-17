import { axiosClient } from "./axiosClient"

export const handleUser = {
	getAllUser: async () =>
		await axiosClient.get("/User/GetAllUser"),
	forgetPassword: async (email) =>
		await axiosClient.post("/User/ForgetPassword", email, {
			headers: { "Content-Type": "application/json" },
		}),
}
