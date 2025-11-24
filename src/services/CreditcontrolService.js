import appConfig from 'configs/app.config';
import ApiService from './ApiService';
import { data } from 'autoprefixer';
import { convertDateToYMD } from 'components/validators';
const axios = require('axios');
const APIURL = process.env.APIURL;

export async function apiGetbrandmaster(data) {
  return ApiService.fetchData({
    url: '/brandmaster/',
    method: 'get',
    data,
  });
}
export async function apiGetbrandmasterDrop(data) {
  return ApiService.fetchData({
    url: '/brandmaster/drop/',
    method: 'get',
    data,
  });
}

export async function apiGetDealmaster() {
  return ApiService.fetchData({
    url: '/dealmaster/',
    method: 'get',
  });
}
export async function apiGetDealmaster_drop() {
  return ApiService.fetchData({
    url: '/dealmaster/drop/',
    method: 'get',
  });
}
const Postbrand = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/brandmaster/',
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

const Putbrand = (data, BrandCode, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/brandmaster/${BrandCode}`,
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

export async function apiGetproductmaster(data) {
  return ApiService.fetchData({
    url: '/productmaster/',
    method: 'get',
    data,
  });
}

export async function apiGetproductmasterDrop(data) {
  return ApiService.fetchData({
    url: '/productmaster/drop/',
    method: 'get',
    data,
  });
}
export async function apiGetbrandwiseproductDrop(id) {
  return ApiService.fetchData({
    url: `/productmaster/brandwiseproduct/?BrandCode=${id}`,
    method: 'get',
  });
}
export async function apiGetSubproductmasterDrop(data) {
  return ApiService.fetchData({
    url: '/subproductmster/drop/',
    method: 'get',
    data,
  });
}
export async function ProductwiseDrop(data) {
  return ApiService.fetchData({
    url: `/subproductmster/dropproductwise/${data}`,
    method: 'get',
    data,
  });
}

const Postproduct = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      ProductName: param.ProductName,
      ERPCode: param.ERPCode,
      Remarks: param.Remarks,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/productmaster/',
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

const Putproduct = (param, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/productmaster/${param.ProductCode}`,
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
export async function apiGetclientmasterdropmaster(data) {
  return ApiService.fetchData({
    url: '/clientmaster/drop/',
    method: 'get',
    data,
  });
}

export async function apiGetclientmasterdropmasterbydate(
  start_date_str,
  end_date_str,
) {
  return ApiService.fetchData({
    url: `/clientmaster/getclientfrombooking/?start_date_str=${start_date_str}&end_date_str=${end_date_str}`,
    method: 'get',
  });
}

export async function apiGetdeallineItemtypemasterDrop(data) {
  return ApiService.fetchData({
    url: '/deallineItemtypemaster/drop/',
    method: 'get',
    data,
  });
}

export async function apiGetCommercialtypedropdown(data) {
  return ApiService.fetchData({
    url: '/commercialtypemaster/drop/',
    method: 'get',
    data,
  });
}
export async function apiGetsubproductmaster(data) {
  return ApiService.fetchData({
    url: '/subproductmster/',
    method: 'get',
    data,
  });
}

const Postsubproduct = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/subproductmster/',
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

const Putsubproduct = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/subproductmster/${data.SubProductCode}`,
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

export async function apiGetsubproductDrop(data) {
  return ApiService.fetchData({
    url: '/subproductmster/drop/',
    method: 'get',
    data,
  });
}

export async function apiGetPayroutemaster(data) {
  return ApiService.fetchData({
    url: '/payroutemaster/',
    method: 'get',
    data,
  });
}
export async function apiGetPayroutemasterDrop(data) {
  return ApiService.fetchData({
    url: '/payroutemaster/drop/',
    method: 'get',
    data,
  });
}
export async function apiGetTimebandmasterDrop(data) {
  return ApiService.fetchData({
    url: '/timebandmaster/drop/',
    method: 'get',
    data,
  });
}

const Postpayroute = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/payroutemaster/',
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

const Putpayroute = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/payroutemaster/${data.PayRouteCode}`,
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

export async function apiGetExchangeMaster(data) {
  return ApiService.fetchData({
    url: '/exchangemaster/',
    method: 'get',
    data,
  });
}

const PostExchange = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      CurrencyCode: param.CurrencyCode,
      ExchangeFromDt: param.ExchangeFromDt,
      ExchangeToDt: param.ExchangeToDt,
      ConversionRate: param.ConversionRate,
      IsActive: param.IsActive ? 1 : 0,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/exchangemaster/',
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

const PutExchange = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      CurrencyCode: param.CurrencyCode,
      ExchangeFromDt: param.ExchangeFromDt,
      ExchangeToDt: param.ExchangeToDt,
      ConversionRate: param.ConversionRate,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/exchangemaster/${param.Id}`,
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

export async function apiGetSponsortypemaster(data) {
  return ApiService.fetchData({
    url: '/sponsortypemaster/',
    method: 'get',
    data,
  });
}

const PostSponsortype = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      SponsorTypeName: param.SponsorTypeName,
      IsActive: param.IsActive ? 1 : 0,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/sponsortypemaster/',
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

const PutSponsortype = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      SponsorTypeName: param.SponsorTypeName,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/sponsortypemaster/${param.SponsorTypeCode}`,
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

export async function apiGetTimeBandmaster(data) {
  return ApiService.fetchData({
    url: '/timebandmaster/',
    method: 'get',
    data,
  });
}
export async function apiGetTimeBandmasterdrop3(data) {
  return ApiService.fetchData({
    url: '/timebandmaster/drop/',
    method: 'get',
    data,
  });
}
const PostTimeBand = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      TimeBandName: param.TimeBandName,
      ShortName: param.ShortName,
      StartTime: param.StartTime,
      EndTime: param.EndTime,
      IsActive: param.IsActive ? 1 : 0,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/timebandmaster/',
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

const PutTimeBand = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      TimeBandName: param.TimeBandName,
      ShortName: param.ShortName,
      StartTime: param.StartTime,
      EndTime: param.EndTime,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/timebandmaster/${param.TimeBandCode}`,
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
export async function apiGetCreditratemaster(data) {
  return ApiService.fetchData({
    url: '/creditratemaster/',
    method: 'get',
    data,
  });
}

const Postcreditrate = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      CreditRateName: param.CreditRateName,
      ShortName: param.ShortName,
      CreditLowerLimit: param.CreditLowerLimit,
      CreditUpperLimit: param.CreditUpperLimit,
      CreditPeriod: param.CreditPeriod,
      IsActive: param.IsActive ? 1 : 0,
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/creditratemaster/',

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

const Putcreditrate = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      CreditRateName: param.CreditRateName,
      ShortName: param.ShortName,
      CreditLowerLimit: param.CreditLowerLimit,
      CreditUpperLimit: param.CreditUpperLimit,
      CreditPeriod: param.CreditPeriod,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/creditratemaster/${param.CreditRateCode}`,
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

export async function apiGetagencymaster(data) {
  return ApiService.fetchData({
    url: '/agencymaster/',
    method: 'get',
  });
}
export async function apiGetagencymasterDrop(data) {
  return ApiService.fetchData({
    url: '/agencymaster/drop/',
    method: 'get',
  });
}

export async function apiGetAgencygetagencyasperclient(ID) {
  return ApiService.fetchData({
    url: `/agencymaster/getagencyasperclient/${ID}`,
    method: 'get',
  });
}
export async function apiGetclientasperagency(ID) {
  return ApiService.fetchData({
    url: `/agencymaster/getaClientasperAgency/${ID}`,
    method: 'get',
  });
}

export async function apiGetdealasperagencyclient(ID, ID2) {
  return ApiService.fetchData({
    url: `/paymententry/getdealasperagencyclient/?AgencyCode=${ID}&ClientCode=${ID2}`,
    method: 'get',
  });
}
export async function apiGetBrandasperclient(ID) {
  return ApiService.fetchData({
    url: `/clientmaster/getbrandclientwise/${ID}`,
    method: 'get',
  });
}
export async function apiGetAgencyEmployee(ID) {
  return ApiService.fetchData({
    url: `/agencyempmap/${ID}`,
    method: 'get',
  });
}

export async function getaClientasperAgency(ID) {
  return ApiService.fetchData({
    url: `/agencymaster/getaClientasperAgency/${ID}`,
    method: 'get',
  });
}
const agencyadd = (data, token) => {
  return fetch(appConfig.apiPrefix + '/agencymaster/Agencyadd/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const agencyput = (data, token, AgencyCode) => {
  return fetch(appConfig.apiPrefix + `/agencymaster/agencyput/${AgencyCode}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  });
};

// const Postagency = (param, token) => {
//     return new Promise((resolve, reject) => {
//         let data = JSON.stringify({
//             AgencyName: param.AgencyName,
//             AgencyShortName: param.AgencyShortName,
//             ERPCode: param.ERPCode,
//             Address1: param.Address1,
//             Address2: param.Address2,
//             PinCode: param.PinCode,
//             PlaceCode: param.PlaceCode,
//             StateCode: param.StateCode,
//             CountryCode: param.CountryCode,
//             ContactPerson: param.ContactPerson,
//             Mobile: param.Mobile,
//             Phone: param.Phone,
//             Fax: param.Fax,
//             Email: param.Email,
//             Website: param.Website,
//             OtherDetails: param.OtherDetails,
//             CreditRateCode: param.CreditRateCode,
//             IsAAAI: param.IsAAAI,
//             IBF: param.IBF,
//             TnC: param.TnC,
//             AgencyPANNumber: param.AgencyPANNumber,
//             AgencyTANNumber: param.AgencyTANNumber,
//             Remarks: param.Remarks,
//             AgencyLoginID: param.AgencyLoginID,
//             AgencyLoginPWD: param.AgencyLoginPWD,
//             IsWebActive: param.IsWebActive,
//             cBillRegistrationNo: param.cBillRegistrationNo,
//             MPIN: param.MPIN,
//             TPIN: param.TPIN,
//             IsMobileActive: param.IsMobileActive,
//             OnHold: param.OnHold,
//             IsBillingAddress: param.IsBillingAddress,
//             IsDirect_Client: param.IsDirect_Client,
//             IsGovernment: param.IsGovernment,
//             BarcCode: param.BarcCode,
//             BusinessTypeCode: param.BusinessTypeCode,
//             IsActive: param.IsActive ? 1 : 0,
//         })

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: ' /agencymaster/',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//             data: data,
//         }

//         axios
//             .request(config)
//             .then((response) => {
//                 resolve(response)
//             })
//             .catch((errors) => {
//                 reject(errors)
//             })
//     })
// }

// const Putagency = (param, token) => {
//     return new Promise((resolve, reject) => {
//         let data = JSON.stringify({
//             AgencyName: param.AgencyName,
//             AgencyShortName: param.AgencyShortName,
//             ERPCode: param.ERPCode,
//             Address1: param.Address1,
//             Address2: param.Address2,
//             PinCode: param.PinCode,
//             PlaceCode: param.PlaceCode,
//             StateCode: param.StateCode,
//             CountryCode: param.CountryCode,
//             ContactPerson: param.ContactPerson,
//             Mobile: param.Mobile,
//             Phone: param.Phone,
//             Fax: param.Fax,
//             Email: param.Email,
//             Website: param.Website,
//             OtherDetails: param.OtherDetails,
//             CreditRateCode: param.CreditRateCode,
//             IsAAAI: param.IsAAAI,
//             IBF: param.IBF,
//             TnC: param.TnC,
//             AgencyPANNumber: param.AgencyPANNumber,
//             AgencyTANNumber: param.AgencyTANNumber,
//             Remarks: param.Remarks,
//             AgencyLoginID: param.AgencyLoginID,
//             AgencyLoginPWD: param.AgencyLoginPWD,
//             IsWebActive: param.IsWebActive,
//             cBillRegistrationNo: param.cBillRegistrationNo,
//             MPIN: param.MPIN,
//             TPIN: param.TPIN,
//             IsMobileActive: param.IsMobileActive,
//             OnHold: param.OnHold,
//             IsBillingAddress: param.IsBillingAddress,
//             IsDirect_Client: param.IsDirect_Client,
//             IsGovernment: param.IsGovernment,
//             BarcCode: param.BarcCode,
//             BusinessTypeCode: param.BusinessTypeCode,
//             IsActive: param.IsActive ? 1 : 0,
//         })

//         let config = {
//             method: 'put',
//             maxBodyLength: Infinity,
//             url: ` /agencymaster/${param.AgencyCode}`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//             data: data,
//         }

//         axios
//             .request(config)
//             .then((response) => {
//                 resolve(response)
//             })
//             .catch((errors) => {
//                 reject(errors)
//             })
//     })
// }

export async function apiGetagencygroupmaster(data) {
  return ApiService.fetchData({
    url: '/agencygroupmaster/',
    method: 'get',
    data,
  });
}

const Postagencygroup = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/agencygroupmaster/',
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

const Putagencygroup = (data, AgencyGroupCode, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url:
        appConfig.apiPrefix +
        `/agencygroupmaster/Weekdaysadd/${AgencyGroupCode}`,
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
export async function apiGetclientgroupmaster(data) {
  return ApiService.fetchData({
    url: '/clientgroupmaster/',
    method: 'get',
    data,
  });
}

const Postclientgroup = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/clientgroupmaster/',
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

const Putclientgroup = (data, ClientGroupCode, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url:
        appConfig.apiPrefix +
        `/clientgroupmaster/Weekdaysadd/${ClientGroupCode}`,
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

export async function apiGetDealtypemaster(data) {
  return ApiService.fetchData({
    url: '/dealtypemaster/',
    method: 'get',
    data,
  });
}

export async function apiGetDealtypemasterDrop(data) {
  return ApiService.fetchData({
    url: '/dealtypemaster/drop/',
    method: 'get',
    data,
  });
}
const Postdealtype = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      DealTypeName: param.DealTypeName,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/dealtypemaster/',
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

const PutDealtype = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      DealTypeName: param.DealTypeName,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/dealtypemaster/${param.DealTypeCode}`,
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

export async function apiGetSpotPreferencemaster(data) {
  return ApiService.fetchData({
    url: '/spotpreferencemaster/',
    method: 'get',
    data,
  });
}

const PostSpotPreference = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      SpotPreferenceName: param.SpotPreferenceName,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/spotpreferencemaster/',
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

const PutSpotPreference = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      SpotPreferenceName: param.SpotPreferenceName,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url:
        appConfig.apiPrefix +
        `/spotpreferencemaster/${param.SpotPreferenceCode}`,
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

export async function apiGetRateCardmaster(data) {
  return ApiService.fetchData({
    url: `/ratecardmaster/?LocationCode=${data.LocationCode}&ChannelCode=${data.ChannelCode}`,
    method: 'get',
    data,
  });
}

export async function apiGetspotcancellation(
  formState,
  SelectedItem,
  SpotType = 0,
  BookingStatus,
  IsNTC = 0,
  LocationCode,
  ChannelCode,
) {
  // formState?.Deal > 0 ? formState?.Deal : 0
  // formState?.Agency > 0 ? formState?.Agency : 0
  // formState?.Brand > 0 ? formState?.Brand : 0

  return ApiService.fetchData({
    url: `/spotcancellation/?LocationCode=${LocationCode}&ChannelCode=${ChannelCode}&fromdate=${convertDateToYMD(
      formState.datesrange[0],
    )}&todate=${convertDateToYMD(formState.datesrange[1])}&Client=${SelectedItem.value
      }&BookingStatus=${BookingStatus}&IsNTC=${IsNTC}&SpotTypeCode=${SpotType}&AgencyCode=${formState?.Agency > 0 ? formState?.Agency : 0}&DealNumber=${formState?.Deal > 0 ? formState?.Deal : 0}&BrandCode=${formState?.Brand > 0 ? formState?.Brand : 0}`,
    method: 'get',
  });
}
export async function apiGetspotcancellationReplacement(
  formState,
  selectedClient,
  selectedCommercial,
  IsNTC,
  LocationCode,
  ChannelCode,
) {
  return ApiService.fetchData({
    url: `/spotcancellation/?LocationCode=${LocationCode}&ChannelCode=${ChannelCode}&fromdate=${formState.StartDate}&todate=${formState.EndDate}&Client=${selectedClient.value}&BookingStatus=B E R&CommercialCode=${selectedCommercial.value}&IsNTC=${IsNTC}`,
    method: 'get',
  });
}

export async function apiGetspotReplacement(
  formState,
  selectedClient,
  selectedCommercial,
  IsNTC,
  LocationCode,
  ChannelCode,
) {
  return ApiService.fetchData({
    url: `/spotcancellation/replacement/?LocationCode=${LocationCode}&ChannelCode=${ChannelCode}&fromdate=${formState.StartDate}&todate=${formState.EndDate}&Client=${selectedClient.value}&BookingStatus=B E R&CommercialCode=${selectedCommercial.value}&IsNTC=${IsNTC}`,
    method: 'get',
  });
}

const Postratecard = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      LocationCode: param.Locationcode,
      ChannelCode: param.ChannelCode,
      RateCardName: param.RateCardName,
      TimeBandCode: param.TimeBandCode,
      ContentCode: param.ContentCode,
      Rateper10sec: param.Rateper10sec,
      Rateper30sec: param.Rateper30sec,
      Rateperspot: param.Rateperspot,
      CurrencyCode: param.CurrencyCode,
      EffectiveFrom: param.EffectiveFrom,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/ratecardmaster/',
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
const PostDealMaster = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/dealmaster/Deal/',
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

const PostSponsorDealMapping = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + '/dealmaster/sponsordealmapping/',
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
const PutDealMaster = (data, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/dealmaster/Deal/${data.Deal.DealNumber}`,
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

const Putratecard = (param, token) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      LocationCode: param.Locationcode,
      ChannelCode: param.ChannelCode,
      RateCardName: param.RateCardName,
      TimeBandCode: param.TimeBandCode,
      ContentCode: param.ContentCode,
      Rateper10sec: param.Rateper10sec,
      Rateper30sec: param.Rateper30sec,
      Rateperspot: param.Rateperspot,
      CurrencyCode: param.CurrencyCode,
      EffectiveFrom: param.EffectiveFrom,
      IsActive: param.IsActive ? 1 : 0,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: appConfig.apiPrefix + `/ratecardmaster/${param.RateCardCode}`,
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

export async function apiGetAgencyPaymentMaster(data) {
  return ApiService.fetchData({
    url: '/paymententry/',
    method: 'get',
    data,
  });
}
const AddAgencyPaymentapi = (row, token, Channel) => {
  return fetch(appConfig.apiPrefix + `/paymententry`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(row),
  });
};

const UpdateAgencyPayment = (row, token) => {
  return fetch(appConfig.apiPrefix + `/paymententry/${row.PayId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(row),
  });
};

export {
  Postbrand,
  Putbrand,
  Postproduct,
  Putproduct,
  Postsubproduct,
  Putsubproduct,
  Postpayroute,
  Putpayroute,
  // Postagency,
  // Putagency,
  Postagencygroup,
  Putagencygroup,
  Postclientgroup,
  Putclientgroup,
  Postcreditrate,
  Putcreditrate,
  agencyadd,
  agencyput,
  Postdealtype,
  PutDealtype,
  Postratecard,
  Putratecard,
  PostTimeBand,
  PutTimeBand,
  PostExchange,
  PutExchange,
  PostSponsortype,
  PutSponsortype,
  PostSpotPreference,
  PutSpotPreference,
  PostDealMaster,
  PostSponsorDealMapping,
  PutDealMaster,
  AddAgencyPaymentapi,
  UpdateAgencyPayment,
};
