import axios from 'axios';
import ApiService from './ApiService';
import { ApiService2 } from './ApiService2';
import appConfig from 'configs/app.config';
const { apiPrefix } = appConfig;
export async function apiSignIn(data2) {
  let data = new FormData();
  data.append('username', data2.userName);
  data.append('password', data2.password);
  if (data2.OTP) {
    data.append('OTP', data2.OTP);
  }

  return ApiService.fetchData({
    url: '/login',
    method: 'post',
    data,
  });
}

export async function apiSignUp(data) {
  return ApiService.fetchData({
    url: '/singup/',
    method: 'post',
    data,
  });
}

export const apiSignUpforlogin = async (acValue) => {
  try {
    const response = await axios.post(
      `${apiPrefix}/forlogin?tokendata=${acValue}`,
      {}, // Empty body
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return response; // Return the response so the caller can destructure `data`
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Re-throw the error to handle it where the function is called
  }
};
export async function apiSignOut(data) {
  return ApiService.fetchData({
    url: `/logout?LoginCode=${data}`,
    method: 'post',
  });
}

export async function apiForgotPassword(email) {
  return ApiService.fetchData({
    url: `/forgotpassword?email=${email.email}`,
    method: 'post',
  });
}

export async function apiResetPassword(data) {
  return ApiService.fetchData({
    url: '/reset-password',
    method: 'post',
    data,
  });
}
export async function apiUserformaccess(data) {
  return ApiService.fetchData({
    url: '/userformaccess/open',
    method: 'post',
    data,
  });
}
export async function apiUserformaccessTop() {
  return ApiService.fetchData({
    url: '/userformaccess/topform/',
    method: 'get',
  });
}
export async function apiUserformaccessclose(data) {
  return ApiService.fetchData({
    url: '/userformaccess/close',
    method: 'post',
    data,
  });
}

export async function apiMaster(data) {
  return ApiService.fetchData({
    url: '/MASTER/',
    method: 'post',
    data,
  });
}
export async function apiMasterput(data) {
  return ApiService.fetchData({
    url: `/MASTER/${data.ClientID}`,
    method: 'put',
    data,
  });
}

export async function apiMasterGet(data) {
  return ApiService.fetchData({
    url: '/MASTER/',
    method: 'get',
    data,
  });
}

export async function apiMasterUserGet(data) {
  return ApiService.fetchData({
    url: '/MASTER/userdata/',
    method: 'get',
    data,
  });
}
export async function apiMasterGetapprove(id, data) {
  return ApiService.fetchData({
    url: `/MASTER/approve/${id}`,
    method: 'put',
    data,
  });
}
export async function apiMasterGetreject(id, data) {
  return ApiService.fetchData({
    url: `/MASTER/reject/${id}`,
    method: 'put',
    data,
  });
}

export async function apiPost2FASetup(username) {
  return ApiService.fetchData({
    url: `2FA/setup?username=${username}`,
    method: 'post',
  });
}

export async function apiPost2FAVerify(username, otp) {
  return ApiService.fetchData({
    url: `2FA/verify?username=${username}&otp=${otp}`,
    method: 'post',
  });
}

export async function apiGenerateQrCodeForLoginWithQr() {
  return ApiService.fetchData({
    url: 'generate-qr/',
    method: 'get',
  });
}

export async function apiSignInWithQrString(qrString) {
  return ApiService.fetchData({
    url: `/QR/login?session_uuid=${qrString}`,
    method: 'post',
  });
}
