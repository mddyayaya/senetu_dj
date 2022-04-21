import { changeString } from '@/common/common.js'

export default {
	userinfo:changeString(localStorage.getItem("userinfo")),
	IS_LOGIN:localStorage.getItem("IS_LOGIN")
}