import { useState, useEffect, useRef } from 'react';
import BasicDetails from './components/BasicDetails';
import {
  apiGetCountryDrop,
  apiGetStateDrop,
  apiGetPlaceDrop,
  apiGetClientmaster,
  apishowplaceTree,
  apiGetAgencyCityIDCITY,
  apiGetCountryDropTHEN,
} from 'services/MasterService';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';
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
import {
  apiGetempmasterdropmaster,
  apiGetEmployeemaster,
} from 'services/MasterService';
import {
  agencyadd,
  apiGetAgencyEmployee,
  getaClientasperAgency,
  agencyput,
  apiGetclientmasterdropmaster,
} from 'services/CreditcontrolService';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { validateCustomFields, validateInput } from 'components/validators';
import './AddAgency.css';
import appConfig from 'configs/app.config';
import Loader from 'views/Controls/Loader';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const ALPHA_NUMERIC_UPPER_REGEX =
  appConfig.validation.alphaNumericUpperRegexWithoutSpaces;

const Agencymaster = () => {
  const [countrys, setcountrys] = useState('');
  const [states, setstates] = useState('');
  const [showLoader, setshowLoader] = useState(false);
  const [citys, setcitys] = useState([]);
  const [SelectedAddress, setSelectedAddress] = useState({});
  const [MultipleAddressDisabled, setMultipleAddressDisabled] = useState(true);
  const { Content } = useSelector((state) => state.base.common);
  const tokenS = useSelector((state) => state.auth.session.token);
  const [MapExecutiveDisabled, setMapExecutiveDisabled] = useState(true);
  const [MapClientDisabled, setMapClientDisabled] = useState(true);
  const [places, setPlaces] = useState([]);
  const [isEditAddressClicked, setIsEditAddressClicked] = useState(false);
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });
  const toast = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {


    if (Content.length != 0) {
      AgencyCityCodeGetApi(Content.AgencyCode);
      SetselectedEmployees(Content.AgencyCode);
      SetselectedClients(Content.AgencyCode);
      setMultipleAddressDisabled(false);
      setMapExecutiveDisabled(false);
      setMapClientDisabled(false);
    }

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
              StateTinNo: state.StateTinNo
            });
          });
        });
      });

      setPlaces(newArray);
    })();
  }, []);

  useEffect(() => {

    if (count.current == 1) {
      apiGetCountryDropTHEN(tokenS)
        .then((response) => response.json())
        .then((data) => {
          const countrys = [];
          for (const country of data) {
            countrys[country.CountryCode] = country.CountryName.trim();
          } setcountrys(countrys);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (count.current == 1) {
      apiGetStateDrop(tokenS)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const states = [];
          for (const state of data) {
            states[state.StateCode] = state.StateName.trim();
          }
          setstates(states);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (count.current == 1) {
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
      if (Content.length != 0) {
        setAgency({
          ...Agency,
          CreditRateCode: Agency.CreditRateMaster.CreditRateCode,
          BusinessTypeCode: Agency.BusinessType.BusinessTypeCode,
          CountryCode: Agency.Country.CountryCode,
          StateCode: Agency.State.StateCode,
          PlaceCode: Agency.Place.PlaceCode,
        });
      } else {
        setAgency({ IsActive: 1 });
      }
    }
  }, []);

  const getcountry = (row) => {
    return countrys[row.CountryCode];
  };
  const getstate = (row) => {
    return states[row.StateCode];
  };
  const getcity = (row) => {
    return citys[row.PlaceCode];
  };

  const [Agency, setAgency] = useState(Content);

  // TAB2
  const validate = (field) => {
    return !(
      field == '' ||
      Object.is(field, null) ||
      Object.is(field, undefined)
    );
  };

  const [agencycity, setagencycity] = useState([]);
  const [errorAddressLine1, seterrorAddressLine1] = useState('');
  const [errorPinCode, seterrorPinCode] = useState('');
  const [errorERPCODE, seterrorERPCODE] = useState('');
  const [errorGSTN_id, seterrorGSTN_id] = useState('');
  useEffect(() => {
    if (Object.keys(SelectedAddress).length !== 0) {
      setSelectedNodeKey(
        SelectedAddress.PlaceCode +
        '-' +
        SelectedAddress.StateCode +
        '-' +
        SelectedAddress.Country,
      );
    }
  }, [SelectedAddress]);

  const [selectedNodeKey, setSelectedNodeKey] = useState('0-0-0');

  const [EmployeeList, setEmployeeList] = useState(false);
  const [selectedEmployees, setselectedEmployees] = useState([]);

  const [ClientList, setClientList] = useState(false);
  const [selectedClients, setselectedClients] = useState([]);

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetempmasterdropmaster(values);
      const employees = resp.data.map((employee) => {
        let res = {};
        res.name = employee.Emp_FirstName;
        res.EmployeeCode = employee.EmployeeCode;
        // Below fields (label and value) is required by Elstar's <Select/> component
        res.label = employee.Emp_FirstName;
        res.value = employee.EmployeeCode;
        return res;
      });
      setEmployeeList(employees);
    })();
    (async (values) => {
      const resp = await apiGetclientmasterdropmaster(values);
      const clients = resp.data.map((Client) => {
        let res = {};
        res.name = Client.ClientName;
        res.ClientCode = Client.ClientCode;
        // Below fields (label and value) is required by Elstar's <Select/> component
        res.label = Client.ClientName;
        res.value = Client.ClientCode;
        return res;
      });
      setClientList(clients);
    })();
    (async (values) => {
      const resp = await apiGetClientmaster(values);
      const clients = resp.data
        .filter((Client) => Client.IsActive === 1)
        .map((client) => {
          let res = {};
          res.value = client.ClientCode;
          res.client = client.ClientName;
          res.disabled = false;
          return res;
        });
    })();
  }, []);

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetEmployeemaster(values);
      const employees = resp.data
        .filter((Employee) => Employee.IsActive === 1)
        .map((employee) => {
          let res = {};
          res.value = employee.EmployeeCode;
          res.employee = employee;
          res.disabled = false;
          return res;
        });
    })();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayBasicDetails, setdisplayBasicDetails] = useState(true);
  const [displayContact, setdisplayContact] = useState(false);

  const AgencyCityCodeGetApi = async (ID) => {
    const AgencyCity = await apiGetAgencyCityIDCITY(ID);
    const formattedOptions = AgencyCity.data.map((option) => ({
      AddressLine1: option.AddressLine1,
      AddressLine2: option.AddressLine2,
      CountryCode: option.Country.CountryCode,
      StateCode: option.State.StateCode,
      PlaceCode: option.Place.PlaceCode,
      PinCode: option.PinCode,
      GSTN_id: option.GSTN_id,
      IsGST_registered: option.IsGST_registered,
      NovCode: option.NovCode,
      IsActive: option.IsActive,
    }));
    setagencycity(formattedOptions);
  };

  const SetselectedEmployees = async (ID) => {
    const employees = await apiGetAgencyEmployee(ID);
    const formattedOptions = employees.data.map((option) => ({
      EmployeeCode: option.Employee.EmployeeCode,
      name: option.Employee.Emp_FirstName,
      // Below fields (label and value) is required by Elstar's <Select/> component
      label: option.Employee.Emp_FirstName,
      value: option.Employee.EmployeeCode,
    }));
    setselectedEmployees(formattedOptions);
  };
  const SetselectedClients = async (ID) => {
    const data = await getaClientasperAgency(ID);
    const formattedOptions = data.data.map((option) => ({
      name: option.ClientName,
      ClientCode: option.ClientCode,
      // Below fields (label and value) is required by Elstar's <Select/> component
      label: option.ClientName,
      value: option.ClientCode,
    }));
    setselectedClients(formattedOptions);
  };

  const clearMultipleAddressFields = () => {
    try {
      setSelectedAddress({});
      setSelectedNodeKey('0-0-0');
      seterrorAddressLine1(false);
      setIsEditAddressClicked(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Card>
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Agency" leftIcon="pi pi-calendar mr-2">
            {citys.length && (
              <BasicDetails
                Agency={Agency}
                setAgency={setAgency}
                displayBasicDetails={displayBasicDetails}
                setdisplayBasicDetails={setdisplayBasicDetails}
                displayContact={displayContact}
                setdisplayContact={setdisplayContact}
                countrys={countrys}
                states={states}
                citys={citys}
              />
            )}
            <div className="mt-5">
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
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="col-span-12">
                    <FormItem
                      label="Address"
                      invalid={errorAddressLine1}
                      errorMessage={'Address must be 10-99 characters long.'}
                      asterisk
                    >
                      <Input
                        textArea
                        id="AddressLine"
                        size="sm"
                        placeholder="Address"
                        value={SelectedAddress.AddressLine1}
                        maxLength="99"
                        onChange={(e) => {
                          if (e.target.value.length < 100) {
                            setSelectedAddress({
                              ...SelectedAddress,
                              AddressLine1: e.target.value,
                            });
                            if (
                              !validate(e.target.value) ||
                              e.target.value.length < 10
                            ) {
                              seterrorAddressLine1(true);
                            } else {
                              seterrorAddressLine1(false);
                            }
                          } else {
                            seterrorAddressLine1(true);
                          }
                        }}
                      />
                    </FormItem>
                  </div>

                  <div className="col-span-3">
                    <FormItem label="City" asterisk>
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
                          setSelectedAddress({
                            ...SelectedAddress,
                            CountryCode: option.CountryCode,
                            StateCode: option.StateCode,
                            PlaceCode: option.value,
                            StateTinNo: option.StateTinNo
                          });
                        }}
                        isDisabled={isEditAddressClicked}
                      />
                    </FormItem>
                  </div>
                  <div className="col-span-3">
                    <FormItem
                      label="Pincode"
                      invalid={errorPinCode}
                      errorMessage={'PinCode Required'}
                      asterisk
                    >
                      <Input
                        type="text"
                        size="sm"
                        id="PinCode"
                        placeholder="Pincode"
                        value={SelectedAddress.PinCode}
                        onChange={(e) => {
                          setSelectedAddress({
                            ...SelectedAddress,
                            PinCode: e.target.value,
                          });
                          // Regular expression to match exactly 6 numeric characters
                          const sixDigitNumericRegex = /^\d{6}$/;

                          if (!sixDigitNumericRegex.test(e.target.value)) {
                            seterrorPinCode(true);
                          } else {
                            seterrorPinCode(false);
                          }
                        }}
                        disabled={isEditAddressClicked}
                      />
                    </FormItem>
                  </div>
                  <div className="col-span-3">
                    <FormItem
                      label="ERPCODE"
                      invalid={errorERPCODE}
                      errorMessage={'ERPCODE Required'}
                    // asterisk
                    >
                      <Input
                        type="text"
                        size="sm"
                        id="Erpcode"
                        placeholder="ERPCODE"
                        value={SelectedAddress.NovCode}
                        maxLength="10"
                        onChange={(e) => {
                          // setERPCODE(e.target.value)
                          setSelectedAddress({
                            ...SelectedAddress,
                            NovCode: e.target.value,
                          });
                          if (!validate(e.target.value)) {
                            seterrorERPCODE(true);
                          } else {
                            seterrorERPCODE(false);
                          }
                        }}
                      />
                    </FormItem>
                  </div>

                  <div className="col-span-3 flex flex-col gap-2">
                    <Checkbox
                      checked={SelectedAddress.IsGST_registered}
                      onChange={(value, e) => {
                        setSelectedAddress({
                          ...SelectedAddress,
                          IsGST_registered: value,
                          GSTN_id: '',
                        });

                        seterrorGSTN_id(false);
                      }}
                      className="m-0"
                    >
                      GST Registered
                    </Checkbox>
                    <FormItem
                      invalid={errorGSTN_id}
                      errorMessage={'GST No. Invalid'}
                      className="gst-form-item"
                    >
                      <Input
                        disabled={!SelectedAddress.IsGST_registered}
                        id="GSTN_id"
                        value={SelectedAddress.GSTN_id}
                        onChange={(e) => {
                          const gstNumber = e.target.value.toUpperCase();
                          if (ALPHA_NUMERIC_UPPER_REGEX.test(gstNumber)) {
                            if (validateInput(gstNumber, 'GST')) {
                              seterrorGSTN_id(false);
                            } else {
                              seterrorGSTN_id(true);
                            }
                            setSelectedAddress({
                              ...SelectedAddress,
                              GSTN_id: e.target.value,
                            });
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
            <div align="right" className="my-4">
              <Button
                className="mr-3"
                icon={<HiOutlinePlus />}
                onClick={() => {
                  if (SelectedAddress.IsGST_registered) {
                    if (Number(SelectedAddress.GSTN_id.substring(0, 2)) != Number(SelectedAddress.StateTinNo)) {
                      openNotification('warning', 'Please Enter Correct GST Number')
                      return
                    }
                  }
                  const invalidFields = validateCustomFields(
                    SelectedAddress,
                    SelectedAddress.IsGST_registered
                      ? [
                        'CountryCode',
                        'StateCode',
                        'PlaceCode',
                        'PinCode',
                        'AddressLine1',
                        'GSTN_id',
                      ]
                      : [
                        'CountryCode',
                        'StateCode',
                        'PlaceCode',
                        'PinCode',
                        'AddressLine1',
                      ],
                  );
                  if (invalidFields) {
                    const fieldNames = invalidFields.join(', ');
                    toast.current.show({
                      severity: 'error',
                      summary: 'Error',
                      detail: `The following fields are compulsory and missing: ${fieldNames}`,
                    });
                  } else {
                    if (
                      SelectedAddress.AddressLine1.length < 10 ||
                      SelectedAddress.AddressLine1.length > 99
                    ) {
                      seterrorAddressLine1(true);
                    } else if (
                      SelectedAddress.IsGST_registered &&
                      !validateInput(SelectedAddress.GSTN_id, 'GST')
                    ) {
                      seterrorGSTN_id(true);
                    } else {
                      let id = Math.floor(Math.random() * 900) + 100;
                      let address = {
                        id: id,
                        AddressLine1: SelectedAddress.AddressLine1,
                        AddressLine2: SelectedAddress.AddressLine2,
                        CountryCode: Number(SelectedAddress.CountryCode),
                        StateCode: Number(SelectedAddress.StateCode),
                        PlaceCode: Number(SelectedAddress.PlaceCode),
                        PinCode: Number(SelectedAddress.PinCode),
                        NovCode: SelectedAddress.NovCode,
                        GSTN_id: SelectedAddress.GSTN_id,
                        IsGST_registered: Boolean(
                          SelectedAddress.IsGST_registered,
                        ),
                        IsActive: 1,
                        New: 1,
                      };
                      let res = [...agencycity];
                      res.push(address);
                      setagencycity(res);
                      clearMultipleAddressFields();
                    }
                  }
                }}
              >
                <span>Add</span>
              </Button>
              <Button
                className="mr-3"
                icon={<HiOutlinePlus />}
                onClick={() => {
                  {
                    // Find the index of the object in the array with the matching ID
                    const index = agencycity.findIndex(
                      (obj) => obj.id === SelectedAddress.id,
                    );
                    let address = {
                      id: SelectedAddress.id,
                      AddressLine1: SelectedAddress.AddressLine1,
                      AddressLine2: SelectedAddress.AddressLine2,
                      CountryCode: Number(SelectedAddress.CountryCode),
                      StateCode: Number(SelectedAddress.StateCode),
                      PlaceCode: Number(SelectedAddress.PlaceCode),
                      PinCode: Number(SelectedAddress.PinCode),
                      NovCode: SelectedAddress.NovCode,
                      GSTN_id: SelectedAddress.GSTN_id,
                      IsGST_registered: SelectedAddress.IsGST_registered,
                    };

                    // If the object is found, update it with the new values
                    if (index !== -1) {
                      let res = [...agencycity];
                      res[index] = address;
                      setagencycity(res);
                    }
                  }
                }}
              >
                <span>Update</span>
              </Button>
              <Button
                className="mr-3"
                icon={<HiOutlineX />}
                onClick={clearMultipleAddressFields}
              >
                <span>Clear</span>
              </Button>
            </div>

            {MultipleAddressesDataTable(
              agencycity,
              getcountry,
              getstate,
              getcity,
              SelectedAddress,
              setSelectedAddress,
              Content,
              setIsEditAddressClicked,
              setagencycity,
            )}
            <div className="mt-5">
              {!displayBasicDetails && !displayContact && agencycity.length ? (
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
              <h5 className="mb-4">Assign Executive</h5>
              <Select
                isMulti
                placeholder="Select"
                options={EmployeeList}
                value={selectedEmployees}
                onChange={(e) => {
                  setselectedEmployees(e);
                }}
                styles={{
                  valueContainer: (base) => ({
                    ...base,
                    padding: '5px 8px',
                  }),
                  multiValue: (base) => ({
                    ...base,
                    marginRight: '8px',
                    marginBlock: '5px',
                  }),
                  input: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                }}
              />
              <div className="text-right mt-6">
                <Button
                  variant="solid"
                  onClick={() => {
                    setActiveIndex(3);
                    setMapClientDisabled(false);
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel
            disabled={MapClientDisabled}
            header="Map Client"
            leftIcon="pi pi-search mr-2"
            rightIcon="pi pi-cog ml-2"
          >
            <div className="flex flex-col h-full justify-between">
              <h5 className="mb-4">Map Client</h5>
              <Select
                isMulti
                placeholder="Select"
                options={ClientList}
                value={selectedClients}
                onChange={(e) => {
                  setselectedClients(e);
                }}
                styles={{
                  valueContainer: (base) => ({
                    ...base,
                    padding: '5px 8px',
                  }),
                  multiValue: (base) => ({
                    ...base,
                    marginRight: '8px',
                    marginBlock: '5px',
                  }),
                  input: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                }}
              />
              <div className="text-right mt-6">
                <Button
                  className="ltr:mr-2 rtl:ml-2"
                  variant="plain"
                  onClick={() => navigate('/AgencyMaster')}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  onClick={() => {
                    setshowLoader(true);
                    let agencyclientmap = selectedClients.map((item) => ({
                      name: item.name,
                      ClientCode: item.ClientCode,
                      IsActive: 1,
                    }));
                    let agencyempmap = selectedEmployees.map((item) => ({
                      EmployeeCode: item.EmployeeCode,
                      name: item.name,
                      IsActive: 1,
                    }));

                    let data = {};
                    data.Agency = Agency;
                    data.agencycity = agencycity;
                    data.agencyempmap = agencyempmap;
                    data.agencyclientmap = agencyclientmap;

                    if (Content.length != 0) {
                      agencyput(data, tokenS, Content.AgencyCode)
                        .then((response) => response.json())
                        .then((result) => {
                          if (result.code == 200) {
                            openNotification(
                              'success',
                              'Agency Updated sussessfully',
                            );
                            setshowLoader(false);
                            navigate('/AgencyMaster');
                          } else {
                            setshowLoader(false);
                            openNotification('info', result.status);
                          }
                        });
                    } else {
                      agencyadd(data, tokenS)
                        .then((response) => response.json())
                        .then((result) => {
                          if (result.code == 200) {
                            openNotification(
                              'success',
                              'Agency Added sussessfully',
                            );
                            setshowLoader(false);
                            navigate('/AgencyMaster');
                          } else {
                            setshowLoader(false);
                            openNotification('info', result.status);
                          }
                        });
                    }
                  }}
                >
                  {Content.length == 0 ? 'Create' : 'Update'}
                </Button>
              </div>
            </div>
          </TabPanel>
        </TabView>
        <Loader showLoader={showLoader} />
      </Card>
    </>
  );
};

export default Agencymaster;
