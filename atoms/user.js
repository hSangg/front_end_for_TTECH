import { atom } from "recoil"

export const userState = atom({
	key: "userState",
	default:
		JSON.parse(
			window.localStorage.getItem("user")
		) || {},
})
