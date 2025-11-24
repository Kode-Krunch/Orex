import {
  Button,
  Card,
  DatePicker,
  FormContainer,
  FormItem,
  Input,
  Notification,
  Select,
  toast,
} from 'components/ui';
import { convertDateToYMD, validate } from 'components/validators';
import React, { useEffect, useState } from 'react';
import { HiCake } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import {
  apiGetCurrencymasterdrop,
  apishowplaceTree,
} from 'services/MasterService';
import {
  PostContentContract,
  apiGetAmortisationTypeMaster,
  apiGetSuppliermasterDrop,
} from 'services/ProgrammingService';
import ContentContractDetails from './ContentContractDetails';
import { useNavigate } from 'react-router-dom';
import {
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { RxVideo } from 'react-icons/rx';
import DropdownList from 'views/Controls/DropDownList';
import ContractHeader from './ContractHeader';
import { apiCallstoreprocedure } from 'services/CommonService';

const ContentContractAdd = () => {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const { Content } = useSelector((state) => state.base.common);

  const [formState, setFormState] = useState({
    ContractName: '',
    SupplierCode: '',
    AgreementDate: '',
    AuthorisedPerson: '',
    CountryCode: '',
    StateCode: '',
    PlaceCode: '',
    BudgetYear: '',
    // Remarks: '',
  });
  const [requiredFields, setRequiredFields] = useState({
    ContractName: false,
    SupplierCode: false,
    AgreementDate: false,
    AuthorisedPerson: false,
    PlaceCode: false,
    BudgetYear: false,
  });
  const [formStateDetails, setFormStateDetails] = useState({
    ContractCode: '',
    AmortisationTypeCode: '',
    ContractStartDate: '',
    ContractEndDate: '',
    ProgCost: '',
    CostPerEp: '',
    TotalEpisode: '',
    UnlimitedRuns: true,
    OrignalRun: 1,
    RepeatRun: '',
    NoofRuns: '',
    NoofTimein24Hrs: '',
    BroadcastStartTime: '',
    BroadcastEndTime: '',
    TotalBroadcastRun: '',
    RepeatPlayWeek: ' ',
    RepeatPlayDay: ' ',
    RepeatPlayHour: ' ',
    EADofMaterial: '',
    MatDelPaidBy: '',
    MatRetCodePaidBy: '',
  });

  const [requiredFieldsDetails, setRequiredFieldsDetails] = useState({
    ContractCode: false,
    AmortisationTypeCode: false,
    ContractStartDate: false,
    ContractEndDate: false,
    ProgCost: false,
    CostPerEp: false,
    TotalEpisode: false,
  });

  const [dataforapi, setdataforapi] = useState([]);
  const [aftersave, setaftersave] = useState(false);
  const [CurrencySysmbol, setCurrencySysmbol] = useState('');
  const [Currency, setCurrency] = useState([]);
  const [collapse, setCollapse] = useState(false);



  const onCollapse = () => {
    setCollapse(!collapse);
  };


  const [Supplier, setSupplier] = useState([]);
  const [ContentM, setContentM] = useState([]);
  const [Amortisation, setAmortisation] = useState([]);
  const [TanleData, setTanleData] = useState([]);

  const [Place, setPlace] = useState([]);

  const GetContents = (IsGroup, ContentCode) => {
    (async () => {
      try {
        const resp = await apiCallstoreprocedure(
          'USP_PG_GetContentforContract',
          {
            par_LocationCode: Channel.LocationCode,
            par_ChannelCode: Channel.ChannelCode,
          },
        );
        if (resp.status == 204) {
          setContentM([]);
          return;
        }
        console.log('formattedOptions', resp.data);
        const formattedOptions = resp.data.map((option) => ({
          value: option.ContentCode,
          label: option.ContentName,
        }));
        setContentM(formattedOptions);
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status == 0) {
          setContentM([]);
          return;
        }
      }
    })();
  };
  useEffect(() => {
    hideStackedSideNav_secondary();
    (async (values) => {
      const Content = await apiGetSuppliermasterDrop(values);
      const formattedOptions = Content.data.map((option) => ({
        value: option.SupplierCode,
        label: option.SupplierName,
      }));
      setSupplier(formattedOptions);
    })();
    GetContents(0);
    (async (values) => {
      const Amortisation = await apiGetAmortisationTypeMaster(values);
      const formattedOptions = Amortisation.data.map((option) => ({
        value: option.AmortisationTypeCode,
        label: option.AmortisationTypeName,
      }));
      setAmortisation(formattedOptions);
    })();
    (async () => {
      try {
        const Currency = await apiGetCurrencymasterdrop();
        if (Currency && Currency.data) {
          const formattedOptions = Currency.data.map((option) => ({
            value: option.CurrencyCode,
            label: option.CurrencyName,
            symbol: option.CurrencySymbol, // Make sure keys are consistent (using 'symbol' instead of 'Symbol')
          }));

          console.log(formattedOptions);

          const Menur = formattedOptions.find(
            (obj) => obj.value == Content.CurrencyCode,
          );

          if (Menur) {
            setCurrencySysmbol(Menur.symbol); // Ensure correct key usage here as well
          } else {
            console.error(
              `Currency code ${Content.CurrencyCode} not found in the options`,
            );
          }

          setCurrency(formattedOptions);
        } else {
          console.error('No data received from apiGetCurrencymasterdrop');
        }
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
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
            });
          });
        });
      });

      setPlace(newArray);
    })();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name == 'AuthorisedPerson') {
      // alert('true')
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');

      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: sanitizedValue,
      }));
      return;
    }

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };
  const handleInputChange2 = (value, name) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const checkFieldsNotEmpty = (formState, requiredFields) => {
    const emptyFields = [];

    for (const field of requiredFields) {
      if (!formState[field]) {
        emptyFields.push(field);
      }
    }

    return emptyFields;
  };

  const validateFields = () => {
    Object.keys(formState).forEach((field) => {
      setRequiredFields((prevRequiredFields) => ({
        ...prevRequiredFields,
        [field]: !formState[field], // true if the field is empty, false otherwise
      }));
    });
  };
  const Savedata = () => {
    seti(2);
    const emptyFields = checkFieldsNotEmpty(
      formState,
      Object.keys(requiredFields),
    );
    console.log(emptyFields);
    if (emptyFields.length == 0) {
      setRequiredFields({
        ContractName: false,
        SupplierCode: false,
        AgreementDate: false,
        AuthorisedPerson: false,
        PlaceCode: false,
        BudgetYear: false,
      });
      const mergedData = {
        ContractName: formState.ContractName,
        SupplierCode: formState.SupplierCode?.value,
        AgreementDate: formState.AgreementDate,
        CountryCode: formState.CountryCode,
        StateCode: formState.StateCode,
        PlaceCode: formState.PlaceCode,
        AuthorisedPerson: formState.AuthorisedPerson,
        BudgetYear: formState.BudgetYear,
        Remarks: formState.Remarks,
        PurchaseType: 'NA',
        LoanPeriod: 0,
        ReturnSupplierCode: 0,
        TotPayment: 0,
        TaxDeduction: 0,
        CurrencyCode: formState.CurrencyCode,
        CalProgCost: 0,
        NoProgPurchased: 0,
        MstcostPerProg: 0,
        MstcostPerHour: 0,
        MstcostPerContract: 0,
        IsActive: 1,
      };
      setdataforapi(mergedData);
      setaftersave(true);
    } else {
      // alert(emptyFields)
      emptyFields.forEach((field) => {
        setRequiredFields((prevRequiredFields) => ({
          ...prevRequiredFields,
          [field]: true,
        }));
      });
    }
  };
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.session.token);
  const SaveApi = async () => {
    if (TanleData.length != 0) {
      const transformedArray = TanleData.map((item) => {
        const transformedItem = {
          RowNos: 0,
          ContentCode: item.ContractCode.value,
          AmortisationTypeCode: item.AmortisationTypeCode.value,
          ContractStartDate: item.ContractStartDate,
          ContractEndDate: item.ContractEndDate,
          ProgCost: item.ProgCost,
          CostPerEp: item.CostPerEp,
          BroadcastDayLength: 0,
          ExclusivityRight: 0,
          OrignalRun: item.OrignalRun,
          RepeatRun: Number(item.RepeatRun),
          NoofTimein24Hrs: Number(item.NoofTimein24Hrs),
          NoofRuns: Number(item.NoofRuns),
          TotalBroadcastRun: Number(item.TotalBroadcastRun),
          RepeatPlayWeek: Number(item.RepeatPlayWeek),
          RepeatPlayDay: Number(item.RepeatPlayDay),
          RepeatPlayHour: Number(item.RepeatPlayHour),
          EADofMaterial: item.EADofMaterial,
          MatDelPaidBy: item.MatDelPaidBy.toString(),
          MatRetCodePaidBy: item.MatRetCodePaidBy.toString(),
          ContractActive: 0,
          BroadcastStartTime: item.BroadcastStartTime,
          BroadcastEndTime: item.BroadcastEndTime,
          MTHADD: 0,
          UnlimitedRuns: item.UnlimitedRuns ? 1 : 0,
          ContractRemarks: '',
          IsActive: 1,
        };
        console.log(item.EADofMaterial);
        if (item.EADofMaterial != '') {
          transformedItem.EADofMaterial = item.EADofMaterial;
        } else {
          delete transformedItem.EADofMaterial;
        }

        return transformedItem;
      });

      const mergedData = {
        contract: dataforapi,
        details: transformedArray,
      };
      console.log(mergedData);

      try {
        const resp = await PostContentContract(mergedData, token);
        if (resp.status === 200) {
          openNotification('success', 'Data Added Successfully');

          navigate('/ContentContractMaster');
        }
        if (resp.status === 204) {
          openNotification('danger', 'Data Already Exists.');
          return;
        }
      } catch (errors) {
        if (errors.response.status === 500) {
          openNotification('danger', 'Server Error.');
        }
      }
    } else {
      openNotification('warning', 'Please Add Atleast One Detail');
    }
  };
  const [i, seti] = useState(0);
  useEffect(() => {
    if (i > 1) {
      validateFields();
    }
  }, [formState]);
  const [contractCount, setContractCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    calculateCountAndCost();
  }, [TanleData]);

  const calculateCountAndCost = () => {
    const newContractCount = TanleData.length;
    const newTotalCost = TanleData.reduce(
      (acc, contract) => acc + contract.ProgCost * contract.TotalEpisode,
      0,
    );

    setContractCount(newContractCount);
    setTotalCost(newTotalCost);
  };
  return (
    <Card header={<HeaderExtra />}>
      <FormContainer>
        <div className="grid grid-cols-3 gap-2">
          <Card className="col-span-2" header="Content Contract Edit">
            {aftersave ? <ContractHeader Contract={formState} onCollapse={onCollapse} collapse={collapse} setaftersave={setaftersave} /> : <div className="grid grid-cols-6 gap-2">
              <div className="col-span-2">
                <FormItem
                  label="Contract Name"
                  asterisk
                  errorMessage={
                    requiredFields.ContractName
                      ? 'Contract Name Is Required'
                      : null
                  }
                  invalid={
                    requiredFields.ContractName && requiredFields.ContractName
                  }
                >
                  <Input
                    size="sm"
                    name="ContractName"
                    maxLength="20"
                    disabled={aftersave}
                    placeholder="Contract Name"
                    value={formState.ContractName}
                    onChange={handleInputChange}
                  />
                </FormItem>
              </div>
              <div className="col-span-2">
                <FormItem
                  label="Supplier Name"
                  asterisk
                  errorMessage={
                    requiredFields.SupplierCode
                      ? 'Supplier Name Is Required'
                      : null
                  }
                  invalid={
                    requiredFields.SupplierCode && requiredFields.SupplierCode
                  }
                >
                  <Select
                    options={Supplier}
                    isDisabled={aftersave}
                    value={Supplier.filter((option) => option.value === formState.SupplierCode?.value)

                    }
                    onChange={(e) => {
                      setFormState((prevFormState) => ({
                        ...prevFormState,
                        SupplierCode: e,
                      }));
                    }}
                  />
                </FormItem>
              </div>
              <div className="col-span-2">
                <FormItem
                  label="Authorised Person Name"
                  asterisk
                  errorMessage={
                    requiredFields.AuthorisedPerson
                      ? 'Authorised Person Name Is Required'
                      : null
                  }
                  invalid={
                    requiredFields.AuthorisedPerson &&
                    requiredFields.AuthorisedPerson
                  }
                >
                  <Input
                    size="sm"
                    name="AuthorisedPerson"
                    maxLength="100"
                    disabled={aftersave}
                    placeholder="Authorised Person Name"
                    value={formState.AuthorisedPerson}
                    onChange={handleInputChange}
                  />
                </FormItem>
              </div>

              <div className="col-span-2">
                <FormItem
                  label="City"
                  asterisk
                  errorMessage={
                    requiredFields.PlaceCode ? 'Place Is Required' : null
                  }
                  invalid={requiredFields.PlaceCode && requiredFields.PlaceCode}
                >
                  <Select
                    options={Place}
                    isDisabled={aftersave}
                    value={Place.filter((option) => option.value === formState.PlaceCode)
                    }
                    onChange={(e) => {
                      setFormState((prevFormState) => ({
                        ...prevFormState,
                        CountryCode: e.CountryCode,
                      }));

                      setFormState((prevFormState) => ({
                        ...prevFormState,
                        StateCode: e.StateCode,
                      }));
                      setFormState((prevFormState) => ({
                        ...prevFormState,
                        PlaceCode: e.PlaceCode,
                      }));
                    }}
                  />
                </FormItem>
              </div>
              <div className="col-span-2">
                <FormItem
                  label={
                    <div className="flex items-center">
                      <div className="flex">
                        <p>Date</p>
                        <p className="dark:text-rose-500 ml-1">*</p>
                      </div>
                      <p className="text-xs  dark:text-[#bddba9] ">
                        ( Budget Year : {formState.BudgetYear} )
                      </p>
                    </div>
                  }
                  // asterisk
                  errorMessage={
                    requiredFields.AgreementDate
                      ? 'Agreement Date Is Required'
                      : null
                  }
                  invalid={
                    requiredFields.AgreementDate && requiredFields.AgreementDate
                  }
                >
                  <DatePicker
                    size="sm"
                    name="AgreementDate"
                    placeholder="Agreement Date"
                    prefix={<HiCake className="text-xl" />}
                    disabled={aftersave}
                    defaultValue={
                      validate(formState.AgreementDate)
                        ? new Date(formState.AgreementDate)
                        : ''
                    }
                    onChange={(date) => {
                      handleInputChange2(
                        convertDateToYMD(date),
                        'AgreementDate',
                      );
                      setFormState((prevFormState) => ({
                        ...prevFormState,
                        BudgetYear: date?.getFullYear(),
                      }));
                    }}
                  />
                </FormItem>
              </div>

              <div className="col-span-2">
                <FormItem label="Remarks">
                  <Input
                    // textArea
                    size="sm"
                    name="Remarks"
                    maxLength="100"
                    disabled={aftersave}
                    placeholder="Remarks"
                    value={formState.Remarks}
                    onChange={handleInputChange}
                  />
                </FormItem>
              </div>

              <div className="col-span-2">
                <FormItem
                  label="Currency"
                  asterisk
                  errorMessage={
                    requiredFields.CurrencyCode ? 'Currency Is Required' : null
                  }
                  invalid={
                    requiredFields.CurrencyCode && requiredFields.CurrencyCode
                  }
                >

                  <Select
                    options={Currency}
                    isDisabled={aftersave}
                    value={Currency.filter((option) => option.value === formState.CurrencyCode)
                    }
                    onChange={(e) => {
                      setFormState((prevFormState) => ({
                        ...prevFormState,
                        CurrencyCode: e.value,
                      }));
                    }}
                  />
                </FormItem>
              </div>
            </div>}


            {!aftersave ? (
              <Button
                size="sm"
                className="mr-2 mt-2"
                onClick={() => Savedata()}
              >
                Confirm{' '}
              </Button>
            ) : null}
            {/* {aftersave && (
              <div className="mt-2 mb-2">
                <Button size="sm" onClick={() => setaftersave(false)}>
                  Edit{' '}
                </Button>
              </div>
            )} */}
          </Card>
          <Card>
            <Card
              // className={`mt-2`}
              bodyClass="p-3 flex justify-between items-center gap-2"
            >
              <div className="flex flex-col items-start justify-between gap-1 w-full">
                Total Content
                <h3>{contractCount}</h3>
              </div>
              <span size={30} className="text-red-500 text-3xl font-normal">
                <RxVideo />
              </span>
            </Card>
            <Card
              className={`mt-2`}
              bodyClass="p-3 flex justify-between items-center gap-2"
            >
              <div className="flex flex-col items-start justify-between gap-1 w-full">
                Total Cost
                <h3>
                  {(formState.CurrencyCode &&
                    Currency?.filter(
                      (item) => item.value === formState.CurrencyCode,
                    ).map((currency) => currency.symbol)[0]) ||
                    ' '}{' '}
                  {numberToINRFormat(totalCost)}
                </h3>
              </div>
              <span size={30} className="text-sky-500 text-3xl font-normal">
                {(formState.CurrencyCode &&
                  Currency?.filter(
                    (item) => item.value === formState.CurrencyCode,
                  ).map((currency) => currency.symbol)[0]) ||
                  ' '}{' '}
              </span>
            </Card>
          </Card>
        </div>
        {aftersave ? (
          <>
            <Card>
              <ContentContractDetails
                formStateDetails={formStateDetails}
                setFormStateDetails={setFormStateDetails}
                requiredFieldsDetails={requiredFieldsDetails}
                setRequiredFieldsDetails={setRequiredFieldsDetails}
                ContentM={ContentM}
                Amortisation={Amortisation}
                TanleData={TanleData}
                setTanleData={setTanleData}
                formState={formState}
                Currency={Currency}
              />

              <Button className="mt-2 mb-2" size="sm" onClick={() => SaveApi()}>
                Submit
              </Button>
            </Card>
          </>
        ) : null}
      </FormContainer>
    </Card>
  );
};

export default ContentContractAdd;
