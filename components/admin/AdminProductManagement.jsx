"use client"

import { useState } from "react"
import ProductAction from "./productManagement/ProductAction"
import ProductManagementForm from "./productManagement/ProductManagementForm"
import ProductRenderList from "./productManagement/ProductRenderList"
import useDebounce from "@/customHook/useDeboune"
import { useEffect } from "react"
import { handleProduct } from "@/app/api/handleProduct"
import { handleCategory } from "@/app/api/handleCategory"
import { handleSupplier } from "@/app/api/handleSupplier"
import { UserAuth } from "@/context/AuthContext"

const AdminProductManagement = () => {
	const { token, user, logout } = UserAuth()

	const [currentProductChoose, setCurrentProductChoose] =
		useState({})
	const [filter, setFilter] = useState({
		pageNumber: 1,
		pageSize: 999_999,
	})
	const [triggerImage, setTriggerImage] = useState(false)
	const [trigger, setTrigger] = useState(false)
	const [list, setList] = useState([])
	const [supplier, setSupplier] = useState([{}])
	const [category, setCategory] = useState([{}])
	const [allImageOfProduct, setAllImageOfProduct] = useState(
		[]
	)

	const getAllImage = async () => {
		try {
			const result = await handleProduct.getAllImageOfProduct(
				currentProductChoose?.product?.productId
			)
			setAllImageOfProduct(result)
		} catch (error) {}
	}

	useEffect(() => {
		getAllImage()
	}, [currentProductChoose, triggerImage])

	const getData = async () => {
		try {
			const supplier = await handleSupplier.getAllSupplier(
				token
			)
			const category = await handleCategory.getAllCategories()

			setSupplier(supplier)
			setCategory(category)
		} catch (error) {}
	}

	useEffect(() => {
		getData()
	}, [])

	const filterDebounce = useDebounce(filter, 1000)

	const getProduct = async () => {
		try {
			const { products } = await handleProduct.getProduct(
				filterDebounce
			)

			setList(products)
		} catch (error) {}
	}

	useEffect(() => {
		getProduct()
	}, [filterDebounce, trigger])

	return (
		<>
			<div className='container mx-auto mt-14 p-6 bg-white rounded-3xl'>
				<ProductAction
					setList={setList}
					filter={filter}
					setFilter={setFilter}
					setTrigger={setTrigger}
					category={category}
					setCategory={setCategory}
					supplier={supplier}
					setSupplier={setSupplier}
					currentProductChoose={currentProductChoose}
					setCurrentProductChoose={setCurrentProductChoose}
				/>
				<div className='flex gap-3 mt-4 flex-1'>
					<ProductRenderList
						filter={filterDebounce}
						list={list}
						setList={setList}
						setCurrentProductChoose={setCurrentProductChoose}
						currentProductChoose={currentProductChoose}
					/>
					<div className=''>
						<ProductManagementForm
							setTrigger={setTrigger}
							setCurrentProductChoose={setCurrentProductChoose}
							currentProductChoose={currentProductChoose}
							category={category}
							setCategory={setCategory}
							supplier={supplier}
							setSupplier={setSupplier}
							allImageOfProduct={allImageOfProduct}
							setAllImageOfProduct={setAllImageOfProduct}
							triggerImage={triggerImage}
							setTriggerImage={setTriggerImage}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminProductManagement
