import { Card, Radio, Button, Checkbox } from 'components/ui';

import React, { useEffect, useState } from 'react';
import { FaCloudArrowDown } from 'react-icons/fa6';
import { ExportXls } from 'views/Controls/ExportXls';

const RateCard = ({
  channelsetting,
  setChannelsetting,
  setActiveIndex,
  Content,
}) => {
  const [IsRateCardAllowed, setIsRateCardAllowed] = useState(
    Content.IsRateCardAllowed ? Content.IsRateCardAllowed : 1,
  );

  console.log('Content', Content);

  let ContinueSave =
    Object.keys(channelsetting).length === 0 ? 'Continue' : 'Save';
  // useEffect(() => {
  //     console.log('setIsRateCardAllowed')
  //     console.log(IsRateCardAllowed)
  // }, [IsRateCardAllowed])
  console.log(Content.IsTRAI_InventoryRule);
  // 6 CHECKBOXES
  const [IsTRAI_InventoryRule, setIsTRAI_InventoryRule] = useState(() => {
    return (
      channelsetting.IsTRAI_InventoryRule === 1 ||
      Number(Content.IsTRAI_InventoryRule) === 1
    );
  });
  const [IsTapeCounterFlag, setIsTapeCounterFlag] = useState(() => {
    return (
      channelsetting.IsTapeCounterFlag === 1 ||
      Number(Content.IsTapeCounterFlag) === 1
    );
  });

  const [IsDiscountFlag, setIsDiscountFlag] = useState(() => {
    return (
      channelsetting.IsDiscountFlag === 1 ||
      Number(Content.IsDiscountFlag) === 1
    );
  });
  const [SRModificationAllowed, setSRModificationAllowed] = useState(() => {
    return (
      channelsetting.SRModificationAllowed === 1 ||
      Number(Content.SRModificationAllowed) === 1
    );
  });
  const [IsDealApproval, setIsDealApproval] = useState(() => {
    return (
      channelsetting.IsDealApproval === 1 ||
      Number(Content.IsDealApproval) === 1
    );
  });
  const [PaperMedia, setPaperMedia] = useState(() => {
    return channelsetting.PaperMedia === 1 || Number(Content.PaperMedia) === 1;
  });
  const [IsMultiChannel, setIsMultiChannel] = useState(() => {
    return (
      channelsetting.IsMultiChannel === 1 ||
      Number(Content.IsMultiChannel) === 1
    );
  });
  const [IsNTCAutoCalc, setIsNTCAutoCalc] = useState(() => {
    return (
      channelsetting.IsNTCAutoCalc === 1 || Number(Content.IsNTCAutoCalc) === 1
    );
  });
  const [IsNTCGroup, setIsNTCGroup] = useState(() => {
    return channelsetting.IsNTCGroup === 1 || Number(Content.IsNTCGroup) === 1;
  });
  const [PaymentCheck, setPaymentCheck] = useState(() => {
    return (
      channelsetting.PaymentCheck === 1 || Number(Content.PaymentCheck) === 1
    );
  });



  const DownloadingRateCardTemplate = (type) => {
    let ImportTemplate = {};
    if (type == 2) {
      ImportTemplate = {
        Type: 'Standard',
        TimeBandwise_Programwise: '07:00-11:59',
        Rate: '5000',
      };
    }
    if (type == 3) {
      ImportTemplate = {
        AgencyName: 'Sample Agency',
        TimeBandwise_Programwise: '07:00-11:59',
        Rate: '4000',
      };
    }
    if (type == 4) {
      ImportTemplate = {
        ClientName: 'Sample Client',
        TimeBandwise_Programwise: '07:00-11:59',
        Rate: '5000',
      };
    }

    ExportXls([ImportTemplate], 'Ratecard_Template');
  };

  return (
    <>
      <Card>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className="flex flex-col mb-5">
            <Checkbox
              name="IsTRAI_InventoryRule"
              checked={IsTRAI_InventoryRule}
              onChange={(value) => setIsTRAI_InventoryRule(value ? 1 : 0)}
            >
              TRAI Inventory Rule
            </Checkbox>
            <p className="text-[11px] w-[250px] ">
              ( Telecom Regulatory Authority of India Rule for Duration of
              Advertisement in TV Channels. )
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <Checkbox
              onChange={(value) => setIsTapeCounterFlag(value ? 1 : 0)}
              checked={IsTapeCounterFlag}
              name="IsTapeCounterFlag"
            >
              Tape Counter
            </Checkbox>
            <p className="text-[11px] w-[250px]">
              ( Tape Counter applicable means mandatory SOM and EOM of content.
              )
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <Checkbox
              name="IsDiscountFlag"
              onChange={(value) => setIsDiscountFlag(value ? 1 : 0)}
              checked={IsDiscountFlag}
            >
              Is Discount
            </Checkbox>{' '}
            <p className="text-[11px] w-[250px]">
              ( Standard Discount Structure applicable. )
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <Checkbox
              name="SRModificationAllowed"
              onChange={(value) => setSRModificationAllowed(value ? 1 : 0)}
              checked={SRModificationAllowed}
            >
              SR Modification Allowed
            </Checkbox>{' '}
            <p className="text-[11px] w-[250px]">
              ( Spot Rate Modification allowed. )
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <Checkbox
              name="IsDealApproval"
              onChange={(value) => setIsDealApproval(value ? 1 : 0)}
              checked={IsDealApproval}
            >
              Deal Approval Flow
            </Checkbox>{' '}
            <p className="text-[11px] w-[250px]">
              ( Client Deal Approval flow is required before spot booking. )
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <Checkbox
              name="PaperMedia"
              onChange={(value) => setPaperMedia(value ? 1 : 0)}
              checked={PaperMedia}
            >
              Paper Media
            </Checkbox>{' '}
            <p className="text-[11px] w-[250px]">
              ( News Paper ads entry allowed for billing. )
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <Checkbox
              name="IsMultiChannel"
              onChange={(value) => setIsMultiChannel(value ? 1 : 0)}
              checked={IsMultiChannel}
            >
              Is Multi Channel Deal
            </Checkbox>{' '}
            <p className="text-[11px] w-[250px]">
              ( Multiple Channel Deal applicable. )
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <Checkbox
              name="IsNTCAutoCalc"
              onChange={(value) => {
                setIsNTCAutoCalc(value ? 1 : 0);
                if (value) setIsNTCGroup(1);
              }}
              checked={IsNTCAutoCalc}
            >
              Is NTC Auto Calculate
            </Checkbox>{' '}
            <p className="text-[11px] w-[250px]">
              ( NTC Auto Calculation applicable. )
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <Checkbox
              name="IsNTCGroup"
              disabled={IsNTCAutoCalc}
              onChange={(value) =>
                !IsNTCAutoCalc && setIsNTCGroup(value ? 1 : 0)
              }
              checked={IsNTCGroup}
            >
              Is NTC Group
            </Checkbox>{' '}
            <p className="text-[11px] w-[250px]">
              ( NTC Group applicable. )
            </p>
          </div>
          <div className="flex flex-col mb-5">
            <Checkbox
              name="PaymentCheck"
              onChange={(value) => {
                setPaymentCheck(!value);

              }}
              checked={PaymentCheck}
            >
              Is Auto Payment
            </Checkbox>{' '}
            <p className="text-[11px] w-[250px]">
              ( Advance payment applicable. )
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <h4>Rate Card</h4>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <Radio.Group
              value={IsRateCardAllowed}
              // checked={PaperMedia}
              onChange={(val) => {
                // console.log(val);
                setIsRateCardAllowed(val);
              }}
            >
              <div className="mr-6">
                <Radio value={1}>Manual Ratecard</Radio>
                {/* <Button
                  size="xs"
                  className="ml-1 block"
                  onClick={() => DownloadingRateCardTemplate(1)}
                  variant="twoTone"
                  icon={<FaCloudArrowDown />}
                >
                  Manual Template
                </Button> */}
              </div>
              <div className="mr-6">
                <Radio value={2}>Normal Ratecard</Radio>
                <Button
                  size="xs"
                  className="ml-1 block"
                  onClick={() => DownloadingRateCardTemplate(2)}
                  variant="twoTone"
                  icon={<FaCloudArrowDown />}
                >
                  Normal Template
                </Button>
              </div>
              <div className="mr-6">
                <Radio value={3}>Agency Ratecard</Radio>
                <Button
                  size="xs"
                  className="ml-1 block"
                  onClick={() => DownloadingRateCardTemplate(3)}
                  variant="twoTone"
                  icon={<FaCloudArrowDown />}
                >
                  Agency Template
                </Button>
              </div>
              <div className="mr-6">
                <Radio value={4}>Client Ratecard</Radio>{' '}
                <Button
                  size="xs"
                  className="ml-1 block"
                  onClick={() => DownloadingRateCardTemplate(4)}
                  variant="twoTone"
                  icon={<FaCloudArrowDown />}
                >
                  Client Template
                </Button>
              </div>
            </Radio.Group>
          </div>
        </div>
      </Card>
      <br />
      <div className="flex items-center">
        <Button
          size="sm"
          onClick={() => {
            let res = { ...channelsetting };
            res.IsTRAI_InventoryRule = IsTRAI_InventoryRule;
            res.IsTapeCounterFlag = IsTapeCounterFlag;
            res.IsDiscountFlag = IsDiscountFlag;
            res.SRModificationAllowed = SRModificationAllowed;
            res.IsDealApproval = IsDealApproval;
            res.PaperMedia = PaperMedia;
            res.IsMultiChannel = IsMultiChannel;
            res.IsNTCAutoCalc = IsNTCAutoCalc;
            res.IsNTCGroup = IsNTCGroup;
            res.IsRateCardAllowed = IsRateCardAllowed;
            res.PaymentCheck = PaymentCheck;

            setChannelsetting(res);
            setActiveIndex(0);
          }}
          className="mr-2"
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="solid"
          onClick={() => {
            let res = { ...channelsetting };
            res.IsTRAI_InventoryRule = IsTRAI_InventoryRule;
            res.IsTapeCounterFlag = IsTapeCounterFlag;
            res.IsDiscountFlag = IsDiscountFlag;
            res.SRModificationAllowed = SRModificationAllowed;
            res.IsDealApproval = IsDealApproval;
            res.PaperMedia = PaperMedia;
            res.IsMultiChannel = IsMultiChannel;
            res.IsNTCAutoCalc = IsNTCAutoCalc;
            res.IsNTCGroup = IsNTCGroup;
            res.IsRateCardAllowed = IsRateCardAllowed;
            res.PaymentCheck = PaymentCheck;

            setChannelsetting(res);
            setActiveIndex(2);
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default RateCard;
