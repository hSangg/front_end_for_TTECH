"use client"

import FilterProduct from "@/components/FilterProduct"
import PaginationControls from "@/components/PaginationControls"
import ProductItem from "@/components/ProductItem"
import { useEffect, useState } from "react"
import { handleProduct } from "../api/handleProduct"

export default function Page() {
	const [filter, setFilter] = useState({
		pageNumber: 1,
		pageSize: 10,
	})
	const [currentPage, setCurrentPage] = useState(
		filter.pageNumber
	)

	const [totalPages, setTotalPages] = useState(1)

	const [list, setList] = useState([])

	const getProduct = async () => {
		const result = await handleProduct.getProduct(
			filter
		)

		const { products, ...rest } = result

		console.log("rest", rest)
		setCurrentPage(rest.pageNumber)
		setTotalPages(rest.totalPages)
		setList(products)
	}

	useEffect(() => {
		//call api
		console.log(1)

		getProduct()
	}, [filter])

	return (
		<div className='mt-20'>
			<FilterProduct onFilterChange={setFilter} />

			<div className='flex justify-center'>
				<div className='grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
					{list?.map((x, i) => (
						<ProductItem
							key={i}
							product_id={x?.product?.product_id}
							category_id={x?.product?.category_id}
							name_pr={x?.product?.name_pr}
							name_serial={x?.product?.name_serial}
							detail={x?.product?.detail}
							price={x?.product?.price}
							quantity_pr={x?.product?.quantity_pr}
							img_href={
								x?.image?.image_href || undefined
							}
							guarantee_period={
								x?.products?.guarantee_period
							}
						/>
					))}
				</div>
			</div>

			<PaginationControls
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(pageNumber) => {
					setCurrentPage(pageNumber)
					setFilter({ ...filter, pageNumber })
				}}
			/>
		</div>
	)
}
