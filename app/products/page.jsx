"use client"

import FilterProduct from "@/components/product/FilterProduct"
import PaginationControls from "@/components/uncategory/PaginationControls"
import ProductItem from "@/components/product/ProductItem"
import { useEffect, useState } from "react"
import { handleProduct } from "../api/handleProduct"
import { useRouter } from "next/navigation"

export default function Page({ searchParams }) {
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

	useEffect(() => {
		const categoryId = searchParams.categoryId
		const pageNumber = parseInt(searchParams?.pageNumber)

		if (categoryId && pageNumber) {
			setFilter((pre) => ({ ...pre, categoryId, pageNumber }))
		} else {
			const { categoryId, ...rest } = filter
			setFilter({ ...rest, pageNumber })
		}
	}, [searchParams.categoryId, searchParams.pageNumber])

	const getProduct = async () => {
		const newFilter = {
			...searchParams,
			IsDescending:
				searchParams.IsDescending === "true" ? true : false,
			pageNumber: filter.pageNumber || 1,
			pageSize: 12
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
		router.push("/products?" + queryString, undefined, {
			shallow: true,
		})
	}, [filter])

	useEffect(() => {
		getProduct()
	}, [filter])

	return (
		<div className='mt-20' suppressHydrationWarning={true}>
			<FilterProduct
				onFilterChange={setFilter}
				filter={filter}
			/>
			<div className='flex justify-center'>
				<div className='grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
					{list?.map((x, i) => (
						<ProductItem
							loading={loading}
							key={i}
							product_id={x?.productId || ""}
							category_id={x?.categoryId || ""}
							name_pr={x?.namePr || ""}
							name_serial={x?.nameSerial || ""}
							detail={x?.detail || ""}
							price={x?.price || 0}
							quantity_pr={x?.quantityPr || ""}
							img_href={x?.images || []}
							guarantee_period={x?.guaranteePeriod || ""}
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
						const { categoryId, ...rest } = filter
						setFilter({
							...rest,
							pageNumber,
						})
					}
				}}
			/>
		</div>
	)
}
