"use client"

import { BASE_URL } from "@/constants/constant"
import https from "https"
import { useState } from "react"
import { CiSearch } from "react-icons/ci"
const { default: axios } = require("axios")

const agent = new https.Agent({
	rejectUnauthorized: false,
})
export const axs = axios.create({
	baseURL: BASE_URL,
	httpsAgent: agent,
})

const OrderFeatures = ({
	searchOrder,
	setSearchOrder,
	handleSearch,
}) => {
	const searchOrderChange = (e) => {
		setSearchOrder(e.target.value)
	}

	const handleDownloadExcelFile = async () => {
		try {
			const result = await axs.get("/Order/GetExcelFileData", {
				responseType: "arraybuffer",
			}) // Specify responseType as "arraybuffer"

			const blob = new Blob([result.data], {
				type:
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			})
			const url = URL.createObjectURL(blob)

			let link = document.createElement("a")
			link.href = url
			link.download = "OrderList.xlsx" // Change the file extension to xlsx
			document.body.appendChild(link)
			link.dispatchEvent(
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window,
				})
			)
			link.remove()
			window.URL.revokeObjectURL(link.href)
		} catch (error) {
			console.error("Error downloading file", error)
		}
	}

	return (
		<div className='flex mb-2 text-xl justify-between  text-white font-[600] gap-5'>
			<button
				onClick={handleDownloadExcelFile}
				className='bg-blue-500 px-4 py-2 rounded-lg'
			>
				Xuất Exel
			</button>
			<div className='border border-black/20  bg-white rounded-2xl px-2 flex items-center'>
				<CiSearch size={18} color='black' />
				<input
					onChange={searchOrderChange}
					className='w-[500px] outline-none text-black text-xl px-4 py-2'
					placeholder='Nhập mã đơn hàng'
				/>
			</div>
		</div>
	)
}

export default OrderFeatures
