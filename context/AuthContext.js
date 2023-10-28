"use client"

import {
	useContext,
	createContext,
	useState,
	useEffect,
} from "react"
import {
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
} from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export async function loginWithPhone() {
	// call api
	const token = "aoih8324okagnroy89324"
	return token
}

export const AuthContextProvider = ({
	children,
}) => {
	const [user, setUser] = useState(null)
	const router = useRouter()

	const handleUserWhenLogInByGoogle = (
		currentUser
	) => {
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
		const unsubscribe = onAuthStateChanged(
			auth,
			(currentUser) => {
				handleUserWhenLogInByGoogle(currentUser)
			}
		)
		return () => unsubscribe()
	}, [user])

	return (
		<AuthContext.Provider
			value={{ user, googleSignIn, logOutGoogle }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const UserAuth = () => {
	return useContext(AuthContext)
}
