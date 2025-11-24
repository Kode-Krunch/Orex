import React, { useState } from 'react';
import { Button, Tooltip } from 'components/ui';
import {
  HiChevronDown,
  HiChevronRight,
  HiOutlinePlusCircle,
  HiOutlineX,
  HiPencil,
} from 'react-icons/hi';
import { motion } from 'framer-motion';

const DealHeader = ({
  selectedDealData,
  onPrevious,
  onCollapse,
  onDialogClose,
  collapse,
  handleAddDealClick,
  step,
  currentTab,
}) => {
  const [Hover, setHover] = useState(false);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <>
      <div className="flex justify-between ">
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={onCollapse}
        >
          <span className="text-lg">
            {collapse ? <HiChevronRight /> : <HiChevronDown />}
          </span>
          <h6>{selectedDealData.AgencyCode?.label}</h6>
        </div>

        <div>
          {step == 1 ? (
            <>
              {currentTab != 0 ? null : (
                <Button
                  className="ltr:mr-2 rtl:ml-2"
                  size="sm"
                  variant="solid"
                  onClick={handleAddDealClick}
                  icon={<HiOutlinePlusCircle />}
                />
              )}

              {currentTab == 0 ? null : (
                <Button
                  className="ltr:mr-2 rtl:ml-2"
                  size="sm"
                  onClick={() => {
                    onDialogClose();
                  }}
                  icon={<HiOutlineX />}
                />
              )}
            </>
          ) : null}
        </div>
      </div>

      <motion.div
        className=" mt-2"
        initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
        animate={{
          opacity: collapse ? 0 : 1,
          height: collapse ? 0 : 'auto',
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="dark:!border-[#374558] dark:!border dark:!bg-[#1d2939] bg-gray-100"
          style={{
            padding: '10px',
            borderRadius: '.5rem',
          }}
        >
          <div
            className="flex "
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className="grid grid-flow-col auto-cols-auto grow ">
              <div>
                <div>
                  <span className="FontSizeV">Deal Type</span>
                </div>
                <div className="flex items-center">
                  <h6 className="FontSizeI">{selectedDealData.DealTypeCode?.label}</h6>
                </div>
              </div>
              <div>
                <div>
                  <span className="FontSizeV">Executive & Zone</span>
                </div>
                <div className="flex items-center">
                  <h6 className="FontSizeI">
                    {selectedDealData.SalesExcutiveCode?.label}
                    <br />
                    {selectedDealData.ZoneCode?.label}{' '}
                  </h6>
                </div>
              </div>

              <div>
                <div>
                  <span className="FontSizeV">Client & City</span>
                </div>
                <div className="flex items-center">
                  <Tooltip title={selectedDealData.ClientCode?.label}>
                    <h6 className="FontSizeG">
                      {selectedDealData.ClientCode?.label}
                      <br />
                      {selectedDealData.ClientPlaceCode?.label}{' '}
                    </h6>
                  </Tooltip>
                </div>
              </div>
              <div>
                <div>
                  <span className="FontSizeV">Agency & City</span>
                </div>
                <div className="flex items-center">
                  <Tooltip title={selectedDealData.AgencyCode?.label}>
                    <h6 className="FontSizeG">
                      {selectedDealData.AgencyCode?.label}
                      <br />
                      {selectedDealData.AgencyPlaceCode?.label}{' '}
                    </h6>
                  </Tooltip>
                </div>
              </div>
              <div>
                <div>
                  <span className="FontSizeV">Pay Route & Deal Date</span>
                </div>
                <div className="flex items-center">
                  <Tooltip title={selectedDealData.PayRouteCode?.label}>
                    <h6 className="FontSizeG">
                      {selectedDealData.PayRouteCode?.label}
                      <br />{' '}
                      {new Date(selectedDealData?.DealCreatedDate).toLocaleDateString(
                        'en-US',
                        options,
                      )}{' '}
                    </h6>
                  </Tooltip>
                </div>
              </div>
              <div>
                <div>
                  <span className="FontSizeV">Start & End Date</span>
                </div>
                <div className="flex items-center">
                  <h6 className="FontSizeI">
                    {new Date(selectedDealData?.DealPeriodFromDate).toLocaleDateString(
                      'en-US',
                      options,
                    )}
                    <br />
                    {new Date(selectedDealData?.DealPeriodToDate).toLocaleDateString(
                      'en-US',
                      options,
                    )}{' '}
                  </h6>
                </div>
              </div>
            </div>

            <div className="EditB flex-none w-14  ">
              {Hover && (
                <Button
                  variant="twoTone"
                  size="xs"
                  onClick={onPrevious}
                  icon={<HiPencil />}
                />
              )}
            </div>
          </div>
        </div>
        {/* <p></p> */}
      </motion.div>
    </>
  );
};
export default DealHeader;
