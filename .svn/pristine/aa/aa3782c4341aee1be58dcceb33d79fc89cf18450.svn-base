import React from 'react';
import { useState, useEffect, useRef } from 'react';

// import { Checkbox } from 'primereact/checkbox';
import {
  Card,
  Button,
  Select,
  FormItem,
  FormContainer,
  DatePicker,
  Tooltip,
} from 'components/ui';
import { HiOutlinePencil } from 'react-icons/hi';
import { convertDateToYMD, validate } from 'components/validators';
import { HiCake } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const SearchOption = ({
  displayBasicDetails,
  setdisplayBasicDetails,
  setSelectedAgency,
  selectedAgency,
  brandList,
  setSelectedBrand,
  selectedBrand,
  ClientList,
  selectedClient,
  handleClientChange,
  formState,
  handleInputChange2,
  agencyList,
  OpenAvailableSpots,
  commercialList,
  setSelectedCommercial,
  selectedCommercial,
  setDisplaySpots,
}) => {
  const activeChannel = useSelector((state) => state.locale.selectedChannel);

  const headerExtraContent = (
    <Button
      className="text-emerald-500 text-sm"
      shape="circle"
      variant="plain"
      onClick={() => {
        setdisplayBasicDetails(true);
        setDisplaySpots(false);
      }}
      icon={<HiOutlinePencil />}
    />
  );

  const validateFields = (data) => {
    const temp = data.map((obj) => {
      const [key, value] = Object.entries(obj)[0];
      return value === null ? key : false;
    });
    const NullPresent = temp.findIndex((item) => item);
    if (NullPresent === -1) {
      return false;
    } else {
      return temp.filter((item) => item);
    }
  };

  const cardFooter = (
    <div className="flex justify-end">
      <Button
        size="sm"
        variant="solid"
        onClick={() => {
          const invalidFields = validateFields([
            { Client: selectedClient },
            { Agency: selectedAgency },
            { Brand: selectedBrand },
            { Commercial: selectedCommercial },
          ]);
          if (invalidFields) {
            const fieldNames = invalidFields.join(', ');
            openNotification(
              'warning',
              `The following fields are compulsory and missing: ${fieldNames}`,
            );
          } else {
            setdisplayBasicDetails(false);
            OpenAvailableSpots();
          }
        }}
      >
        Continue
      </Button>
    </div>
  );

  const SelectedData = (
    <div className="flex flex-col">
      {/* <h5>Spot Details</h5>    */}
      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-12">
          <h5>{activeChannel?.label}</h5>
        </div>
        <div className="col-span-2">
          <span className="FontSizeV">Start Date</span>
          <h6 className="FontSizeI">{formState.StartDate}</h6>
        </div>
        <div className="col-span-2">
          <span className="FontSizeV">End Date</span>
          <h6 className="FontSizeI">{formState.EndDate}</h6>
        </div>
        <div className="col-span-2">
          <span className="FontSizeV">Client</span>
          <h6 className="FontSizeI">{selectedClient?.label}</h6>
        </div>
        <div className="col-span-2">
          <span className="FontSizeV">Agency</span>
          <h6 className="FontSizeI">{selectedAgency?.label}</h6>
        </div>
        <div className="col-span-2">
          <span className="FontSizeV">Brand</span>
          <h6 className="FontSizeI">{selectedBrand?.label}</h6>
        </div>
        <div className="col-span-2">
          <span className="FontSizeV">Commercial</span>
          <h6 className="FontSizeI" style={{ wordWrap: 'break-word' }}>
            {selectedCommercial?.label}
          </h6>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-flow-row auto-rows-max gap-4">
        <Card
          header={displayBasicDetails ? 'Spot Details' : SelectedData}
          bodyClass={displayBasicDetails ? 'd-block' : 'd-none'}
          footer={displayBasicDetails ? cardFooter : null}
          headerExtra={displayBasicDetails ? null : headerExtraContent}
        >
          <div className="col-span-1">
            <FormContainer>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 ">
                  <div style={{ width: '300px' }}>
                    <p className="text-white font-extrabold">
                      {activeChannel.label}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 ">
                  <Card>
                    {!formState.StartDate && !formState.EndDate && (
                      <span className="text-red-500 mb-2">
                        Please Select Start and End date for Client
                      </span>
                    )}
                    <div className="grid grid-cols-6 gap-2 mb-5 mt-2">
                      <div className="col-span-3 ">
                        <FormItem label="Start Date">
                          <DatePicker
                            size="sm"
                            name="StartDate"
                            prefix={<HiCake className="text-xl" />}
                            value={
                              validate(formState.StartDate)
                                ? new Date(formState.StartDate)
                                : ''
                            } // Set defaultValue to current date
                            onChange={(date) => {
                              handleInputChange2(
                                convertDateToYMD(date),
                                'StartDate',
                              );
                            }}
                          />
                        </FormItem>
                      </div>
                      <div className="col-span-3 ">
                        <FormItem label="End Date">
                          <DatePicker
                            size="sm"
                            name="EndDate"
                            prefix={<HiCake className="text-xl" />}
                            defaultValue={
                              validate(formState.EndDate)
                                ? new Date(formState.EndDate)
                                : ''
                            } // Set defaultValue to current date
                            onChange={(date) => {
                              handleInputChange2(
                                convertDateToYMD(date),
                                'EndDate',
                              );
                            }}
                          />
                        </FormItem>
                      </div>

                      <div className="col-span-6 ">
                        <FormItem label="Client">
                          <Select
                            options={ClientList}
                            onChange={handleClientChange}
                            value={ClientList.filter(
                              (option) => option === selectedClient,
                            )}
                          />
                        </FormItem>
                      </div>
                      <div className="col-span-6 ">
                        <FormItem label="Agency">
                          <Select
                            options={agencyList}
                            onChange={setSelectedAgency}
                            value={agencyList.filter(
                              (option) => option === selectedAgency,
                            )}
                          />
                        </FormItem>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-span-2">
                  <Card>
                    <div className="grid grid-cols-6 gap-2 mb-5">
                      <div className="col-span-6 ">
                        <FormItem label="Brand">
                          <Select
                            options={brandList}
                            onChange={setSelectedBrand}
                            value={brandList.filter(
                              (option) => option === selectedBrand,
                            )}
                          />
                        </FormItem>
                      </div>
                      <div className="col-span-6 ">
                        <FormItem label="Commercial">
                          <Select
                            options={commercialList}
                            onChange={(e) => setSelectedCommercial(e)}
                            value={commercialList.filter(
                              (option) => option === selectedCommercial,
                            )}
                          />
                        </FormItem>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </FormContainer>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SearchOption;
