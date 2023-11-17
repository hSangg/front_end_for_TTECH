"use client"
import { handleProduct } from "@/app/api/handleProduct"
import { handleProductCategory } from "@/app/api/handleProductCategory"
import Notification from "@/components/Notification"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { CiCircleRemove } from "react-icons/ci"
import { IoCopyOutline } from "react-icons/io5"

const ProductManagementForm = ({
	currentProductChoose = {
		product: {
			product_id: "PRD005",
			name_pr: "Apple MacBook Air",
			name_serial: "MA007",
			detail:
				"13.3-inch Retina display, Apple M1 chip, 8GB RAM, 256GB SSD, macOS",
			price: 17000000,
			quantity_pr: 25,
			guarantee_period: 12,
		},
		category: {
			category_id: "qRsTuV4wXyZ56789",
			category_name: "Laptop",
		},
		supplier: {
			supplier_id: "SUPLLIER002",
			supplier_name: "Apple",
		},
		image: {
			image_id: "PRD005001",
			product_id: "PRD005",
			image_href:
				"https://localhost:7067/Upload/product/PRD005/PRD005_1.jpg",
		},
	},
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
	const [imageListDisplay, setImageListDisplay] = useState(
		[]
	)
	const [notifications, setNotifications] = useState(false)

	const handleProductValueChange = (e) => {
		const { value, id } = e.target

		if (
			id === "name_pr" ||
			id === "price" ||
			id === "name_serial" ||
			id === "detail" ||
			id === "guarantee_period" ||
			id === "quantity_pr" ||
			id === "category_id"
		) {
			setCurrentProductChoose((pre) => {
				const preProduct = { ...pre }
				preProduct.product[id] = value
				return preProduct
			})
		}
	}

	const handleRemoveImageOld = async (x) => {
		try {
			const sure = prompt("are you sure? type 1")
			if (sure === "1") {
				//delete
				console.log(
					"delete image :",
					x.file_name,
					" of product whose id: ",
					x.product_id
				)

				await handleProduct.deleteImageOfProduct(
					x.product_id,
					x.file_name
				)
				setTriggerImage((pre) => !pre)
			}
		} catch (error) { }
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
		const product_id = currentProductChoose.product.product_id

		// handle add new image

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
			await handleProduct.addImage(formData, product_id)
			setImageListDisplay([])
			setImageFile([])
			setTriggerImage((pre) => !pre)
		}

		const updatedProduct = {
			product_id: product_id,
			name_pr: currentProductChoose.product.name_pr,
			name_serial: currentProductChoose.product.name_serial,
			detail: currentProductChoose.product.detail,
			price: currentProductChoose.product.price,
			quantity_pr: currentProductChoose.product.quantity_pr,
			guarantee_period:
				currentProductChoose.product.guarantee_period,
			supplier_id: currentProductChoose.supplier.supplier_id,
		}

		const updatedProductCategory = {
			productId: product_id,
			categoryId: currentProductChoose.category.category_id,
		}

		await handleProductCategory.updateProductCategory(
			updatedProductCategory
		)
		await handleProduct.updateProduct(updatedProduct)

		setNotifications(true)
	}

	return (
		<motion.div
			key={currentProductChoose?.product_id}
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
						key: "product_id",
						name: "Mã sản phẩm",
					},
					{
						key: "name_pr",
						name: "Tên sản phẩm",
					},
					{
						key: "price",
						name: "Giá sản phẩm",
					},
					{
						key: "name_serial",
						name: "Seri",
					},
				].map((x, i) => (
					<motion.div key={i} className='flex gap-2 w-full'>
						<motion.label
							whileTap={{ color: "red" }}
							className='min-w-[170px] flex items-center gap-2 text-black/50'
						>
							{x.name}
							{x.key === "product_id" && (
								<IoCopyOutline
									size={20}
									onClick={() => {
										navigator.clipboard.writeText(
											currentProductChoose?.product_id
										)
									}}
								/>
							)}
						</motion.label>
						<motion.input
							disabled={x.key === "product_id"}
							id={x.key}
							value={currentProductChoose?.[x.key]}
							onChange={handleProductValueChange}
							className='outline-none border-b font-semibold border-black/20 w-full'
						/>
					</motion.div>
				))}
				<motion.div className='flex gap-2 w-full'>
					<label className='min-w-[170px] text-black/50'>
						Mô tả sản phẩm
					</label>
					<motion.textarea
						id={"detail"}
						value={currentProductChoose?.detail}
						onChange={handleProductValueChange}
						className='outline-none border-b font-semibold border-black/20 w-full'
					/>
				</motion.div>

				{[
					{
						key: "guarantee_period",
						name: "Bảo hành (tháng)",
					},
					{
						key: "quantity_pr",
						name: "Còn lại (sản phẩm)",
					},
				].map((x, i) => (
					<motion.div key={i} className='flex gap-2 w-full'>
						<label className='min-w-[170px] text-black/50'>
							{x.name}
						</label>
						<motion.input
							id={x.key}
							value={currentProductChoose?.[x.key]}
							onChange={handleProductValueChange}
							className='outline-none border-b border-black/20 font-semibold w-full'
						/>
					</motion.div>
				))}

				<motion.div className='flex gap-2 w-full'>
					<label className='min-w-[170px] text-black/50'>
						Doanh mục
					</label>
					<select
						id='category_id'
						onChange={handleProductValueChange}
					>
						{category.map((x, i) => (
							<option
								selected=
								{
									currentProductChoose?.categories[0]?.category_id ===
									x.category_id
								}
								key={i}
								value={x.category_id}
							>
								{x.category_name}
							</option>
						))}
					</select>
				</motion.div>

				<motion.div className='flex gap-2 w-full'>
					<label className='min-w-[170px] text-black/50'>
						Nhà cung cấp
					</label>
					<select
						id='supplier_id'
						onChange={handleProductValueChange}
					>
						{supplier?.map((x, i) => (
							<option
								selected={
									currentProductChoose?.suppliers?.supplier_id ===
									x.supplier_id
								}
								key={i}
								value={x.supplier_id}
							>
								{x.supplier_name}
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
