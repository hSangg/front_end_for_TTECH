"use client"
import { useSearchParams } from "next/navigation"
import { handlePost } from "../api/handlePost"
import { useEffect, useState } from "react"
import ProductItem from "@/components/ProductItem"

export default function Page() {
	const params = useSearchParams()
	useEffect(() => {
		console.log(productListExample)
	}, [])
	const [list, setList] = useState(
		productListExample
	)

	return (
		<div className='mt-20 flex justify-center'>
			<div className='grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
				{productListExample.map((x, i) => (
					<ProductItem
						key={i}
						product_id={x.product_id}
						category_id={x.category_id}
						name_pr={x.name_pr}
						name_serial={x.name_serial}
						detail={x.detail}
						price={x.price}
						quantity_pr={x.quantity_pr}
						img_href={x.img_src}
						guarantee_period={x.guarantee_period}
					/>
				))}
			</div>
		</div>
	)
}

export async function getAllPost() {
	return await handlePost.getPosts("/posts")
}
const productExample = {
	product_id: 1,
	category_id: 1,
	name_pr: "I-False XX",
	name_serial: "A12345",
	detail:
		"I-False XX is a powerful smartphone with a extremely incredibly utterly Super Retina display, Face ID, and A11 Bionic chip.",
	price: 999,
	quantity_pr: 50,
	img_src:
		"/images/product_images/oldpc-preview.png",
	guarantee_period: 12,
}

const productListExample = new Array(100)
	.fill(null)
	.map(() => ({ ...productExample }))
