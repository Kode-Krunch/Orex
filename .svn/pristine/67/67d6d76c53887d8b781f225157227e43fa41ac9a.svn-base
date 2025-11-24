import {
  apiGetAgencyEmployee,
  apiGetclientmasterdropmaster,
  apiGetCreditratemaster,
  getaClientasperAgency,
} from 'services/CreditcontrolService';
import {
  apiGetAgencyCityIDCITY,
  apiGetBussinessTypemaster,
  apiGetCountryDrop,
  apiGetempmasterdropmaster,
  apiGetPlaceMasterbyId,
  apiGetStateMasterbyId,
} from 'services/MasterService';
import { v4 as uuid } from 'uuid';

const isAgencyDetailsValid = (values, errors) => {
  return (
    values.agencyName &&
    !errors.agencyName &&
    values.agencyShortName &&
    !errors.agencyShortName &&
    !errors.agencyDetailsErpCode &&
    !errors.pan &&
    !errors.tan &&
    !errors.barcCode &&
    values.creditRateLimit &&
    values.businessType &&
    values.mobile &&
    !errors.mobile &&
    !errors.phone &&
    !errors.fax &&
    values.contactPerson &&
    !errors.contactPerson &&
    values.email &&
    !errors.email &&
    (values.creditType === 1
      ? values.creditDays && !errors.creditDays
      : values.creditType)
  );
};

