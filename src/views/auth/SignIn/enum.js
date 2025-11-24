const googleAuthQrErrorEnums = {
  '2FA_ALREADY_EXIST': '2FA Already Exist',
};

const loginTypeEnums = {
  NORMAL: 'normal',
  GOOGLE_TWO_WAY_QR_AUTH: 'googleTwoWayQrAuth',
};

const parentLoginTypesEnum = {
  LOGIN_WITH_CREDENTIALS: 'loginWithCredentials',
  LOGIN_WITH_OTP: 'loginWithOtp',
  LOGIN_WITH_QR_FROM_CLOUDBATS_APP: 'loginWithQr',
};

export { googleAuthQrErrorEnums, loginTypeEnums, parentLoginTypesEnum };
