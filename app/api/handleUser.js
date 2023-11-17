import { axiosClient } from "./axiosClient"

export const handleUser = {
	getAllUser: async () =>
		await axiosClient.get("/User/GetAllUser"),
}
