"use client"

import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import {
	AnimatePresence,
	motion,
} from "framer-motion"
import useDebounce from "../../customHook/useDeboune"
import { useEffect } from "react"
import ProductManagementForm from "./productManagement/ProductManagementForm"
const AdminProductManagement = () => {
	const [
		currentProductChoose,
		setCurrentProductChoose,
	] = useState(productList[0])
	const [search, setSearch] = useState("")
	const [sortValue, setSortvalue] =
		useState("name")

	const [list, setList] = useState(productListTest)
	const searchValue = useDebounce(search, 500)
	useEffect(() => {
		const newList = productList.filter((x) =>
			x.name
				.toLocaleLowerCase()
				.includes(searchValue.toLocaleLowerCase())
		)
		setList(newList)
	}, [searchValue])

	const handleSortChange = (e) => {
		const { value } = e.target
		if (value === "name") {
			const sortedList = [...list].sort((a, b) => {
				const nameA = a.name.toUpperCase()
				const nameB = b.name.toUpperCase()
				if (nameA < nameB) {
					return -1
				}
				if (nameA > nameB) {
					return 1
				}
				return 0
			})
			setList(sortedList)
		}

		if (value === "price") {
			const sortedList = [...list].sort(
				(a, b) => a.price - b.price
			)
			setList(sortedList)
		}
	}

	return (
		<>
			<div className='container mx-auto mt-14 p-6 bg-white rounded-3xl'>
				<div className='flex  justify-between'>
					<div className='flex gap-3 items-center'>
						<motion.form
							onSubmit={(e) => {
								e.preventDefault()
							}}
							className='flex items-center'
						>
							<CiSearch size={20} />
							<motion.input
								onChange={(e) => {
									setSearch(e.target.value)
								}}
								value={search}
								whileFocus={{
									borderBottom: "1px solid black",
								}}
								placeholder='Search here'
								className='outline-none text-[1.3rem] border-none px-2 '
							/>
						</motion.form>
						<div>
							<select
								className='text-[1.4rem] outline-none border-none'
								onChange={handleSortChange}
							>
								<option value='name'>name</option>
								<option value='price'>price</option>
							</select>
						</div>
					</div>
					<div className='flex gap-2'>
						<button className='bg-gradient-to-tl font-[400] py-3 text-[1.4rem] from-blue-300 to-blue-600 text-white leading-6 px-5 rounded-xl'>
							Thêm
						</button>
						<button className='border font-[400] py-3 text-[1.4rem] border-red-500 text-red-500 leading-6 px-5 rounded-xl'>
							Xóa
						</button>
					</div>
				</div>
				<div className='flex gap-3 mt-4'>
					<ul className='w-[25%] customScrollBar divide-y py-2 flex flex-col gap-2 h-[350px] overflow-y-scroll p-2'>
						{list.map((x, i) => (
							<motion.li
								key={i}
								variants={variants}
								initial='initial'
								animate={
									currentProductChoose?.id === x.id
										? "animate"
										: "initial"
								}
								onClick={() => setCurrentProductChoose(x)}
								className='flex items-start gap-2 p-2 cursor-pointer rounded-2xl'
							>
								<div className='w-12 h-12 shrink-0 rounded-xl bg-sky-300'></div>
								<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
									{x.name}
								</div>
							</motion.li>
						))}
					</ul>
					<div className='w-1/2'>
						<ProductManagementForm
							setCurrentProductChoose={
								setCurrentProductChoose
							}
							currentProductChoose={currentProductChoose}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminProductManagement

export const productListTest = [
	"Iphone 15",
	"MacBook Pro",
	"Dell XPS 13",
	"Asus ROG Strix G15",
	"Samsung Galaxy Tab S8 Ultra",
	"Sony PlayStation 5",
	"iPhone 15 Pro Max",
	"iPad Air 5",
	"Apple Watch Series 8",
	"Canon EOS R5",
	"Samsung Neo QLED 8K QN900B",
	"Samsung Family Hub",
	"LG InstaView",
	"Dyson Omni-glide",
	"AEG 9000 Series",
	"Epson EcoTank ET-4750",
	"HP LaserJet M283fdw",
	"Brother MFC-L2750DW",
	"Canon imageCLASS MF644Cdw",
	"Sharp MX-M453dn",
	"BenQ MX532P",
	"Fanuc Robocut 1000iA",
	"Stratasys J750",
	"Kuka KR QUANTEC KR 210 R2100",
	"Epson SureColor T12000",
	"Ophir 6000",
	"PlayStation VR 2",
	"Meta Quest 2",
	"Apple AirPods Max",
	"Samsung The Freestyle",
	"LG OLED C2",
	"GE Healthcare Revolution CT750",
	"Siemens Healthineers Magnetom Free.max",
	"Philips Respironics DreamStation",
	"Medtronic MiniMed 770G",
	"Roche cobas 8800",
]

const productList = productListTest.map(
	(product, i) => {
		const price =
			Math.floor(Math.random() * (5000 - 500 + 1)) +
			500

		return {
			id: i,
			name: product,
			price: price,
		}
	}
)

const variants = {
	initial: {
		opacity: 0.6,
		backgroundColor: "white",
	},
	animate: {
		opacity: 1,
		backgroundColor: "#e0f2fe",
		transition: {
			delay: 0.2,
		},
	},
}
