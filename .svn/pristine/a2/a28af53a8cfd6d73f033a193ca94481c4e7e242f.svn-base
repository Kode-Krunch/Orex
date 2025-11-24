import appConfig from 'configs/app.config';
import ApiService from './ApiService';
const axios = require('axios');

const getCreditNotes = async (channel, token) => {
  try {
    return ApiService.fetchData({
      method: 'get',
      url: `/creditdebitmaster/?LocationCode=${channel.LocationCode}&ChannelCode=${channel.ChannelCode}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

const apiCreateCreditDebitMaster = async (data, token) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: appConfig.apiPrefix + `/creditdebitmaster/`,
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

const apiInvoicePaymentUpdate = (data, token) => {
  try {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: appConfig.apiPrefix + `/invoice/invoicepaymentupdate/`,
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

export { getCreditNotes, apiCreateCreditDebitMaster, apiInvoicePaymentUpdate };
