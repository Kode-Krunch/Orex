import appConfig from 'configs/app.config';
import ApiService from './ApiService';
const axios = require('axios');
const APIURL = process.env.APIURL;

export async function apiGetmusicagencymst(data) {
  return ApiService.fetchData({
    url: '/musicagencymst/',
    method: 'get',
    data,
  });
}

const Postmusicagencymst = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      MusicAgencyName: param.MusicAgencyName,
      MusicAgency_Addr1: param.MusicAgency_Addr1,
      MusicAgency_Addr2: param.MusicAgency_Addr1,
      PlaceCode: param.PlaceCode,
      CountryCode: param.CountryCode,
      StateCode: param.StateCode,
      MusicAgency_Contact1: param.MusicAgency_Contact1,
      MusicAgency_Contact2: param.MusicAgency_Contact1,
      MusicAgency_Faxno: param.MusicAgency_Faxno,
      MusicAgency_Email: param.MusicAgency_Email,
      ContactPerson: param.ContactPerson,
      IsMusicAgency: 1,
      IsMusicCompany: 1,
      IsActive: 1,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/musicagencymst/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
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

const Putmusicagencymst = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      MusicAgencyName: param.MusicAgencyName,
      MusicAgency_Addr1: param.MusicAgency_Addr1,
      MusicAgency_Addr2: param.MusicAgency_Addr1,
      PlaceCode: param.PlaceCode,
      CountryCode: param.CountryCode,
      StateCode: param.StateCode,
      MusicAgency_Contact1: param.MusicAgency_Contact1,
      MusicAgency_Contact2: param.MusicAgency_Contact1,
      MusicAgency_Faxno: param.MusicAgency_Faxno,
      MusicAgency_Email: param.MusicAgency_Email,
      ContactPerson: param.ContactPerson,
      IsMusicAgency: 1,
      IsMusicCompany: 1,
      IsActive: 1,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/musicagencymst/${param.MusicAgencyCode}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
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
const Postautoshufflepromo = (param, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/autoshufflepromo/`,
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

export async function apiautoshufflepromo(data) {
  return ApiService.fetchData({
    url: `/autoshufflepromo/drop/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}`,
    method: 'get',
  });
}
export async function apiautoshufflepromoId(id) {
  return ApiService.fetchData({
    url: `/autoshufflepromo/${id}`,
    method: 'get',
  });
}

export async function apipromomasterdropasperdate(formState, fromdate, todate) {
  return ApiService.fetchData({
    url: `/promomaster/asperdate/?LocationCode=${formState.LocationCode}&ChannelCode=${formState.ChannelCode}&fromdate=${fromdate}&todate=${todate}`,
    method: 'get',
  });
}
export async function apipromomasterdrop() {
  return ApiService.fetchData({
    url: '/promomaster/drop/',
    method: 'get',
  });
}

export { Postmusicagencymst, Putmusicagencymst, Postautoshufflepromo };
