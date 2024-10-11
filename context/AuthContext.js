"use client"

import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth"
import { useRouter } from "next/navigation"
import {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"
import { auth } from "../firebaseConfig"
import { handleUser } from "@/app/api/handleUser"
import { handleAuth } from "@/app/api/handleAuth"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({})
	const [token, setToken] = useState()
	const [triggerLogin, setTriggerLogin] = useState(false)

	const router = useRouter()

	const handleUserWhenLogInByGoogle = async (
		currentUser
	) => {
		console.log("currentUser: ", currentUser)

		//call API check user is exit (search by uid) on database
		const isExit = await handleUser.getUserById(
			currentUser?.uid
		)

		if (isExit?.user_id) {
			// if exit => login this user on database
			const login_form = {
				phone: isExit.phone,
				password: isExit.email,
			}
			const res_login = await handleAuth.login(login_form)
			console.log("loged: ", res_login)
			if (res_login?.token) {
				const { user, token } = res_login
				setToken(token)
				setUser(user)
				router.push("/")
			}
		} else {
			// if not exit => register user (add to USER table on database)
			const user_format = {
				user_id: currentUser.uid,
				name: currentUser.displayName,
				email: currentUser.email,
				phone: (Math.random() * 10)
					.toString()
					.split(".")[1]
					.split("")
					.slice(0, 10)
					.join(""),
				password: currentUser.email,
				isAdmin: "0",
			}

			const res_register = await handleAuth.register(
				user_format
			)

			console.log("res_register ", res_register)

			if (res_register?.token) {
				setUser(res_register.user)
				setToken(res_register.token)
				router.push("/")
			}
		}
	}

	const logout = () => {
		//clear user and token
		setUser({})
		setToken("")

		//remove token and user in localstorage
		localStorage.removeItem("user")
		localStorage.removeItem("token")

		// redirect to main page

		router.push("/")
	}

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider()
		signInWithPopup(auth, provider).then((result) => {
			const { user } = result
			handleUserWhenLogInByGoogle(user)
		})
	}

	const logOutGoogle = () => {
		signOut(auth)
	}

	useEffect(() => {
		try {
			const user = JSON.parse(localStorage.getItem("user"))
			const token = JSON.parse(localStorage.getItem("token"))

			console.log("user", user)

			if (user) {
				console.log("seted")
				setUser(user)
			}
			if (token) {
				setToken(token)
			}
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		console.log("runing update localstorage")
		if (user?.userId) {
			console.log("update user")
			localStorage.setItem("user", JSON.stringify(user))
		}
		if (token) {
			localStorage.setItem("token", JSON.stringify(token))
		}
	}, [user])

	return (
		<AuthContext.Provider
			value={{
				user,
				logout,
				setUser,
				googleSignIn,
				logOutGoogle,

				setToken,
				token,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const UserAuth = () => {
	return useContext(AuthContext)
}
