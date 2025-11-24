import { useState, useEffect, useRef } from 'react';
import { apiGetCreditratemaster } from 'services/CreditcontrolService';
import BasicDetails from './components/BasicDetails';
import {
  apiGetStateDrop,
  apiGetPlaceDrop,
  apishowplaceTree,
  apiGetCountryDropTHEN,
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
  apiGetEmployeemaster,
  clientupdate,
  clientcitydetails,
  apiGetClientEmployees,
  clientcityUpdate,
  Postclientempmap,
} from 'services/MasterService';
import { validateAddress, validateInput } from 'components/validators';
import { Toast } from 'primereact/toast';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import appConfig from 'configs/app.config';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const ALPHA_NUMERIC_UPPER_REGEX =
  appConfig.validation.alphaNumericUpperRegexWithoutSpaces;

function convertCitys(citys) {
  const modifiedcitys = citys.map((city) => {
    const newObj = { ...city }; // Create a shallow copy of the object

    delete newObj.ClientMaster; // Remove "ClientMaster" key
    delete newObj.AddedBy; // Remove "AddedBy" key
    delete newObj.AddedOn; // Remove "AddedOn" key
    return newObj;
  });
  return modifiedcitys;
}

const EditClient = () => {
  const location = useLocation();
  const { Content } = useSelector((state) => state.base.common);

  const navigate = useNavigate();
  const ClientCode = Content.ClientCode;

  const [countrys, setcountrys] = useState('');
  const [states, setstates] = useState('');
  const [citys, setcitys] = useState('');
  const [SelectedAddress, setSelectedAddress] = useState({});
  const [employees, setemployees] = useState([]);
  const [GSTCHECK, setGSTCHECK] = useState(0);
  const [selectedEmployees, setselectedEmployees] = useState(null);
  const [MapExecutiveDisabled, setMapExecutiveDisabled] = useState(true);
  const [isEditAddressClicked, setIsEditAddressClicked] = useState(false);
  const [segmentSelections, setsegmentSelections] = useState([]);
  const [Client, setClient] = useState(Content);

  const tokenS = useSelector((state) => state.auth.session.token);
  const toast = useRef(null);
  const count = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);

  const [clientcity, setclientcity] = useState([]);

  useEffect(() => {
    count.current = count.current + 1;
    if (!isLoaded && count.current < 2) {
      clientcitydetails(ClientCode, tokenS)
        .then((response) => response.json())
        .then((citys) => {
          const modifiedcitys = convertCitys(citys);
          setclientcity(modifiedcitys);
          setIsLoaded2(true);
        });
    }
  });
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

  let res = {};
  res.AddressLine1 = true;
  res.AddressLine2 = true;

  const [errors, setErrors] = useState(res);
  const [touched, setTouched] = useState({});

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

  useEffect(() => {
    if (count.current == 1) {
      // get countries list
      apiGetCountryDropTHEN(tokenS)
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

      apiGetEmployeemaster() //.then(response => response.json())
        .then((res) => {
          let employees = res.data;
          setemployees(res.data);
          apiGetClientEmployees(ClientCode).then((res) => {
            let res_selectedEmployees = res.data.map((row) => {
              let obj = {};
              obj.name = row.Employee.Emp_FirstName;

              obj.EmployeeCode = row.Employee.EmployeeCode;
              return obj;
            });
            setselectedEmployees(res_selectedEmployees);
          });
        });
    }
  }, []);

  useEffect(() => {
    if (!validate(selectedEmployees)) return;
    let EmployeeCodes = selectedEmployees.map((row) => row.EmployeeCode);
    let filtered_employees = employees.filter((employee) =>
      EmployeeCodes.includes(employee.EmployeeCode),
    );
    setsegmentSelections(filtered_employees);
  }, [selectedEmployees]);

  const getcountry = (row) => {
    return countrys[row.CountryCode];
  };

  const getstate = (row) => {
    return states[row.StateCode];
  };
  const getcity = (row) => {
    return row.Place ? citys[row.Place.PlaceCode] : citys[row.PlaceCode];
  };

  // TAB2
  const validate = (field) => {
    return !(
      field == '' ||
      Object.is(field, null) ||
      Object.is(field, undefined)
    );
  };

  const [AddressLine1, setAddressLine1] = useState('');
  const [AddressLine2, setAddressLine2] = useState('');

  const [PinCode, setPinCode] = useState('');
  const [GSTN_id, setGSTN_id] = useState('');
  const [IsGST_registered, setIsGST_registered] = useState(0);

  const [errorPinCode, seterrorPinCode] = useState('');
  const [errorGSTN_id, seterrorGSTN_id] = useState('');
  const [errorIsGST_registered, seterrorIsGST_registered] = useState('');
  useEffect(() => {
    console.log('Client');
    console.log(Client);
  }, [Client]);
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

  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [Place, setPlace] = useState([]);

  const [EmployeeList, setEmployeeList] = useState(false);

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
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayBasicDetails, setdisplayBasicDetails] = useState(true);
  const [displayContact, setdisplayContact] = useState(false);

  if (Number(!!Client) == 0) return;

  return (
    <>
      <Toast ref={toast} />
      <Card>
        {/* <div className="flex flex-wrap gap-2 mb-3">
        <Button onClick={() => setActiveIndex(0)} className="p-button-text" label="Activate 1st" />
        <Button onClick={() => setActiveIndex(1)} className="p-button-text" label="Activate 2nd" />
        <Button onClick={() => setActiveIndex(2)} className="p-button-text" label="Activate 3rd" />
    </div>   */}
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Client" leftIcon="pi pi-calendar mr-2">
            {isLoaded && isLoaded2 && (
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
            <div style={{ margin: '20px' }}>
              {!displayBasicDetails && !displayContact ? (
                <Button
                  variant="solid"
                  onClick={() => {
                    setActiveIndex(1);

                  }}
                >
                  Continue
                </Button>
              ) : null}
            </div>
          </TabPanel>

          <TabPanel header="Multiple Address" rightIcon="pi pi-user ml-2">
            <Card>
              <FormContainer>
                <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                  <div className="col-span-5">
                    <FormItem
                      invalid={errors.AddressLine1 && touched.AddressLine1}
                      errorMessage={errors.AddressLine1}
                    >
                      <Input
                        textArea
                        id="AddressLine1"
                        size="sm"
                        placeholder="Address Line 1"
                        value={AddressLine1}
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
                        onChange={handleValidation2}
                      />
                    </FormItem>
                  </div>
                  <div className="col-span-2">
                    {/* <div className="card flex justify-content-center" > */}
                    {/* <FormContainer> */}
                    <FormItem label="City" asterisk>
                      <Select
                        name="PlaceCode"
                        // form={form}

                        options={Place}
                        value={Place.filter((option) => {
                          return option.value == selectedNodeKey?.split('-')[0];
                        })}
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
                    {/* </FormContainer>           */}
                    {/* </div> */}
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
                          setPinCode(e.target.value);
                          if (!validate(e.target.value)) {
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
                className="mr-1"
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
                className="mr-1"
                icon={<HiOutlineX />}
                onClick={() => {
                  setAddressLine1('');

                  setAddressLine2('');
                  setSelectedNodeKey('0-0-0');
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
                    onChange={(e) => {
                      setselectedEmployees(e.value);
                    }}
                    options={EmployeeList}
                    optionLabel="name"
                    filter
                    placeholder="Select Employees"
                    maxSelectedLabels={8}
                    className="w-full md:w-20rem"
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

                    let data = {};
                    data.Client = Client;
                    data.clientcity = modifiedClientCity;
                    data.clientempmap = modifiedclientempmap;
                    let res = clientupdate(
                      Client.ClientCode,
                      data.Client,
                      tokenS,
                    );
                    res
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.status_code == 200) {
                          toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Client Updated sussessfully',
                          });
                        } else {
                          toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Client could not be created',
                          });
                        }
                        navigate('/ClientMaster');
                      });
                    const mergedData = selectedEmployees.map((item) => ({
                      ClientCode: Number(Client.ClientCode),
                      EmployeeCode: item.EmployeeCode,
                      IsActive: 1,
                    }));
                    (async (values) => {
                      const resp = await Postclientempmap(mergedData, tokenS);
                      console.log(resp.data);
                      // setdata(resp.data)
                    })();

                    navigate('/ClientMaster');
                    let updatedClientcity = data.clientcity.map(
                      (clientcity) => {
                        delete clientcity.id;

                        clientcity.ClientCode = Client.ClientCode;
                        return clientcity;
                      },
                    );

                    let res2 = clientcityUpdate(updatedClientcity, tokenS).then(
                      (data) => {
                        if (data.status == 200) {
                          toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Client City Updated sussessfully',
                          });
                        } else {
                          toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Client could not be created',
                          });
                        }
                      },
                    );
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

export default EditClient;
