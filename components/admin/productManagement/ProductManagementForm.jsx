"use client"
import { handleProduct } from "@/app/api/handleProduct"
import { handleProductCategory } from "@/app/api/handleProductCategory"
import Notification from "@/components/Notification"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { CiCircleRemove } from "react-icons/ci"
import { IoCopyOutline } from "react-icons/io5"

const ProductManagementForm = ({
	currentProductChoose,
	setTrigger,
	setCurrentProductChoose,
	category,
	setCategory,
	supplier,
	setSupplier,
	allImageOfProduct,
	setAllImageOfProduct,
	triggerImage,
	setTriggerImage,
}) => {
	const [imageFile, setImageFile] = useState([])
	const [error, setError] = useState({})
	const [imageListDisplay, setImageListDisplay] = useState(
		[]
	)
	const [data, setData] = useState({
		productId: currentProductChoose?.productId,
		namePr: currentProductChoose?.namePr,
		nameSerial: currentProductChoose?.nameSerial,
		detail: currentProductChoose?.detail,
		price: currentProductChoose?.price,
		quantityPr: currentProductChoose?.quantityPr,
		guaranteePeriod: currentProductChoose?.guaranteePeriod,
		supplierId: currentProductChoose?.supplier?.supplierId,
		categoryId:
			currentProductChoose?.category?.[0]?.categoryId,
	})
	const [notifications, setNotifications] = useState(false)

	const handleProductValueChange = (e) => {
		const { value, id } = e.target
		console.log("data: ", data)
		console.log("id: ", id)
		console.log("value: ", value)
		if (
			id === "namePr" ||
			id === "price" ||
			id === "nameSerial" ||
			id === "detail" ||
			id === "guaranteePeriod" ||
			id === "quantityPr" ||
			id === "categoryId"
		) {
			if (
				id === "price" ||
				id === "guaranteePeriod" ||
				id === "quantityPr"
			) {
				console.log("run")
				if (isNaN(value)) {
					setError((pre) => ({
						...pre,
						[id]: "Vui lòng nhập một số",
					}))
				} else {
					setError((pre) => ({ ...pre, [id]: "" }))
				}
			}
			setData((pre) => ({ ...pre, [id]: value }))
			console.log("error: ", error)
		}
	}

	useEffect(() => {
		console.log("data in use effect run:", data)
		setError({})
		setData({
			productId: currentProductChoose?.productId,
			namePr: currentProductChoose?.namePr,
			nameSerial: currentProductChoose?.nameSerial,
			detail: currentProductChoose?.detail,
			price: currentProductChoose?.price,
			quantityPr: currentProductChoose?.quantityPr,
			guaranteePeriod: currentProductChoose?.guaranteePeriod,
			supplierId: currentProductChoose?.supplier?.supplierId,
			categoryId:
				currentProductChoose?.category?.[0]?.categoryId,
		})
	}, [currentProductChoose])

	const handleRemoveImageOld = async (x) => {
		try {
			const sure = prompt("are you sure? type 1")
			if (sure === "1") {
				await handleProduct.deleteImageOfProduct(
					x.productId,
					x.file_name
				)
				setTriggerImage((pre) => !pre)
			}
		} catch (error) {}
	}
	const handleRemoveImageNew = async (x) => {
		// remove this file from file List

		setImageListDisplay((pre) => {
			const newList = [...pre].filter((z) => z.name != x.name)
			return newList
		})

		// remove this file from image file List
		setImageFile((pre) => {
			const newList = [...pre].filter((y) => y.name !== x.name)

			return newList
		})
	}

	const handleSubmit = async () => {
		const productId = currentProductChoose.product.productId
		const imageList = [...imageFile]

		if (imageList.length !== 0) {
			console.log("udpate image")
			const formData = new FormData()

			for (let i = 0; i < imageList.length; i++) {
				formData.append(
					"formFileCollection",
					imageList[i],
					imageList[i].name
				)
			}
			await handleProduct.addImage(formData, productId)
			setImageListDisplay([])
			setImageFile([])
			setTriggerImage((pre) => !pre)
		}

		const price = Number.parseInt(data.price)
		const quantityPr = Number.parseInt(data.quantityPr)
		const guaranteePeriod = Number.parseInt(
			data.guaranteePeriod
		)

		const updatedProduct = {
			productId: productId,
			namePr: data.namePr,
			nameSerial: data.nameSerial,
			detail: data.detail,
			price,
			quantityPr,
			guaranteePeriod,
			supplierId: data.supplierId,
		}

		const running = Object.values(error).every(
			(x) => x === ""
		)

		if (running) {
			const resultUpdateCategory =
				await handleProductCategory.updateProductCategory(
					{
						productId: productId,
						categoryId:
							currentProductChoose?.category?.[0]?.categoryId,
					},
					data.categoryId
				)
			const resultUpdateProduct =
				await handleProduct.updateProduct(updatedProduct)

			setNotifications(true)
			setTrigger((pre) => !pre)
		} else alert("Lỗi cập nhật sản phẩm")
	}

	return (
		<motion.div
			key={currentProductChoose?.productId}
			initial={{ opacity: 0, x: 10 }}
			whileInView={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 10 }}
			className='flex-1 flex gap-3 w-full'
		>
			{notifications && (
				<Notification
					notification={{
						text: "Chỉnh sửa thành công",
						style: "success",
					}}
					setNotifications={setNotifications}
					notifications={notifications}
				/>
			)}
			<div className='flex flex-col gap-2 justify-start items-center  mr-4 mb-4'>
				{allImageOfProduct?.map((x, i) => (
					<div
						key={i}
						className='w-44 h-44 bg-blue-300 rounded-[10px] shrink-0 relative'
					>
						<div
							onClick={() => {
								handleRemoveImageOld(x)
							}}
							className='absolute cursor-pointer bg-red-500/70 w-6 h-6 text-xl leading-8 right-0 top-0 text-white flex items-center justify-center rounded-full'
						>
							x
						</div>
						<img
							src={x?.image_href}
							className='w-full h-full object-cover rounded-[10px]'
						/>
					</div>
				))}

				{imageListDisplay?.map((x, i) => (
					<div
						key={i}
						className='w-44 h-44 bg-blue-300 rounded-[10px] shrink-0 relative'
					>
						<div
							onClick={() => handleRemoveImageNew(x)}
							className='absolute cursor-pointer bg-red-500/70 w-6 h-6 text-xl leading-8 right-0 top-0 text-white flex items-center justify-center rounded-full'
						>
							x
						</div>
						<img
							src={x.dataUrl}
							className='w-full h-full object-cover rounded-[10px]'
						/>
					</div>
				))}

				<div className='text-center relative bg-blue-500 text-white text-[1.4rem] font-[600] py-2 px-3 rounded-2xl'>
					<input
						multiple
						onChange={async (e) => {
							const files = e.target.files
							setImageFile(files)

							// Promisify the FileReader operation
							const readImageFile = (file) => {
								return new Promise((resolve, reject) => {
									const reader = new FileReader()

									reader.onload = () => {
										const imageData = {
											name: file.name,
											dataUrl: reader.result,
										}
										resolve(imageData)
									}

									reader.onerror = reject
									reader.readAsDataURL(file)
								})
							}

							try {
								const imageDataList = await Promise.all(
									Array.from(files).map((file) =>
										readImageFile(file)
									)
								)

								setImageListDisplay(imageDataList)
							} catch (error) {
								console.error(error)
							}
						}}
						type='file'
						className='inset-0 opacity-0 absolute'
					/>
					<h1 className=''>Thêm ảnh</h1>
				</div>
			</div>

			<form
				onSubmit={(e) => e.preventDefault()}
				className='text-[2rem] flex flex-col gap-2 w-full'
			>
				{[
					{
						key: "productId",
						name: "Mã sản phẩm",
					},
					{
						key: "namePr",
						name: "Tên sản phẩm",
					},
					{
						key: "price",
						name: "Giá sản phẩm",
					},
					{
						key: "nameSerial",
						name: "Seri",
					},
				].map((x, i) => (
					<div key={i}>
						<motion.div className='flex gap-2 w-full'>
							<motion.label
								whileTap={{ color: "red" }}
								className='min-w-[170px] flex items-center gap-2 text-black/50'
							>
								{x.name}
								{x.key === "productId" && (
									<IoCopyOutline
										size={20}
										onClick={() => {
											navigator.clipboard.writeText(
												currentProductChoose?.productId
											)
										}}
									/>
								)}
							</motion.label>
							<motion.input
								disabled={x.key === "productId"}
								id={x.key}
								value={data[x.key]}
								onChange={handleProductValueChange}
								className='outline-none border-b font-semibold border-black/20 w-full'
							/>
						</motion.div>
						<h2 className='text-red-500 text-2xl'>
							{error[x.key]}
						</h2>
					</div>
				))}
				<motion.div className='flex gap-2 w-full'>
					<label className='min-w-[170px] text-black/50'>
						Mô tả sản phẩm
					</label>
					<motion.textarea
						id={"detail"}
						value={data.detail}
						onChange={handleProductValueChange}
						className='outline-none border-b font-semibold border-black/20 w-full'
					/>
				</motion.div>

				{[
					{
						key: "guaranteePeriod",
						name: "Bảo hành (tháng)",
					},
					{
						key: "quantityPr",
						name: "Còn lại (sản phẩm)",
					},
				].map((x, i) => (
					<div key={i}>
						<motion.div className='flex gap-2 w-full'>
							<label className='min-w-[170px] text-black/50'>
								{x.name}
							</label>
							<motion.input
								id={x.key}
								value={data[x.key]}
								onChange={handleProductValueChange}
								className='outline-none border-b border-black/20 font-semibold w-full'
							/>
						</motion.div>
						<h2 className='text-red-500 text-2xl'>
							{error[x.key]}
						</h2>
					</div>
				))}

				<motion.div className='flex gap-2 w-full'>
					<label className='min-w-[170px] text-black/50'>
						Doanh mục
					</label>
					<select
						id='categoryId'
						onChange={handleProductValueChange}
					>
						{category.map((x, i) => (
							<option
								selected={
									currentProductChoose?.category?.[0]?.categoryId ===
									x.categoryId
								}
								key={i}
								value={x.categoryId}
							>
								{x.categoryName}
							</option>
						))}
					</select>
				</motion.div>

				<motion.div className='flex gap-2 w-full'>
					<label className='min-w-[170px] text-black/50'>
						Nhà cung cấp
					</label>
					<select
						id='supplierId'
						onChange={handleProductValueChange}
					>
						{supplier.map((x, i) => (
							<option
								selected={
									currentProductChoose?.supplier?.supplierId ===
									x.supplierId
								}
								key={i}
								value={x.supplierId}
							>
								{x.supplierName}
							</option>
						))}
					</select>
				</motion.div>
				<button
					onClick={handleSubmit}
					className='bg-blue-500 mt-8 rounded-full text-white font-[600] p-1'
				>
					Hoàn tất chỉnh sửa
				</button>
			</form>
		</motion.div>
	)
}

export default ProductManagementForm
