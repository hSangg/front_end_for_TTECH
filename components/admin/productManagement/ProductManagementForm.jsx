"use client";
import { handleProduct } from "@/app/api/handleProduct";
import { handleProductCategory } from "@/app/api/handleProductCategory";
import Notification from "@/components/Notification";
import { AnimatePresence, motion } from "framer-motion";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";

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
	const [error, setError] = useState({});
	const [imageListDisplay, setImageListDisplay] = useState([]);
	const [data, setData] = useState({
		productId: currentProductChoose?.productId,
		namePr: currentProductChoose?.namePr,
		nameSerial: currentProductChoose?.nameSerial,
		detail: currentProductChoose?.detail,
		price: currentProductChoose?.price,
		quantityPr: currentProductChoose?.quantityPr,
		guaranteePeriod: currentProductChoose?.guaranteePeriod,
		supplierId: currentProductChoose?.supplierId,
		categoryId: currentProductChoose?.categoryId,
	});
	const [notifications, setNotifications] = useState(false);
	const handleProductValueChange = (e) => {
		const { value, id } = e.target;
		if (["namePr", "price", "nameSerial", "detail", "guaranteePeriod", "quantityPr", "categoryId"].includes(id)) {
			if (["price", "guaranteePeriod", "quantityPr"].includes(id) && isNaN(value)) {
				setError((prev) => ({ ...prev, [id]: "Vui lòng nhập một số" }));
			} else {
				setError((prev) => ({ ...prev, [id]: "" }));
				setData((prev) => ({ ...prev, [id]: value }));
			}
		}
	};

	const handleUploadComplete = (imageData) => {
		const imageUrl = imageData.info
		setImageListDisplay((prev) => [...prev, { url: imageUrl.secure_url, name: imageUrl.original_filename }]);
	};

	const handleRemoveImage = (index, fromInitialImages = false) => {
		if (fromInitialImages) {
			setAllImageOfProduct((prev) => prev.filter((_, i) => i !== index));
		} else {
			setImageListDisplay((prev) => prev.filter((_, i) => i !== index));
		}
	};

	useEffect(() => {
		setError({});
		setData({
			productId: currentProductChoose?.productId,
			namePr: currentProductChoose?.namePr,
			nameSerial: currentProductChoose?.nameSerial,
			detail: currentProductChoose?.detail,
			price: currentProductChoose?.price,
			quantityPr: currentProductChoose?.quantityPr,
			guaranteePeriod: currentProductChoose?.guaranteePeriod,
			supplierId: currentProductChoose?.supplierId,
			categoryId: currentProductChoose?.categoryId,
		});
	}, [currentProductChoose]);

	const handleSubmit = async () => {
		const productId = currentProductChoose.productId;
		const price = Number.parseInt(data.price);
		const quantityPr = Number.parseInt(data.quantityPr);
		const guaranteePeriod = Number.parseInt(data.guaranteePeriod);
		const updatedProduct = {
			productId,
			namePr: data.namePr,
			nameSerial: data.nameSerial,
			detail: data.detail,
			price,
			quantityPr,
			guaranteePeriod,
			SupplierId: data.supplierId,
			CategoryId: data.categoryId
		};
		console.log(imageListDisplay)
		if (Object.values(error).every((x) => x === "")) {
			await handleProduct.updateProduct(updatedProduct);
			const imageUrls = imageListDisplay.map(img => img.url);
			await handleProduct.addImage( imageUrls, updatedProduct.productId);
			setNotifications(true);
			setTrigger((prev) => !prev);
		} else {
			alert("Lỗi cập nhật sản phẩm");
		}
	};

	return (
		<motion.div
			key={currentProductChoose?.productId}
			initial={{ opacity: 0, x: 10 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 10 }}
			className="flex-1 flex gap-3 w-full"
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
			<div className="flex flex-col gap-2 justify-start items-center mr-4 mb-4">
				{allImageOfProduct?.map((x, i) => (
					<div key={i} className="w-44 h-44 bg-blue-300 rounded-[10px] relative">
						<img src={x?.imageHref} className="w-full h-full object-cover rounded-[10px]" />
					</div>
				))}

				{imageListDisplay?.map((image, i) => (
					<div key={i} className="relative w-44 h-44 bg-blue-300 rounded-[10px]">
						<img src={image.url} className="w-full h-full object-cover rounded-[10px]" />
						<IoCloseCircle
							className="absolute top-1 right-1 text-white text-[1.6rem] cursor-pointer"
							onClick={() => handleRemoveImage(i)}
						/>
					</div>
				))}

				<CldUploadWidget uploadPreset={"wdxleeuq"} onSuccess={(result) => handleUploadComplete(result)}>
					{({ open }) => {
						return (
							<button onClick={() => open()} className="text-center bg-blue-500 text-white text-[1.4rem] font-[600] py-2 px-3 rounded-2xl">
								Thêm ảnh
							</button>
						);
					}}
				</CldUploadWidget>
			</div>

			<form onSubmit={(e) => e.preventDefault()} className="text-[2rem] flex flex-col gap-2 w-full">
				{[
					{ key: "productId", name: "Mã sản phẩm", disabled: true },
					{ key: "namePr", name: "Tên sản phẩm" },
					{ key: "price", name: "Giá sản phẩm" },
					{ key: "nameSerial", name: "Seri" },
				].map((field, i) => (
					<div key={i}>
						<div className="flex gap-2 w-full">
							<label className="min-w-[170px] flex items-center gap-2 text-black/50">
								{field.name}
								{field.key === "productId" && (
									<IoCopyOutline
										size={20}
										onClick={() => navigator.clipboard.writeText(currentProductChoose?.productId)}
									/>
								)}
							</label>
							<input
								id={field.key}
								value={data[field.key]}
								onChange={handleProductValueChange}
								disabled={field.disabled}
								className="outline-none border-b font-semibold border-black/20 w-full"
							/>
						</div>
						<h2 className="text-red-500 text-2xl">{error[field.key]}</h2>
					</div>
				))}

				<div className="flex gap-2 w-full">
					<label className="min-w-[170px] text-black/50">Mô tả sản phẩm</label>
					<textarea
						id="detail"
						value={data.detail}
						onChange={handleProductValueChange}
						className="outline-none border-b font-semibold border-black/20 w-full"
					/>
				</div>

				{[
					{ key: "guaranteePeriod", name: "Bảo hành (tháng)" },
					{ key: "quantityPr", name: "Còn lại (sản phẩm)" },
				].map((field, i) => (
					<div key={i}>
						<div className="flex gap-2 w-full">
							<label className="min-w-[170px] text-black/50">{field.name}</label>
							<input
								id={field.key}
								value={data[field.key]}
								onChange={handleProductValueChange}
								className="outline-none border-b border-black/20 font-semibold w-full"
							/>
						</div>
						<h2 className="text-red-500 text-2xl">{error[field.key]}</h2>
					</div>
				))}

				<div className="flex gap-2 w-full">
					<label className="min-w-[170px] text-black/50">Doanh mục</label>
					<select id="categoryId" onChange={handleProductValueChange} value={data.categoryId}>
						{category?.map((cat) => (
							<option key={cat.categoryId} value={cat.categoryId}>
								{cat.categoryName}
							</option>
						))}
					</select>
				</div>

				<div className="flex gap-2 w-full">
					<label className="min-w-[170px] text-black/50">Nhà cung cấp</label>
					<select id="supplierId" onChange={handleProductValueChange} value={data.supplierId}>
						{supplier?.map((sup) => (
							<option key={sup.supplierId} value={sup.supplierId}>
								{sup.supplierName}
							</option>
						))}
					</select>
				</div>

				<button onClick={handleSubmit} className="text-white bg-blue-500 text-[1.4rem] font-semibold py-2 rounded-lg">
					Cập nhật
				</button>
			</form>
		</motion.div>
	);
};

export default ProductManagementForm;
