"use client"

import { handleCart } from "@/app/api/handleCart"

const {
	createContext,
	useContext,
	useState,
	useEffect,
} = require("react")

const CartContext = createContext()

export const CartContextProdiver = ({ children }) => {
	const [totalProduct, setTotalProduct] = useState(0)

	const [cart, setCart] = useState([1, 1, 1, 1, 1])
	const [cartLoading, setCartLoading] = useState(true)

	const [totalPrice, setTotalPrice] = useState(() => {
		let total = 0
		cart
			.map((x) => x?.quantity * x?.product?.price || 0)
			.forEach((x) => {
				total += x
			})
		return total
	})

	useEffect(() => {
		let total = 0
		cart
			?.map((x) => x?.quantity * x?.product?.price || 0)
			.forEach((x) => {
				total += x
			})

		setTotalPrice(total)
	}, [cart])

	useEffect(() => {
		let totalPd = 0
		cart.forEach((x) => (totalPd += x?.quantity || 0))
		setTotalProduct(totalPd)
	}, [])

	const getCurrentProductInCart = async (token) => {
		const result = await handleCart.GetCartProduct(token)
		setCart(result)
		setCartLoading(false)
	}

	useEffect(() => {
		try {
			const user = JSON.parse(localStorage.getItem("user"))
			const token = JSON.parse(localStorage.getItem("token"))
			if (user?.userId) {
				getCurrentProductInCart(token)
			}
		} catch (error) {
			le.log(error)
		}
	}, [totalProduct])

	return (
		<CartContext.Provider
			value={{
				totalProduct,
				setTotalProduct,
				cart,
				setCart,
				cartLoading,
				setCartLoading,

				totalPrice,
				setTotalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const UserCart = () => useContext(CartContext)
