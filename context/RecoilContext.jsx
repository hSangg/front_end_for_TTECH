"use client"

import { userState } from "@/atoms/user"
import {
	RecoilRoot,
	useRecoilState,
} from "recoil"

const RecoilContext = ({ children }) => {
	return <RecoilRoot>{children}</RecoilRoot>
}

export default RecoilContext
