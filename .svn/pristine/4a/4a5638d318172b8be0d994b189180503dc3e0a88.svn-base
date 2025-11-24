import React, { useState, useEffect, useRef } from 'react';
import {
  Switcher,
  Card,
  Button,
  Input,
  Select,
  Checkbox,
  FormItem,
  FormContainer,
} from 'components/ui';
import { HiOutlinePencil } from 'react-icons/hi';
import Radio from 'components/ui/Radio';
import { Toast } from 'primereact/toast';
import {
  apiGetBussinessTypemaster,
  apishowplaceTree,
} from 'services/MasterService';
import {
  validate,
  validateCustomFields,
  validateFieldsAgency,
  showError,
  removeError,
  validatePAN,
  isNumeric,
} from 'components/validators';
import { apiGetCreditratemaster } from 'services/CreditcontrolService';

const BasicDetails = ({
  Agency,
  setAgency,
  displayBasicDetails,
  setdisplayBasicDetails,
  displayContact,
  setdisplayContact,
  countrys,
  states,
  citys,
}) => {
  const [BasicDetailsCompleted, setBasicDetailsCompleted] = useState(false);

  let selectednodeKey =
    Agency?.PlaceCode + '-' + Agency?.StateCode + '-' + Agency?.CountryCode;
  let initialpaymentmode = '';
  if (Agency.IsPDC == 1) {
    initialpaymentmode = 'IsPDC';
  }
  if (Agency.IsCredit == 1) {
    initialpaymentmode = 'IsCredit';
  }
  if (Agency.IsAdvPmt == 1) {
    initialpaymentmode = 'IsAdvPmt';
  }

  const [selectedNodeKey, setSelectedNodeKey] = useState(selectednodeKey);
  const [errorAgencyName, seterrorAgencyName] = useState(false);
  const [errorAgencyShortName, seterrorAgencyShortName] = useState(false);
  const [errorERPCODE, seterrorERPCODE] = useState(false);
  const [errorAgencyPANNumber, seterrorAgencyPANNumber] = useState(false);
  const [errorAgencyTANNumber, seterrorAgencyTANNumber] = useState(false);
  const [errorBarcCode, seterrorBarcCode] = useState(false);
  const [errorInvalidPANNumber, seterrorInvalidPANNumber] = useState(false);
  const [CreditRateCodes, setCreditRateCodes] = useState([]);
  const [BusinessTypeCodes, setBusinessTypeCodes] = useState([]);
  const [paymentmode, setpaymentmode] = useState(initialpaymentmode);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async (values) => {
      const response = await apishowplaceTree(values);

      const newArray = [];

      response.data.forEach((country) => {
        country.children.forEach((state) => {
          state.children.forEach((place) => {
            newArray.push({
              CountryCode: country.CountryCode,
              StateCode: state.StateCode,
              PlaceCode: place.PlaceCode,
              PlaceName: place.PlaceName,
              value: place.PlaceCode,
              label: place.PlaceName,
            });
          });
        });
      });

      setPlaces(newArray);
    })();
  }, []);

  useEffect(() => {
    switch (paymentmode) {
      case 'IsPDC':
        setAgency({ ...Agency, IsPDC: 1, IsCredit: 0, IsAdvPmt: 0 });
        break;
      case 'IsCredit':
        setAgency({ ...Agency, IsCredit: 1, IsPDC: 0, IsAdvPmt: 0 });
        break;
      case 'IsAdvPmt':
        setAgency({ ...Agency, IsAdvPmt: 1, IsPDC: 0, IsCredit: 0 });
        break;
      default:
        break;
    }
  }, [paymentmode]);

  useEffect(() => {
    let res = validate(selectedNodeKey)
      ? selectedNodeKey.split('-')
      : [0, 0, 0];

    setAgency({
      ...Agency,
      CountryCode: res[2],
      StateCode: res[1],
      PlaceCode: res[0],
    }); //setCountryCode(res[0])
  }, [selectedNodeKey]);

  // CENTRALISED BILLING ADDRESS
  useEffect(() => {
    (async (values) => {
      const Content = await apiGetCreditratemaster(values);

      const formattedOptions = Content.data.map((option) => ({
        value: option.CreditRateCode,
        label: option.CreditRateName,
      }));
      setCreditRateCodes(formattedOptions);
    })();
    (async (values) => {
      const Content = await apiGetBussinessTypemaster(values);
      const formattedOptions = Content.data.map((option) => ({
        value: option.BusinessTypeCode,
        label: option.BusinessTypeName,
      }));
      setBusinessTypeCodes(formattedOptions);
    })();
  }, []);

  const [CountryCode, setCountryCode] = useState(Agency.CountryCode);
  const [StateCode, setStateCode] = useState(Agency.StateCode);
  const [PlaceCode, setPlaceCode] = useState(Agency.PlaceCode);
  const [errorAddress1, seterrorAddress1] = useState('');
  const [errorAddress2, seterrorAddress2] = useState('');
  const [errorMainPinCode, seterrorMainPinCode] = useState('');

  useEffect(() => {
    setAgency({
      ...Agency,
      CountryCode: CountryCode,
      StateCode: StateCode,
      PlaceCode: PlaceCode,
    });
  }, [CountryCode, StateCode, PlaceCode]);

  useEffect(() => {
    let res =
      validate(Agency.CreditRateCode) &&
      validate(Agency.BusinessTypeCode) &&
      validate(Agency.AgencyName) &&
      validate(Agency.AgencyShortName) &&
      validate(Agency.ERPCode) &&
      validate(Agency.AgencyPANNumber) &&
      validate(Agency.AgencyTANNumber) &&
      validate(Agency.BarcCode) &&
      validate(Agency.MainAddress1) &&
      validate(Agency.Address2) &&
      validate(Agency.PinCode);

    setBasicDetailsCompleted(res);
  }, [Agency]);

  useEffect(() => {
    setdisplayContact(false);
  }, [BasicDetailsCompleted]);

  // CONTACT
  // const [Mobile, setMobile] = useState(Agency.Mobile)
  // const [Phone, setPhone] = useState(Agency.Phone)
  // const [Fax, setFax] = useState(Agency.Fax)
  // const [ContactPerson, setContactPerson] = useState(Agency.ContactPerson)
  // const [Email, setEmail] = useState(Agency.Email)

  const [errorMobile, seterrorMobile] = useState('');
  const [errorPhone, seterrorPhone] = useState('');
  const [errorFax, seterrorFax] = useState('');
  const [errorContactPerson, seterrorContactPerson] = useState('');
  const [errorEmail, seterrorEmail] = useState('');

  // CHECK TYPES
  // const [IBF, setIBF] = useState(Agency.IBF)
  // const [IsAAAI, setIsAAAI] = useState(Agency.IsAAAI)
  // const [IsGovernment, setIsGovernment] = useState(Agency.IsGovernment)
  // const [IsDirectClient, setIsDirectClient] = useState(Agency.IsDirectClient)
  // const [IsCredit, setIsCredit] = useState(Agency.IsCredit)
  // const [IsAdvPmt, setIsAdvPmt] = useState(Agency.IsAdvPmt)
  // const [IsPDC, setIsPDC] = useState(Agency.IsPDC)
  // const [CreditDays, setCreditDays] = useState(Agency.CreditDays)
  // const [OnHold, setOnHold] = useState(Agency.OnHold)
  // const [IsActive, setIsActive] = useState(Agency.IsActive)
  // others
  // const [Remarks, setRemarks] = useState(Agency.Remarks)

  useEffect(() => {
    let res = {};
    //basic details
    // res.AgencyTANNumber = AgencyTANNumber
    // res.BarcCode = BarcCode
    // res.CreditRateCode = CreditRateCode
    // res.BusinessTypeCode = BusinessTypeCode
    // res.MainAddress1 = MainAddress1
    // res.Address2 = Address2
    res.CountryCode = CountryCode;
    res.StateCode = StateCode;
    res.PlaceCode = PlaceCode;
    // res.MainPinCode = MainPinCode
    //CONTACT
    // res.Mobile = Mobile
    // res.Phone = Phone
    // res.Fax = Fax
    // res.ContactPerson = ContactPerson
    // res.Email = Email
    // res.IBF = Agency.IBF ? 1 : 0
    // res.IsAAAI = IsAAAI ? 1 : 0
    // res.IsGovernment = IsGovernment ? 1 : 0
    // res.IsDirectClient = IsDirectClient ? 1 : 0
    // res.IsCredit = IsCredit ? 1 : 0
    // res.IsAdvPmt = IsAdvPmt ? 1 : 0
    // res.IsPDC = IsPDC ? 1 : 0
    // res.CreditDays = CreditDays ? 1 : 0
    // res.OnHold = OnHold ? 1 : 0
    // res.IsActive = IsActive ? 1 : 0
    // res.Remarks = Remarks
  }, [
    // AgencyTANNumber,
    // BarcCode,
    // CreditRateCode,
    // BusinessTypeCode,
    // MainAddress1,
    // Address2,
    CountryCode,
    StateCode,
    PlaceCode,
    // MainPinCode,
    // Mobile,
    // Phone,
    // Fax,
    // ContactPerson,
    // Email,
    // IBF,
    // IsAAAI,
    // IsGovernment,
    // IsDirectClient,
    // IsCredit,
    // IsAdvPmt,
    // IsPDC,
    // CreditDays,
    // OnHold,
    // IsActive,
    // Remarks,
  ]);

  const headerExtraContent = (
    <Button
      className="text-emerald-500 text-xl"
      shape="circle"
      variant="plain"
      onClick={() => {
        setdisplayBasicDetails(true);
      }}
      icon={<HiOutlinePencil />}
    />
  );
  const toast = useRef(null);
  const cardFooter = (
    <div className="flex justify-end">
      <Button
        size="md"
        onClick={() => {
          const invalidFields = validateFieldsAgency(Agency);
          if (invalidFields) {
            const fieldNames = invalidFields.join(', ');
            toast.current.show({
              severity: 'error',
              summary: 'Error',
              detail: `The following fields are compulsory and missing: ${fieldNames}`,
            });
          } else {
            setdisplayBasicDetails(false);
            setdisplayContact(true);
          }
        }}
      >
        Continue
      </Button>
    </div>
  );

  const headerExtraContent2 = (
    <Button
      className="text-emerald-500 text-xl"
      shape="circle"
      variant="plain"
      onClick={() => {
        setdisplayContact(true);
      }}
      icon={<HiOutlinePencil />}
    />
  );

  const cardFooter2 = (
    <div className="flex justify-end">
      <Button
        size="md"
        onClick={() => {
          const invalidFields = validateCustomFields(Agency, [
            'Mobile',
            'ContactPerson',
            'Email',
          ]);
          if (invalidFields) {
            const fieldNames = invalidFields.join(', ');
            toast.current.show({
              severity: 'error',
              summary: 'Error',
              detail: `The following fields are compulsory and missing: ${fieldNames}`,
            });
          } else {
            setdisplayContact(false);
          }
        }}
      >
        Continue
      </Button>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className="grid grid-flow-row auto-rows-max gap-4">
        <Card
          header={
            displayBasicDetails ? (
              'Basic Details'
            ) : (
              <div>
                <h5>Basic Details</h5>
                <p>{Agency.AgencyName}</p>
                <p>{citys[PlaceCode]}</p>
              </div>
            )
          }
          bodyClass={displayBasicDetails ? 'd-block' : 'd-none'}
          footer={displayBasicDetails ? cardFooter : null}
          headerExtra={displayBasicDetails ? null : headerExtraContent}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1">
              <Card>
                <FormContainer>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-2 ">
                      <FormItem
                        label="Agency Name"
                        invalid={errorAgencyName}
                        errorMessage={'AgencyName Required'}
                        asterisk
                      >
                        <Input
                          id="AgencyName"
                          value={Agency.AgencyName}
                          onChange={(e) => {
                            setAgency({
                              ...Agency,
                              AgencyName: e.target.value,
                            });
                            if (!validate(e.target.value)) {
                              seterrorAgencyName(true);
                              showError('AgencyName');
                            } else {
                              seterrorAgencyName(false);
                              removeError('AgencyName');
                            }
                          }}
                          maxLength="100"
                          type="text"
                          size="sm"
                          placeholder="Agency Name"
                        />
                      </FormItem>
                      {/* </FormContainer> */}
                    </div>
                    <div className="col-span-1 ">
                      {/* <FormContainer> */}
                      <FormItem
                        label="Short Name"
                        invalid={errorAgencyShortName}
                        errorMessage={'AgencyShortName Required'}
                        asterisk
                      >
                        <Input
                          id="AgencyShortName"
                          value={Agency.AgencyShortName}
                          onChange={(e) => {
                            setAgency({
                              ...Agency,
                              AgencyShortName: e.target.value,
                            });
                            // setAgencyShortName(
                            //     e.target.value
                            // )
                            if (!validate(e.target.value)) {
                              seterrorAgencyShortName(true);
                              showError('AgencyShortName');
                            } else {
                              seterrorAgencyShortName(false);
                              removeError('AgencyShortName');
                            }
                          }}
                          maxLength="5"
                          type="text"
                          size="sm"
                          placeholder="Short Name"
                        />
                      </FormItem>
                    </div>
                    {/* </FormContainer> */}
                    <div className="col-span-1 ">
                      {/* <FormContainer> */}
                      <FormItem
                        label="ERPCODE"
                        invalid={errorERPCODE}
                        errorMessage={'ERPCODE Required'}
                      >
                        <Input
                          id="ERPCODE"
                          value={Agency.ERPCode}
                          onChange={(e) => {
                            setAgency({ ...Agency, ERPCode: e.target.value });
                            if (!validate(e.target.value)) {
                              seterrorERPCODE(true);
                              showError('ERPCODE');
                            } else {
                              seterrorERPCODE(false);
                              removeError('ERPCODE');
                            }
                          }}
                          maxLength="10"
                          type="text"
                          size="sm"
                          placeholder="ERPCODE"
                        />
                      </FormItem>
                    </div>
                    {/* </FormContainer> */}
                    <div className="col-span-1 ">
                      {/* <FormContainer> */}
                      <FormItem
                        label="PAN Number"
                        invalid={errorAgencyPANNumber || errorInvalidPANNumber}
                        errorMessage={
                          errorInvalidPANNumber
                            ? 'Invalid PANNumber'
                            : 'AgencyPANNumber Required'
                        }
                      >
                        <Input
                          id="AgencyPANNumber"
                          value={Agency.AgencyPANNumber}
                          onChange={(e) => {
                            setAgency({
                              ...Agency,
                              AgencyPANNumber: e.target.value,
                            });
                            if (!validate(e.target.value)) {
                              seterrorAgencyPANNumber(true);
                              showError('AgencyPANNumber');
                            } else {
                              seterrorAgencyPANNumber(false);
                              removeError('AgencyPANNumber');
                            }

                            if (!validatePAN(e.target.value)) {
                              seterrorInvalidPANNumber(true);
                              showError('AgencyPANNumber');
                            } else {
                              seterrorInvalidPANNumber(false);
                              removeError('AgencyPANNumber');
                            }
                          }}
                          type="text"
                          size="sm"
                          placeholder="PAN Number"
                          maxLength="10"
                        />
                      </FormItem>
                    </div>
                    {/* </FormContainer> */}
                    <div className="col-span-1 ">
                      {/* <FormContainer> */}
                      <FormItem
                        label="TAN Number"
                        invalid={errorAgencyTANNumber}
                        errorMessage={'AgencyTANNumber Required'}
                      >
                        <Input
                          id="AgencyTANNumber"
                          value={Agency.AgencyTANNumber}
                          onChange={(e) => {
                            // setAgencyTANNumber(e.target.value)

                            setAgency({
                              ...Agency,
                              AgencyTANNumber: e.target.value,
                            });
                            if (!validate(e.target.value)) {
                              seterrorAgencyTANNumber(true);
                              showError('AgencyTANNumber');
                            } else {
                              seterrorAgencyTANNumber(false);
                              removeError('AgencyTANNumber');
                            }
                          }}
                          maxLength="10"
                          type="text"
                          size="sm"
                          placeholder="TAN Number"
                        />
                      </FormItem>
                    </div>
                    {/* </FormContainer> */}
                    <div className="col-span-1 ">
                      {/* <FormContainer> */}
                      <FormItem
                        label="BARC CODE"
                        invalid={errorBarcCode}
                        errorMessage={'BarcCode Required'}
                      // asterisk
                      >
                        <Input
                          id="BarcCode"
                          value={Agency.BarcCode}
                          onChange={(e) => {
                            setAgency({ ...Agency, BarcCode: e.target.value });
                            if (!validate(e.target.value)) {
                              seterrorBarcCode(true);
                              showError('BarcCode');
                            } else {
                              seterrorBarcCode(false);
                              removeError('BarcCode');
                            }
                          }}
                          maxLength="10"
                          type="text"
                          size="sm"
                          placeholder="BARC Code"
                        />
                      </FormItem>
                    </div>
                    <div className="col-span-1 ">
                      <FormItem
                        label="Credit Rate Limit"
                        // invalid={errorCreditRateCode}
                        errorMessage={'CreditRateCode Required'}
                        asterisk
                      >
                        <Select
                          placeholder="Select"
                          value={CreditRateCodes.filter(
                            (CreditRateCode) =>
                              CreditRateCode.value == Agency.CreditRateCode,
                          )}
                          onChange={(e) => {
                            setAgency({ ...Agency, CreditRateCode: e.value });
                          }}
                          options={CreditRateCodes}
                        ></Select>
                      </FormItem>
                    </div>
                    <div className="col-span-1 ">
                      <FormItem
                        label="Business Type"
                        // invalid={errorBusinessTypeCode}
                        errorMessage={'Business Type Required'}
                        asterisk
                      >
                        <Select
                          placeholder="Select"
                          value={BusinessTypeCodes.filter(
                            (BusinessTypeCode) =>
                              BusinessTypeCode.value == Agency.BusinessTypeCode,
                          )}
                          onChange={(e) => {
                            setAgency({ ...Agency, BusinessTypeCode: e.value });
                          }}
                          options={BusinessTypeCodes}
                        ></Select>
                      </FormItem>
                    </div>
                  </div>
                </FormContainer>
              </Card>
            </div>
            <div className="col-span-1 h-full">
              <Card className="h-full">
                <FormContainer>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-2">
                      <FormItem
                        label="Address"
                        invalid={errorAddress1}
                        errorMessage={'Address1 Required'}
                      >
                        <Input
                          textArea
                          id="Address1"
                          size="sm"
                          value={Agency.Address1}
                          maxLength="100"
                          onChange={(e) => {
                            setAgency({ ...Agency, Address1: e.target.value });
                            if (!validate(e.target.value)) {
                              seterrorAddress1(true);
                              // showError("MainAddress1")
                            } else {
                              seterrorAddress1(false);
                              // removeError("MainAddress1")
                            }
                          }}
                          placeholder="Address"
                        />
                      </FormItem>
                    </div>
                    {/* <div className="col-span-2">
                                            <FormItem
                                                // label="Address Line 2"
                                                invalid={errorAddress2}
                                                errorMessage={
                                                    'Address2 Required'
                                                }
                                            >
                                                <Input
                                                    textArea
                                                    id="Address2"
                                                    size="sm"
                                                    placeholder="Address Line 2"
                                                    value={Agency.Address2}
                                                    maxLength="100"
                                                    onChange={(e) => {
                                                        setAgency({ ...Agency, Address2: e.target.value })
                                                        if (
                                                            !validate(
                                                                e.target.value
                                                            )
                                                        ) {
                                                            seterrorAddress2(
                                                                true
                                                            )
                                                        } else {
                                                            seterrorAddress2(
                                                                false
                                                            )
                                                        }
                                                    }}
                                                />
                                            </FormItem>
                                        </div> */}
                    <div className="col-span-1">
                      <div className="card flex justify-content-center">
                        <FormItem
                          label="City"
                          className="w-full"
                          asterisk
                        >
                          <Select
                            placeholder="Select"
                            options={places}
                            value={places.filter(
                              (option) =>
                                option.value == selectedNodeKey.split('-')[0],
                            )}
                            onChange={(option) => {
                              setSelectedNodeKey(
                                option?.value +
                                '-' +
                                option?.StateCode +
                                '-' +
                                option?.CountryCode,
                              );
                              setPlaceCode(option.value);
                              setStateCode(option.StateCode);
                              setCountryCode(option.CountryCode);
                            }}
                          />
                        </FormItem>
                        {/* </FormContainer>           */}
                      </div>
                    </div>
                    <div className="col-span-1">
                      {/* <FormContainer> */}
                      <FormItem
                        label="Pincode"
                        invalid={errorMainPinCode}
                        errorMessage={'Valid PinCode Required'}
                        asterisk
                      >
                        <Input
                          type="text"
                          size="sm"
                          placeholder="Pincode"
                          id="MainPinCode"
                          value={Agency.PinCode}
                          maxLength="6"
                          onChange={(e) => {
                            // const inputValue = e.target.value;
                            // setMainPinCode(inputValue);
                            setAgency({ ...Agency, PinCode: e.target.value });
                            // Regular expression to match exactly six numeric characters
                            const sixDigitNumericRegex = /^\d{6}$/;

                            if (!sixDigitNumericRegex.test(e.target.value)) {
                              seterrorMainPinCode(true);
                              showError('PINCODE');
                            } else {
                              seterrorMainPinCode(false);
                              removeError('PINCODE');

                              // Additional validation related to PINCODE can be added here
                              // if (!validatePINCODE(e.target.value, countrys, states, citys, setSelectedNodeKey)) {
                              //     // Handle additional PINCODE validation if needed
                              // }
                            }
                          }}
                        />
                        {/* <Button onClick={() => { validatePINCODE(Agency.PinCode, countrys, states, citys, setSelectedNodeKey) }}>Check</Button> */}
                      </FormItem>
                    </div>
                  </div>
                </FormContainer>
              </Card>
            </div>
          </div>
        </Card>
        <Card
          header={
            displayContact ? (
              'Contact'
            ) : (
              <div>
                <h5>Contact</h5>
                <p>{Agency.Mobile}</p>
                <p>{Agency.ContactPerson}</p>
              </div>
            )
          }
          bodyClass={displayContact ? 'd-block' : 'd-none'}
          footer={displayContact ? cardFooter2 : null}
          headerExtra={
            !displayContact && BasicDetailsCompleted
              ? headerExtraContent2
              : null
          }
        >
          <div className="grid grid-cols-10 gap-5">
            <div className="col-span-7 h-full">
              <Card className="h-full">
                <FormContainer>
                  <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-1">
                      <FormItem
                        label="Mobile"
                        invalid={errorMobile}
                        errorMessage={'Valid Mobile No. Required'}
                        asterisk
                      >
                        <Input
                          id="Mobile"
                          value={Agency.Mobile}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            setAgency({ ...Agency, Mobile: inputValue });
                            // setMobile(inputValue);

                            // Regular expression to match exactly 10 numeric characters
                            const tenDigitNumericRegex = /^\d{10,15}$/;

                            if (!tenDigitNumericRegex.test(inputValue)) {
                              seterrorMobile(true);
                              showError('Mobile');
                            } else {
                              seterrorMobile(false);
                              removeError('Mobile');
                            }
                          }}
                          type="text"
                          size="sm"
                          placeholder="Mobile"
                          maxLength="15"
                        />
                      </FormItem>
                    </div>
                    <div className="col-span-1">
                      <FormItem
                        label="Phone"
                        invalid={errorPhone}
                        errorMessage={'Valid Phone No. Required'}
                      >
                        <Input
                          id="Phone"
                          value={Agency.Phone}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            // setPhone(inputValue);
                            setAgency({ ...Agency, Phone: inputValue });
                            // Regular expression to match exactly 10 numeric characters
                            const tenDigitNumericRegex = /^\d{10,15}$/;

                            if (!tenDigitNumericRegex.test(inputValue)) {
                              seterrorPhone(true);
                              showError('Phone');
                            } else {
                              seterrorPhone(false);
                              showError('Phone');
                            }
                          }}
                          type="text"
                          size="sm"
                          placeholder="Phone"
                          maxLength="15"
                        />
                      </FormItem>
                    </div>
                    <div className="col-span-1">
                      <FormItem
                        label="Fax"
                        invalid={errorFax}
                        errorMessage={'Valid Fax No. Required'}
                      >
                        <Input
                          id="Fax"
                          value={Agency.Fax}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            // setFax(inputValue);
                            setAgency({ ...Agency, Fax: inputValue });
                            // Regular expression to match exactly 10 numeric characters
                            const tenDigitNumericRegex = /^\d{10,15}$/;

                            if (!tenDigitNumericRegex.test(inputValue)) {
                              seterrorFax(true);
                              showError('Fax');
                            } else {
                              seterrorFax(false);
                              removeError('Fax');
                            }
                          }}
                          type="text"
                          size="sm"
                          placeholder="Fax"
                          maxLength="15"
                        />
                      </FormItem>
                    </div>
                    <div className="col-span-1">
                      <FormItem
                        label="Contact Person"
                        invalid={errorContactPerson}
                        errorMessage={'Valid Contact Person Required'}
                        asterisk
                      >
                        <Input
                          id="ContactPerson"
                          value={Agency.ContactPerson}
                          maxLength={50}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            // setContactPerson(inputValue);
                            setAgency({ ...Agency, ContactPerson: inputValue });
                            // Regular expression to match only alphabetic characters, spaces, hyphens, and apostrophes
                            const alphabeticOnlyRegex = /^[a-zA-Z\s'-]+$/;

                            if (!alphabeticOnlyRegex.test(inputValue)) {
                              seterrorContactPerson(true);
                              showError('ContactPerson');
                            } else {
                              seterrorContactPerson(false);
                              removeError('ContactPerson');
                            }
                          }}
                          type="text"
                          size="sm"
                          placeholder="Contact Person"
                        />
                      </FormItem>
                    </div>
                    <div className="col-span-1">
                      <FormItem
                        label="Email"
                        invalid={errorEmail}
                        errorMessage={'Invalid Email'}
                        asterisk
                      >
                        <Input
                          id="Email"
                          value={Agency.Email}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            setAgency({ ...Agency, Email: inputValue });
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(inputValue)) {
                              seterrorEmail(true);
                              showError('Email');
                            } else {
                              seterrorEmail(false);
                              showError('Email');
                            }
                          }}
                          type="email"
                          size="sm"
                          placeholder="Email"
                          maxLength={100}
                        />
                      </FormItem>
                    </div>
                  </div>
                </FormContainer>
              </Card>
            </div>
            <div className="col-span-3">
              <Card>
                <FormContainer>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Checkbox
                        onChange={
                          (checked) => setAgency({ ...Agency, IBF: checked }) //setIBF(e.checked)
                        }
                        checked={Agency.IBF}
                      >
                        IBF
                      </Checkbox>
                    </div>
                    <div className="col-span-1">
                      <Checkbox
                        name="IsAAAI"
                        value={Agency.IsAAAI}
                        onChange={(checked) =>
                          setAgency({ ...Agency, IsAAAI: checked })
                        }
                        checked={Agency.IsAAAI}
                      >
                        IsAAAI
                      </Checkbox>
                    </div>
                    <div className="col-span-1">
                      <Checkbox
                        name="OnHold"
                        value={Agency.OnHold}
                        onChange={(checked) =>
                          setAgency({ ...Agency, OnHold: checked })
                        }
                        checked={Agency.OnHold}
                      >
                        OnHold
                      </Checkbox>
                    </div>
                    <div className="col-span-1">
                      <Checkbox
                        name="IsGovernment"
                        value={Agency.IsGovernment}
                        onChange={(checked) =>
                          setAgency({ ...Agency, IsGovernment: checked })
                        }
                        checked={Agency.IsGovernment}
                      >
                        RCM
                      </Checkbox>
                    </div>
                    <div className="col-span-2">
                      <Checkbox
                        name="IsDirectClient"
                        value={Agency.IsDirectClient}
                        onChange={(checked) =>
                          setAgency({ ...Agency, IsDirectClient: checked })
                        }
                        checked={Agency.IsDirectClient}
                      >
                        IsDirectClient
                      </Checkbox>
                    </div>
                    {/* <div className="col-span-1">
                                            <Checkbox
                                                name="IsCredit"
                                                value={Agency.IsCredit}
                                                onChange={(checked) =>
                                                    setAgency({ ...Agency, IsCredit: checked })
                                                }
                                                checked={Agency.IsCredit}
                                            >
                                                IsCredit
                                            </Checkbox>
                                        </div> */}
                    {/* <div className="col-span-1">
                                            <Checkbox
                                                name="IsAdvPmt"
                                                value={Agency.IsAdvPmt}
                                                onChange={(checked) =>
                                                    setAgency({ ...Agency, IsAdvPmt: checked })
                                                }
                                                checked={Agency.IsAdvPmt}
                                            >
                                                IsAdvPmt
                                            </Checkbox>
                                        </div> */}
                    {/* <div className="col-span-1">
                                            <Checkbox
                                                name="IsPDC"
                                                value={Agency.IsPDC}
                                                onChange={(checked) =>
                                                    setAgency({ ...Agency, IsPDC: checked })
                                                }
                                                checked={Agency.IsPDC}
                                            >
                                                IsPDC
                                            </Checkbox>
                                        </div> */}
                    <div className="col-span-2">
                      <Radio.Group
                        value={paymentmode}
                        onChange={(val) => setpaymentmode(val)}
                      >
                        <Radio value={'IsCredit'}>IsCredit</Radio>

                        <Radio value={'IsAdvPmt'}>IsAdvPmt</Radio>

                        <Radio value={'IsPDC'}>IsPDC</Radio>
                      </Radio.Group>
                    </div>
                    <div className="col-span-1">
                      <FormItem
                        label="CreditDays"
                        errorMessage={'Valid CreditDays No. Required'}
                        asterisk
                      >
                        <Input
                          id="CreditDays"
                          value={Agency.CreditDays}
                          onChange={(e) => {
                            // const newValue = e.target.value.replace(/\D/g, '');
                            if (!isNumeric(e.target.value)) {
                              toast.current.show({
                                severity: 'error',
                                summary: 'Error',
                                detail: `Please enter only numbers for Credit Days.`,
                              });
                            } else {
                              setAgency({
                                ...Agency,
                                CreditDays: e.target.value,
                              });
                            }
                          }}
                          type="text"
                          size="sm"
                          placeholder="Credit Days"
                          maxLength="15"
                          disabled={!Agency.IsCredit}
                        />
                      </FormItem>
                    </div>
                    <div className="col-span-1">
                      <Switcher
                        onChange={(val, e) => {
                          setAgency({ ...Agency, IsActive: !val });
                        }}
                        checked={Agency.IsActive == 1 ? true : false}
                      />
                      <label htmlFor="" className="ml-2">
                        Active
                      </label>
                    </div>
                  </div>
                </FormContainer>
              </Card>
            </div>

            <div className="col-span-10">
              <FormContainer>
                <FormItem label="Remarks">
                  <Input
                    textArea
                    id="Remarks"
                    value={Agency.Remarks}
                    maxLength="50"
                    onChange={(e) =>
                      setAgency({ ...Agency, Remarks: e.target.value })
                    }
                    type="text"
                    size="sm"
                    placeholder="Remarks"
                  />
                </FormItem>
              </FormContainer>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BasicDetails;
