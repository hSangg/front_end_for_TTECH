"use client"

import {
	useRouter,
	useSearchParams,
} from "next/navigation"

const PaginationControls = ({
	onPageChange,
	totalPages,
	currentPage,
}) => {
	const router = useRouter()

	return (
		<div className='flex justify-center gap-2'>
			<div
				className='bg-blue-500 text-white p-1'
				onClick={() => {
					onPageChange(currentPage - 1)
				}}
			>
				prev page
			</div>

			<div>
				{currentPage} / {totalPages}
			</div>

			<div
				className='bg-blue-500 text-white p-1'
				onClick={() => {
					onPageChange(currentPage + 1)
				}}
			>
				next page
			</div>
		</div>
	)
}

export default PaginationControls
