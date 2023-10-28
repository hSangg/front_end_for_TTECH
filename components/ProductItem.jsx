import { motion } from "framer-motion"
import Image from "next/image"

const ProductItem = ({
	product_id,
	category_id,
	name_pr,
	name_serial,
	detail,
	price,
	quantity_pr,
	img_href,
	guarantee_period,
}) => {
	return (
		<div className='flex flex-col items-center mb-10'>
			<div className='relative w-[200px] h-[200px]'>
				<Image
					src={img_href}
					fill
					alt=''
					style={{
						objectFit: "contain",
						borderRadius: "20px",
					}}
				/>
			</div>
			<h1 className='text-[1.8rem] font-[700] mt-5'>
				{name_pr}
			</h1>

			<h2 className='text-[1.3rem] text-center w-2/3 display-2-line font-[500] mt-5'>
				{detail}
			</h2>

			<h2 className=' text-[2rem] font-bold mt-5'>
				${price}
			</h2>

			<motion.button
				whileHover={{
					scale: [1, 1.1],
				}}
				className=' transition-all
			hover:bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600
			
			
			px-2 bg-blue-500 text-white font-[600] text-[1.6rem] mt-1'
			>
				Buy now
			</motion.button>
		</div>
	)
}

export default ProductItem
