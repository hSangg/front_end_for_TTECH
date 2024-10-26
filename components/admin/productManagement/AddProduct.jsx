"use client"
import { handleProduct } from "@/app/api/handleProduct"
import { handleProductCategory } from "@/app/api/handleProductCategory"
import CircleLoader from "@/components/uncategory/CircleLoader"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
	CiExport,
	CiImageOn,
	CiMinimize1,
} from "react-icons/ci"
import { v4 as uuidv4 } from "uuid"

const AddProduct = ({
	show,
	setShow,
	setList,
	setTrigger,
	supplier,
	setSupplier,
	category,
	setCategory,
}) => {
	const [data, setData] = useState({
		quantityPr: "",
		nameSerial: "",
		detail: "",
		namePr: "",
		supplierId: "",
		price: "",
		guaranteePeriod: "",
		categoryId: "",
	})

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState({})
	const [fileImage, setFileImage] = useState([])
	const [imageListDisplay, setImageListDisplay] = useState(
		[]
	)

	const addNewProduct = async (e) => {
		if (isErrorForm(error)) {
			alert("Error")
			return
		}
		try {
			const productId = uuidv4()
			const imageList = [...fileImage]

			const productDetail = {
				productId: productId,
				namePr: data.namePr,
				nameSerial: data.nameSerial,
				detail: data.detail,
				price: Number.parseInt(data.price),
				quantityPr: Number.parseInt(data.quantityPr),
				guaranteePeriod: Number.parseInt(data.guaranteePeriod),
				supplierId: data.supplierId,
			}

			const productCategory = [
				{
					productId: productId,
					categoryId: data.categoryId,
				},
			]

			const formData = new FormData()

			for (let i = 0; i < imageList.length; i++) {
				formData.append(
					"formFileCollection",
					imageList[i],
					imageList[i].name
				)
			}

			await handleProduct.addNewProduct(productDetail)
			await handleProduct.addImage(formData, productId)
			await handleProductCategory.addNewProductCategory(
				productCategory
			)

			setTrigger((pre) => !pre)

			setData({
				quantityPr: "",
				nameSerial: "",
				detail: "",
				namePr: "",
				supplierId: "",
				price: "",
				guaranteePeriod: "",
			})
			setFileImage([])
			setImageListDisplay([])
			setShow(false)
		} catch (error) {}
	}

	const handleProductValueChange = (e) => {
		const { value, id } = e.target

		if (
			id === "namePr" ||
			id === "price" ||
			id === "nameSerial" ||
			id === "detail" ||
			id === "guaranteePeriod" ||
			id === "quantityPr" ||
			id === "supplierId" ||
			id === "categoryId"
		) {
			if (
				id === "price" ||
				id === "guaranteePeriod" ||
				id === "quantityPr"
			) {
				if (isNaN(value)) {
					setError((pre) => ({
						...pre,
						[id]: "Vui lòng nhập một số",
					}))
				} else {
					setError((pre) => ({ ...pre, [id]: "" }))
				}
			}
			setData((pre) => {
				const preData = { ...pre }
				preData[id] = value
				return preData
			})
		}
	}

	const isErrorForm = (error = { price: "" }) => {
		return Object.values(error).some((x) => x != "")
	}

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === "Escape") {
				setShow(false)
			}
		}

		window.addEventListener("keydown", handleKeyPress)

		return () => {
			window.removeEventListener("keydown", handleKeyPress)
		}
	}, [])

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					exit={{ scale: 0.2, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					initial={{ scale: 0.2, opacity: 0 }}
					className='fixed inset-0 z-40 origin-top overflow-y-scroll bg-white'
				>
					<div className='absolute inset-x-0 flex top-0 bottom-0 z-[41]'>
						<div
							onClick={() => setShow(false)}
							className='absolute top-10 right-10 z-[42]'
						>
							<CiMinimize1
								size={25}
								className='bg-gradient-to-t from-blue-400 to-blue-700/70 text-white p-2 rounded-xl'
							/>
						</div>
						<div className='grow-[1] m-4 '>
							<h1 className='text-3xl bg-blue-500/30 rounded-2xl inline-block p-2 mb-10 font-[600]'>
								Hình ảnh sản phẩm
							</h1>

							<form className='bg-blue-500 w-1/2 mx-auto relative rounded-2xl h-[30px]'>
								<div className='absolute inset-0 z-0 flex items-center text-white justify-center gap-2'>
									<CiImageOn size={25} color='white' />{" "}
									<h1 className='text-2xl'>Thêm ảnh sản phẩm</h1>
								</div>

								<input
									onChange={async (e) => {
										setLoading(true)
										const files = e.target.files
										setFileImage(files)

										// Promisify the FileReader operation
										const readImageFile = (file) => {
											return new Promise((resolve, reject) => {
												const reader = new FileReader()

												reader.onload = () => {
													const imageUrl = reader.result
													resolve(imageUrl)
												}

												reader.onerror = reject
												reader.readAsDataURL(file)
											})
										}

										// Process each file using Promise.all
										try {
											const imageDataUrls = await Promise.all(
												Array.from(files).map((file) =>
													readImageFile(file)
												)
											)

											setImageListDisplay(imageDataUrls)
											setLoading(false)
										} catch (error) {
											console.error(error)
										}
									}}
									required
									type='file'
									multiple
									className='absolute inset-0 opacity-0 z-[1]'
								/>
							</form>

							{Array.isArray(imageListDisplay) && (
								<div className='flex flex-col items-center justify-center'>
									{imageListDisplay?.map((x, i) => (
										<div
											key={i}
											className='w-[200px] flex items-center justify-center h-[200px]'
										>
											{loading ? (
												<CircleLoader />
											) : (
												<img
													src={x}
													key={i}
													className='w-full h-full object-cover rounded-3xl'
												/>
											)}
										</div>
									))}
								</div>
							)}
						</div>
						<div className='grow-[2] shrink-0 m-4'>
							<h1 className='text-3xl font-[600] bg-blue-500/30 rounded-2xl mb-10 inline-block p-2'>
								Chi tiết sản phẩm
							</h1>

							<form
								onSubmit={(e) => e.preventDefault()}
								className='text-[2rem] flex flex-col gap-2 w-full '
							>
								{[
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
											<label className='min-w-[170px] text-black/50'>
												{x.name}
											</label>
											<motion.input
												placeholder={x.name}
												required
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
										placeholder='Mô tả sản phẩm'
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
												placeholder={x.name}
												required
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
										<option>Chọn doanh mục</option>
										{category.map((x, i) => (
											<option key={i} value={x.categoryId}>
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
										<option>Chọn nhà cung cấp</option>
										{supplier.map((x, i) => (
											<option key={i} value={x.supplierId}>
												{x.supplierName}
											</option>
										))}
									</select>
								</motion.div>

								<button
									onClick={addNewProduct}
									className='bg-blue-600/80 w-1/4 mt-10 text-white font-bold text-3xl rounded-3xl py-3'
								>
									Hoàn tất
								</button>
							</form>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default AddProduct
