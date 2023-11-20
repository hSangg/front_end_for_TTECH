"use client"
import { useEffect, useState } from "react"
import DiscountRenderList from "./discountManagement/DiscountRenderList"
import { handleDiscount } from "@/app/api/handleDiscount."

const AdminDiscountManagement = () => {
	const [discountList, setDiscountList] = useState([])

	const getData = async () => {
		const result = await handleDiscount.getAllDiscount()

		if (Array.isArray(result)) setDiscountList(result)
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<div className='mt-10 mx-auto container'>
			<DiscountRenderList
				discountList={discountList}
				setDiscountList={setDiscountList}
			/>
		</div>
	)
}

export default AdminDiscountManagement
