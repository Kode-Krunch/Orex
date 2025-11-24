import appConfig from 'configs/app.config';
import ApiService from './ApiService';
import { convertDateToYMD } from 'components/validators';

const axios = require('axios');

const APIURL = process.env.APIURL;
export async function apidealmasterBYID(ID) {
  return ApiService.fetchData({
    url: `/dealmaster/${ID}`,
    method: 'get',
  });
}

export async function apidealmasterBYBookingNumber(ID, DealNumber) {
  return ApiService.fetchData({
    url: `/dealmaster/ByBookingNumber/${ID}/${DealNumber}`,
    method: 'get',
  });
}

export async function apibookingattachmentBYID(bookingNumber) {
  return ApiService.fetchData({
    url: `/bookingattachment/${bookingNumber}`,
    method: 'get',
  });
}

export async function apidealattachmentBYID(dealNumber) {
  return ApiService.fetchData({
    url: `/dealattachment/${dealNumber}`,
    method: 'get',
  });
}
export async function readUploadedFileByName(fileName) {
  return ApiService.fetchData({
    url: `/dealmaster/readuploadedfile/${fileName}`,
    method: 'get',
  });
}

export async function apidealmasterDealforapprovalBYID(selectedDeal, isApproved, rejectRemark) {
  return ApiService.fetchData({
    url: `/dealmaster/dealforapproval/?DealNumber=${selectedDeal}&IsApproved=${isApproved}&RejectRemark=${rejectRemark}`,
    method: 'get',
  });
}

export async function apiGetdealmaster(param, dateRange) {
  return ApiService.fetchData({
    url: `/dealmaster/?LocationCode=${param.LocationCode}&ChannelCode=${param.ChannelCode
      }&StartDate=${convertDateToYMD(dateRange[0])}&EndDate=${convertDateToYMD(
        dateRange[1],
      )}`,
    method: 'get',
  });
}

export async function apiGetsponsortypemasterdrop(data) {
  return ApiService.fetchData({
    url: '/sponsortypemaster/drop/',
    method: 'get',
    data,
  });
}
export async function apiGetspottypemasterdrop(data) {
  return ApiService.fetchData({
    url: '/spottypemaster/drop/',
    method: 'get',
    data,
  });
}
export async function apiGetdealdetailId(ID) {
  return ApiService.fetchData({
    url: `/dealdetail/${ID}`,
    method: 'get',
  });
}
export async function apiUSP_Sch_DealConsumptionCheck(ID) {
  return ApiService.fetchData({
    url: `/dealmaster/USP_Sch_DealConsumptionCheck/?DealNumber=${ID}`,
    method: 'get',
  });
}
export async function apiUSP_Sch_DealConsumptionMonthwise(ID) {
  return ApiService.fetchData({
    url: `/dealmaster/USP_Sch_DealConsumptionMonthwise/?DealNumber=${ID}`,
    method: 'get',
  });
}

export async function apiGetbindstartnendtime(
  DealPeriodToDate,
  DealPeriodFromDate,
  ContentCode,
  OriginalRepeatCode,
  LocationCode,
  ChannelCode,
) {
  return ApiService.fetchData({
    url: `/dealmaster/bindstartnendtime/?LocationCode=${LocationCode}&ChannelCode=${ChannelCode}&DealPeriodToDate=${DealPeriodToDate}&DealPeriodFromDate=${DealPeriodFromDate}&ContentCode=${ContentCode}&OriginalRepeatCode=${OriginalRepeatCode}`,
    method: 'get',
  });
}

export async function apipostbookingdetails(RESCHEDULE, data, IsNtc) {
  return ApiService.fetchData({
    url: `/bookingdetails/bookingchange/?flag=${RESCHEDULE}&IsNtc=${IsNtc}`,
    method: 'put',
    data,
  });
}
export async function apipostbookingdetailswithTime(RESCHEDULE, data, IsNtc) {
  return ApiService.fetchData({
    url: `/bookingdetails/bookingchangescheduletime/?flag=${RESCHEDULE}&IsNtc=${IsNtc}`,
    method: 'put',
    data,
  });
}

export async function apiGetdealDashboard() {
  var d = {
    params: {},
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/USP_DealDashboardSummaryAmount',
    data: d,
    method: 'post',
  });
}
export async function apiCallstoreprocedure_WithOutParam(proc_name, params) {
  var d = {
    params: params,
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/' + proc_name,
    data: d,
    method: 'post',
  });
}
export async function apiCallstoreprocedure_WithOutParamEntity(proc_name) {
  var d = {
    params: {},
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/' + proc_name,
    data: d,
    method: 'post',
  });
}
export async function apiCallstoreprocedure_WithOutParamreject(proc_name) {
  var d = {
    params: {
      IsApproved: 0,
      IsExpiring: 0,
      IsRejected: 2,
    },
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/' + proc_name,
    data: d,
    method: 'post',
  });
}
export async function apiCallstoreprocedure_WithOutParamRRR(
  proc_name,
  date,
  channel,
  loc,
) {
  var d = {
    params: {
      Location: loc,
      Channel: channel,
      FromDate: convertDateToYMD(date[0]),
      Todate: convertDateToYMD(date[1]),
    },
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/' + proc_name,
    data: d,
    method: 'post',
  });
}
export async function apiCallstoreprocedure_WithOutParamDash(
  proc_name,
  channel,
  loc,
) {
  var d = {
    params: {
      Location: loc,
      Channel: channel,
    },
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/' + proc_name,
    data: d,
    method: 'post',
  });
}

export async function apiCallstoreprocedure_WithOutParamgg(
  proc_name,
  BookingCode,
  IsNTC,
) {
  var d = {
    params: { Bookingcode: BookingCode, IsNTC: IsNTC },
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/' + proc_name,
    data: d,
    method: 'post',
  });
}

export async function apiCallstoreprocedure_WithOutParamstatus(
  proc_name,
  data,
) {
  var d = {
    params: {},
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/' + proc_name,
    data: d,
    method: 'post',
  });
}

export async function apiDashboardDoughnut(format) {
  var d = {
    params: {
      CheckMonth: format,
    },
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/USP_DealDashboardDoughnut',
    data: d,
    method: 'post',
  });
}

export async function apiCallforbookdeatil(proc_name, f) {
  var d = {
    params: { BookingNumber: f, deallineitemno: 0 },
  };

  return ApiService.fetchData({
    url: '/callstoreprocedure/' + proc_name,
    data: d,
    method: 'post',
  });
}

export async function apiGetExchangeRatesForBaseCurrency(baseCurShortName) {
  return ApiService.fetchData({
    url: `currencyexchangerate/?basecurrency=${baseCurShortName}`,
    method: 'post',
  });
}
