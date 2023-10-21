const { default: axios } = require("axios")

export const axiosClient = axios.create()

axiosClient.interceptors.request.use(
	async (config) => {
		;(config.headers = {
			"Content-Type": "application/json",
			...config.headers,
		}),
			config.data

		return config
	}
)

axiosClient.interceptors.response.use(
	(response) => {
		if (response.status === 200 && response.data) {
			return response.data
		}
		return response
	},
	(error) => {
		console.log(error.message)
	}
)
