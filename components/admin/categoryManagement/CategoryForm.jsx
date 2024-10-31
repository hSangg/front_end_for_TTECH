import { handleCategory } from "@/app/api/handleCategory"
import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"

const CategoryForm = ({
	currentCategoryClicked = {
		category_id: "0PbC1aL2mN3oPqRs",
		category_name: "Điện thoại di động",
	},
	setCurrentCategoryClicked,
	mode,
	setMode,
	triggerGetData,
	setTriggerGetData,
}) => {

	const {token} = UserAuth()

	const handleSubmit = async (e) => {
		if (mode === "add") {
			const newCategory = {
				categoryId: uuidv4(),
				categoryName: currentCategoryClicked.categoryName,
			}
			const res = await handleCategory.addCategory(newCategory, token)
		} else {
			const updatedCategory = {
				categoryId: currentCategoryClicked.categoryId,
				categoryName: currentCategoryClicked.categoryName,
			}
			const res = await handleCategory.updateCategory(
				updatedCategory,
				token
			)
		}

		// clear
		setCurrentCategoryClicked({
			categoryName: "",
			categoryId: "",
		})
		setTriggerGetData((pre) => !pre)
	}

	const handleDelete = async (e) => {
		const isSure = prompt("Nhập vào '1' để xóa")
		if (isSure == "1") {
			await handleCategory.deleteCategory(
				currentCategoryClicked.categoryId,
				token
			)

			setCurrentCategoryClicked({
				categoryName: "",
				categoryId: "",
			})
			alert("deleted")
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
						// clear input
						setCurrentCategoryClicked({
							categoryName: "",
							categoryId: "",
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
					Mã danh mục
				</h2>
				<input
					value={currentCategoryClicked?.categoryId}
					className='outline-none border border-black/50 text-black/50 p-4 rounded-2xl w-full text-2xl font-[500] mb-4'
					placeholder='Mã danh mục'
				/>

				<h2 className={`text-xl mb-1`}>Tên danh mục</h2>
				<input
					onChange={(e) =>
						setCurrentCategoryClicked((pre) => ({
							...pre,
							categoryName: e.target.value,
						}))
					}
					value={currentCategoryClicked?.categoryName}
					className='outline-none border border-black/50 p-4 rounded-2xl w-full text-2xl font-[500]'
					placeholder='Nhập tên danh mục'
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

export default CategoryForm

// mode = [add, edit]
