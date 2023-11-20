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

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({})
	const [token, setToken] = useState()

	const router = useRouter()

	const handleUserWhenLogInByGoogle = (currentUser) => {
		//call API check user is exit (search by uid) on database
		// if exit => get this user on database
		// if not exit => register user (add to USER table on database)
		// return USER => save user

		setUser(currentUser)
	}

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider()
		signInWithPopup(auth, provider).then(() => {
			router.push("/")
		})
	}

	const logOutGoogle = () => {
		signOut(auth)
	}

	useEffect(() => {
		try {
			if (!user && localStorage.getItem("user")) {
				const reloadUser = JSON.parse(
					localStorage.getItem("user")
				)
				setUser(reloadUser)
			}
			if (!token && localStorage.getItem("token")) {
				const reloadToken = JSON.parse(
					localStorage.getItem("token")
				)
				setToken(reloadToken)
			}
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		console.log("runing update localstorage")
		if (user?.user_id) {
			console.log("update user")
			localStorage.setItem("user", JSON.stringify(user))
		}
		if (token) {
			localStorage.setItem("token", JSON.stringify(token))
		}
	}, [user, token])

	return (
		<AuthContext.Provider
			value={{
				user,
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