const agencyDetailsTooltip = (values, errors) => {
  let tooltipMessage = '';
  if (!values.agencyName) tooltipMessage = 'Agency Name Required';
  else if (errors.agencyName) tooltipMessage = 'Agency Name Invalid';
  else if (!values.agencyShortName)
    tooltipMessage = 'Agency Short Name Required';
  else if (errors.agencyShortName) tooltipMessage = 'Agency Short Name Invalid';
  else if (errors.agencyDetailsErpCode) tooltipMessage = 'ERP Code Invalid';
  else if (errors.pan) tooltipMessage = 'PAN Number Invalid';
  else if (errors.tan) tooltipMessage = 'TAN Number Invalid';
  else if (errors.barcCode) tooltipMessage = 'BARC Code Invalid';
  else if (errors.barcCode) tooltipMessage = 'BARC Code Invalid';
  else if (!values.creditRateLimit)
    tooltipMessage = 'Credit Rate Limit Required';
  else if (!values.businessType) tooltipMessage = 'Business Type Required';
  else if (!values.mobile) tooltipMessage = 'Mobile Number Required';
  else if (errors.mobile) tooltipMessage = 'Mobile Number Invalid';
  else if (errors.phone) tooltipMessage = 'Phone Number Invalid';
  else if (errors.fax) tooltipMessage = 'FAX Number Invalid';
  else if (errors.fax) tooltipMessage = 'FAX Number Invalid';
  else if (!values.contactPerson) tooltipMessage = 'Contact Person Required';
  else if (errors.contactPerson) tooltipMessage = 'Contact Person Invalid';
  else if (!values.email) tooltipMessage = 'Email Address Required';
  else if (errors.email) tooltipMessage = 'Email Address Invalid';
  else if (!values.creditType) tooltipMessage = 'Credit Type Required';
  else if (values.creditType === 1 && !values.creditDays)
    tooltipMessage = 'Credit Days Required';
  else if (values.creditType === 1 && values.creditDays && errors.creditDays)
    tooltipMessage = 'Credit Days Invalid';
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

const getBusinessTypeOptions = async () => {
  try {
    const response = await apiGetBussinessTypemaster();
    if (response.status === 200)
      return response.data.map((option) => ({
        ...option,
        value: option.BusinessTypeCode,
        label: option.BusinessTypeName,
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
  agencyDetails,
  creditRateLimitOptions,
  businessTypeOptions,
  setFormInitValues,
) => {
  try {
    let agencyFlags = [];
    if (agencyDetails.IBF === 1) agencyFlags.push(1);
    if (agencyDetails.IsAAAI === 1) agencyFlags.push(2);
    if (agencyDetails.OnHold === 1) agencyFlags.push(3);
    if (agencyDetails.IsGovernment === 1) agencyFlags.push(4);
    if (agencyDetails.IsDirect_Client === 1) agencyFlags.push(5);
    const formInitValue = {
      agencyName: agencyDetails.AgencyName,
      agencyShortName: agencyDetails.AgencyShortName,
      agencyDetailsErpCode: agencyDetails.ERPCode,
      pan: agencyDetails.AgencyPANNumber,
      tan: agencyDetails.AgencyTANNumber,
      barcCode: agencyDetails.BarcCode,
      creditRateLimit: creditRateLimitOptions.filter(
        (option) =>
          option.value === agencyDetails.CreditRateMaster.CreditRateCode,
      )[0],
      businessType: businessTypeOptions.filter(
        (option) =>
          option.value === agencyDetails.BusinessType.BusinessTypeCode,
      )[0],
      agencyFlags,
      status: agencyDetails.IsActive === 1 ? true : false,
      remarks: agencyDetails.Remarks,
      mobile: agencyDetails.Mobile,
      phone: agencyDetails.Phone,
      fax: agencyDetails.Fax,
      contactPerson: agencyDetails.ContactPerson,
      email: agencyDetails.Email,
      creditType:
        agencyDetails.IsCredit === 1 ? 1 : agencyDetails.IsAdvPmt === 1 ? 2 : 3,
      creditDays: agencyDetails.IsCredit === 1 ? agencyDetails.CreditDays : '',
      multipleAddresses: await getAgencyAddresses(agencyDetails.AgencyCode),
      mappedExecutives: await getMappedExecutives(agencyDetails.AgencyCode),
      mappedClients: await getMappedClients(agencyDetails.AgencyCode),
    };
    setFormInitValues(formInitValue);
  } catch (error) {
    console.error(error);
  }
};

const getAgencyAddresses = async (agencyCode) => {
  let addresses = [];
  try {
    const response = await apiGetAgencyCityIDCITY(agencyCode);
    if (response.status === 200) {
      addresses = response.data.map((address) => ({
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
        erpCode: '',
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

const getMappedExecutives = async (agencyCode) => {
  let executives = [];
  try {
    const response = await apiGetAgencyEmployee(agencyCode);
    if (response.status === 200) {
      executives = response.data.map((executive) => ({
        value: executive.Employee.EmployeeCode,
        label: executive.Employee.Emp_FirstName,
      }));
    }
  } catch (error) {
    console.error(error);
  } finally {
    return executives;
  }
};

const getMappedClients = async (agencyCode) => {
  let clients = [];
  try {
    const response = await getaClientasperAgency(agencyCode);
    if (response.status === 200) {
      clients = response.data.map((client) => ({
        value: client.ClientCode,
        label: client.ClientName,
      }));
    }
  } catch (error) {
    console.error(error);
  } finally {
    return clients;
  }
};

const getDataToSubmit = (values) => {
  const multipleAddresses = values.multipleAddresses.map((address) => ({
    AddressLine1: address.fullAddress,
    AddressLine2: '',
    CountryCode: address.country.value,
    StateCode: address.state.value,
    PlaceCode: address.city.value,
    PinCode: address.postalCode,
    GSTN_id: address.isGstRegistered ? address.gstNumber : '0',
    IsGST_registered: address.isGstRegistered ? 1 : 0,
    NovCode: '',
    IsActive: 1,
  }));
  const mappedExecutives = values.mappedExecutives.map((item) => ({
    EmployeeCode: item.value,
    IsActive: 1,
  }));
  const mappedClients = values.mappedClients.map((client) => ({
    ClientCode: client.value,
    IsActive: 1,
  }));
  const data = {
    Agency: {
      AgencyName: values.agencyName,
      AgencyShortName: values.agencyShortName,
      ERPCode: values.agencyDetailsErpCode,
      Address1: multipleAddresses[0].AddressLine1,
      Address2: multipleAddresses[0].AddressLine2,
      PinCode: multipleAddresses[0].PinCode,
      PlaceCode: multipleAddresses[0].PlaceCode,
      StateCode: multipleAddresses[0].StateCode,
      CountryCode: multipleAddresses[0].CountryCode,
      ContactPerson: values.contactPerson,
      Mobile: values.mobile,
      Phone: values.phone,
      Fax: values.fax,
      Email: values.email,
      Website: '',
      OtherDetails: '',
      CreditRateCode: values.creditRateLimit.value,
      IsAAAI: values.agencyFlags.includes(2) ? 1 : 0,
      IBF: values.agencyFlags.includes(1) ? 1 : 0,
      TnC: '',
      AgencyPANNumber: values.pan,
      AgencyTANNumber: values.tan,
      Remarks: values.remarks,
      AgencyLoginID: '',
      AgencyLoginPWD: '',
      IsWebActive: 0,
      cBillRegistrationNo: '',
      MPIN: '',
      TPIN: '',
      IsMobileActive: 0,
      OnHold: values.agencyFlags.includes(3) ? 1 : 0,
      IsBillingAddress: 0,
      IsDirect_Client: values.agencyFlags.includes(5) ? 1 : 0,
      IsGovernment: values.agencyFlags.includes(4) ? 1 : 0,
      BarcCode: values.barcCode,
      BusinessTypeCode: values.businessType.value,
      IsCredit: values.creditType === 1 ? 1 : 0,
      IsAdvPmt: values.creditType === 2 ? 1 : 0,
      IsPDC: values.creditType === 3 ? 1 : 0,
      CreditDays: values.creditDays ? Number(values.creditDays) : 0,
      IsActive: values.status,
    },
    agencycity: multipleAddresses,
    agencyempmap: mappedExecutives,
    agencyclientmap: mappedClients,
  };
  return data;
};

export {
  isAgencyDetailsValid,
  agencyDetailsTooltip,
  getCreditRateLimitOptions,
  getBusinessTypeOptions,
  getCountryOptions,
  getStateOptions,
  getCityOptions,
  getExecutiveOptions,
  getClientOptions,
  initPageForEdit,
  getDataToSubmit,
};
