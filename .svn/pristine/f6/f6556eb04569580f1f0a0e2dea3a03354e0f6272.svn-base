import {
  apiGetclientmasterdropmaster,
  apiGetCreditratemaster,
} from 'services/CreditcontrolService';
import {
  apiGetCountryDrop,
  apiGetempmasterdropmaster,
  apiGetPlaceMasterbyId,
  apiGetStateMasterbyId,
} from 'services/MasterService';
import { v4 as uuid } from 'uuid';
import {
  apiGetClientEmployees,
  clientcitydetails,
} from '../../../services/MasterService';

const isClientDetailsValid = (values, errors) => {
  return (
    values.clientName &&
    !errors.clientName &&
    values.clientShortName &&
    !errors.clientShortName &&
    !errors.clientDetailsErpCode &&
    !errors.pan &&
    !errors.tan &&
    !errors.barcCode &&
    values.creditRateLimit &&
    values.mobile &&
    !errors.mobile &&
    !errors.phone &&
    !errors.fax &&
    values.contactPerson &&
    !errors.contactPerson &&
    values.email &&
    !errors.email
  );
};

const clientDetailsTooltip = (values, errors) => {
  let tooltipMessage = '';
  if (!values.clientName) tooltipMessage = 'Client Name Required';
  else if (errors.clientName) tooltipMessage = 'Client Name Invalid';
  else if (!values.clientShortName)
    tooltipMessage = 'Client Short Name Required';
  else if (errors.clientShortName) tooltipMessage = 'Client Short Name Invalid';
  else if (errors.clientDetailsErpCode) tooltipMessage = 'ERP Code Invalid';
  else if (errors.pan) tooltipMessage = 'PAN Number Invalid';
  else if (errors.tan) tooltipMessage = 'TAN Number Invalid';
  else if (errors.barcCode) tooltipMessage = 'BARC Code Invalid';
  else if (errors.barcCode) tooltipMessage = 'BARC Code Invalid';
  else if (!values.creditRateLimit)
    tooltipMessage = 'Credit Rate Limit Required';
  else if (!values.mobile) tooltipMessage = 'Mobile Number Required';
  else if (errors.mobile) tooltipMessage = 'Mobile Number Invalid';
  else if (errors.phone) tooltipMessage = 'Phone Number Invalid';
  else if (errors.fax) tooltipMessage = 'FAX Number Invalid';
  else if (errors.fax) tooltipMessage = 'FAX Number Invalid';
  else if (!values.contactPerson) tooltipMessage = 'Contact Person Required';
  else if (errors.contactPerson) tooltipMessage = 'Contact Person Invalid';
  else if (!values.email) tooltipMessage = 'Email Address Required';
  else if (errors.email) tooltipMessage = 'Email Address Invalid';
  else tooltipMessage = false;
  return tooltipMessage;
};

