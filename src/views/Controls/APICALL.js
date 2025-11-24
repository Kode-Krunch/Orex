import { convertDateToYMD } from 'components/validators';
import {
  apiCallstoreprocedure,
  apiCallstoreprocedureRRR,
} from 'services/CommonService';
import { openNotification } from './GLOBALFUNACTION';

export const GetClient = async (
  channel,
  location,
  fromDate,
  todate,
  Flag,
  IsNTC,
) => {
  const pr = {
    par_location: location,
    par_channel: channel,
    par_fromDate: convertDateToYMD(fromDate),
    par_todate: convertDateToYMD(todate),
    par_Flag: Flag,
    par_IsNTC: IsNTC,
  };
  const resp = await apiCallstoreprocedure(
    'usp_Billing_ListForBilling',
    pr,
  );

  if (resp.status == 204) {
    openNotification('warning', 'Client Data Not Found !');
    return [];
  }
  const convertIntegersToStrings = () => {
    return resp.data.map((item) => {
      const newItem = { ...item };
      Object.keys(newItem).forEach((key) => {
        if (typeof newItem[key] === 'number') {
          newItem[key] = newItem[key].toString();
        }
      });
      return newItem;
    });
  };
  return convertIntegersToStrings();
};

export const GetAgency = async (
  channel,
  location,
  fromDate,
  todate,
  Flag,
  IsNTC,
) => {
  const pr = {
    par_location: location,
    par_channel: channel,
    par_fromDate: convertDateToYMD(fromDate),
    par_todate: convertDateToYMD(todate),
    par_Flag: Flag,
    par_IsNTC: IsNTC,
  };
  const resp = await apiCallstoreprocedure(
    'usp_Billing_ListForBilling',
    pr,
  );
  if (resp.status == 204) {
    openNotification('warning', 'Agency Data Not Found !');
    return [];
  }
  const convertIntegersToStrings = () => {
    return resp.data.map((item) => {
      const newItem = { ...item };
      Object.keys(newItem).forEach((key) => {
        if (typeof newItem[key] === 'number') {
          newItem[key] = newItem[key].toString();
        }
      });
      return newItem;
    });
  };
  return convertIntegersToStrings();
};

export const GetBooking = async (
  channel,
  location,
  fromDate,
  todate,
  Flag,
  IsNTC,
) => {
  const pr = {
    par_location: location,
    par_channel: channel,
    par_fromDate: convertDateToYMD(fromDate),
    par_todate: convertDateToYMD(todate),
    par_Flag: Flag,
    par_IsNTC: IsNTC,
  };
  const resp = await apiCallstoreprocedure(
    'usp_Billing_ListForBilling',
    pr,
  );
  if (resp.status == 204) {
    openNotification('warning', 'Booking Data Not Found !');
    return [];
  }

  const convertIntegersToStrings = () => {
    return resp.data.map((item) => {
      const newItem = { ...item };
      Object.keys(newItem).forEach((key) => {
        if (typeof newItem[key] === 'number') {
          newItem[key] = newItem[key].toString();
        }
      });
      return newItem;
    });
  };
  return convertIntegersToStrings();
};
export const GetSponsor = async (
  channel,
  location,
  fromDate,
  todate,
  Flag,
  IsNTC,
) => {
  const pr = {
    par_location: location,
    par_channel: channel,
    par_fromDate: convertDateToYMD(fromDate),
    par_todate: convertDateToYMD(todate),
    par_Flag: Flag,
    par_IsNTC: IsNTC,
  };
  const resp = await apiCallstoreprocedure(
    'usp_Billing_ListForSponsorBilling',
    pr,
  );
  if (resp.status == 204) {
    openNotification('warning', 'Sponsor Wise Data Not Found !');
    return [];
  }

  const convertIntegersToStrings = () => {
    return resp.data.map((item) => {
      const newItem = { ...item };
      Object.keys(newItem).forEach((key) => {
        if (typeof newItem[key] === 'number') {
          newItem[key] = newItem[key].toString();
        }
      });
      return newItem;
    });
  };
  return convertIntegersToStrings();
};

export const GetDataApi = async (
  ChannelCode,
  LocationCode,
  FromDate,
  UptoDate,
  InvoiceDate,
  Filter,
  FilterType,
  AddedBy,
) => {
  const pr = {
    par_ChannelCode: ChannelCode,
    par_LocationCode: LocationCode,
    par_FromDate: FromDate,
    par_UptoDate: UptoDate,
    par_InvoiceDate: InvoiceDate,
    par_Filter: Filter,
    par_FilterType: FilterType,
    par_AddedBy: AddedBy,
    par_IsNTC: 0,
  };
  const resp = await apiCallstoreprocedureRRR(pr);

  const convertIntegersToStrings = () => {
    return resp.data.map((item) => {
      const newItem = { ...item };
      Object.keys(newItem).forEach((key) => {
        if (typeof newItem[key] === 'number') {
          newItem[key] = newItem[key].toString();
        }
      });
      return newItem;
    });
  };
  return convertIntegersToStrings();
};
