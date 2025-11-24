import { Container } from 'components/shared';
import Logo from 'components/template/Logo';
import { Button, Card, Input, Tooltip } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { HiOutlineCalendar } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import {
  apiGetdealdetailId,
  apidealmasterDealforapprovalBYID,
} from 'services/DealServices';
import useThemeClass from 'utils/hooks/useThemeClass';
import Dialog from 'components/ui/Dialog'
import './App.css';
import ContentTable from 'views/Controls/ContentTable';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const DealMasterEditBYAPI = ({ Deal, setIsOpenApproval }) => {
  const Username = useSelector((state) => state.auth.session.Username);
  const [DealDataDetails, setDealDataDetails] = useState([]);
  const [rejectRemark, setRejectRemark] = useState('');
  const [selectedDeal, setSelectedDeal] = useState('');
  const [isApproved, setIsApproved] = useState('');
  const [dialogIsOpen, setIsOpen] = useState(false)


  const onDialogClose = (e) => {
    setIsOpen(false)
    setRejectRemark('')
    setSelectedDeal('')
    setIsApproved('')
  }


  useEffect(() => {
    (async (values) => {
      const respd = await apiGetdealdetailId(Deal.DealNumber);
      setDealDataDetails(respd.data);
    })();
  }, []);

  const mode = useSelector((state) => state.theme.mode);
  const { textTheme } = useThemeClass();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const DealApproveFunation = async (selectedDeal, isApproved, rejectRemark) => {
    if (rejectRemark !== '') {
      try {
        const resp = await apidealmasterDealforapprovalBYID(
          selectedDeal,
          isApproved,
          rejectRemark
        );
        if (resp.status == 204) {
          openNotification('warning', 'Deal Not Found');
          setIsOpenApproval(false);
          return;
        }
        if (resp.status == 200) {
          if (isApproved == 1) {
            openNotification('success', 'Deal Approved Successfully');
            setIsOpenApproval(false);
          } else {
            openNotification('success', 'Deal Rejected Successfully');
            setIsOpenApproval(false);
          }
          return;
        }
      } catch (error) {
        if (error.response.status == 500) {
          openNotification('danger', 'Server Error');
          setIsOpenApproval(false);
          return;
        }
      }
      finally {
        setIsOpen(false)
      }
    }
    else {
      openNotification('warning', 'Please Enter Valid Remark to Reject Deal.')
    }
  };
  return (
    <Container className="h-full">
      <Card className="h-full" bodyClass="h-full">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
          <div>
            <Logo className="mb-3" mode={mode} />
            <address className="not-italic">
              <div>
                <h5 className="mb-3 capitalize ">
                  {Deal?.DealTypeName}, {Deal?.Emp_FirstName}.
                </h5>

                <span className="IN">
                  Client & City : {Deal?.ClientName} & {Deal?.ClientPlaceName}
                </span>

                <span className="IN">
                  Agency & City : {Deal?.AgencyName} & {Deal?.AgencyPlaceName}
                </span>

                <span className="IN">Pay Route : {Deal?.PayRouteName}</span>
              </div>
            </address>
          </div>
          <div className="my-4">
            <div className="mb-2">
              <h4>Deal #{Deal?.DealCode}</h4>
              <span>
                Date:{' '}
                {new Date(Deal?.DealCreatedDate).toLocaleDateString(
                  'en-US',
                  options,
                )}
              </span>
            </div>
            <div className="mt-4 flex items-center">
              <HiOutlineCalendar size={30} className={`${textTheme}`} />
              <div className="ltr:ml-3 rtl:mr-3 ">
                <Tooltip title="Start Date / End Date">
                  <div className="mb-1 ">
                    {new Date(Deal?.DealPeriodFromDate).toLocaleDateString(
                      'en-US',
                      options,
                    )}{' '}
                    <br />{' '}
                    {new Date(Deal?.DealPeriodToDate).toLocaleDateString(
                      'en-US',
                      options,
                    )}
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <ContentTable
          DealDataDetails={DealDataDetails}
          DealData={Deal}
        ></ContentTable>

        <div className="flex justify-between mt-5">
          <Button className="mr-2" onClick={() => setIsOpenApproval(false)}>
            Back
          </Button>
          <div className="flex justify-end ">
            <Button
              className="mr-2"
              onClick={() => {
                setSelectedDeal(Deal?.DealNumber)
                setIsApproved(2)
                setIsOpen(true)
              }}
            >
              Reject
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                DealApproveFunation(Deal?.DealNumber, 1, 'Approved BY' + Username)

              }}
            >
              Approve
            </Button>
          </div>
        </div>
      </Card>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Deal Reject Remark</h5>
        <Input placeholder='Remark' onChange={(e) => setRejectRemark(e.target.value)} textArea />
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={() => DealApproveFunation(selectedDeal, isApproved, rejectRemark)}>
            Okay
          </Button>
        </div>
      </Dialog>
    </Container>
  );
};

export default DealMasterEditBYAPI;
