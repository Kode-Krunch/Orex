import { convertDateToYMD } from 'components/validators';
import ApiService from './ApiService';

export async function apiGetNotificationCount() {
  return ApiService.fetchData({
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'get',
  });
}

export async function apiGetNotificationList() {
  return ApiService.fetchData({
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'get',
  });
}

export async function apiGetOTP(userName) {
  return ApiService.fetchData({
    url: `loginmaster/otp/${userName}`,
    method: 'get',
  });
}
export async function apiGetSearchResult(data) {
  return ApiService.fetchData({
    url: '/search/query',
    method: 'post',
    data,
  });
}

export async function showrightsbyIdAkash(data) {
  return ApiService.fetchData({
    url: `/rights/showrights/${data}`,
    method: 'get',
    data,
  });
}
export async function getdefaultFormState(channel) {
  return ApiService.fetchData({
    url: `/callstoreprocedure/defaultFormState/?ChannelCode=${channel.ChannelCode}&LocationCode=${channel.LocationCode}`,
    method: 'get',

  });
}

export async function apiCallstoreprocedure(proc_name, params) {
  var d = {
    params: params,
  };
  return ApiService.fetchData({
    url: '/callstoreprocedure/' + proc_name,
    data: d,
    method: 'post',
  });
}

export async function apiCallstoreprocedureRRR(
  ChannelCode,
  LocationCode,
  FromDate,
  UptoDate,
  InvoiceDate,
  Filter,
  FilterType,
  AddedBy,
  IsNtc,
) {
  return ApiService.fetchData({
    url: `Dashboard/usp_Billing_BillGeneration/?ChannelCode=${ChannelCode}&LocationCode=${LocationCode}&FromDate=${FromDate}&UptoDate=${UptoDate}&InvoiceDate=${InvoiceDate}&Filter=${Filter}&FilterType=${FilterType}&AddedBy=${AddedBy}&IsNTC=${IsNtc}`,
    method: 'get',
  });
}

export async function apiCallSponsorSP(
  ChannelCode,
  LocationCode,
  FromDate,
  UptoDate,
  InvoiceDate,
  Filter,
  FilterType,
  AddedBy,
  IsNtc,
) {
  return ApiService.fetchData({
    url: `Dashboard/usp_Billing_SponsorBillGeneration/?ChannelCode=${ChannelCode}&LocationCode=${LocationCode}&FromDate=${FromDate}&UptoDate=${UptoDate}&InvoiceDate=${InvoiceDate}&Filter=${Filter}&FilterType=${FilterType}&AddedBy=${AddedBy}&IsNTC=${IsNtc}`,
    method: 'get',
  });
}