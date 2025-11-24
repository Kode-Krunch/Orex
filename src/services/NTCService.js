import appConfig from 'configs/app.config';
import ApiService from './ApiService';
const axios = require('axios');
const APIURL = process.env.APIURL;

export async function apiGetNTCmaster(data) {
  return ApiService.fetchData({
    url: `/ntcmaster/?&LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}`,
    method: 'get',
    data,
  });
}

const PostNTC = (param, token) => {

  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/ntcmaster/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: param,
    };

    axios
      .request(config)
      .then((response) => {
        resolve(response);
      })
      .catch((errors) => {
        reject(errors);
      });
  });
};

const PutNTC = (param, NTCCode, token) => {

  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/ntcmaster/' + NTCCode,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: param,
    };

    axios
      .request(config)
      .then((response) => {
        resolve(response);
      })
      .catch((errors) => {
        reject(errors);
      });
  });
};
export async function apiGetNTCtypedropdown(data) {
  return ApiService.fetchData({
    url: '/ntctypemaster/drop/',
    method: 'get',
    data,
  });
}

export async function apiNTCtypeMaster(data) {
  return ApiService.fetchData({
    url: '/ntctypemaster/',
    method: 'get',
    data,
  });
}
export async function apigloble3000(data) {
  return ApiService.fetchData({
    url: '/globle/get/',
    method: 'get',
    data,
  });
}

const UpdateNTCType = (row, token) => {
  return fetch(appConfig.apiPrefix + `/ntctypemaster/${row.NTCTypeCode}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      NTCTypeName: row.NTCTypeName,
      NtcTypeShortName: row.NtcTypeShortName,
      NTCGroupCode: row.NTCGroupCode,
      DefaultGAP: row.DefaultGAP,
      IsActive: row.IsActive,
    }),
  });
};
const AddNTCType = (row, token) => {
  return fetch(appConfig.apiPrefix + `/ntctypemaster`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      NTCTypeName: row.NTCTypeName,
      NtcTypeShortName: row.NtcTypeShortName,
      NTCGroupCode: row.NTCGroupCode,
      DefaultGAP: row.DefaultGAP,
      IsActive: row.IsActive,
    }),
  });
};



const UpdateNTCGroup = (row, token) => {
  return fetch(appConfig.apiPrefix + `/ntcgroupmaster/${row.NTCGroupCode}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      NTCGroupName: row.NTCGroupName,
      IsActive: row.IsActive,
    }),
  });
};
const AddNTCGroup = (row, token) => {
  return fetch(appConfig.apiPrefix + `/ntcgroupmaster`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      NTCGroupName: row.NTCGroupName,
      IsActive: row.IsActive,
    }),
  });
};

export async function apiNTCGroupMaster(data) {
  return ApiService.fetchData({
    url: '/ntcgroupmaster/',
    method: 'get',
    data,
  });
}



export { PostNTC, PutNTC, UpdateNTCType, AddNTCType, AddNTCGroup, UpdateNTCGroup };
