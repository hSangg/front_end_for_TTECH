import { handleCategory } from "@/app/api/handleCategory"
import caterogyDataExample from "../../data"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const ProductListCategoryOnPhone = ({
	setShowCategory,
}) => {
	const [categoryList, setCategoryList] = useState([])
	const router = useRouter()

	const getAllCategories = async () => {
		const result = await handleCategory.getAllCategories()
		setCategoryList(result || caterogyDataExample)
	}

	useEffect(() => {
		getAllCategories()
	}, [])

	return (
		<div className='flex flex-col ml-3 text-[1.8rem] leading-[3.7rem] w-full'>
			<motion.div
				initial={{ color: "black" }}
				whileTap={{ color: "red" }}
				onClick={() => {
					router.push(
						"/products?IsDescending=false&pageNumber=1&pageSize=12"
					)
					setShowCategory(false)
				}}
				className='text-[2.5rem] font-[600] tracking-[0.007em] capitalize cursor-pointer'
			>
				All
			</motion.div>

			{categoryList.map((x, i) => (
				<motion.div
					initial={{ color: "black" }}
					whileTap={{ color: "red" }}
					onClick={() => {
						router.push(
							"/products?" +
								"categoryId=" +
								x.categoryId +
								"&IsDescending=true&pageNumber=1&pageSize=12"
						)
						setShowCategory(false)
					}}
					key={i}
					className='text-[2.5rem] font-[600] tracking-[0.007em] capitalize cursor-pointer'
				>
					{x.categoryName}
				</motion.div>
			))}
		</div>
	)
}

export default ProductListCategoryOnPhone
