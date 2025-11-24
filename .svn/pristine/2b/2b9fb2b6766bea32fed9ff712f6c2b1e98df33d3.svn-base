import { Button, FormItemcompact, Input, Segment, Select } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { countries, BusinessType, segmentSelections } from './ConstantData';
import { Field } from 'formik';
import { SegmentItemOption } from 'components/shared';
import { HiCheckCircle } from 'react-icons/hi';
import {
  isAddress,
  isChar,
  isCharAndNumRef,
  isCharSong,
  isEmail,
  isName,
  isNumbers,
} from 'components/validators';
import dayjs from 'dayjs';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

// Step2.js
export const Step2 = ({
  values,
  setFieldValue,
  handleFormDataChange,
  countryList,
  cityList,
}) => {
  const socialDomains = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'aol.com',
    'icloud.com',
    'mail.com',
    'protonmail.com',
    'zoho.com',
    'yandex.com',
    'gmx.com',
    'msn.com',
    'comcast.net',
    'live.com',
    'rediffmail.com',
    'qq.com',
    'naver.com',
    'mail.ru',
    'rocketmail.com',
    'att.net',
    'bellsouth.net',
    'verizon.net',
    'ymail.com',
    't-online.de',
    'cox.net',
    'sbcglobal.net',
    'optonline.net',
    'earthlink.net',
    'me.com',
    'mac.com',
    'inbox.com',
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 ">
        <div className="col-span-1">
          <FormItemcompact asterisk label="Name">
            <Field
              type="text"
              size="sm"
              name="ContactPerson"
              maxLength="20"
              placeholder="Your Name"
              value={values.ContactPerson}
              onChange={(e) => {
                if (isChar(e.target.value)) {
                  setFieldValue('ContactPerson', e.target.value);
                  handleFormDataChange({ ContactPerson: e.target.value });
                }
              }}
              component={Input}
            />
          </FormItemcompact>
        </div>
        <FormItemcompact asterisk label="Contact Number">
          <Field
            type="text"
            name="ContactNumber"
            maxLength="10"
            size="sm"
            placeholder="Your Contact Number"
            disabled={!(values.ContactPerson.length > 2)}
            value={values.ContactNumber}
            onChange={(e) => {
              if (isNumbers(e.target.value)) {
                setFieldValue('ContactNumber', e.target.value);
                handleFormDataChange({ ContactNumber: e.target.value });
              }
            }}
            component={Input}
          />
        </FormItemcompact>
        <div className="col-span-2">
          <FormItemcompact asterisk label="Organisation Name">
            <Field
              type="text"
              name="ClientName"
              placeholder="Organisation Name"
              value={values.ClientName}
              size="sm"
              maxLength="30"
              disabled={!(values.ContactNumber.length === 10)}
              onChange={(e) => {
                if (isCharSong(e.target.value)) {
                  setFieldValue('ClientName', e.target.value);
                  handleFormDataChange({ ClientName: e.target.value });
                }
              }}
              component={Input}
            />
          </FormItemcompact>
        </div>
        <FormItemcompact asterisk label="Email">
          <Field
            type="text"
            name="Email"
            maxLength="50"
            size="sm"
            placeholder="Company Email"
            value={values.Email}
            disabled={!(values.ClientName.length > 2)}
            onChange={(e) => {
              const emailValue = e.target.value;
              if (isEmail(emailValue)) {
                setFieldValue('Email', emailValue);
                handleFormDataChange({ Email: emailValue });
              }
            }}
            onBlur={(e) => {
              const emailValue = e.target.value;
              const domain = emailValue.split('@')[1]; // Extract domain
              if (socialDomains.includes(domain)) {
                // Handle the case where the domain is not allowed
                openNotification(
                  'warning',
                  `Emails from domains like ${domain} are not allowed.`,
                ); // Replace with your error handling logic
                setFieldValue('Email', ''); // Clear the field or take another action
              }
            }}
            component={Input}
          />
        </FormItemcompact>
        <FormItemcompact asterisk label="Channel Name">
          <Field
            type="text"
            name="ChannelName"
            maxLength="20"
            size="sm"
            disabled={!(values.Email.length > 10)}
            value={values.ChannelName}
            placeholder="Channel Name"
            onChange={(e) => {
              if (isCharSong(e.target.value)) {
                setFieldValue('ChannelName', e.target.value);
                handleFormDataChange({ ChannelName: e.target.value });
              }
            }}
            component={Input}
          />
        </FormItemcompact>
        <FormItemcompact
          label={
            <p>
              Reference Number{' '}
              <span className="text-xs text-slate-400">(optional)</span>
            </p>
          }
        >
          <Field
            type="text"
            name="Ref_by"
            value={values.Ref_by}
            maxLength="5"
            size="sm"
            placeholder="Reference Number"
            disabled={!values.ChannelName}
            onChange={(e) => {
              if (isCharAndNumRef(e.target.value)) {
                setFieldValue('Ref_by', e.target.value);
                handleFormDataChange({ Ref_by: e.target.value });
              }
            }}
            component={Input}
          />
        </FormItemcompact>
        <FormItemcompact asterisk label="Business Type">
          <Field name="ClientType" size="sm">
            {({ field, form }) => (
              <Select
                field={field}
                size="sm"
                isDisabled={!(values.ChannelName.length > 2)}
                form={form}
                options={BusinessType}
                value={BusinessType.filter(
                  (option) => option.value === values.ClientType,
                )}
                onChange={(option) => {
                  setFieldValue(field.name, option?.value);
                  handleFormDataChange({ ClientType: option?.value });
                }}
              />
            )}
          </Field>
        </FormItemcompact>
        <FormItemcompact asterisk label="Select Country">
          <Field name="Country">
            {({ field, form }) => (
              <Select
                field={field}
                form={form}
                size="sm"
                isDisabled={!values.ClientType}
                options={countryList}
                value={countryList.filter(
                  (option) => option.value === values.Country,
                )}
                onChange={(option) => {
                  setFieldValue(field.name, option?.value);
                  setFieldValue('State', '');
                  handleFormDataChange({
                    Country: option?.value,
                    State: '',
                  });
                }}
                component={Input}
              />
            )}
          </Field>
        </FormItemcompact>
        <FormItemcompact asterisk label="Select City">
          <Field name="City">
            {({ field, form }) => (
              <Select
                field={field}
                form={form}
                size="sm"
                isDisabled={!values.Country}
                options={cityList.filter(
                  (option) => option.country == values.Country,
                )}
                value={cityList.filter(
                  (option) => option.value === values.State,
                )}
                onChange={(option) => {
                  setFieldValue(field.name, option?.value);
                  handleFormDataChange({
                    State: option?.value,
                  });
                }}
                component={Input}
              />
            )}
          </Field>
        </FormItemcompact>
        <div className="col-span-2">
          <FormItemcompact
            asterisk
            label={
              <div className="flex items-center">
                <h4>Address</h4>
                <p className="ml-2 text-xs text-red-600">Minimum (20 Char)</p>
              </div>
            }
          >
            <Field
              // textArea
              type="text"
              name="Address"
              value={values.Address}
              placeholder="Organisation Address"
              disabled={!values.State}
              size="sm"
              maxLength="100"
              onChange={(e) => {
                if (isAddress(e.target.value)) {
                  setFieldValue('Address', e.target.value);
                  handleFormDataChange({ Address: e.target.value });
                }
              }}
              component={Input}
            />
          </FormItemcompact>
        </div>
      </div>{' '}
    </div>
  );
};

