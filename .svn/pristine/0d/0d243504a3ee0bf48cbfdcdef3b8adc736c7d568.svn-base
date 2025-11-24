import appConfig from 'configs/app.config';
import ApiService from './ApiService';
import { data } from 'autoprefixer';
const axios = require('axios');
const APIURL = process.env.APIURL;

export async function apiGetCommercialtypemaster(data) {
  return ApiService.fetchData({
    url: '/commercialtypemaster/',
    method: 'get',
    data,
  });
}
export async function apispotcancellation(data, i, IsNTC) {
  return ApiService.fetchData({
    url: `/spotcancellation/?CancelRemarkCode=${i}&IsNTC=${IsNTC}`,
    method: 'put',
    data,
  });
}

const Postcommercialtype = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      CommercialTypeName: param.CommercialTypeName,
      CommercialTypeShortName: param.CommercialTypeShortName,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/commercialtypemaster/',
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

const Putcommercialtype = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      CommercialTypeName: param.CommercialTypeName,
      CommercialTypeShortName: param.CommercialTypeShortName,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url:
        appConfig.apiPrefix +
        `/commercialtypemaster/${param.CommercialTypeCode}`,
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

export async function apiGetCommercialmaster(data) {
  return ApiService.fetchData({
    url: `/commercialmaster/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&IsNTC=${data.IsNTC}&fromdate=${data.FromDate}&todate=${data.ToDate}`,
    method: 'get',
  });
}

export async function apiGetBooking(data, id) {
  return ApiService.fetchData({
    url: `/bookingmaster/?IsNTC=${data.IsNTC}&LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}`,
    method: 'get',
    data,
  });
}

export async function apiUSP_SA_RO_SpotSchedule(
  From_DT,
  To_DT,
  DealNumber,
  BookingNumber,
  ScheduleDate,
  ChannelCode,
  LocationCode,
  checked,
  BookingRefNumber,
  IsNTCPage,
  Brand,
) {
  return ApiService.fetchData({
    url: `/spotschedule/USP_SA_RO_SpotSchedule/?From_DT=${From_DT}&To_DT=${To_DT}&DealNumber=${DealNumber}&BookingNumber=${BookingNumber}&ChannelCode=${ChannelCode}&LocationCode=${LocationCode}&ScheduleDate=${ScheduleDate}&IsMakeGoodRO=${
      checked ? 1 : 0
    }&BookingRefNumber=${BookingRefNumber}&IsNTC=${IsNTCPage}&BrandCode=${Brand}`,
    method: 'get',
  });
}

export async function apiGetCommercialmasterdrop() {
  return ApiService.fetchData({
    url: '/commercialmaster/drop/',
    method: 'get',
  });
}

export async function apiGetCommercialClientBrandwisedrop2(
  selectedBrand,
  selectedClient,
  selectedCommercial,
  LocationCode,
  ChannelCode,
  IsNTC,
) {
  return ApiService.fetchData({
    url: `/commercialmaster/get_Commercial/?LocationCode=${LocationCode}&ChannelCode=${ChannelCode}&ClientCode=${selectedClient.value}&BrandCode=${selectedBrand.value}&DurInSec=${selectedCommercial.DurInSec}&IsNTC=${IsNTC}`,
    method: 'get',
  });
}

export async function apiGetCommercialClientBrandwisedrop(
  selectedBrand,
  selectedClient,
  LocationCode,
  ChannelCode,
  IsNTC,
) {
  return ApiService.fetchData({
    url: `/commercialmaster/get_Commercial/?LocationCode=${LocationCode}&ChannelCode=${ChannelCode}&ClientCode=${selectedClient}&BrandCode=${selectedBrand}&IsNTC=${IsNTC}`,
    method: 'get',
  });
}
const Postcommercial = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/commercialmaster/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log(config.url);
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

