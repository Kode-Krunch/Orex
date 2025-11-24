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

const ContractHeader = ({
  Contract,
  setaftersave,
  onCollapse,
  collapse,
}) => {
  const [Hover, setHover] = useState(false);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  console.log(Contract);

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
          <h6>{Contract.ContractName}</h6>
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
            className="flex items-center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className="grid grid-flow-col auto-cols-auto grow ">
              <div>
                <div>
                  <span className="FontSizeV">Authorised Person</span>
                </div>
                <div className="flex items-center">
                  <h6 className="FontSizeI">{Contract.AuthorisedPerson}</h6>
                </div>
              </div>
              <div>
                <div>
                  <span className="FontSizeV">Supplier </span>
                </div>
                <div className="flex items-center">
                  <h6 className="FontSizeI">
                    {Contract.SupplierCode?.label}

                  </h6>
                </div>
              </div>

              <div>
                <div>
                  <span className="FontSizeV">Agreement Date</span>
                </div>
                <div className="flex items-center">

                  <h6 className="FontSizeG">
                    {/* {Contract.AgreementDate} */}
                    {new Date(Contract?.AgreementDate).toLocaleDateString(
                      'en-US',
                      options,
                    )}
                  </h6>
                </div>
              </div>
              <div>
                <div>
                  <span className="FontSizeV">Budget Year</span>
                </div>
                <div className="flex items-center">

                  <h6 className="FontSizeG">
                    {Contract.BudgetYear}

                  </h6>

                </div>
              </div>
              <div>
                <div>
                  <span className="FontSizeV">Remarks</span>
                </div>
                <div className="flex items-center">

                  <h6 className="FontSizeG">
                    {Contract.Remarks}


                  </h6>
                </div>
              </div>

            </div>

            <div className="EditB flex-none w-14  ">
              {Hover && (
                <Button
                  variant="twoTone"
                  size="xs"
                  onClick={() => setaftersave(false)}
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
export default ContractHeader;
