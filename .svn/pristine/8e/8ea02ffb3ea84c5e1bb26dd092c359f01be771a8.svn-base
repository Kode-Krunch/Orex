import { Button, Card, Tag } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, StickyFooter } from 'components/shared';
import SearchInputBooking from 'views/Controls/SearchInputBooking';
import { apiGetdealsearchdrop } from 'services/BookingService';
import {
  apiCallforbookdeatil,
  apiGetdealdetailId,
  apidealmasterBYID,
} from 'services/DealServices';
import { setDealData, setDealDataDetails } from 'store/auth/userSlice';
import {
  FORMATDATE_FOR_EVERY,
  formatDateToDDMMMYYYY,
} from 'views/Controls/GLOBALFUNACTION';
import HeaderExtra from 'views/Controls/HeaderExtra';
import Loader from 'views/Controls/Loader';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import NeftForm from './Forms/NeftForm';
import RtgsForm from './Forms/RtgsForm';
import ChequeForm from './Forms/ChequeForm';
import CashForm from './Forms/CashForm';
import { FaSave } from 'react-icons/fa';

/* CONSTANTS */
const paymentTypeOptions = [
  {
    value: 0,
    label: 'NEFT',
  },
  {
    value: 1,
    label: 'RTGS',
  },
  {
    value: 2,
    label: 'Cheque',
  },
  {
    value: 3,
    label: 'Cash',
  },
];

