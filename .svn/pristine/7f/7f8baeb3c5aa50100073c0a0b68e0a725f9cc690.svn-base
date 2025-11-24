import appConfig from 'configs/app.config';
import ApiService from './ApiService';

const axios = require('axios');

const APIURL = process.env.APIURL;

export async function apiGetPromomaster(data, search) {
  const searchParam = search ? `&search=${search}` : '';
  const url = `/promomaster/?&LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}${searchParam}`;
  return ApiService.fetchData({
    url,
    method: 'get',
    data,
  });
}

export async function apiGetPromomasterFilter(channel, data) {
  let url = `/promomaster/filter/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}`;

  if (data.PromoTypeCode) {
    url += `&PromoTypeCode=${data.PromoTypeCode}`;
  }
  if (data.Caption) {
    url += `&Caption=${data.Caption}`;
  }
  if (data.Duration[0]) {
    url += `&Duration1=${data.Duration[0]}`;
  }
  if (data.Duration[1]) {
    url += `&Duration2=${data.Duration[1]}`;
  }
  if (data.VideoID) {
    url += `&VideoID=${data.VideoID}`;
  }

  return ApiService.fetchData({
    url,
    method: 'get',
    data,
  });
}

export async function apiGetsmartshufflesetting(data) {
  return ApiService.fetchData({
    url: `/smartshufflesetting/?&LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}`,
    method: 'get',
    data,
  });
}
export async function apiPutsmartshufflesetting(data, SmartshufflesettingCode) {
  return ApiService.fetchData({
    url: `/smartshufflesetting/${SmartshufflesettingCode}`,
    method: 'put',
    data,
  });
}
export async function apiPostsmartshufflesetting(data) {
  return ApiService.fetchData({
    url: `/smartshufflesetting/`,
    method: 'post',
    data,
  });
}
const UploadXslspromo = async (row, token) => {
  let headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${token}`,
  };

  let bodyContent = new FormData();
  bodyContent.append(
    'file',
    `c:\Users\akash\Downloads\Promo_Import_Template.xlsx`,
  );

  let response = await fetch(appConfig.apiPrefix + '/promomaster/upload/', {
    method: 'POST',
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
};
export async function apiGetSongGenreMaster(data) {
  return ApiService.fetchData({
    url: '/songgenre/',
    method: 'get',
    data,
  });
}
export async function apiGetSongcategoryMaster(data) {
  return ApiService.fetchData({
    url: '/songcategory/',
    method: 'get',
    data,
  });
}
export async function apiGetSongmaster(data) {
  return ApiService.fetchData({
    url: `/songmaster/?&LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}`,
    method: 'get',
    data,
  });
}

export async function apiGetSongmasterbyId(id) {
  return ApiService.fetchData({
    url: `/songmaster/${id}`,
    method: 'get',
  });
}

const UpdateSongGenre = (row, token) => {
  return fetch(appConfig.apiPrefix + `/songgenre/${row.SongGenreCode}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      SongGenreName: row.SongGenreName,
      IsActive: row.IsActive,
    }),
  });
};
const AddMovieAlbum = (row, token) => {
  return fetch(appConfig.apiPrefix + `/moviealbummaster`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      MovieAlbumName: row.MovieAlbumName,
      IsActive: row.IsActive,
    }),
  });
};
const UpdateMovieAlbum = (row, token) => {
  return fetch(
    appConfig.apiPrefix + `/moviealbummaster/${row.MovieAlbumCode}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MovieAlbumName: row.MovieAlbumName,
        IsActive: row.IsActive,
      }),
    },
  );
};

const UpdateSongcategory = (row, token) => {
  console.log(row);
  return fetch(appConfig.apiPrefix + `/songcategory/${row.SongCategoryCode}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      SongCategoryName: row.SongCategoryName,
      IsActive: row.IsActive,
    }),
  });
};
const AddSongGenre = (row, token) => {
  return fetch(appConfig.apiPrefix + `/songgenre`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      SongGenreName: row.SongGenreName,
      IsActive: row.IsActive,
    }),
  });
};

