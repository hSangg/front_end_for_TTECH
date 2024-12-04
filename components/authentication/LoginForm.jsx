"use client";

import { handleAuth } from "@/app/api/handleAuth"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { UserAuth } from "../../context/AuthContext"
import CircleLoader from "../uncategory/CircleLoader"
import PopupRegister from "./PopupRegister"
import ForgetPassword from "./ForgetPassword"
import { isValidPhoneNumber } from "@/utils/until"

const LoginForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [verifyInput, setVerifyInput] = useState({
		phone: "",
		password: "",
	});
	const [data, setData] = useState({
		phone: "",
		password: "",
	});
	const [attempts, setAttempts] = useState(0);
	const [cooldown, setCooldown] = useState(false);

	const { googleSignIn, setUser, setToken } = UserAuth();

	useEffect(() => {
		let timer;
		if (cooldown) {
			timer = setTimeout(() => {
				setCooldown(false);
				setAttempts(0); // Reset attempts after cooldown
			}, 60000); // 1 minute cooldown
		}
		return () => clearTimeout(timer);
	}, [cooldown]);

	const verify = (id, value) => {
		let errorMessage = "";
		if (!value.trim()) {
			errorMessage = `Please enter ${
				id === "phone" ? "phone number" : "password"
			}`;
		} else if (id === "phone" && !isValidPhoneNumber(value)) {
			errorMessage = "Invalid phone number format";
		}

		setVerifyInput((prev) => ({
			...prev,
			[id]: errorMessage,
		}));

		return errorMessage === "";
	};

	const handleInputChange = (e) => {
		const { value, id } = e.target;
		verify(id, value);
		setData((prev) => ({ ...prev, [id]: value }));
	};

	const handleLogin = async () => {
		if (cooldown) return;

		try {
			const isValid =
				verify("phone", data.phone) && verify("password", data.password);
			if (!isValid) return;

			setLoading(true);
			const res = await handleAuth.login(data);

			if (res?.token) {
				const { token } = res;
				const user = res?.loginedUser;
				setUser(user);
				setToken(token);
				router.push("/");
			} else {
				setVerifyInput((prev) => ({
					...prev,
					password: "Incorrect login information",
				}));
				setAttempts((prev) => prev + 1);
				if (attempts + 1 >= 3) {
					setCooldown(true);
				}
			}

			setLoading(false);
		} catch (error) {
			console.error("Login error:", error);
			setLoading(false);
		}
	};

	return (
		<div className='p-[30px] md:w-[500px] mx-auto'>
			<div className='flex gap-4 justify-center'>
				<h1 className='text-[3rem] pt-[10px] font-[700] capitalize tracking-wide'>
					Login Account
				</h1>
				<div className='relative w-[120px]'>
					<Image
						src={"/images/1x/Asset1.png"}
						fill
						alt='logo'
						style={{ objectFit: "contain" }}
					/>
				</div>
			</div>

			<div className='flex flex-col mt-2 gap-2'>
				{["phone", "password"].map((x, i) => (
					<div key={i}>
						<motion.input
							required
							type={x === "password" ? "password" : "text"}
							id={x}
							whileFocus={{
								scale: 1.05,
								borderColor: "#3b82f6",
							}}
							value={data[x]}
							onChange={handleInputChange}
							placeholder={x === "phone" ? "Phone Number" : "Password"}
							className='w-full border-b-2 outline-none text-[2.5rem] font-[600] px-2'
						/>
						<h3 className='text-red-500 text-xl mt-2'>
							{verifyInput[x]}
						</h3>
					</div>
				))}

				<ForgetPassword />

				<motion.button
					onClick={handleLogin}
					disabled={cooldown}
					initial={{
						backgroundColor: "#60a5fa",
						color: "white",
					}}
					whileHover={{ backgroundColor: "#2563eb" }}
					transition={{ type: "spring" }}
					className={`w-full flex items-center justify-center uppercase font-[600] mt-2 p-3 rounded-3xl text-[1.8rem] ${
						cooldown ? "bg-gray-400 cursor-not-allowed" : ""
					}`}
				>
					{loading ? <CircleLoader /> : cooldown ? "Please wait 1 minute" : "Login"}
				</motion.button>
			</div>
			<PopupRegister />
			<div className='uppercase text-center text-[1.4em] font-[700] my-6'>
				or
			</div>

			<button
				className='w-full bg-slate-400 text-[1.8rem] relative p-2 rounded-3xl flex justify-center items-center text-white'
				onClick={() => {
					googleSignIn();
				}}
			>
				<div className='bg-white rounded-[16px] p-2 w-[28px] h-[28px] flex items-center justify-center absolute left-2'>
					<FcGoogle size={22} />
				</div>
				<h1>Login with Google</h1>
			</button>
		</div>
	);
};

export default LoginForm;
