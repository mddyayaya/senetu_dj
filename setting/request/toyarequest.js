
import { httpCode } from './toyaCode.js'

let count =1,
EXPIRDCODE = 1010,//token过期
INVALIDCODE =1004

export const login = async (home_id) => {
  const params = {
    name: 'ty-service',
    data: {
      action: 'user.wx-applet.synchronization',
      params: {
        open_id: 'cloud',
        app_schema: 'cloud',
        nick_name:uni.getStorageSync("usernickName"),
		avatar:uni.getStorageSync("userpic")
      }
    }
  };
  const {access_token,uid } = (await wx.cloud.callFunction(params)).result.data;
  console.log(uid)
  uni.setStorageSync('uid', uid);
  uni.setStorageSync('access_token', access_token);
  return uid
};



const setUid = async (params) => {
  const {
    data: { action }
  } = params;
  let uid = uni.getStorageSync('uid');
  let access_token = uni.getStorageSync('access_token')
  const isNoLogin = action !== 'user.wx-applet.synchronization';
  if (!uid && isNoLogin && count) {
    await login();
	count--;
    return setUid(params);
  }
  if (access_token && uid && isNoLogin) {
    params.data.params || (params.data.params = {});
    params.data.params['uid'] = uid;
    params.data['access_token'] = access_token;
  }
};

const request = async (params) => {
	console.log(params)
  await setUid(params);

  try {
    const { success, data, errorCode, errorMsg, t } = (
      await wx.cloud.callFunction(params)
    ).result;
    if (success && data === true) {
      return { success, t }
    } else if (success) {
      return data
    }

    // token过期时，刷新token
    if (+errorCode === EXPIRDCODE || +errorCode === INVALIDCODE) {
      const rSuccess = await refreshToken;
      if (rSuccess) return request(params);
    }
	let tips = errorCode in httpCode ? httpCode[errorCode] : errorMsg;
    uni.showToast({
      title: tips,
      icon: 'none',
      duration: 3000,
      mask: true
    });
  } catch (error) {
	  console.log(error)
    uni.showToast({
      title: '网络错误！',
      icon: 'none',
      duration: 3000,
      mask: true
    });
  }
  return [];
};

const refreshToken = async () => {
	const params = {
	  name: 'ty-service',
	  data: {
		action: 'user.refreshToken',
		params: { refresh_token: uni.getStorageSync('refresh_token') },
	  },
	};
	
	const res = await request(params);
	if (!res) return false;
	
	const {uid,access_token, refresh_token } = res;
	uni.setStorageSync('uid', uid);
	uni.setStorageSync('access_token', access_token);
	uni.setStorageSync('refresh_token', refresh_token);
	return true;
}

export default request;
