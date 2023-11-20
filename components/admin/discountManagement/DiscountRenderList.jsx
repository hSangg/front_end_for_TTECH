import { convertDate } from "@/components/UserOrder"
import { motion } from "framer-motion"

const DiscountRenderList = ({
	discountList = [
		{
			discountId: "1",
			discountCode: "SUMMER10",
			discountAmount: 10,
			discountDateFrom: "2022-06-01T07:00:00",
			discountDateTo: "2022-07-01T06:59:59",
		},
		{
			discountId: "2",
			discountCode: "FALL20",
			discountAmount: 20,
			discountDateFrom: "2022-09-01T07:00:00",
			discountDateTo: "2022-10-01T06:59:59",
		},
		{
			discountId: "3",
			discountCode: "WINTER30",
			discountAmount: 30,
			discountDateFrom: "2022-12-01T07:00:00",
			discountDateTo: "2023-01-01T06:59:59",
		},
		{
			discountId: "4",
			discountCode: "SPRING15",
			discountAmount: 15,
			discountDateFrom: "2023-03-01T07:00:00",
			discountDateTo: "2023-04-01T06:59:59",
		},
		{
			discountId: "5",
			discountCode: "SALE25",
			discountAmount: 25,
			discountDateFrom: "2022-01-01T07:00:00",
			discountDateTo: "2022-02-01T06:59:59",
		},
	],
	setDiscountList,
}) => {
	return (
		<table className='w-full border-spacing-1 border-separate mt-10 table-auto text-xl bg-white relative'>
			<thead class=' text-black uppercase sticky top-2'>
				<tr>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Id
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Mã giảm giá
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						% giảm giá
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Hạn giảm từ
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Hạn giảm đến
					</th>
				</tr>
			</thead>
			<tbody>
				{discountList?.map((x, i) => (
					<tr key={i}>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.discountId}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.discountCode}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.discountAmount}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertDate(x.discountDateFrom)}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertDate(x.discountDateTo)}
						</th>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default DiscountRenderList