const AddSongcategory = (row, token) => {
  return fetch(appConfig.apiPrefix + `/songcategory`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      SongCategoryName: row.SongCategoryName,
      IsActive: row.IsActive,
    }),
  });
};
const Postpromo = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/promomaster/',
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

const Putpromo = (data, token, id) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/promomaster/${id}`,
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
export async function apiGetPromotypedropdown(data) {
  return ApiService.fetchData({
    url: '/promotypemaster/drop/',
    method: 'get',
    data,
  });
}
export async function apiGetSongGenredropdown(data) {
  return ApiService.fetchData({
    url: '/songgenre/drop/',
    method: 'get',
    data,
  });
}
export async function apiGetTapetypedropdown(data) {
  return ApiService.fetchData({
    url: '/tapetypemaster/drop/',
    method: 'get',
    data,
  });
}
export async function apiGetSongtempodropdown(data) {
  return ApiService.fetchData({
    url: '/songtempo/drop/',
    method: 'get',
    data,
  });
}

export async function apiGetPromoScheduling(data, telecastDate, mode) {
  const url = `promoscheduling/USP_Sch_PromoScheduling_GetDetails/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&Mode=${mode}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetNTCScheduling(data, telecastDate, mode) {
  const url = `ntcscheduling/USP_Sch_NTCScheduling_GetDetails/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&Mode=${mode}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetSongSchedulingData(data, telecastDate, mode) {
  const url = `songscheduling/USP_Sch_SongScheduling_GetDetails/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&Mode=${mode}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGettransmissionlog(data, telecastDate, PR) {
  const url = `transmissionlog/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&Mode=${PR}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}
export async function apiGettransmissionloggg(data, telecastDate, PR) {
  const url = `transmissionlog/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&Mode=${PR}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}
export async function apiGettransmissionlog2(data, telecastDate) {
  const url = `transmissionlog/Scheduling_FinalLog_ProgramChange?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetExportPlayOut(data, telecastDate) {
  const url = `/transmissionlog/USP_Sch_Finalog_ExportCsv/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&Mode=S`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetgetauditpromoscheduling(data, telecastDate) {
  const url = `restore/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&FormName=${data.FormName}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetRestoreDropDown(data) {
  const url = `restore/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${data.TelecastDate}&FormName=${data.FormName}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetSongschedulDetails(SongCode, TelecastDate, InHour) {
  const url = `songscheduling/GetSongschedulDetails/?SongCode=${SongCode}&TelecastDate=${TelecastDate}&InHour=${InHour}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetRestoreScheduling(data) {
  const url = `restore/audit_data/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${data.TelecastDate}&FormName=${data.FormName}&D_date=${data.D_date}`;
  return ApiService.fetchData({
    url: url,
    method: 'post',
  });
}

export async function apiGetRestoreCommercialScheduling(data) {
  const url = `commercialscheduling/restoreauditcommercialscheduling/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&ScheduleDate=${data.ScheduleDate}&D_date=${data.D_date}`;
  return ApiService.fetchData({
    url: url,
    method: 'post',
  });
}

export async function apiGetgetauditfinallogscheduling(
  data,
  telecastDate,
  FormName,
) {
  const url = `restore/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&FormName=${FormName}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetgetauditfinallogschedulingCom(data, telecastDate) {
  const url = `commercialscheduling/getauditpromoscheduling/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&ScheduleDate=${telecastDate}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}
export async function apiGetrestorepromoscheduling(data, telecastDate, D_date) {
  const url = `restore/audit_data/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&FormName=PromoScheduling&D_date=${D_date}`;
  return ApiService.fetchData({
    url: url,
    method: 'post',
  });
}

export async function apiGetrestorefinallogscheduling(
  data,
  telecastDate,
  FormName,
  D_date,
) {
  const url = `restore/audit_data/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&FormName=${FormName}&D_date=${D_date}`;
  return ApiService.fetchData({
    url: url,
    method: 'post',
  });
}

export async function apiGetDailyFPCStatus(data, telecastDate) {
  const url = `globle/GetDailyFPCStatus/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&Screen=${data.Screen}&TelecastDate=${telecastDate}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetPromoScheduling2(data, telecastDate, type, name) {
  const url = `promoscheduling/USP_Sch_Get_All_Promo/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&PromoTypeCode=${type}&PromoName=${name}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}
export async function apiGetNTCScheduling2(data, telecastDate, type, name) {
  const url = `ntcmaster/USP_Sch_Get_All_NTC/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&NTCTypeCode=${type}&NTCName=${name}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

export async function apiGetSongScheduling2(data, telecastDate, type, name) {
  const url = `songscheduling/USP_Sch_Get_All_Song/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&SongType=${type}&OrderBy=2&SearchText=${name}`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}

// export { Postpromo, Putpromo, UpdateSongGenre, AddSongGenre }
export async function apiGetSongScheduling(data, telecastDate) {
  const url = `/usp_pg_fpc_serachwithhouseID/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}&TelecastDate=${telecastDate}&GenrateFPC=1`;
  return ApiService.fetchData({
    url: url,
    method: 'get',
  });
}
// export { Postpromo, Putpromo, UpdateSongGenre, AddSongGenre }
export async function apiGetMusicagencydropdown(data) {
  return ApiService.fetchData({
    url: '/musicagencymst/drop/',
    method: 'get',
    data,
  });
}

export async function apiGetMoviealbumdropdown(data) {
  return ApiService.fetchData({
    url: '/moviealbummaster/drop/',
    method: 'get',
    data,
  });
}

export async function apiPosttransmissionlogaddaudit(data) {
  return ApiService.fetchData({
    url: '/transmissionlog/addaudit/',
    method: 'post',
    data,
  });
}
export async function apiPosttransmissionloginsertdata(data) {
  return ApiService.fetchData({
    url: '/transmissionlog/insertdata/',
    method: 'post',
    data,
  });
}
export async function apiPUTtransmissionlogupdatedata(data) {
  return ApiService.fetchData({
    url: '/transmissionlog/updatedata/',
    method: 'put',
    data,
  });
}

export async function apideletedataPosttransmissionlogaddaudit(channel, date) {
  return ApiService.fetchData({
    url: `/transmissionlog/deletedata/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}&TelecastDate=${date}`,
    method: 'delete',
  });
}
const Postpromoscheduling = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/promoscheduling/',
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

const PostSongscheduling = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/songscheduling/',
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

const PostNTCScheduling = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/ntcscheduling/',
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

const Posttransmissionlog = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/transmissionlog/',
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

const PutCommercialSave = (data, token) => {
  console.log('url');
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/commercialscheduling/',
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

const Postsong = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/songmaster/',
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
const PostPromoSchdulingSave = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/fpromoscheduling/',
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

const Putsong = (data, token, id) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/songmaster/${id}`,
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

const Postcolumnsetting = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/columnsetting/',
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

const apiUpdateSpotStatus = (BookingIds, BookingStatus, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url:
        appConfig.apiPrefix +
        `/bookingdetails/bookingstatuschange/?BookingStatus=${BookingStatus}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: BookingIds,
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

export async function apiTeamMappingCreate(data) {
  const url = `teammapping/`;
  return ApiService.fetchData({
    url: url,
    method: 'post',
    data: data,
  });
}
export async function apiTeamMappingDelete(data) {
  const url = `teammapping/`;
  return ApiService.fetchData({
    url: url,
    method: 'delete',
    data: data,
  });
}

export async function apigeneventcontent(data) {
  const url = `geneventcontent/Contentadd/`;
  return ApiService.fetchData({
    url: url,
    method: 'post',
    data: data,
  });
}

export {
  Postpromo,
  Putpromo,
  UpdateSongGenre,
  AddSongGenre,
  Postsong,
  Putsong,
  AddSongcategory,
  UpdateSongcategory,
  UploadXslspromo,
  AddMovieAlbum,
  UpdateMovieAlbum,
  PostPromoSchdulingSave,
  Postpromoscheduling,
  Posttransmissionlog,
  Postcolumnsetting,
  PostNTCScheduling,
  PostSongscheduling,
  apiUpdateSpotStatus,
  PutCommercialSave,
};
