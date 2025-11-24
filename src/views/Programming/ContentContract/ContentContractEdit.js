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
import { useNavigate } from 'react-router-dom';
import {
  apiGetCurrencymasterdrop,
  apishowplaceTree,
} from 'services/MasterService';
import {
  PutContentContract,
  addcontentcontractdetails,
  apiGetAmortisationTypeMaster,
  apiGetContentContractDetails,
  apiGetSuppliermasterDrop,
} from 'services/ProgrammingService';
import PromoTypeDropNewContent from 'views/Controls/PromoTypeDropNewContent';
import ContentContractDetails from './ContentContractDetails';
import {
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { RxVideo } from 'react-icons/rx';
import { Field } from 'formik';
import DropdownList from 'views/Controls/DropDownList';
import { apiCallstoreprocedure } from 'services/CommonService';

const ContentContractEdit = () => {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const { Content } = useSelector((state) => state.base.common);
  const [CurrencySysmbol, setCurrencySysmbol] = useState('');
  const [Currency, setCurrency] = useState([]);

  const [formState, setFormState] = useState(Content);
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

  const [aftersave, setaftersave] = useState(false);

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 5; year <= currentYear + 150; year++) {
      years.push({ value: year, label: year.toString() });
    }
    return years;
  };

  const [years] = useState(generateYears());

  const [Supplier, setSupplier] = useState([]);

  const [Place, setPlace] = useState([]);
  const [ContentM, setContentM] = useState([]);
  const [Amortisation, setAmortisation] = useState([]);
  const [TanleData, setTanleData] = useState([]);

  useEffect(() => {
    hideStackedSideNav_secondary();
    (async (values) => {
      const res = await apiGetContentContractDetails(Content.ContractCode);
      console.log(res.data);
      const transformedArray = res.data.map((item) => ({
        ContractCode: {
          value: item.ContentMaster.ContentCode,
          label: item.ContentMaster.ContentName,
        },
        AmortisationTypeCode: {
          value: item.AmortisationTypeMaster.AmortisationTypeCode,
          label: item.AmortisationTypeMaster.AmortisationTypeName,
        },
        ContractStartDate: item.ContractStartDate,
        ContractEndDate: item.ContractEndDate,
        ProgCost: item.ProgCost,
        CostPerEp: item.CostPerEp,
        TotalEpisode: '1', // You mentioned it's 1 in the desired format
        UnlimitedRuns: item.UnlimitedRuns,
        OrignalRun: item.OrignalRun,
        RepeatRun: '',
        NoofRuns: '',
        NoofTimein24Hrs: '',
        BroadcastStartTime: '',
        BroadcastEndTime: '',
        TotalBroadcastRun: '',
        RepeatPlayWeek: '',
        RepeatPlayDay: '',
        RepeatPlayHour: '',
        EADofMaterial: item.EADofMaterial,
        MatDelPaidBy: item.MatDelPaidBy.toString(),
        MatRetCodePaidBy: item.MatRetCodePaidBy.toString(),
      }));
      setTanleData(transformedArray);
    })();
    (async (values) => {
      const Content = await apiGetSuppliermasterDrop(values);
      const formattedOptions = Content.data.map((option) => ({
        value: option.SupplierCode,
        label: option.SupplierName,
      }));
      setSupplier(formattedOptions);
    })();
    (async (values) => {
      const Content = await apiCallstoreprocedure(
        'USP_PG_GetContentforContract',
        {
          par_LocationCode: Channel.LocationCode,
          par_ChannelCode: Channel.ChannelCode,
        },

      );
      const formattedOptions = Content.data.map((option) => ({
        value: option.ContentCode,
        label: option.ContentName,
      }));
      setContentM(formattedOptions);
    })();
    (async (values) => {
      const Content = await apiGetAmortisationTypeMaster(values);
      const formattedOptions = Content.data.map((option) => ({
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
  const token = useSelector((state) => state.auth.session.token);
  const Username = useSelector((state) => state.auth.session.Username);
  const navigate = useNavigate();

  const Savedata = async () => {
    console.log(TanleData);
    const emptyFields = checkFieldsNotEmpty(
      formState,
      Object.keys(requiredFields),
    );

    if (emptyFields.length === 0) {
      if (TanleData.length != 0) {
        const transformedArray = TanleData.map((item) => {
          const transformedItem = {
            RowNos: 0,
            ContractNo: formState.ContractNo,
            ContractCode: formState.ContractCode,
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
        try {
          const resp = await addcontentcontractdetails(transformedArray, token);
          if (resp.status === 200) {
            openNotification('success', 'Content Details Updated Successfully.');
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
        try {
          const resp = await PutContentContract(formState, token);
          if (resp.status === 200) {
            openNotification(
              'success',
              'Content Contract Updated Successfully',
            );
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

        emptyFields.forEach((field) => {
          setRequiredFields((prevRequiredFields) => ({
            ...prevRequiredFields,
            [field]: false,
          }));
        });
      } else {
        openNotification('warning', 'Kindly add atleast one detail');
      }
    } else {
      emptyFields.forEach((field) => {
        setRequiredFields((prevRequiredFields) => ({
          ...prevRequiredFields,
          [field]: true,
        }));
      });
    }
  };
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
  const ContentDemo = [{ value: '', label: 'Data Not Found' }];
  return (
    <Card header={<HeaderExtra />}>
      <FormContainer>
        <div className="grid grid-cols-3 gap-2">
          <Card className="col-span-2">
            <div className="grid grid-cols-6 gap-2">
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
                  <PromoTypeDropNewContent
                    selected={formState.SupplierCode}
                    setSelected={setFormState}
                    List={Supplier}
                    name={'SupplierCode'}
                    disabled={true}
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
                    value={
                      Place !== null
                        ? Place.filter(
                          (option) => option.value === formState.PlaceCode,
                        )
                        : ContentDemo.filter((option) => option.value)
                    }
                    isDisabled={aftersave}
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
                        <p className="dark:text-rose-500 ml-1 mr-2">*</p>
                      </div>
                      <p className="text-xs   dark:text-[#bddba9] ">
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
                    disabled={true}
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
                  <DropdownList
                    selected={Content.CurrencyCode}
                    setSelected={setFormState}
                    List={Currency}
                    name={'CurrencyCode'}
                  // disabled={true}
                  />
                </FormItem>
              </div>
            </div>
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
                  {' '}
                  {(formState.CurrencyCode &&
                    Currency?.filter(
                      (item) => item.value == formState.CurrencyCode,
                    ).map((currency) => currency.symbol)[0]) ||
                    'Default Symbol'}{' '}
                  {numberToINRFormat(totalCost)}
                </h3>
              </div>
              <span size={30} className="text-sky-500 text-3xl font-normal">
                {(formState.CurrencyCode &&
                  Currency?.filter(
                    (item) => item.value == formState.CurrencyCode,
                  ).map((currency) => currency.symbol)[0]) ||
                  'Default Symbol'}{' '}
              </span>
            </Card>
          </Card>
        </div>
        <br />
        <div>
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
        </div>
      </FormContainer>
      <div className="mt-2">
        <Button
          className="mr-1"
          onClick={() => Savedata()}
          variant="solid"
          size="sm"
        >
          Submit
        </Button>
        <Button
          className="ml-1"
          onClick={() => navigate('/ContentContractMaster')}
          size="sm"
        >
          Discard
        </Button>
      </div>
    </Card>
  );
};

export default ContentContractEdit;