const Payment = () => {
  /* CONSTANTS */
  const currentHref = window.location.href;
  const hashPart = currentHref.split('#')[1];
  const spotBooking = hashPart ? hashPart.split('/')[1] : '';

  /* REDUX */
  const { Content } = useSelector((state) => state.base.common);
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const { DealData } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  /* STATES */
  const [The_data_I_want_To_Upload, setThe_data_I_want_To_Upload] = useState();
  const [SelectedItem, setSelectedItem] = useState(Content ? Content : []);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [Dealdata2, setDealdata2] = useState([]);
  const [formState, setFormState] = useState({
    MID: 2,
    position: 3,
    brand: Content?.BrandMaster?.BrandCode,
    datesrange: [],
    Commercial: [],
    date: new Date(),
    BookingRefNumber: Content?.BookingRefNumber
      ? Content?.BookingRefNumber
      : '',
  });
  const [Deatils, setDeatils] = useState([]);
  const [InputValue, setInputValue] = useState('');
  /* Payment Details */
  const [selPaymentType, setSelPaymentType] = useState(null);
  const [amount, setAmount] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [accNo, setAccNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selChequeType, setSelChequeType] = useState(null);
  const [chequeDate, setChequeDate] = useState(null);

  /* HOOKS */
  const navigate = useNavigate();

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      let Parameters = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
      };
      const resp = await apiGetdealsearchdrop(Parameters, '%20');
      const formattedOptions = resp.data.map((option) => ({
        value: option.DealNumber,
        label:
          option.DealCode +
          ' | ' +
          option.ClientName +
          ' | ' +
          option.AgencyName +
          ' [' +
          formatDateToDDMMMYYYY(option.DealPeriodFromDate) +
          ' To ' +
          formatDateToDDMMMYYYY(option.DealPeriodToDate) +
          '] ',
      }));
      setDealdata2(formattedOptions);
    })();
    dispatch(setDealData([]));
    dispatch(setDealDataDetails([]));
  }, []);

  useEffect(() => {
    if (Content.Channel?.ChannelCode) {
      if (
        !(
          Content.Channel?.ChannelCode == Channel.ChannelCode &&
          Content.locations?.LocationCode == Channel.LocationCode
        )
      ) {
        navigate(
          spotBooking === 'RoImportDetails'
            ? '/RoImport'
            : spotBooking === 'BookingDetails'
            ? '/SpotBooking'
            : '/NtcSpotBooking',
        );
      }
    }
  }, [Channel]);

  useEffect(() => {
    (async () => {
      const resp = await apiCallforbookdeatil(
        'GetBookingDetail',
        Content?.BookingNumber,
      );
      setDeatils(resp.data);
    })();
  }, [Content]);

  useEffect(() => {
    if (Object.keys(SelectedItem).length > 0) {
      (async () => {
        try {
          const dealmaster = await apidealmasterBYID(SelectedItem.value);
          dispatch(setDealData(dealmaster.data));
        } catch (error) {}
      })();
      (async () => {
        try {
          const dealdetail = await apiGetdealdetailId(SelectedItem.value);
          dispatch(setDealDataDetails(dealdetail.data));
        } catch (error) {}
      })();
    } else {
      dispatch(setDealData({}));
      dispatch(setDealDataDetails([]));
    }
  }, [SelectedItem]);

  return (
    <Card
      header={<HeaderExtra Component={'Booking Master'} />}
      className="h-full flex flex-col"
      bodyClass="grow h-0"
    >
      <Container className="h-full flex flex-col">
        <div className="m-2 grow h-0">
          <SearchInputBooking
            setCheckedItems={setCheckedItems}
            SelectedItem={SelectedItem}
            setSelectedItem={setSelectedItem}
            data={Dealdata2}
            placeholder="Search Deal Here..."
            DealData={DealData}
            length={The_data_I_want_To_Upload?.length}
            setFormState={setFormState}
            setThe_data_I_want_To_Upload={setThe_data_I_want_To_Upload}
            InputValue={InputValue}
            setInputValue={setInputValue}
            Deatils={Deatils}
            maxListHeight={300}
          />
          {DealData?.DealNumber && (
            <>
              <div className="grid grid-cols-5 gap-4 mt-4">
                <div>
                  <p className="mb-1">Agency & Booking</p>
                  <p className="text-gray-200 font-semibold">
                    {DealData.AgencyName}
                  </p>
                  <Tag
                    className="-ml-1 text-sm mt-2"
                    prefix
                    prefixClass="bg-emerald-500"
                    showCloseButton={false}
                  >
                    {DealData.BookingCode}
                  </Tag>
                </div>
                <div>
                  <p className="mb-1">Advertiser</p>
                  <p className="text-gray-200 font-semibold">
                    {DealData.ClientName}
                  </p>
                </div>
                <div>
                  <p className="mb-1">Start & End Date</p>
                  <p className="text-gray-200 font-semibold">
                    {FORMATDATE_FOR_EVERY(
                      new Date(DealData.DealPeriodFromDate),
                    )}{' '}
                    -{' '}
                    {FORMATDATE_FOR_EVERY(new Date(DealData.DealPeriodToDate))}
                  </p>
                </div>
                <div>
                  <p className="mb-1">Sales Person / Zone</p>
                  <p className="text-gray-200 font-semibold">
                    {DealData.Emp_FirstName} {DealData.Emp_LastName} /{' '}
                    {DealData.ZoneName}
                  </p>
                </div>
                <div>
                  <p className="mb-1">Amount ({DealData.CurrencyName})</p>
                  <p className="text-gray-200 font-semibold">
                    {DealData.CurrencySymbol}{' '}
                    {DealData.TotalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-t-gray-600 border-dashed grid grid-cols-5 gap-4">
                <div>
                  <p className="text-gray-200 mb-1">
                    Payment Type <span className="text-red-500">*</span>
                  </p>
                  <SelectXs
                    placeholder="Select"
                    options={paymentTypeOptions}
                    value={selPaymentType}
                    onChange={setSelPaymentType}
                  />
                </div>
                {selPaymentType && (
                  <>
                    {selPaymentType.value === 0 && (
                      <NeftForm
                        amount={amount}
                        setAmount={setAmount}
                        beneficiaryName={beneficiaryName}
                        setBeneficiaryName={setBeneficiaryName}
                        accNo={accNo}
                        setAccNo={setAccNo}
                        bankName={bankName}
                        setBankName={setBankName}
                        ifscCode={ifscCode}
                        setIfscCode={setIfscCode}
                        remarks={remarks}
                        setRemarks={setRemarks}
                        currencySymbol={DealData.CurrencySymbol}
                      />
                    )}
                    {selPaymentType.value === 1 && (
                      <RtgsForm
                        amount={amount}
                        setAmount={setAmount}
                        beneficiaryName={beneficiaryName}
                        setBeneficiaryName={setBeneficiaryName}
                        accNo={accNo}
                        setAccNo={setAccNo}
                        bankName={bankName}
                        setBankName={setBankName}
                        ifscCode={ifscCode}
                        setIfscCode={setIfscCode}
                        remarks={remarks}
                        setRemarks={setRemarks}
                        currencySymbol={DealData.CurrencySymbol}
                      />
                    )}
                    {selPaymentType.value === 2 && (
                      <ChequeForm
                        selChequeType={selChequeType}
                        setSelChequeType={setSelChequeType}
                        amount={amount}
                        setAmount={setAmount}
                        accNo={accNo}
                        setAccNo={setAccNo}
                        beneficiaryName={beneficiaryName}
                        setBeneficiaryName={setBeneficiaryName}
                        chequeDate={chequeDate}
                        setChequeDate={setChequeDate}
                        currencySymbol={DealData.CurrencySymbol}
                      />
                    )}
                    {selPaymentType.value === 3 && (
                      <CashForm
                        amount={amount}
                        setAmount={setAmount}
                        beneficiaryName={beneficiaryName}
                        setBeneficiaryName={setBeneficiaryName}
                        currencySymbol={DealData.CurrencySymbol}
                      />
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <StickyFooter
          className="-mx-8 px-8 flex items-center justify-end gap-2 py-4 pt-2 pb-2"
          stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <Button size="sm">Back</Button>
          <Button
            size="sm"
            variant="solid"
            disabled={true}
            icon={<FaSave className="text-[0.95rem]" />}
          >
            Save
          </Button>
        </StickyFooter>
      </Container>
      <Loader showLoader={showLoader} />
    </Card>
  );
};

export default Payment;
