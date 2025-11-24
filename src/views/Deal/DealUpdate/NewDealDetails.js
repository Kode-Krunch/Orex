import { Button, Card, Input, Tabs } from 'components/ui';
import React, { memo, useState } from 'react';
import SelectXs from '../../Controls/SelectXs/SelectXs';
import { IoMdSave } from 'react-icons/io';
import { defaultUpdateFormState, fieldDependencies } from './constants';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { useSelector } from 'react-redux';
import TabList from 'components/ui/Tabs/TabList';
import TabNav from 'components/ui/Tabs/TabNav';
import TabContent from 'components/ui/Tabs/TabContent';
import { fieldsEnum, updateDealTabsEnum } from './enums';

/* CONSTANTS */
const {
  EXECUTIVE_NAME,
  CLIENT_NAME,
  CLIENT_CITY,
  AGENCY_NAME,
  AGENCY_CITY,
  PAYROUTE,
  DEAL_CATEGORY,
  SPOT_TYPE,
  RATE,
} = fieldsEnum;
console.log(DEAL_CATEGORY)
function NewDealDetails({
  dealDetails,
  updateFormState,
  setUpdateFormState,
  updateFormFieldOptions,
  selectedDeal,
}) {
  /* HOOKS */
  const loginId = useSelector((state) => state.auth.session.LoginId);

  /* STATES */
  const [tab, setTab] = useState(updateDealTabsEnum.DETAILS);

  /* EVENT HANDLERS */
  const handleFieldChange = (value, key) => {
    let newUpdateFormState = { ...updateFormState };
    if (key === EXECUTIVE_NAME)
      newUpdateFormState = {
        ...newUpdateFormState,
        [key]: value,
        [CLIENT_NAME]: defaultUpdateFormState[CLIENT_NAME],
        [CLIENT_CITY]: defaultUpdateFormState[CLIENT_CITY],
        [AGENCY_NAME]: defaultUpdateFormState[AGENCY_NAME],
        [AGENCY_CITY]: defaultUpdateFormState[AGENCY_CITY],
        [PAYROUTE]: defaultUpdateFormState[PAYROUTE],
      };
    else if (key === CLIENT_NAME)
      newUpdateFormState = {
        ...newUpdateFormState,
        [key]: value,
        [CLIENT_CITY]: defaultUpdateFormState[CLIENT_CITY],
        [AGENCY_NAME]: defaultUpdateFormState[AGENCY_NAME],
        [AGENCY_CITY]: defaultUpdateFormState[AGENCY_CITY],
        [PAYROUTE]: defaultUpdateFormState[PAYROUTE],
      };
    else if (key === CLIENT_CITY)
      newUpdateFormState = {
        ...newUpdateFormState,
        [key]: value,
        [AGENCY_NAME]: defaultUpdateFormState[AGENCY_NAME],
        [AGENCY_CITY]: defaultUpdateFormState[AGENCY_CITY],
        [PAYROUTE]: defaultUpdateFormState[PAYROUTE],
      };
    else if (key === AGENCY_NAME)
      newUpdateFormState = {
        ...newUpdateFormState,
        [key]: value,
        [AGENCY_CITY]: defaultUpdateFormState[AGENCY_CITY],
        [PAYROUTE]: defaultUpdateFormState[PAYROUTE],
      };
    else if (key === AGENCY_CITY)
      newUpdateFormState = {
        ...newUpdateFormState,
        [key]: value,
        [PAYROUTE]: defaultUpdateFormState[PAYROUTE],
      };
    else if (key === DEAL_CATEGORY)
      newUpdateFormState = {
        ...newUpdateFormState,
        [key]: value,
        [SPOT_TYPE]: updateFormFieldOptions[SPOT_TYPE].filter(
          (curOpt) => curOpt.label === value.SpotTypeName,
        )[0],
        [RATE]: value.Rate,
      };
    else if (key === SPOT_TYPE)
      newUpdateFormState = {
        ...newUpdateFormState,
        [key]: value,
        [RATE]:
          value.label === 'PAID' ? newUpdateFormState[DEAL_CATEGORY].Rate : '0',
      };
    else if (key === RATE) {
      if (!/^$|^\d+$|^\d+\.\d{0,2}$/.test(value)) return;
      newUpdateFormState = {
        ...newUpdateFormState,
        [key]: value,
      };
    } else
      newUpdateFormState = {
        ...newUpdateFormState,
        [key]: value,
      };
    setUpdateFormState(newUpdateFormState);
  };

  const handleUpdateDeal = async () => {
    try {
      if (tab === updateDealTabsEnum.DETAILS) await updateDetails();
      else if (tab === updateDealTabsEnum.RATE) await updateRate();
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Something went wrong while updating deal');
    }
  };

  /* HELPER FUNCTIONS */
  const updateDetails = async () => {
    try {
      const params = {
        DealNumber: selectedDeal.value,
        AgencyCode: updateFormState?.[AGENCY_NAME]?.value,
        AgencyCityCode: updateFormState?.[AGENCY_CITY]?.value,
        ClientCode: updateFormState?.[CLIENT_NAME]?.value,
        ClientCityCode: updateFormState?.[CLIENT_CITY]?.value,
        ExecutiveCode: updateFormState?.[EXECUTIVE_NAME]?.value,
        PayrouteCode: updateFormState?.[PAYROUTE]?.value,
        LoginCode: loginId,
      };
      const response = await apiCallstoreprocedure(
        'Usp_UpdateDealAgencyClient',
        params,
      );
      if (response.status === 200) {
        openNotification('success', 'Deal updated Successfully');
        window.location.reload();
      } else {
        openNotification('danger', response.data[0]?.Status);
      }
    } catch (error) {
      throw error;
    }
  };

  const updateRate = async () => {
    try {
      const params = {
        LoationCode: dealDetails.LocationCode,
        ChannelCode: dealDetails.ChannelCode,
        DealNumber: selectedDeal.value,
        DealLineDetailCode: updateFormState[DEAL_CATEGORY].DealLineItemNo,
        SpotTypeCode: updateFormState[SPOT_TYPE].value,
        Rate: Number(updateFormState[RATE]),
        LoginCode: loginId,
      };
      const response = await apiCallstoreprocedure(
        'USP_Deal_SpotTypeSpotRateUpdate',
        { ...params, IS_Update: 0 },
      );
      if (response.status === 200) {
        if (
          response.data[0].LastNo !==
          'Given Deal Line Item Number against Billing has been done.You are allowed to change Rate!' &&
          response.data[0].LastNo !== 'Booking Is Not Available.'
        ) {
          const response = await apiCallstoreprocedure(
            'USP_Deal_SpotTypeSpotRateUpdate',
            { ...params, IS_Update: 1 },
          );
          const count = response.data[0].Count;
          if (count > 0) {
            openNotification('success', response.data[0].LastNo);
          } else {
            openNotification('warning', response.data[0].LastNo);
          }
        } else {
          const count = response.data[0].Count;
          if (count > 0) {
            openNotification('success', response.data[0].LastNo);
          } else {
            openNotification('warning', response.data[0].LastNo);
          }
        }
      } else {
        openNotification('danger', response.data[0]?.Status);
      }
    } catch (error) {
      throw error;
    }
  };

  /* HELPER FUNCTIONS */
  const isFieldDisabled = (field) => {
    if (!dealDetails) return true;
    let dependencies = fieldDependencies[tab][field] || [];
    return (
      dependencies.some((dep) => !updateFormState[dep]) ||
      (tab === updateDealTabsEnum.RATE &&
        updateFormState[SPOT_TYPE].label === 'PAID' &&
        Number(updateFormState[RATE]) < 1)
    );
  };

  return (
    <Card
      className="h-full col-span-1"
      bordered={false}
      bodyClass="pt-2 pb-3 px-0 h-full flex flex-col"
    >
      <div className="flex items-center justify-between pb-2 px-3 border-b border-dashed border-b-gray-600">
        <h5>Update Deal</h5>
        <Button
          size="sm"
          variant="solid"
          icon={<IoMdSave />}
          className="!px-2"
          disabled={isFieldDisabled('all')}
          onClick={handleUpdateDeal}
        >
          Update
        </Button>
      </div>
      {dealDetails ? (
        <Tabs
          defaultValue={tab}
          onChange={setTab}
          className="grow h-0 flex flex-col"
        >
          <TabList>
            <TabNav value={updateDealTabsEnum.DETAILS}>Details</TabNav>
            <TabNav value={updateDealTabsEnum.RATE}>Rate</TabNav>
          </TabList>
          <div className="grow h-0">
            {tab === updateDealTabsEnum.DETAILS && (
              <TabContent
                value={updateDealTabsEnum.DETAILS}
                className="p-3 h-full flex flex-col gap-5 overflow-hidden hover:overflow-auto transition-all"
              >
                <div>
                  <p className="text-gray-200 mb-1">
                    Executive Name <span className="text-red-500">*</span>
                  </p>
                  <SelectXs
                    placeholder="Search Executive"
                    options={updateFormFieldOptions[EXECUTIVE_NAME]}
                    value={updateFormState[EXECUTIVE_NAME]}
                    onChange={(option) =>
                      handleFieldChange(option, EXECUTIVE_NAME)
                    }
                    isDisabled={isFieldDisabled(EXECUTIVE_NAME)}
                  ></SelectXs>
                </div>
                <div>
                  <p className="text-gray-200 mb-1">
                    Client Name <span className="text-red-500">*</span>
                  </p>
                  <SelectXs
                    placeholder="Search Client"
                    options={updateFormFieldOptions[CLIENT_NAME]}
                    value={updateFormState[CLIENT_NAME]}
                    onChange={(option) =>
                      handleFieldChange(option, CLIENT_NAME)
                    }
                    isDisabled={isFieldDisabled(CLIENT_NAME)}
                  ></SelectXs>
                </div>
                <div>
                  <p className="text-gray-200 mb-1">
                    Client City <span className="text-red-500">*</span>
                  </p>
                  <SelectXs
                    placeholder="Search City"
                    options={updateFormFieldOptions[CLIENT_CITY]}
                    value={updateFormState[CLIENT_CITY]}
                    onChange={(option) =>
                      handleFieldChange(option, CLIENT_CITY)
                    }
                    isDisabled={isFieldDisabled(CLIENT_CITY)}
                  ></SelectXs>
                </div>
                <div>
                  <p className="text-gray-200 mb-1">
                    Agency Name <span className="text-red-500">*</span>
                  </p>
                  <SelectXs
                    placeholder="Search Agency"
                    menuPlacement="top"
                    options={updateFormFieldOptions[AGENCY_NAME]}
                    value={updateFormState[AGENCY_NAME]}
                    onChange={(option) =>
                      handleFieldChange(option, AGENCY_NAME)
                    }
                    isDisabled={isFieldDisabled(AGENCY_NAME)}
                  ></SelectXs>
                </div>
                <div>
                  <p className="text-gray-200 mb-1">
                    Agency City <span className="text-red-500">*</span>
                  </p>
                  <SelectXs
                    placeholder="Search City"
                    menuPlacement="top"
                    options={updateFormFieldOptions[AGENCY_CITY]}
                    value={updateFormState[AGENCY_CITY]}
                    onChange={(option) =>
                      handleFieldChange(option, AGENCY_CITY)
                    }
                    isDisabled={isFieldDisabled(AGENCY_CITY)}
                  ></SelectXs>
                </div>
                <div>
                  <p className="text-gray-200 mb-1">
                    Payroute <span className="text-red-500">*</span>
                  </p>
                  <SelectXs
                    placeholder="Search Payroute"
                    menuPlacement="top"
                    options={updateFormFieldOptions[PAYROUTE]}
                    value={updateFormState[PAYROUTE]}
                    onChange={(option) => handleFieldChange(option, PAYROUTE)}
                    isDisabled={isFieldDisabled(PAYROUTE)}
                  ></SelectXs>
                </div>
              </TabContent>
            )}
            {tab === updateDealTabsEnum.RATE && (
              <TabContent
                value={updateDealTabsEnum.RATE}
                className="p-3 h-full flex flex-col gap-5 overflow-hidden hover:overflow-auto transition-all"
              >
                <div>
                  <p className="text-gray-200 mb-1">
                    Deal Category <span className="text-red-500">*</span>
                  </p>
                  <SelectXs
                    placeholder="Search Executive"
                    options={updateFormFieldOptions[DEAL_CATEGORY]}
                    value={updateFormState[DEAL_CATEGORY]}
                    onChange={(option) =>
                      handleFieldChange(option, DEAL_CATEGORY)
                    }
                    blurInputOnSelect={true}
                  />
                </div>
                {updateFormState[DEAL_CATEGORY] && (
                  <>
                    <div>
                      <p className="text-gray-200 mb-1">
                        Spot Type <span className="text-red-500">*</span>
                      </p>
                      <SelectXs
                        placeholder="Search"
                        menuPlacement="bottom"
                        options={updateFormFieldOptions[SPOT_TYPE]}
                        value={updateFormState[SPOT_TYPE]}
                        onChange={(option) =>
                          handleFieldChange(option, SPOT_TYPE)
                        }
                      ></SelectXs>
                    </div>
                    <div>
                      <p className="text-gray-200 mb-1">
                        Spot Rate <span className="text-red-500">*</span>
                      </p>
                      <Input
                        size="sm"
                        placeholder="Rate"
                        prefix={dealDetails.CurrencySymbol}
                        value={updateFormState[RATE]}
                        onChange={(event) =>
                          handleFieldChange(event.target.value, RATE)
                        }
                        disabled={updateFormState[SPOT_TYPE].label === 'BONUS'}
                      />
                      {updateFormState[SPOT_TYPE].label === 'PAID' &&
                        Number(updateFormState[RATE]) < 1 && (
                          <p className="text-red-500 mt-1">
                            Spot rate cannot be less than{' '}
                            {dealDetails.CurrencySymbol}1
                          </p>
                        )}
                    </div>
                  </>
                )}
              </TabContent>
            )}
          </div>
        </Tabs>
      ) : (
        <div className="grow h-0 flex items-center justify-center">
          Please select a deal to update
        </div>
      )}
    </Card>
  );
}

export default memo(NewDealDetails);
