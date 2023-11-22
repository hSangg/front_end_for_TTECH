"use client"

import FilterProduct from "@/components/FilterProduct"
import PaginationControls from "@/components/PaginationControls"
import ProductItem from "@/components/ProductItem"
import { useEffect, useState } from "react"
import { handleProduct } from "../api/handleProduct"
import { useRouter } from "next/navigation"

export default function Page({ searchParams }) {
	console.log("searchParams: ", searchParams)

	const [filter, setFilter] = useState({
		...searchParams,
		IsDescending: !!searchParams.IsDescending || false,
		pageNumber: Number.parseInt(searchParams.pageNumber) || 1,
		pageSize: 12,
	})

	const [loading, setLoading] = useState(true)

	const router = useRouter()
	const [currentPage, setCurrentPage] = useState(
		searchParams.pageNumber
	)
	const [totalPages, setTotalPages] = useState(1)
	const [list, setList] = useState([
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
	])

	const getProduct = async () => {
		const newFilter = {
			...searchParams,
			IsDescending:
				searchParams.IsDescending === "true" ? true : false,
		}
		const result = await handleProduct.getProduct(newFilter)
		const products = result?.products
		const totalPages = result?.totalPages
		const pageNumber = result?.pageNumber
		setCurrentPage(pageNumber)
		setTotalPages(totalPages)
		setList(products)

		setLoading(false)
	}

	useEffect(() => {
		const queryString = Object.entries(filter)
			.map(
				([key, value]) => `${key}=${encodeURIComponent(value)}`
			)
			.join("&")
		router.push("/products?" + queryString)
	}, [filter])

	useEffect(() => {
		getProduct()
	}, [filter, searchParams])

	return (
		<div className='mt-20' suppressHydrationWarning={true}>
			<FilterProduct
				onFilterChange={setFilter}
				filter={filter}
			/>
			<div
				onClick={() => console.log(filter)}
				className='flex justify-center'
			>
				<div className='grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
					{list?.map((x, i) => (
						<ProductItem
							loading={loading}
							key={i}
							product_id={x?.product?.product_id}
							category_id={x?.product?.category_id}
							name_pr={x?.product?.name_pr}
							name_serial={x?.product?.name_serial}
							detail={x?.product?.detail}
							price={x?.product?.price || 0}
							quantity_pr={x?.product?.quantity_pr}
							img_href={x?.image?.image_href || undefined}
							guarantee_period={x?.products?.guarantee_period}
						/>
					))}
				</div>
			</div>
			<PaginationControls
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(pageNumber) => {
					const categoryId = searchParams.categoryId

					if (categoryId) {
						setFilter({
							...filter,
							pageNumber,
							categoryId,
						})
					} else {
						setFilter({
							...filter,
							pageNumber,
						})
					}
				}}
			/>
		</div>
	)
}