// Step3.js
export const Step3 = ({ values, handleFormDataChange, handleStepChange }) => {
  const today = dayjs();
  const dateIn7Days = today.add(values.ExpiredOn, 'day');
  const formattedDate = dateIn7Days.format('MMMM D, YYYY');
  return (
    <div>
      <h4>Choose your plan</h4>
      <p className="flex items-center">
        <div className="_6DbT7w">
          <span aria-hidden="true" className="NA_Img dkWypw _7_8FQQ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: 'green' }}
            >
              <path d="M4.53 11.9 9 16.38 19.44 5.97a.75.75 0 0 1 1.06 1.06L9.53 17.97c-.3.29-.77.29-1.06 0l-5-5c-.7-.71.35-1.77 1.06-1.07z"></path>
            </svg>
          </span>
        </div>
        <div className="e_f6EA ml-2">
          <span className="text-white">No auto-renewal. Top-up anytime</span>
        </div>
      </p>
      <FormItemcompact>
        <Field name="PlanID">
          {({ field, form }) => (
            <div className="grid grid-cols-1 gap-4 ">
              <Segment
                className="w-full"
                selectionType="single"
                value={[form.values.PlanID]}
                onChange={(val) => {
                  const selectedPlanId = val[0];
                  // Function to calculate the future date based on the selected plan
                  const calculateFutureDate = (planId) => {
                    const today = new Date(); // Get today's date
                    let futureDate = new Date(today); // Clone today's date for manipulation

                    if (planId === 1) {
                      // Add 7 days
                      futureDate.setDate(today.getDate() + 15);
                    } else if (planId === 2) {
                      // Add 6 months
                      futureDate.setMonth(today.getMonth() + 6);
                    } else if (planId === 3) {
                      // Add 1 year
                      futureDate.setFullYear(today.getFullYear() + 1);
                    }

                    return futureDate;
                  };
                  const price = segmentSelections.filter(
                    (item) => item.value == selectedPlanId,
                  );
                  // Function to calculate days between two dates
                  const calculateDaysBetween = (startDate, endDate) => {
                    const oneDay = 24 * 60 * 60 * 1000; // Hours*minutes*seconds*milliseconds in a day
                    const diffInTime = endDate.getTime() - startDate.getTime(); // Difference in milliseconds
                    return Math.round(diffInTime / oneDay); // Convert milliseconds to days
                  };

                  // Calculate future date and days between today and the future date
                  const futureDate = calculateFutureDate(selectedPlanId);
                  const daysBetween = calculateDaysBetween(
                    new Date(),
                    futureDate,
                  );

                  // Update PlanID and ExpiredOn with the number of days
                  handleFormDataChange({
                    PlanID: selectedPlanId,
                    ExpiredOn: daysBetween,
                    price: price[0].price, // Store the number of days until expiration
                  });
                  form.setFieldValue('price', price[0].price);
                  form.setFieldValue('ExpiredOn', daysBetween);
                  form.setFieldValue(field.name, selectedPlanId);
                }}
              >
                <div className="grid grid-cols-1 gap-4 w-full">
                  {segmentSelections.map((Plan) => (
                    <Segment.Item key={Plan.value} value={Plan.value}>
                      {({ active, onSegmentItemClick, disabled }) => (
                        <div className="text-center">
                          <SegmentItemOption
                            hoverable
                            active={active}
                            disabled={disabled}
                            defaultGutter={false}
                            className="relative min-h-[80px] w-full"
                            customCheck={
                              <HiCheckCircle className="text-indigo-600 absolute top-2 right-2 text-lg" />
                            }
                            onSegmentItemClick={onSegmentItemClick}
                          >
                            <div className="w-full p-2  rounded ">
                              <div className="grid grid-cols-3 w-full">
                                <div></div>
                                <h6 className="!text-teal-500">{Plan.label}</h6>
                                {Plan.priceOff && (
                                  <div className="w-full flex justify-end items-center">
                                    <p className=" ml-2 bg-[#E4EEFF] p-1 rounded w-max ">
                                      {Plan.priceOff} Discount
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center justify-center">
                                {Plan.priceDrop && (
                                  <h5 className="line-through !text-red-500">
                                    $ {Plan.priceDrop}.00
                                  </h5>
                                )}
                              </div>
                              <h4>
                                {Plan.Symbol} {Plan.price}.00
                              </h4>
                            </div>
                          </SegmentItemOption>
                        </div>
                      )}
                    </Segment.Item>
                  ))}
                  <div className="flex items-center justify-between mt-5">
                    <p className="text-white">Expired On</p>
                    <p className="text-white"> {formattedDate}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h6>Due On</h6>
                    <h5>$ {values.price}.00</h5>
                  </div>
                </div>
              </Segment>
            </div>
          )}
        </Field>
      </FormItemcompact>

      {/* <FormItemcompact>
        <Button
          variant="solid"
          type="button"
          disabled={!values.PlanID}
          onClick={() => handleStepChange(3)}
        >
          Next
        </Button>
      </FormItemcompact> */}
    </div>
  );
};
