import classNames from 'classnames';
import { Button, Card, Dialog, Select, Tag } from 'components/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { HiClock, HiOutlineClipboardCheck } from 'react-icons/hi';
import { apiGetcancelremarkmasterdrop } from 'services/BookingService';
import { apipostbookingdetails } from 'services/DealServices';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

function ConfirmDropDialog({
  isConfirmDropDialogOpen,
  setIsConfirmDropDialogOpen,
  selectedSpots,
  setSelectedFilteredRow,
  setShowLoader,
}) {
  /* STATES */
  const [distinctdata, setDistinctData] = useState([]);
  const [dropRemarkOptions, setDropRemarkOptions] = useState([]);
  const [selectedDropRemark, setSelectedDropRemark] = useState([]);

  /* HELPER FUNCTIONS */
  const getDistinctSums = useCallback(() => {
    try {
      if (!Array.isArray(selectedSpots)) {
        return [];
      }
      const result = selectedSpots.reduce((acc, item) => {
        if (item) {
          const key = `${item.CommercialCaption}-${item.CommercialDuration}`;
          if (!acc[key]) {
            acc[key] = {
              CommercialCaption: item.Caption,
              CommercialDuration: item.Duration,
              SpotAmountSum: 0,
              TotalDuration: 0,
              TotalCount: 0,
            };
          }
          acc[key].SpotAmountSum += item.Amount;
          acc[key].TotalDuration += item.Duration;
          acc[key].TotalCount++;
          return acc;
        }
      }, {});
      return Object.values(result || 0);
    } catch (error) {
      throw error;
    }
  }, [selectedSpots]);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        if (isConfirmDropDialogOpen && dropRemarkOptions.length === 0) {
          const dropRemarks = await apiGetcancelremarkmasterdrop('');
          const dropRemarkOptions = dropRemarks.data.map((option) => ({
            value: option.CancelRemarkCode,
            label: option.CancelRemarkName,
          }));
          setDropRemarkOptions(dropRemarkOptions);
        }
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong while fetching drop remarks',
        );
        console.error(error);
      }
    })();
  }, [isConfirmDropDialogOpen, dropRemarkOptions.length]);

  useEffect(() => {
    try {
      setDistinctData(getDistinctSums());
    } catch (error) {
      console.error(error);
    }
  }, [getDistinctSums]);

  /* EVENT HANDLERS */
  const handleSave = async () => {
    try {
      setShowLoader(true);
      const data = selectedSpots.map((spot) => {
        return {
          Id: spot.BookingDetailID,
          BookingStatus: 'E',
        };
      });
      const response = await apipostbookingdetails('BULKDROP', data, 0);
      if (response.status === 200) {
        openNotification('success', 'Changes saved successfully');
        setSelectedFilteredRow(null);
      } else {
        openNotification(
          'danger',
          `Unable to save changes. Server responded with status code ${response.status}`,
        );
      }
      setIsConfirmDropDialogOpen(false);
      setShowLoader(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to save changes',
      );
      setIsConfirmDropDialogOpen(false);
      setShowLoader(false);
      console.error(error);
    }
  };

  const handleClose = () => {
    try {
      setIsConfirmDropDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      isOpen={isConfirmDropDialogOpen}
      onClose={handleClose}
      onRequestClose={handleClose}
    >
      <h4 className="mb-4">Save Changes</h4>
      <Card>
        {distinctdata.map((item, index) => (
          <div key={index}>
            <div>
              <div
                className={classNames(
                  'flex items-center justify-between rounded-lg p-2 cursor-pointer user-select',
                  'bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700/90',
                  'mb-3',
                )}
              >
                <div className="flex items-center rounded-full font-semibold text-xs">
                  <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full  mr-2">
                    <HiOutlineClipboardCheck className="text-base" />
                    <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                      {item.TotalCount}
                    </span>
                  </div>
                  {'  '}
                  <div className="flex items-center">
                    <div className="text-gray-900 dark:text-gray-300 text-xs">
                      {item.CommercialCaption} [{item.CommercialDuration}]
                    </div>
                  </div>
                </div>
                <div className="text-gray-900 dark:text-gray-300 text-lg">
                  <Tag showCloseButton={false}>
                    <div className="flex items-center text-sm">
                      <span className="mr-1">
                        <HiClock />
                      </span>{' '}
                      {item.TotalDuration} sec
                    </div>
                  </Tag>
                </div>
                <div className="text-gray-900 dark:text-gray-300 text-lg">
                  <Tag showCloseButton={false}>
                    <span className="text-lg">{item.SpotAmountSum}</span>
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Card>
      <h5 className="mt-2">Select Remark</h5>
      <Select
        options={dropRemarkOptions}
        onChange={(e) => {
          setSelectedDropRemark(e);
        }}
      />
      <div className="text-right mt-6">
        <Button onClick={handleClose} className="mr-2">
          Close
        </Button>
        <Button variant="solid" className="mr-2" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Dialog>
  );
}

export default ConfirmDropDialog;
