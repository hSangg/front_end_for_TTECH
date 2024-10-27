import { handleSupplier } from "@/app/api/handleSupplier"
import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"

const SupplierForm = ({
	currentSupplierClicked,
	setCurrentSupplierClicked,
	mode,
	setMode,
	triggerGetData,
	setTriggerGetData,
}) => {

	const {token} = UserAuth()
	
	const handleSubmit = async (e) => {
		if (mode === "add") {
			const newSupplier = {
				supplierId: uuidv4(),
				supplierName: currentSupplierClicked.supplierName,
			}
			const res = await handleSupplier.addSupplier(newSupplier, token)
		} else {
			const updatedSupplier = {
				supplierId: currentSupplierClicked.supplierId,
				supplierName: currentSupplierClicked.supplierName,
			}
			const res = await handleSupplier.updateSupplier(
				updatedSupplier,
				token
			)
		}
		setTriggerGetData((pre) => !pre)
	}

	const handleDelete = async (e) => {
		const isSure = prompt("Nhập vào '1' để xóa")
		if (isSure == "1") {
			await handleSupplier.deleteSupplier(
				currentSupplierClicked.supplierId,
				token
			)

			alert("deleted")
			setCurrentSupplierClicked({
				supplierName: "",
				supplierId: "",
			})
			setTriggerGetData((pre) => !pre)
		}
	}
	return (
		<div className=''>
			<div className='flex gap-2 justify-end'>
				<motion.div
					whileHover={{ scale: 1.1 }}
					onClick={() => {
						setMode("add")
						// clearinput
						setCurrentSupplierClicked({
							supplierName: "",
							supplierId: "",
						})
					}}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-blue-500 border-b-blue-500 bg-white flex-1 shrink-0 text-center'
				>
					THÊM
				</motion.div>
				<motion.div
					onClick={handleDelete}
					whileHover={{ scale: 1.1 }}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-red-500 border-b-red-500 bg-white flex-1 shrink-0 text-center'
				>
					XÓA
				</motion.div>
			</div>
			<div className='p-10'>
				<h2 className={`text-xl mb-1 text-black/50`}>
					Mã nhà cung cấp
				</h2>
				<input
					value={currentSupplierClicked?.supplierId}
					className='outline-none border border-black/50 text-black/50 p-4 rounded-2xl w-full text-2xl font-[500] mb-4'
					placeholder='Mã danh mục'
				/>

				<h2 className={`text-xl mb-1`}>Tên nhà cung cấp</h2>
				<input
					onChange={(e) =>
						setCurrentSupplierClicked((pre) => ({
							...pre,
							supplierName: e.target.value,
						}))
					}
					value={currentSupplierClicked?.supplierName}
					className='outline-none border border-black/50 p-4 rounded-2xl w-full text-2xl font-[500]'
					placeholder='Nhập tên nhà cung cấp'
				/>
				<button
					onClick={handleSubmit}
					className='bg-blue-500 w-full p-4 mt-4 text-2xl font-semibold text-white rounded-2xl'
				>
					{mode === "add" ? "THÊM" : "SỬA"}
				</button>
			</div>
		</div>
	)
}

export default SupplierForm

// mode = [add, edit]