const getCreditRateLimitOptions = async () => {
  try {
    const response = await apiGetCreditratemaster();
    if (response.status === 200)
      return response.data.map((option) => ({
        ...option,
        value: option.CreditRateCode,
        label: option.CreditRateName,
      }));
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getCountryOptions = async () => {
  try {
    const response = await apiGetCountryDrop();
    if (response.status === 200)
      return response.data.map((option) => ({
        ...option,
        value: option.CountryCode,
        label: option.CountryName,
      }));
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getStateOptions = async (countryCode) => {
  try {
    const response = await apiGetStateMasterbyId(countryCode);
    if (response.status === 200)
      return response.data.map((option) => ({
        ...option,
        value: option.StateCode,
        label: option.StateName,
        tinNo: option.StateTinNo,
      }));
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getCityOptions = async (stateCode) => {
  try {
    const response = await apiGetPlaceMasterbyId(stateCode);
    if (response.status === 200)
      return response.data.map((option) => ({
        ...option,
        value: option.PlaceCode,
        label: option.PlaceName,
      }));
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getExecutiveOptions = async () => {
  try {
    const response = await apiGetempmasterdropmaster();
    if (response.status === 200)
      return response.data.map((option) => ({
        ...option,
        value: option.EmployeeCode,
        label: option.Emp_FirstName,
      }));
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getClientOptions = async () => {
  try {
    const response = await apiGetclientmasterdropmaster();
    if (response.status === 200)
      return response.data.map((option) => ({
        ...option,
        value: option.ClientCode,
        label: option.ClientName,
      }));
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const initPageForEdit = async (
  clientDetails,
  creditRateLimitOptions,
  setFormInitValues,
  token,
) => {
  try {
    let clientFlags = [];
    if (clientDetails.IBF === '1') clientFlags.push(1);
    if (clientDetails.IsAAAI === '1') clientFlags.push(2);
    if (clientDetails.OnHold === '1') clientFlags.push(3);
    if (clientDetails.IsGovernment === '1') clientFlags.push(4);
    const formInitValue = {
      clientName: clientDetails.ClientName,
      clientShortName: clientDetails.ClientShortName,
      clientDetailsErpCode: clientDetails.ERPCODE,
      pan: clientDetails.ClientPANNumber,
      tan: clientDetails.ClientTANNumber,
      barcCode: clientDetails.BarcCode,
      creditRateLimit: creditRateLimitOptions.filter(
        (option) => `${option.value}` === clientDetails.CreditRateCode,
      )[0],
      clientFlags: clientFlags,
      status: clientDetails.IsActive === '1' ? true : false,
      remarks: clientDetails.Remarks,
      mobile: clientDetails.Mobile,
      phone: clientDetails.Phone,
      fax: clientDetails.Fax,
      contactPerson: clientDetails.ContactPerson,
      email: clientDetails.Email,
      multipleAddresses: await getClientAddresses(
        Number(clientDetails.ClientCode),
        token,
      ),
      mappedExecutives: await getMappedExecutives(
        Number(clientDetails.ClientCode),
      ),
    };
    setFormInitValues(formInitValue);
  } catch (error) {
    console.error(error);
  }
};

const getClientAddresses = async (clientCode, token) => {
  let addresses = [];
  try {
    const response = await clientcitydetails(clientCode, token);
    const responseData = await response.json();
    if (response.status === 200) {
      addresses = responseData.map((address) => ({
        id: uuid(),
        fullAddress: address.AddressLine1,
        country: {
          value: address.Country.CountryCode,
          label: address.Country.CountryName,
        },
        state: {
          value: address.State.StateCode,
          label: address.State.StateName,
          tinNo: address.State.StateTinNo,
        },
        city: {
          value: address.Place.PlaceCode,
          label: address.Place.PlaceName,
        },
        postalCode: address.PinCode,
        isGstRegistered: address.IsGST_registered,
        gstNumber: address.GSTN_id === '0' ? '' : address.GSTN_id,
      }));
    }
  } catch (error) {
    console.error(error);
  } finally {
    return addresses;
  }
};

const getMappedExecutives = async (cliendCode) => {
  let executives = [];
  try {
    const response = await apiGetClientEmployees(cliendCode);
    if (response.status === 200) {
      executives = response.data.map((executive) => ({
        value: executive.Employee.EmployeeCode,
        label: `${executive.Employee.Emp_FirstName} ${executive.Employee.Emp_LastName}`,
      }));
    }
  } catch (error) {
    console.error(error);
  } finally {
    return executives;
  }
};

const getDataToSubmitForEdit = (values) => {
  const primaryAddress = values.multipleAddresses[0];
  const data = {
    ClientName: values.clientName,
    ClientShortName: values.clientShortName,
    ERPCODE: values.clientDetailsErpCode,
    MainAddress1: primaryAddress.fullAddress,
    MainAddress2: '',
    CountryCode: primaryAddress.country.value,
    StateCode: primaryAddress.state.value,
    PlaceCode: primaryAddress.city.value,
    MainPinCode: primaryAddress.postalCode,
    ContactPerson: values.contactPerson,
    Mobile: values.mobile,
    Phone: values.phone,
    Fax: values.fax,
    Email: values.email,
    Website: '',
    OtherDetails: '',
    CreditRateCode: values.creditRateLimit.value,
    IsAAAI: values.clientFlags.includes(2) ? 1 : 0,
    IBF: values.clientFlags.includes(1) ? 1 : 0,
    TnC: '',
    ClientPANNumber: values.pan,
    ClientTANNumber: values.tan,
    Remarks: values.remarks,
    ClientLoginID: '',
    ClientLoginPWD: '',
    IsWebActive: 0,
    cBillRegistrationNo: '',
    MPIN: '',
    TPIN: '',
    IsMobileActive: 0,
    OnHold: values.clientFlags.includes(3) ? 1 : 0,
    IsBillingAddress: 0,
    IsSubClient: 0,
    IsGovernment: values.clientFlags.includes(4) ? 1 : 0,
    BarcCode: values.barcCode,
    IsActive: values.status ? 1 : 0,
  };
  return data;
};

const getDataToSubmitForAdd = (values) => {
  const multipleAddresses = values.multipleAddresses.map((address) => ({
    AddressLine1: address.fullAddress,
    AddressLine2: '',
    CountryCode: address.country.value,
    StateCode: address.state.value,
    PlaceCode: address.city.value,
    PinCode: address.postalCode,
    GSTN_id: address.isGstRegistered ? address.gstNumber : '0',
    IsGST_registered: address.isGstRegistered ? 1 : 0,
    IsActive: 1,
  }));
  const mappedExecutives = values.mappedExecutives.map((item) => ({
    EmployeeCode: item.value,
    IsActive: 1,
  }));
  const data = {
    Client: {
      ClientName: values.clientName,
      ClientShortName: values.clientShortName,
      ERPCODE: values.clientDetailsErpCode,
      MainAddress1: multipleAddresses[0].AddressLine1,
      MainAddress2: multipleAddresses[0].AddressLine2,
      CountryCode: multipleAddresses[0].CountryCode,
      StateCode: multipleAddresses[0].StateCode,
      PlaceCode: multipleAddresses[0].PlaceCode,
      MainPinCode: multipleAddresses[0].PinCode,
      ContactPerson: values.contactPerson,
      Mobile: values.mobile,
      Phone: values.phone,
      Fax: values.fax,
      Email: values.email,
      Website: '',
      OtherDetails: '',
      CreditRateCode: values.creditRateLimit.value,
      IsAAAI: values.clientFlags.includes(2) ? 1 : 0,
      IBF: values.clientFlags.includes(1) ? 1 : 0,
      TnC: '',
      ClientPANNumber: values.pan,
      ClientTANNumber: values.tan,
      Remarks: values.remarks,
      ClientLoginID: '',
      ClientLoginPWD: '',
      IsWebActive: 0,
      cBillRegistrationNo: '',
      MPIN: '',
      TPIN: '',
      IsMobileActive: 0,
      OnHold: values.clientFlags.includes(3) ? 1 : 0,
      IsBillingAddress: 0,
      IsSubClient: 0,
      IsGovernment: values.clientFlags.includes(4) ? 1 : 0,
      BarcCode: values.barcCode,
      IsActive: values.status,
    },
    clientcity: multipleAddresses,
    clientempmap: mappedExecutives,
    subclientmaster: [],
  };
  return data;
};

export {
  isClientDetailsValid,
  clientDetailsTooltip,
  getCreditRateLimitOptions,
  getCountryOptions,
  getStateOptions,
  getCityOptions,
  getExecutiveOptions,
  getClientOptions,
  initPageForEdit,
  getDataToSubmitForEdit,
  getDataToSubmitForAdd,
};
