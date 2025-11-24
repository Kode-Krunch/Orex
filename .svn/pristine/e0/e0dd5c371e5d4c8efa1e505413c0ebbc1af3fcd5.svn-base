import React, { useEffect, useState } from 'react';
import YearTaxDetailsCard from './components/YearTaxDetailsCard';
import { apiGetYearTaxDetails } from 'services/BillingService';
import { openNotification, sortArray } from 'views/Controls/GLOBALFUNACTION';
import { useSelector } from 'react-redux';
import Loader from 'views/Controls/Loader';
import { Alert, Button, Card } from 'components/ui';
import AddTaxesDialog from './components/AddTaxesDialog';
import { HiPlusCircle } from 'react-icons/hi';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import AddYearDrawer from 'views/Salesadmin/YearMaster/AddYearDrawer';

function YearTaxDetails() {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);

  /* STATES */
  const [yearTaxDetails, setYearTaxDetails] = useState(null);
  const [clickedYearTaxDetail, setClickedYearTaxDetail] = useState(null);
  const [log, setlog] = useState('');
  /* UI STATES */
  const [showLoader, setShowLoader] = useState(false);
  const [isAddTaxesDialogOpen, setIsAddTaxesDialogOpen] = useState(false);
  const [isAddYearDrawerOpen, setIsAddYearDrawerOpen] = useState(false);
  const [addTaxesDialogType, setAddTaxesDialogType] = useState(null);

  /* HOOKS */
  const [message, setMessage] = useTimeOutMessage();

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);
        await setYearTaxDetailsFromAPI();
        setShowLoader(false);
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong. Unable to fetch year tax details.',
        );
        console.error(error);
        setShowLoader(false);
      }
    })();
  }, []);

  /* HELPER FUNCTIONS */
  const setYearTaxDetailsFromAPI = async () => {
    try {
      const response = await apiGetYearTaxDetails(token);
      if (response.status === 200) {
        setYearTaxDetails(response.data);
      } else if (response.status === 204) {
        setYearTaxDetails([]);
      } else {
        setYearTaxDetails(null);
        openNotification(
          'danger',
          `Unable to fetch year tax details. Server responded with status code ${response.status}.`,
        );
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <div className="flex justify-between items-center">
        <h3>Year Tax Details</h3>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => setIsAddYearDrawerOpen(true)}
        >
          Add Year Description
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-6">
        {yearTaxDetails && yearTaxDetails.length > 0 ? (
          <>
            {sortArray(yearTaxDetails, 'Description', 'desc').map(
              (yearTaxDetail) => {
                return (
                  <YearTaxDetailsCard
                    key={yearTaxDetail.Yearcode}
                    yearTaxDetail={yearTaxDetail}
                    setIsAddTaxesDialogOpen={setIsAddTaxesDialogOpen}
                    setClickedYearTaxDetail={setClickedYearTaxDetail}
                    setShowLoader={setShowLoader}
                    setAddTaxesDialogType={setAddTaxesDialogType}
                    token={token}
                  />
                );
              },
            )}
          </>
        ) : (
          <Card
            className="h-full"
            bodyClass="h-full flex justify-center items-center"
          >
            No Year-Tax details to show
          </Card>
        )}
      </div>
      <AddTaxesDialog
        isAddTaxesDialogOpen={isAddTaxesDialogOpen}
        setIsAddTaxesDialogOpen={setIsAddTaxesDialogOpen}
        clickedYearTaxDetail={clickedYearTaxDetail}
        setClickedYearTaxDetail={setClickedYearTaxDetail}
        setYearTaxDetailsFromAPI={setYearTaxDetailsFromAPI}
        setShowLoader={setShowLoader}
        addTaxesDialogType={addTaxesDialogType}
        setAddTaxesDialogType={setAddTaxesDialogType}
        token={token}
      />
      <AddYearDrawer
        editData={['']}
        isOpen={isAddYearDrawerOpen}
        onDrawerClose={() => setIsAddYearDrawerOpen(false)}
        setMessage={setMessage}
        setlog={setlog}
        submitCallback={setYearTaxDetailsFromAPI}
      />
      <Loader showLoader={showLoader} />
    </>
  );
}

export default YearTaxDetails;
