import { useState, useEffect, useRef } from 'react';
import BasicDetails from './components/BasicDetails';
import { apiGetCreditratemaster } from 'services/CreditcontrolService';
import {
  apiGetCountryDrop,
  apiGetStateDrop,
  apiGetPlaceDrop,
  apishowplaceTree,
} from 'services/MasterService';
import { HiOutlinePlus, HiOutlineX, } from 'react-icons/hi';
import { TabView, TabPanel } from 'primereact/tabview';
import { useSelector } from 'react-redux';
import {
  Card,
  Button,
  Input,
  Select,
  Checkbox,
  FormItem,
  FormContainer,
} from 'components/ui';
import { MultipleAddressesDataTable } from './components/MultipleAddressesDataTable';
import { MultiSelect } from 'primereact/multiselect';
import {
  apiGetempmasterdropmaster,
  clientadd,
} from 'services/MasterService';
import { validateAddress, validateInput } from 'components/validators';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import appConfig from 'configs/app.config';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const ALPHA_NUMERIC_UPPER_REGEX =
  appConfig.validation.alphaNumericUpperRegexWithoutSpaces;

const Clientmaster = () => {
  const navigate = useNavigate();
  const [countrys, setcountrys] = useState('');
  const [states, setstates] = useState('');
  const [citys, setcitys] = useState('');
  const [SelectedAddress, setSelectedAddress] = useState({});
  const [MultipleAddressDisabled, setMultipleAddressDisabled] = useState(true);
  const tokenS = useSelector((state) => state.auth.session.token);
  const { Content } = useSelector((state) => state.base.common);
  const [MapExecutiveDisabled, setMapExecutiveDisabled] = useState(true);
  const toast = useRef(null);
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  let res = {};
  res.AddressLine1 = true;
  res.AddressLine2 = true;

  const [errors, setErrors] = useState(res);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    console.error(errors);
  }, [errors]);

  const handleValidation1 = (event) => {
    const address = event.target.value;
    const validationResult = validateAddress(address, 99);
    setAddressLine1(address);

    const errorsUpdate = { ...errors };
    errorsUpdate.AddressLine1 = !validationResult.isValid
      ? validationResult.errorMessage
      : false;

    setErrors(errorsUpdate);

    const touchedUpdate = { ...touched };
    touchedUpdate.AddressLine1 = true;
    setTouched(touchedUpdate);
  };
  const handleValidation2 = (event) => {
    const address = event.target.value;
    const validationResult = validateAddress(address, 99);
    setAddressLine2(address);

    const errorsUpdate = { ...errors };
    errorsUpdate.AddressLine2 = !validationResult.isValid
      ? validationResult.errorMessage
      : false;

    setErrors(errorsUpdate);

    const touchedUpdate = { ...touched };
    touchedUpdate.AddressLine2 = true;
    setTouched(touchedUpdate);
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [CreditRateCodes, setCreditRateCodes] = useState([]);

  useEffect(() => {
    (async (values) => {
      const Content = await apiGetCreditratemaster(values);
      setIsLoaded(true);
      const formattedOptions = Content.data.map((option) => ({
        value: option.CreditRateCode,
        label: option.CreditRateName,
      }));
      setCreditRateCodes(formattedOptions);
    })();
  }, []);

  useEffect(() => {
    if (count.current == 1) {
      // get countries list
      apiGetCountryDrop(tokenS)
        .then((response) => response.json())
        .then((data) => {
          const countrys = [];

          for (const country of data) {
            countrys[country.CountryCode] = country.CountryName.trim();
          }

          setcountrys(countrys);
        })
        .catch((error) => {
          console.error(error);
        });

      // get states list
      apiGetStateDrop(tokenS)
        .then((response) => response.json())
        .then((data) => {
          const states = [];

          for (const state of data) {
            states[state.StateCode] = state.StateName.trim();
          }

          setstates(states);
        })
        .catch((error) => {
          console.error(error);
        });

      // get cities list
      apiGetPlaceDrop(tokenS)
        .then((response) => response.json())
        .then((data) => {
          const citys = [];

          for (const city of data) {
            citys[city.PlaceCode] = city.PlaceName.trim();
          }

          setcitys(citys);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const getcountry = (row) => {
    return countrys[row.CountryCode];
  };
  const getstate = (row) => {
    return states[row.StateCode];
  };
  const getcity = (row) => {
    return citys[row.Place.PlaceCode];
  };

  const [Client, setClient] = useState({ IsActive: true });

  // TAB2

  const [clientcity, setclientcity] = useState([]);
  const [AddressLine1, setAddressLine1] = useState('');
  const [AddressLine2, setAddressLine2] = useState('');

  const [PinCode, setPinCode] = useState('');
  const [GSTN_id, setGSTN_id] = useState('');
  const [IsGST_registered, setIsGST_registered] = useState(0);
  const [GSTCHECK, setGSTCHECK] = useState(0);
  const [errorPinCode, seterrorPinCode] = useState('');
  const [errorGSTN_id, seterrorGSTN_id] = useState('');
  const [errorIsGST_registered, seterrorIsGST_registered] = useState('');
  const [isEditAddressClicked, setIsEditAddressClicked] = useState(false);
  useEffect(() => {
    if (Object.keys(SelectedAddress).length !== 0) {
      setAddressLine1(SelectedAddress.AddressLine1);
      setAddressLine2(SelectedAddress.AddressLine2);
      setPinCode(SelectedAddress.PinCode);
      setGSTN_id(SelectedAddress.GSTN_id);
      setIsGST_registered(SelectedAddress.IsGST_registered);
      setSelectedNodeKey(
        SelectedAddress.Place.PlaceCode +
        '-' +
        SelectedAddress.StateCode +
        '-' +
        SelectedAddress.CountryCode,
      );
    }
  }, [SelectedAddress]);

  const [selectedNodeKey, setSelectedNodeKey] = useState('0-0-0');
  const [Place, setPlace] = useState([]);
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    (async (values) => {
      const Place = await apishowplaceTree(values);

      const newArray = [];

      Place.data.forEach((country) => {
        country.children.forEach((state) => {
          state.children.forEach((place) => {
            newArray.push({
              CountryCode: country.CountryCode,
              StateCode: state.StateCode,
              PlaceCode: place.PlaceCode,
              PlaceName: place.PlaceName,
              value: place.PlaceCode,
              label: place.PlaceName,
              StateTinNo: state.StateTinNo
            });
          });
        });
      });

      setPlace(newArray);
    })();
    (async (values) => {
      const Country = await apiGetCountryDrop(values);
      const formattedOptions = Country.data.map((option) => ({
        value: option.CountryCode,
        label: option.CountryName,
      }))
      setCountryList(formattedOptions);
    })();

  }, []);
  const [EmployeeList, setEmployeeList] = useState(false);
  const [selectedEmployees, setselectedEmployees] = useState(null);

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetempmasterdropmaster(values);
      const employees = resp.data
        //     .filter((Employee) => Employee.IsActive === 1)
        .map((employee) => {
          let res = {};
          res.name = employee.Emp_FirstName;
          res.EmployeeCode = employee.EmployeeCode;
          return res;
        });
      setEmployeeList(employees);
    })();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayBasicDetails, setdisplayBasicDetails] = useState(true);
  const [displayContact, setdisplayContact] = useState(false);

  return (
    <>
      <Toast ref={toast} />
      <Card>

        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Client" leftIcon="pi pi-calendar mr-2">
            {isLoaded && (
              <BasicDetails
                Client={Client}
                setClient={setClient}
                displayBasicDetails={displayBasicDetails}
                setdisplayBasicDetails={setdisplayBasicDetails}
                displayContact={displayContact}
                setdisplayContact={setdisplayContact}
                countrys={countrys}
                states={states}
                citys={citys}
                CreditRateCodes={CreditRateCodes}
              />
            )}
            <div style={{ marginBlock: '20px' }}>
              {!displayBasicDetails && !displayContact ? (
                <Button
                  variant="solid"
                  onClick={() => {
                    setActiveIndex(1);
                    setMultipleAddressDisabled(false);
                  }}
                >
                  Continue
                </Button>
              ) : null}
            </div>
          </TabPanel>

          <TabPanel
            header="Multiple Address"
            rightIcon="pi pi-user ml-2"
            disabled={MultipleAddressDisabled}
          >
            <Card>
              <FormContainer>
                <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                  <div className="col-span-5">
                    <FormItem
                      invalid={errors.AddressLine1 && touched.AddressLine1}
                      errorMessage={errors.AddressLine1}
                      label="Address Line 1"
                      asterisk
                    >
                      <Input
                        textArea
                        id="AddressLine1"
                        size="sm"
                        placeholder="Address Line 1"
                        value={AddressLine1}
                        maxLength="100"
                        onChange={handleValidation1}
                      />
                    </FormItem>
                  </div>
                  <div className="col-span-5">
                    <FormItem
                      // label="Address Line 2"
                      invalid={errors.AddressLine2 && touched.AddressLine2}
                      errorMessage={errors.AddressLine2}
                    >
                      <Input
                        textArea
                        id="AddressLine2"
                        size="sm"
                        placeholder="Address Line 2"
                        value={AddressLine2}
                        maxLength="100"
                        onChange={handleValidation2}
                      />
                    </FormItem>
                  </div>
                  <div className="col-span-2">

                    <FormItem label="City" asterisk className="w-full">
                      <Select
                        name="PlaceCode"
                        // form={form}

                        options={Place}
                        value={Place.filter(
                          (option) =>
                            option.value == selectedNodeKey?.split('-')[0],
                        )}
                        onChange={(option) => {
                          setSelectedNodeKey(
                            option?.value +
                            '-' +
                            option?.StateCode +
                            '-' +
                            option?.CountryCode,
                          );
                          setGSTCHECK(option.StateTinNo);
                        }}
                        isDisabled={isEditAddressClicked}
                      />
                    </FormItem>

                  </div>
                  <div className="col-span-2">
                    <FormItem
                      label="PINCODE"
                      invalid={errorPinCode}
                      errorMessage={'PinCode Required'}
                      asterisk
                    >
                      <Input
                        type="text"
                        size="sm"
                        placeholder="PINCODE"
                        id="PinCode"
                        value={PinCode}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          setPinCode(inputValue);

                          // Regular expression to match exactly 6 numeric characters
                          const sixDigitNumericRegex = /^\d{6}$/;

                          if (!sixDigitNumericRegex.test(inputValue)) {
                            seterrorPinCode(true);
                          } else {
                            seterrorPinCode(false);
                          }
                        }}
                        disabled={isEditAddressClicked}
                      />
                    </FormItem>
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-3">
                    <FormItem
                      label="GST Registered"
                      invalid={errorIsGST_registered}
                      errorMessage={'You must tick this!'}
                    >
                      <Checkbox
                        defaultChecked={IsGST_registered}
                        onChange={(value, e) => {
                          setIsGST_registered(value ? 1 : 0);
                          setGSTN_id('');
                        }}
                      >
                        We have Registered GST
                      </Checkbox>
                    </FormItem>
                  </div>
                  <div className="col-span-2">
                    <FormItem
                      label="GST"
                      invalid={errorGSTN_id}
                      errorMessage={'GST No. Invalid'}
                    >
                      <Input
                        disabled={!IsGST_registered}
                        id="GSTN_id"
                        value={GSTN_id}
                        onChange={(e) => {
                          const gstNumber = e.target.value.toUpperCase();
                          if (
                            ALPHA_NUMERIC_UPPER_REGEX.test(
                              gstNumber.toUpperCase(),
                            )
                          ) {
                            if (validateInput(gstNumber, 'GST')) {
                              seterrorGSTN_id(false);
                            } else {
                              seterrorGSTN_id(true);
                            }
                            setGSTN_id(gstNumber);
                          }
                        }}
                        type="text"
                        size="sm"
                        placeholder="GST"
                        maxLength={15}
                      />
                    </FormItem>
                  </div>
                </div>
              </FormContainer>
            </Card>
            <div align="right" style={{ marginBottom: '1rem' }}>
              <Button
                className="mr-1 mt-3"
                size="sm"
                icon={<HiOutlinePlus />}
                onClick={() => {
                  //check for edit start
                  if (IsGST_registered == 1) {
                    if (Number(GSTN_id.substring(0, 2)) != Number(GSTCHECK)) {
                      openNotification('warning', 'Please Enter Correct GST Number')
                      return
                    }
                  }
                  if (Object.keys(SelectedAddress).length !== 0) {
                    // Find the index of the object in the array with the matching ID
                    const index = clientcity.findIndex(
                      (obj) => obj.id === SelectedAddress.id,
                    );
                    let res = selectedNodeKey.split('-');
                    let address = {
                      id: SelectedAddress.id,
                      AddressLine1: AddressLine1,
                      AddressLine2: AddressLine2,
                      CountryCode: res[2],
                      StateCode: res[1],
                      Place: { PlaceCode: res[0] },
                      PinCode: PinCode,
                      GSTN_id: GSTN_id,
                      IsGST_registered: IsGST_registered,
                    };

                    // If the object is found, update it with the new values
                    if (index !== -1) {
                      let res = [...clientcity];
                      res[index] = address;
                      setclientcity(res);
                    }
                  } else {
                    let id = Math.floor(Math.random() * 900) + 100;
                    let res = selectedNodeKey.split('-');
                    let address = {
                      id: id,
                      AddressLine1: AddressLine1,
                      AddressLine2: AddressLine2,
                      CountryCode: res[2],
                      StateCode: res[1],
                      Place: { PlaceCode: res[0] },
                      PinCode: PinCode,
                      GSTN_id: GSTN_id,
                      IsGST_registered: Boolean(IsGST_registered),
                      IsActive: 1,
                      New: 1,
                    };
                    res = [...clientcity];
                    res.push(address);
                    setclientcity(res);
                  }

                  {
                    setAddressLine1('');
                    setAddressLine2('');
                    setGSTN_id('');
                    setPinCode('');
                    setIsGST_registered(false);
                    setSelectedAddress({});
                    setSelectedNodeKey(null);
                  }
                }}
              >
                <span>Add</span>
              </Button>
              <Button
                className="mr-1 mt-3"
                size="sm"
                icon={<HiOutlineX />}
                onClick={() => {
                  setAddressLine1('');

                  setAddressLine2('');
                  // setSelectedNodeKey(null)
                  setGSTN_id('');
                  setPinCode('');
                  setIsGST_registered(false);
                  setIsEditAddressClicked(false);
                }}
              >
                <span>Clear</span>
              </Button>
            </div>

            {MultipleAddressesDataTable(
              clientcity,
              getcountry,
              getstate,
              getcity,
              SelectedAddress,
              setSelectedAddress,
              Content,
              setIsEditAddressClicked,
              setclientcity,
            )}

            <div style={{ margin: '20px' }}>
              {!displayBasicDetails && !displayContact && clientcity.length ? (
                <Button
                  variant="solid"
                  onClick={() => {
                    setActiveIndex(2);
                    setMapExecutiveDisabled(false);
                  }}
                >
                  Continue
                </Button>
              ) : null}
            </div>
          </TabPanel>

          <TabPanel
            disabled={MapExecutiveDisabled}
            header="Map Executive"
            leftIcon="pi pi-search mr-2"
            rightIcon="pi pi-cog ml-2"
          >
            <div className="flex flex-col h-full justify-between">
              <h5 className="mb-4">Assign Employees</h5>
              <div>
                <div className="card flex justify-content-center">
                  <MultiSelect
                    value={selectedEmployees}
                    onChange={(e) => setselectedEmployees(e.value)}
                    options={EmployeeList}
                    optionLabel="name"
                    filter
                    placeholder="Select Employees"
                    maxSelectedLabels={8}
                    className="w-full md:w-20rem mb-2"
                  />
                </div>
              </div>
              <div className="text-right mt-6">
                <Button className="ltr:mr-2 rtl:ml-2" variant="plain">
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  onClick={() => {
                    let clientempmap = selectedEmployees.map((item) => ({
                      ...item,
                      IsActive: 1,
                    }));

                    const modifiedClientCity = clientcity.map((city) => {
                      city.PlaceCode = city.Place.PlaceCode;
                      const { id, Place, ...rest } = city;
                      return rest;
                    });

                    const modifiedclientempmap = clientempmap.map((row) => {
                      const { name, ...rest } = row;
                      return rest;
                    });

                    // Ensure IBF, IsAAAI, OnHold, and RCM are 0 if empty
                    let sanitizedClient = {
                      ...Client,
                      IBF: Client?.IBF !== undefined && Client?.IBF !== '' ? Client.IBF : 0,
                      IsAAAI: Client?.IsAAAI !== undefined && Client?.IsAAAI !== '' ? Client.IsAAAI : 0,
                      OnHold: Client?.OnHold !== undefined && Client?.OnHold !== '' ? Client.OnHold : 0,
                      RCM: Client?.RCM !== undefined && Client?.RCM !== '' ? Client.RCM : 0,
                    };

                    let data = {
                      Client: sanitizedClient,
                      clientcity: modifiedClientCity,
                      clientempmap: modifiedclientempmap,
                    };

                    let res = clientadd(data, tokenS);

                    res
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.status_code == 200) {
                          toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Client created successfully',
                          });
                          navigate('/ClientMaster');
                        } else {
                          toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: data.detail,
                          });
                        }
                      });
                  }}

                >
                  Create
                </Button>
              </div>
            </div>
          </TabPanel>

        </TabView>
      </Card>
    </>
  );
};

export default Clientmaster;