const Putcommercial = (data, token, id) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/commercialmaster/${id}`,
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

export async function apiGetPositionDrop(data) {
  return ApiService.fetchData({
    url: '/positionmaster/drop/',
    method: 'get',
    data,
  });
}

export async function apiGetYearDrop(data) {
  return ApiService.fetchData({
    url: '/yearmaster/drop/',
    method: 'get',
    data,
  });
}

export async function apiGetSpotPositionDrop(data) {
  return ApiService.fetchData({
    url: '/spotpositiontypemaster/drop/',
    method: 'get',
    data,
  });
}

export async function apiGetCancelRemarkMaster(data) {
  return ApiService.fetchData({
    url: '/cancelremarkmaster/',
    method: 'get',
    data,
  });
}
const AddCancelremark = (row, token) => {
  return fetch(appConfig.apiPrefix + `/cancelremarkmaster`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      CancelRemarkName: row.CancelRemarkName,
      IsActive: row.IsActive,
    }),
  });
};

const UpdateCancelremark = (row, token) => {
  return fetch(
    appConfig.apiPrefix + `/cancelremarkmaster/${row.CancelRemarkCode}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CancelRemarkName: row.CancelRemarkName,
        IsActive: row.IsActive,
      }),
    },
  );
};

export async function apiGetYearMaster(data) {
  return ApiService.fetchData({
    url: '/yearmaster/',
    method: 'get',
    data,
  });
}
const AddYear = (row, token) => {
  return fetch(appConfig.apiPrefix + `/yearmaster`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Description: row.Description,
      StartDate: row.StartDate,
      EndDate: row.EndDate,
      IsActive: row.IsActive,
    }),
  });
};

const UpdateYear = (row, token) => {
  return fetch(appConfig.apiPrefix + `/yearmaster/${row.Yearcode}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Description: row.Description,
      StartDate: row.StartDate,
      EndDate: row.EndDate,
      IsActive: row.IsActive,
    }),
  });
};

export async function apiGetTaxMaster(data) {
  return ApiService.fetchData({
    url: '/taxmaster/',
    method: 'get',
    data,
  });
}

export async function AddTax(data) {
  return ApiService.fetchData({
    url: '/taxmaster/',
    method: 'post',
    data,
  });
}

export async function UpdateTax(data, TaxCode) {
  return ApiService.fetchData({
    url: `/taxmaster/${TaxCode}`,
    method: 'put',
    data,
  });
}

const apiGetTrafficDayClose = (date, channel, token) => {
  try {
    return ApiService.fetchData({
      method: 'get',
      url: `/trafficdayclose/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}&traficmonth=${date}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const apiGetTrafficDayCloseByDateRange = (fromdate, todate, channel, token) => {
  try {
    return ApiService.fetchData({
      method: 'get',
      url: `/trafficdayclose/asperfromto/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}&fromdate=${fromdate}&todate=${todate}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
const apiCreateTrafficDayClose = async (data, channel, token) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url:
          appConfig.apiPrefix +
          `/trafficdayclose/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}`,
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
  } catch (error) {
    throw error;
  }
};

const apiPUTBookingStatusChange = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url:
        appConfig.apiPrefix + `/bookingdetails/bookingchange/?BookingStatus=E`,
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

const apiGetBookingByClient = (clientCode, channel, token) => {
  try {
    return ApiService.fetchData({
      method: 'get',
      url: `/bookingmaster/getbookingbyclient/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}&ClientCode=${clientCode}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const apiGetBookingActivityForBookingCode = (bookingNumber, token) => {
  try {
    return ApiService.fetchData({
      method: 'get',
      url: `/bookingactivity/get_bookingactivity/?BookingNumber=${bookingNumber}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const apiGet_BookinActivityByDate = (activity, bookingNumber, token) => {
  try {
    console.log(activity);

    return ApiService.fetchData({
      method: 'get',
      url: `/bookingactivity/get_bookingactivitybydate?BookingNumber=${bookingNumber}&ChangeType=${activity.type}&ChangeOn=${activity.dateTime}&ChangeBy=${activity.executerId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
export {
  Postcommercialtype,
  Putcommercialtype,
  AddCancelremark,
  UpdateCancelremark,
  AddYear,
  UpdateYear,
  Putcommercial,
  Postcommercial,
  apiGetTrafficDayClose,
  apiCreateTrafficDayClose,
  apiPUTBookingStatusChange,
  apiGetBookingByClient,
  apiGetBookingActivityForBookingCode,
  apiGet_BookinActivityByDate,
  apiGetTrafficDayCloseByDateRange,
};
