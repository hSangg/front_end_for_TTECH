"use client"
import { useSearchParams } from "next/navigation"
import { handlePost } from "../api/handlePost"
import { useEffect, useState } from "react"

export default function Page() {
	const params = useSearchParams()
	const [list, setList] = useState([])
	console.log(list)
	const isPromotion = params.get("promotion")
		? true
		: false
	const caterogy = params.get("category")

	const get = async () => {
		const data = await getAllPost()
		setList(data)
	}

	useEffect(() => {
		get()
	}, [])

	return (
		<div className='container mt-20 mx-auto'>
			<h1 className='text-center font-bold text-[5rem]'>
				Product Route
			</h1>
			{caterogy && (
				<button className='bg-gradient-to-tl text-2xl text-white from-blue-300 to-blue-700 p-3 rounded-2xl'>
					{caterogy}
				</button>
			)}

			{isPromotion && (
				<button className='bg-gradient-to-bl text-2xl text-white from-red-300 to-red-700 p-3 rounded-2xl'>
					Khuyến mại cực sốc
				</button>
			)}
		</div>
	)
}

export async function getAllPost() {
	return await handlePost.getPosts("/posts")
}
