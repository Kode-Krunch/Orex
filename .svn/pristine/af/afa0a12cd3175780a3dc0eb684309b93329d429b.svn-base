import { Button, Dialog, Tag, Tooltip } from 'components/ui';
import React, { useState } from 'react';
import { BsBuildings } from 'react-icons/bs';
import { CgTimer } from 'react-icons/cg';
import { HiOutlineIdentification, HiTrash } from 'react-icons/hi';
import { apiCallstoreprocedure } from 'services/CommonService';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import { useEffect, useMemo } from 'react';

const CardShow = ({ Data, setSelectedRowBooking, setData }) => {
  useEffect(() => {
    try {
      hideStackedSideNav_secondary();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDelete = async (BookingNumber) => {
    try {
      const reps = await apiCallstoreprocedure('USP_DELETE_TEMPBooking', {
        par_BookingNumber: BookingNumber,
      });

      if (reps.status === 200) {
        const unsave = Data.filter(
          (item) => item.BookingNumber != BookingNumber,
        );
        setData(unsave);
        setIsOpenDialog(false);
      } else {
        console.error('Failed to delete booking. Status code:', reps.status);
        // You can also show a notification to the user here if needed
      }
    } catch (error) {
      console.error('Error calling stored procedure:', error);
    }
  };

  const [SelectedRow, setSelectedRow] = useState({});
  const [dialogIsOpen, setIsOpenDialog] = useState(false);
  return (
    <div className="grid grid-cols-1  md:grid-cols-1  lg:grid-cols-2  xl:grid-cols-3   2xl:grid-cols-3  sm:grid-cols-1  gap-4 ">
      {Data.map((i, key) => (
        <div
          className={`web-card animate__animated onlythis  dark:!bg-[#1f2639]
          !bg-[#e9ecef85] dark:!border-[#374558]
           dark:!border `}
          key={key}
        >
          <div className="card-bodyR">
            <div className="flex justify-between">
              <div className="flex ">
                <div className={`dj-flex animate__animated onlythis2`}>
                  <HiOutlineIdentification style={{ fontSize: 35 }} />
                </div>
                <div
                  className="flex-grow-1 cursor-pointer"
                  onClick={() => setSelectedRowBooking(i.BookingNumber)}
                >
                  <h5>{i.BookingCode}</h5>
                  <span>{i.Client}</span>
                </div>
              </div>{' '}
              <div>
                {i.BookingCode.includes('unsave') && (
                  <Tooltip title="Delete Booking">
                    <Button
                      onClick={() => {
                        setSelectedRow(i);
                        setIsOpenDialog(true);
                      }}
                      icon={<HiTrash />}
                      size="sm"
                      variant="twoTone"
                      className="mt-0 ml-2"
                    />
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="alex dark:!bg-[#191f31] !bg-[#a1a5a966] ">
                <BsBuildings style={{ fontSize: 12 }} />
                &nbsp; {i.Agency}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="alex dark:!bg-[#191f31] !bg-[#a1a5a966] ">
                <CgTimer style={{ fontSize: 15 }} className="mr-1" />
                FCT &nbsp; <span style={{ fontSize: 15 }}>{i.FCT}</span>
              </div>
              <div className=" dark:!bg-[#191f31] !bg-[#a1a5a966] px-6 py-1 rounded">
                <p
                  style={{
                    fontSize: 18,
                    color: '#307EF3',
                    fontWeight: 502,
                    fontFamily: ', sans-serif',
                  }}
                >
                  {/* {i.CurrencySymbol} */}
                  {i.Revenue.toLocaleString('en-IN')}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 502,
                    color: '#9B9B9B',
                    fontFamily: ', sans-serif',
                  }}
                >
                  Revenue
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Dialog
        isOpen={dialogIsOpen}
        style={{
          content: {
            marginTop: 250,
          },
        }}
        contentClassName="pb-0 px-0"
        onClose={() => {
          setIsOpenDialog(false);
        }}
      >
        <div className="px-6 pb-6">
          <h5>Are You Sure You want to Delete This Booking?</h5>
        </div>

        <div className="text-right px-2 py-2 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            onClick={() => {
              setIsOpenDialog(false);
            }}
          >
            No
          </Button>

          <Button
            variant="solid"
            onClick={() => {
              handleDelete(SelectedRow?.BookingNumber);
            }}
          >
            Yes
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default CardShow;
