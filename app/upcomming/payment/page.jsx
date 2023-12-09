"use client"

import { convertToVND } from "@/utils/until"
import { useRouter } from "next/navigation"
import { CiHome } from "react-icons/ci"

const Page = ({ searchParams }) => {
	console.log(searchParams)
	const router = useRouter()
	return (
		<div className='w-full min-h-[100vh] flex flex-col text-center p-16 items-center bg-black'>
			<h1 className='text-5xl text-white/60 font-bold'>
				ID đơn hàng:{" "}
				<span className='bg-blue-600/20 text-white px-2'>
					{searchParams.id}
				</span>
			</h1>
			<h1 className='text-5xl mt-8 text-white/60 font-bold'>
				Tổng tiền:{" "}
				<span className='bg-blue-500 px-2  text-white'>
					{convertToVND(Number.parseInt(searchParams.amount))}
				</span>
			</h1>
			<h1 className='text-4xl font-[400] mt-8 max-w-[450px] text-white/80'>
				Vui lòng quét mã dưới đây để tiến hành thanh toán.{" "}
				<span className='text-blue-300/95 font-[600]'>
					Nhân viên sẽ liện hệ
				</span>{" "}
				với khách hàng từ{" "}
				<span className='font-bold'>30 phút đến 1h</span> sau
				khi nhận được khoản tiền thanh toán. Cảm ơn quý khách
			</h1>

			<img
				className='rounded-2xl mt-10'
				src={`https://img.vietqr.io/image/BIDV-31410004548493-compact2.png?amount=${searchParams.amount}&addInfo=ma don hang ${searchParams.id}`}
				width={250}
				height={250}
			/>
		</div>
	)
}

export default Page
