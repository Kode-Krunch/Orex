import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  FormItem,
  Input,
  Select,
  Tabs,
  Tooltip,
} from 'components/ui';
import { convertDateToYMD, isNumbers, validate } from 'components/validators';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { HiCake, HiOutlineInformationCircle } from 'react-icons/hi';
import Table from 'components/ui/Table';
import {
  formatOnHHMMSSBlur,
  handleChangeWithOutFrameNew,
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegSave,
  FaRegTrashAlt,
} from 'react-icons/fa';
import { apiCallstoreprocedure } from 'services/CommonService';
import { apiGetContentmasterbyid } from 'services/ProgrammingService';
import ContentInfoDialog from '../FPCMaster/FPC_Edit/components/Toolbar/components/ContentInfoDialog';
const { Tr, Th, Td, THead, TBody } = Table;
const { TabNav, TabList, TabContent } = Tabs;
const PartyType = [
  { value: 1, label: 'DISTRIBUTOR' },
  { value: 2, label: 'LICENSEE' },
];
const ContentContractDetails = ({
  formStateDetails,
  setFormStateDetails,
  requiredFieldsDetails,
  setRequiredFieldsDetails,
  ContentM,
  Amortisation,
  TanleData,
  setTanleData,
  formState,
  Currency,
}) => {
  useEffect(() => {
    if (
      formStateDetails.BroadcastStartTime &&
      formStateDetails.BroadcastEndTime
    ) {
    }
  }, [formStateDetails.BroadcastStartTime, formStateDetails.BroadcastEndTime]);
  const [SelectedRow, setSelectedRow] = useState(null);
  const [Dialogbox, setDialogbox] = useState(false);
  const [contentInfo, setContentInfo] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const GetContents = async (ContentCode) => {
    try {
      setShowLoader(true);
      const datas = await apiGetContentmasterbyid(ContentCode);
      console.log(datas);

      setDialogbox(true);
      setContentInfo(datas.data);
      setShowLoader(false);
    } catch (error) {
      console.error('Error fetching content info:', error);
      setShowLoader(false);
    }
  };
  useEffect(() => {
    const gboxElement = document.getElementsByClassName('overflow-x-auto')[0];
    if (gboxElement) {
      gboxElement.style.overflowX = 'scroll';
      gboxElement.style.overflowY = 'scroll';
      gboxElement.style.height = '250px';
    } // Optionally, you might want to revert the change when the component unmounts
    return () => {
      if (gboxElement) {
        gboxElement.style.overflowX = 'hidden';
        gboxElement.style.overflowY = 'hidden';
      }
    };
  }, []);
  const [cardid, setcadrid] = useState(0);
  const [selectedcontent, setSelectedcontent] = useState(0);
  const handleInputChange2 = (value, name) => {
    setFormStateDetails((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isNumbers(value)) {
      if (name == 'RepeatRun') {
        setFormStateDetails((prevFormState) => ({
          ...prevFormState,
          ['RepeatPlayWeek']: '',
        }));
        setFormStateDetails((prevFormState) => ({
          ...prevFormState,
          ['RepeatPlayDay']: '',
        }));
        setFormStateDetails((prevFormState) => ({
          ...prevFormState,
          ['RepeatPlayHour']: '',
        }));
      }
      if (name == 'TotalEpisode') {
        const sanitizedValue = value.replace(/\D/g, '');

        setFormStateDetails((prevFormState) => ({
          ...prevFormState,
          [name]: sanitizedValue,
        }));
        return;
      }
      if (name == 'CostPerEp') {
        const sanitizedValue = value.replace(/\D/g, '');

        setFormStateDetails((prevFormState) => ({
          ...prevFormState,
          [name]: sanitizedValue,
        }));
        setFormStateDetails((prevFormState) => ({
          ...prevFormState,
          ProgCost: formStateDetails.TotalEpisode * sanitizedValue,
        }));
        return;
      }
      // if (name == 'CostPerEp') {

      //   setFormStateDetails((prevFormState) => ({
      //     ...prevFormState,
      //     'ProgCost': formStateDetails.TotalEpisode * value,
      //   }))
      // }

      if (name == 'RepeatRun') {
        setFormStateDetails((prevFormState) => ({
          ...prevFormState,
          NoofRuns: Number(formStateDetails.OrignalRun) + Number(value),
        }));
      }

      if (name == 'NoofTimein24Hrs') {
        setFormStateDetails((prevFormState) => ({
          ...prevFormState,
          TotalBroadcastRun: formStateDetails.NoofRuns * value,
        }));
      }

      setFormStateDetails((prevFormState) => ({
        ...prevFormState,
        [name]: value,
      }));
    }
  };
  const dateGap = -1;

  const minDate = dayjs(formStateDetails.ContractStartDate)
    .subtract(dateGap, 'day')

    .startOf('day')

    .toDate();

  const checkFieldsNotEmpty = (formState, requiredFields) => {
    const emptyFields = [];

    for (const field of requiredFields) {
      if (!formState[field]) {
        emptyFields.push(field);
      }
    }

    return emptyFields;
  };
  const Nextdata = () => {
    const emptyFields = checkFieldsNotEmpty(
      formStateDetails,
      Object.keys(requiredFieldsDetails),
    );

    if (emptyFields.length === 0 && formStateDetails.ContractCode?.value) {
      setcadrid(1);
    } else {
      openNotification('warning', 'Please insert mandatory field!!!');
      emptyFields.forEach((field) => {
        setRequiredFieldsDetails((prevRequiredFields) => ({
          ...prevRequiredFields,
          [field]: true,
        }));
      });
    }
  };

  const ContentDemo = [{ value: '', label: 'Data Not Found' }];
  return (
    <Card>
      <Tabs value={cardid} onChange={(val) => null}>
        <div className="grid grid-cols-2 gap-2">
          <Card className="">
            <TabList>
              <TabNav value={0}>Contract Details</TabNav>
              <TabNav value={1}>Run Details</TabNav>
            </TabList>
            {(() => {
              switch (cardid) {
                case 0:
                  return (
                    <>
                      <TabContent value={0}>
                        <div className="col-span-1 mt-2">
                          <div className="grid grid-cols-4 gap-2">
                            <div className="col-span-2">
                              <FormItem
                                label={
                                  <div className="flex items-center justify-between w-full">
                                    <p className="text-white">
                                      Content{' '}
                                      <span className="text-red-500">*</span>
                                    </p>
                                    {selectedcontent > 0 && (
                                      <Tooltip title="Show Content Info">
                                        <Button
                                          size="xs"
                                          variant="plain"
                                          shape="circle"
                                          icon={<HiOutlineInformationCircle />}
                                          onClick={() => {
                                            GetContents(selectedcontent);
                                          }}
                                        />
                                      </Tooltip>
                                    )}
                                  </div>
                                }
                              >
                                <Select
                                  options={ContentM}
                                  value={
                                    ContentM !== null
                                      ? ContentM.filter(
                                        (option) =>
                                          option.value ==
                                          formStateDetails.ContractCode
                                            ?.value,
                                      )
                                      : ContentDemo.filter(
                                        (option) => option.value,
                                      )
                                  }
                                  onChange={(event) => {
                                    let data = {};
                                    data.Content = event.value;

                                    apiCallstoreprocedure(
                                      'CheckContentExistFPC',
                                      data,
                                    )
                                      .then((response) => {
                                        if (response.status == 200) {
                                          openNotification(
                                            'warning',
                                            `FPC Is Created for ${event.label}`,
                                          );
                                          setSelectedcontent(0);
                                          setFormStateDetails(
                                            (prevFormState) => ({
                                              ...prevFormState,
                                              ContractCode: {
                                                value: '',
                                                label: '',
                                              },
                                            }),
                                          );
                                        }

                                        if (response.status == 204) {
                                          // setShowLoader(false);
                                          setSelectedcontent(event.value);
                                          setFormStateDetails(
                                            (prevFormState) => ({
                                              ...prevFormState,
                                              ContractCode: event,
                                            }),
                                          );
                                        }
                                      })
                                      .catch((error) => {
                                        if (error.response.status) {
                                          //
                                        }
                                      });
                                  }}
                                  name="ContractCode"
                                ></Select>
                              </FormItem>
                            </div>
                            <div className="col-span-2">
                              <FormItem label="Amortisation Type" asterisk>
                                <Select
                                  options={Amortisation}
                                  value={
                                    Amortisation !== null
                                      ? Amortisation.filter(
                                        (option) =>
                                          option.value ===
                                          formStateDetails
                                            .AmortisationTypeCode.value,
                                      )
                                      : ContentDemo.filter(
                                        (option) => option.value,
                                      )
                                  }
                                  onChange={(event) => {
                                    setFormStateDetails((prevFormState) => ({
                                      ...prevFormState,
                                      AmortisationTypeCode: event,
                                    }));
                                  }}
                                  name="AmortisationTypeCode"
                                ></Select>
                              </FormItem>
                            </div>
                            <div className="col-span-2">
                              <FormItem label="Contract Start Date" asterisk>
                                <DatePicker
                                  size="sm"
                                  name="ContractStartDate"
                                  prefix={<HiCake className="text-xl" />}
                                  minDate={dayjs(
                                    new Date(formState?.AgreementDate),
                                  )
                                    .subtract(0, 'day')

                                    .startOf('day')

                                    .toDate()}
                                  defaultValue={
                                    validate(formStateDetails.ContractStartDate)
                                      ? new Date(
                                        formStateDetails.ContractStartDate,
                                      )
                                      : ''
                                  }
                                  onChange={(date) => {
                                    handleInputChange2(
                                      convertDateToYMD(date),
                                      'ContractStartDate',
                                    );
                                  }}
                                />
                              </FormItem>
                            </div>
                            <div className="col-span-2">
                              <FormItem label="Contract End Date" asterisk>
                                <DatePicker
                                  size="sm"
                                  name="ContractEndDate"
                                  prefix={<HiCake className="text-xl" />}
                                  minDate={minDate}
                                  // maxDate={maxDate}
                                  defaultValue={
                                    validate(formStateDetails.ContractEndDate)
                                      ? new Date(
                                        formStateDetails.ContractEndDate,
                                      )
                                      : ''
                                  }
                                  onChange={(date) => {
                                    handleInputChange2(
                                      convertDateToYMD(date),
                                      'ContractEndDate',
                                    );
                                  }}
                                />
                              </FormItem>
                            </div>
                            <div className="col-span-1">
                              <FormItem label="Content Received">
                                <DatePicker
                                  size="sm"
                                  name="EADofMaterial"
                                  prefix={<HiCake className="text-xl" />}
                                  defaultValue={
                                    validate(formStateDetails.EADofMaterial)
                                      ? new Date(formStateDetails.EADofMaterial)
                                      : ''
                                  }
                                  onChange={(date) => {
                                    handleInputChange2(
                                      convertDateToYMD(date),
                                      'EADofMaterial',
                                    );
                                  }}
                                />
                              </FormItem>
                            </div>
                            <div className="col-span-1">
                              <FormItem label="Total Episode" asterisk>
                                <Input
                                  size="sm"
                                  name="TotalEpisode"
                                  maxLength="4"
                                  placeholder="Total Episode"
                                  value={formStateDetails.TotalEpisode}
                                  onChange={handleInputChange}
                                />
                              </FormItem>
                            </div>
                            <div className="col-span-1">
                              <FormItem label="Cost Per Episode " asterisk>
                                <Input
                                  size="sm"
                                  name="CostPerEp"
                                  maxLength="7"
                                  placeholder="Cost Per Ep"
                                  value={formStateDetails.CostPerEp}
                                  onChange={handleInputChange}
                                />
                              </FormItem>
                            </div>
                            <div className="col-span-1">
                              <FormItem label="Program Cost" asterisk>
                                <Input
                                  size="sm"
                                  name="ProgCost"
                                  disabled
                                  maxLength="20"
                                  placeholder="Prog Cost"
                                  value={formStateDetails.ProgCost}
                                  onChange={handleInputChange}
                                />
                              </FormItem>
                            </div>

                            <div className="col-span-4">
                              <div className="flex justify-end">
                                <Tooltip title="Next">
                                  <Button
                                    onClick={() => Nextdata()}
                                    size="sm"
                                    icon={<FaArrowRight />}
                                    variant="solid"
                                  />
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabContent>
                    </>
                  );
                case 1:
                  return (
                    <TabContent value={1}>
                      <div className="col-span-1 mt-2">
                        <Checkbox
                          defaultChecked={formStateDetails.UnlimitedRuns}
                          onChange={(e) => {
                            setFormStateDetails((prevFormState) => ({
                              ...prevFormState,
                              UnlimitedRuns: e,
                            }));
                          }}
                        >
                          UnlimitedRuns
                        </Checkbox>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1">
                            <FormItem label="Orignal Run">
                              <Input
                                size="sm"
                                name="OrignalRun"
                                maxLength="20"
                                disabled
                                placeholder="Orignal Run"
                                value={formStateDetails.OrignalRun}
                              />
                            </FormItem>
                          </div>
                          <div className="col-span-1">
                            <FormItem label="Repeat Run">
                              <Input
                                size="sm"
                                name="RepeatRun"
                                maxLength="20"
                                disabled={formStateDetails.UnlimitedRuns}
                                placeholder="Repeat Run"
                                value={formStateDetails.RepeatRun}
                                onChange={handleInputChange}
                              />
                            </FormItem>
                          </div>
                          <div className="col-span-1">
                            <FormItem label="Total Runs ">
                              <Input
                                size="sm"
                                name="NoofRuns"
                                maxLength="20"
                                disabled
                                placeholder="Total Runs"
                                value={formStateDetails.NoofRuns}
                                onChange={handleInputChange}
                              />
                            </FormItem>
                          </div>
                          <div className="col-span-1">
                            <FormItem label=" No of Time">
                              <Input
                                size="sm"
                                name="NoofTimein24Hrs"
                                maxLength="20"
                                disabled={formStateDetails.UnlimitedRuns}
                                placeholder="No of Time"
                                value={formStateDetails.NoofTimein24Hrs}
                                onChange={handleInputChange}
                              />
                            </FormItem>
                          </div>
                          {/* <div className="col-span-1">
                            <FormItem label="Broadcast Start Time">
                              <Input
                                size="sm"
                                name="BroadcastStartTime"
                                maxLength="20"
                                placeholder="HH:MM:SS"
                                value={formStateDetails.BroadcastStartTime}
                                onChange={(e) =>
                                  handleChangeWithOutFrameNew(
                                    e,
                                    setFormStateDetails,
                                  )
                                }
                                onBlur={handleBlur}
                              />
                            </FormItem>
                          </div> */}

                          {/* <div className="col-span-1">
                            <FormItem label="Broadcast End Time">
                              <Input
                                size="sm"
                                name="BroadcastEndTime"
                                maxLength="20"
                                placeholder="HH:MM:SS"
                                value={formStateDetails.BroadcastEndTime}
                                onChange={(e) =>
                                  handleChangeWithOutFrameNew(
                                    e,
                                    setFormStateDetails,
                                  )
                                }
                                onBlur={handleBlur}
                              />
                            </FormItem>
                          </div> */}
                          <div className="col-span-2">
                            <FormItem label=" Total Broadcast Run">
                              <Input
                                size="sm"
                                name="TotalBroadcastRun"
                                maxLength="20"
                                disabled
                                placeholder="Total Broadcast Run"
                                value={formStateDetails.TotalBroadcastRun}
                                onChange={handleInputChange}
                              />
                            </FormItem>
                          </div>

                          <div className="col-span-1">
                            {' '}
                            {formStateDetails.RepeatRun > 0 && (
                              <FormItem label="Repeat Play Week">
                                <Input
                                  size="sm"
                                  name="RepeatPlayWeek"
                                  maxLength="20"
                                  disabled={formStateDetails.UnlimitedRuns}
                                  placeholder="Repeat Play Week"
                                  value={formStateDetails.RepeatPlayWeek}
                                  onChange={handleInputChange}
                                />
                              </FormItem>
                            )}
                          </div>

                          <div className="col-span-1">
                            {formStateDetails.RepeatRun > 0 && (
                              <FormItem label="Repeat Play Day">
                                <Input
                                  size="sm"
                                  name="RepeatPlayDay"
                                  maxLength="20"
                                  disabled={formStateDetails.UnlimitedRuns}
                                  placeholder="Repeat Play Day"
                                  value={formStateDetails.RepeatPlayDay}
                                  onChange={handleInputChange}
                                />
                              </FormItem>
                            )}
                          </div>

                          <div className="col-span-1">
                            {formStateDetails.RepeatRun > 0 &&
                              formStateDetails.RepeatRun != 2 && (
                                <FormItem label="Repeat Play Hour">
                                  <Input
                                    size="sm"
                                    name="RepeatPlayHour"
                                    maxLength="20"
                                    disabled={formStateDetails.UnlimitedRuns}
                                    placeholder="Repeat Play Hour"
                                    value={formStateDetails.RepeatPlayHour}
                                    onChange={handleInputChange}
                                  />
                                </FormItem>
                              )}
                          </div>

                          <div className="col-span-4">
                            <div className="flex justify-end">
                              <Tooltip title="Previous">
                                <Button
                                  onClick={() => setcadrid(0)}
                                  size="sm"
                                  icon={<FaArrowLeft />}
                                />
                              </Tooltip>
                              {/* <Tooltip title="Next">
                              <Button
                                className="ml-2"
                                onClick={() => setcadrid(2)}
                                size="sm"
                                icon={<FaArrowRight />}
                                variant="solid"
                              />
                            </Tooltip> */}
                              <Tooltip title="Add">
                                <Button
                                  className="ml-2"
                                  size="sm"
                                  onClick={() => {
                                    console.log(
                                      formStateDetails.ContractCode.value,
                                    );
                                    const abx = TanleData.some(
                                      (item) =>
                                        item.ContractCode.value ==
                                        formStateDetails.ContractCode.value,
                                    );
                                    console.log(abx);
                                    if (abx) {
                                    } else {
                                      setTanleData([
                                        ...TanleData,
                                        formStateDetails,
                                      ]);
                                      setcadrid(0);
                                      setFormStateDetails({
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
                                        MatDelPaidBy: '1',
                                        MatRetCodePaidBy: '1',
                                      });
                                    }
                                  }}
                                  icon={<FaRegSave />}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabContent>
                  );

                // case 2:
                //   return (
                //     <TabContent value={2}>
                //       <Card>
                //         <div className="grid grid-cols-4 gap-2">
                //           <div className="col-span-1"></div>

                //           <div className="col-span-1">
                //             <FormItem label="Material Delivered Paid By">
                //               <Select
                //                 options={PartyType}
                //                 value={
                //                   PartyType !== null
                //                     ? PartyType.filter(
                //                         (option) =>
                //                           option.value ===
                //                           formStateDetails.MatDelPaidBy,
                //                       )
                //                     : ContentDemo.filter((option) => option.value)
                //                 }
                //                 onChange={(event) => {
                //                   setFormStateDetails((prevFormState) => ({
                //                     ...prevFormState,
                //                     MatDelPaidBy: event.value,
                //                   }));
                //                 }}
                //                 name="MatDelPaidBy"
                //               ></Select>
                //             </FormItem>
                //           </div>
                //           <div className="col-span-1">
                //             <FormItem label="Material Rate Code Paid By ">
                //               <Select
                //                 options={PartyType}
                //                 value={
                //                   PartyType !== null
                //                     ? PartyType.filter(
                //                         (option) =>
                //                           option.value ===
                //                           formStateDetails.MatRetCodePaidBy,
                //                       )
                //                     : ContentDemo.filter((option) => option.value)
                //                 }
                //                 onChange={(event) => {
                //                   setFormStateDetails((prevFormState) => ({
                //                     ...prevFormState,
                //                     MatRetCodePaidBy: event.value,
                //                   }));
                //                 }}
                //                 name="MatRetCodePaidBy"
                //               ></Select>
                //             </FormItem>
                //           </div>
                //           <div className="col-span-4">
                //             <div className="flex justify-end">
                //               <Tooltip title="Previous">
                //                 <Button
                //                   onClick={() => setcadrid(1)}
                //                   size="sm"
                //                   icon={<FaArrowLeft />}
                //                 />
                //               </Tooltip>
                //               <Tooltip title="Add">
                //                 <Button
                //                   className="ml-2"
                //                   size="sm"
                //                   onClick={() => {
                //                     console.log(
                //                       formStateDetails.ContractCode.value,
                //                     );
                //                     const abx = TanleData.some(
                //                       (item) =>
                //                         item.ContractCode.value ==
                //                         formStateDetails.ContractCode.value,
                //                     );
                //                     console.log(abx);
                //                     if (abx) {
                //                     } else {
                //                       setTanleData([
                //                         ...TanleData,
                //                         formStateDetails,
                //                       ]);
                //                       setcadrid(0);
                //                       setFormStateDetails({
                //                         ContractCode: '',
                //                         AmortisationTypeCode: '',
                //                         ContractStartDate: '',
                //                         ContractEndDate: '',
                //                         ProgCost: '',
                //                         CostPerEp: '',
                //                         TotalEpisode: '',
                //                         UnlimitedRuns: true,
                //                         OrignalRun: 1,
                //                         RepeatRun: '',
                //                         NoofRuns: '',
                //                         NoofTimein24Hrs: '',
                //                         BroadcastStartTime: '',
                //                         BroadcastEndTime: '',
                //                         TotalBroadcastRun: '',
                //                         RepeatPlayWeek: ' ',
                //                         RepeatPlayDay: ' ',
                //                         RepeatPlayHour: ' ',
                //                         EADofMaterial: '',
                //                         MatDelPaidBy: '1',
                //                         MatRetCodePaidBy: '1',
                //                       });
                //                     }
                //                   }}
                //                   icon={<FaRegSave />}
                //                 />
                //               </Tooltip>
                //             </div>
                //           </div>
                //         </div>
                //       </Card>
                //     </TabContent>
                //   );
                default:
                  return null;
              }
            })()}
          </Card>
          <Card>
            <div
              style={{
                maxHeight: '500px',
                width: 'auto',
                overflow: 'scroll',
              }}
            >
              <h5
                className="mb-3 pb-3 mt-2"
                style={{ borderBottom: '1px solid rgb(72, 82, 96)' }}
              >
                Contract & Run Details
              </h5>
              <Table compact style={{ overflowX: 'auto' }}>
                <THead>
                  <Tr>
                    <Th>Content</Th>
                    {/* <Th>Amortisation</Th> */}
                    <Th>Ep</Th>
                    {/* <Th>Cost</Th> */}
                    <Th>Program Cost</Th>
                    <Th>Start</Th>
                    <Th>End</Th>
                    {/*<Th>Org Run</Th>
                    <Th>Rep Run</Th>
                    <Th>Total Runs</Th>
                    <Th>No of Time</Th>
                    <Th>Start Time</Th>
                    <Th>End Time</Th>
                    <Th>Broadcast Run </Th>
                    <Th>Week</Th>
                    <Th>Day</Th>

                    <Th>Content Received </Th> */}

                    <Th>Action</Th>
                  </Tr>
                </THead>
                <TBody>
                  {TanleData.map((item, index) => (
                    <Tr key={index}>
                      <Td
                        style={{
                          width: '120px',
                          maxWidth: '150px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.ContractCode.label}
                      </Td>
                      {/* <Td
                        style={{
                          width: '120px',
                          maxWidth: '165px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.AmortisationTypeCode.label}
                      </Td>*/}
                      <Td>{item.TotalEpisode}</Td>
                      {/* <Td>{item.CostPerEp}</Td> */}
                      <Td>
                        {(formState.CurrencyCode &&
                          Currency?.filter(
                            (item) => item.value == formState.CurrencyCode,
                          ).map((currency) => currency.symbol)[0]) ||
                          'Default Symbol'}{' '}
                        {numberToINRFormat(item.ProgCost)}
                      </Td>
                      <Td
                        style={{
                          width: '50px',
                          maxWidth: '110px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.ContractStartDate}
                      </Td>
                      <Td
                        style={{
                          width: '50px',
                          maxWidth: '110px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.ContractEndDate}
                      </Td>
                      {/* <Td>{item.OrignalRun}</Td>
                      <Td>{item.RepeatRun}</Td>
                      <Td>{item.NoofRuns}</Td>
                      <Td>{item.NoofTimein24Hrs}</Td>
                      <Td>{item.BroadcastStartTime}</Td>
                      <Td>{item.BroadcastEndTime}</Td>
                      <Td>{item.TotalBroadcastRun}</Td>
                      <Td>{item.RepeatPlayWeek}</Td>
                      <Td>{item.RepeatPlayDay}</Td>
                      <Td>{item.EADofMaterial}</Td> */}

                      <Td>
                        <Button
                          size="xs"
                          onClick={() => {
                            const filteredContracts = TanleData.filter(
                              (items, index) =>
                                items.ContractCode.value !==
                                item.ContractCode.value,
                            );

                            setTanleData(filteredContracts);
                          }}
                          icon={<FaRegTrashAlt />}
                        />
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </div>
          </Card>
        </div>
      </Tabs>
      <ContentInfoDialog
        isDialogOpen={Dialogbox}
        setIsDialogOpen={setDialogbox}
        contentInfo={contentInfo}
      />
    </Card>
  );
};

export default ContentContractDetails;
