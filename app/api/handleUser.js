import { axiosClient } from "./axiosClient"

export const handleUser = {
	getAllUser: async (token) =>
		await axiosClient.get("/User/GetAllUser", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}),
	forgetPassword: async (email, token) =>
		await axiosClient.post("/User/ForgetPassword", email, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}),
	updateUser: async (updatedUser, token) =>
		await axiosClient.put(
			"/User/UpdateUserInfor",
			updatedUser,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		),
	getUserById: async (user_id) =>
		await axiosClient.get(
			"/User/GetUserById",{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		),
}
