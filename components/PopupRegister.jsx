"use client"
import useDebounce from "../customHook/useDeboune"
import { isValidEmail } from "../utils/until"
import {
	AnimatePresence,
	motion,
} from "framer-motion"
import { useEffect, useState } from "react"
import { CiGlobe } from "react-icons/ci"
const PopupRegister = () => {
	const [showPopup, setShowPopup] = useState(false)

	const [data, setData] = useState({
		["username"]: "",
		email: "",
		password: "",
		phone: "",
		["confirm password"]: "",
	})

	const [verifyInput, setVerifyInput] = useState({
		["username"]: "",
		email: "",
		password: "",
		phone: "",
		["confirm password"]: "",
	})

	const [isValidFormData, setIsValidFormData] =
		useState(() => {
			return Object.values(verifyInput).every(
				(x) => x === ""
			)
		})

	useEffect(() => {
		setIsValidFormData(
			Object.values(verifyInput).every(
				(x) => x === ""
			)
		)
	}, [verifyInput, data])

	const handleInputChange = (e) => {
		const { value, id } = e.target

		let errorMessage = ""
		if (!value.trim()) {
			errorMessage = `Vui lòng nhập ${
				id == "username"
					? "tên"
					: id == "email"
					? "email"
					: id == "password"
					? "mật khẩu"
					: "mật khẩu xác thực"
			}`
		} else if (
			id === "confirm password" &&
			data.password.trim() !== value.trim()
		) {
			errorMessage = "Mật khẩu không trùng khớp"
		} else if (
			id === "email" &&
			!isValidEmail(value)
		)
			errorMessage = "Sai định dạng email"

		setData((pre) => ({ ...pre, [id]: value }))
		setVerifyInput((pre) => ({
			...pre,
			[id]: errorMessage,
		}))
	}

	const debouncedData = useDebounce(data, 1000)

	return (
		<>
			<motion.div className='mt-3 mb-2 text-[1.4rem] z-50 font-[600] flex items-center gap-1 '>
				<CiGlobe size={20} />
				<span>Chưa có tài khoản? </span>
				<motion.span
					onClick={() => setShowPopup(true)}
					whileTap={{ color: "red" }}
					className='text-blue-600 cursor-pointer underline ml-2'
				>
					Tạo tài khoản mới
				</motion.span>
			</motion.div>

			<AnimatePresence>
				{showPopup && (
					<motion.div className='fixed z-40 inset-0 '>
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							onClick={() => setShowPopup(false)}
							className='absolute z-30 inset-0 bg-black/50'
						></motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='absolute w-[400px] bg-white z-50
              left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl '
						>
							<div className='p-10'>
								<div
									onClick={() => {
										console.log(data)
									}}
									className='text-[3rem] mb-6 font-[600]'
								>
									Tạo tài khoản mới
								</div>
								<form className='flex flex-col gap-2'>
									{[
										"username",
										"email",
										"password",
										"phone",
										"confirm password",
									].map((x, i) => (
										<>
											<motion.input
												id={x}
												required
												key={i}
												whileFocus={{
													scale: 1.05,
													borderColor: "#3b82f6",
												}}
												value={data[x]}
												onChange={(e) => handleInputChange(e)}
												placeholder={x}
												className='w-full border-b-2 outline-none text-[2.5rem] font-[600] px-2'
											/>
											<h2 className='text-red-500 text-[1.2rem] '>
												{verifyInput[x]}
											</h2>
										</>
									))}

									<motion.button
										disabled={!isValidFormData}
										animate={{
											backgroundColor: isValidFormData
												? "#0284c7"
												: "#78716c",
										}}
										className='w-full py-2 font-[700] text-white rounded-2xl text-[1.6rem] text-center'
									>
										Đăng kí
									</motion.button>
								</form>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default PopupRegister