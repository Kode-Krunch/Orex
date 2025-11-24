import appConfig from 'configs/app.config';
import ApiService from './ApiService';
const axios = require('axios');

/* ASRUN MATCHING */
const apiAsrunCreate = (
  data,
  telecastDate,
  locationCode,
  channelCode,
  token,
) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url:
          appConfig.apiPrefix +
          `/asrun/?TelecastDate=${telecastDate}&LocationCode=${locationCode}&ChannelCode=${channelCode}`,
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
    throw new Error(error);
  }
};

/* INVOICE SERIES */
// Invoice Series
const apiGetInvoice = (
  { filter, id, loginCode, fromDate, uptoDate, channelCode, locationCode },
  token,
) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'get',
        url:
          appConfig.apiPrefix +
          `/invoice/getinvoice/?Filter=${filter}&ID=${id}&LoginCode=${loginCode}&FromDate=${fromDate}&UptoDate=${uptoDate}&ChannelCode=${channelCode}&LocationCode=${locationCode}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
    throw new Error(error);
  }
};


const apiGetInvoiceSeries = (channel, token) => {
  try {
    return ApiService.fetchData({
      method: 'get',
      url: `/invoiceseries/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const apiGetTelecastReport = (
  { filter, id, loginCode, fromDate, uptoDate, channelCode, locationCode, SpotTypeCode },
  token,
) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'get',
        url:
          appConfig.apiPrefix +
          `/invoice/gettelecastreport/?Filter=${filter}&ID=${id}&LoginCode=${loginCode}&FromDate=${fromDate}&UptoDate=${uptoDate}&ChannelCode=${channelCode}&LocationCode=${locationCode}&SpotType=${SpotTypeCode}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
    throw new Error(error);
  }
};

const apiGetTelecastReportSeries = (channel, token) => {
  try {
    return ApiService.fetchData({
      method: 'get',
      url: `/telecastreportseries/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const apiCreateInvoiceSeries = async (data, token) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: appConfig.apiPrefix + `/invoiceseries/`,
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

const apiUpdateInvoiceSeries = (data, id, token) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: appConfig.apiPrefix + `/invoiceseries/${id}`,
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
    throw new Error(error);
  }
};

// Invoice Series NTC
const apiGetInvoiceNTC = (
  { filter, id, loginCode, fromDate, uptoDate, channelCode, locationCode },
  token,
) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'get',
        url:
          appConfig.apiPrefix +
          `/invoice/getinvoiceNTC/?Filter=${filter}&ID=${id}&LoginCode=${loginCode}&FromDate=${fromDate}&UptoDate=${uptoDate}&ChannelCode=${channelCode}&LocationCode=${locationCode}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
    throw new Error(error);
  }
};

const apiGetInvoiceSeriesNTC = (channel, token) => {
  try {
    return ApiService.fetchData({
      method: 'get',
      url: `/invoiceseriesntc/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

const apiCreateInvoiceSeriesNTC = async (data, token) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: appConfig.apiPrefix + `/invoiceseriesntc/`,
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

const apiUpdateInvoiceSeriesNTC = (data, id, token) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: appConfig.apiPrefix + `/invoiceseriesntc/${id}`,
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
    throw new Error(error);
  }
};

/* YEAR TAX DETAILS */
const apiGetYearTaxDetails = (token) => {
  try {
    return ApiService.fetchData({
      method: 'get',
      url: `/yeartaxdetail/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

const apiCreateYearTaxDetails = (yearCode, data, token) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: appConfig.apiPrefix + `/yeartaxdetail/?YearCode=${yearCode}`,
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

const apiPOSTAsrunMatch = (data, channel, token, IsNTC) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url:
          appConfig.apiPrefix +
          `/asrun/asrunmatch/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}&IsNTC=${IsNTC}`,
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

export {
  apiAsrunCreate,
  apiGetInvoice,
  apiGetInvoiceSeries,
  apiCreateInvoiceSeries,
  apiUpdateInvoiceSeries,
  apiGetInvoiceNTC,
  apiGetInvoiceSeriesNTC,
  apiCreateInvoiceSeriesNTC,
  apiUpdateInvoiceSeriesNTC,
  apiGetYearTaxDetails,
  apiCreateYearTaxDetails,
  apiPOSTAsrunMatch,
  apiGetTelecastReport,
  apiGetTelecastReportSeries,
};
