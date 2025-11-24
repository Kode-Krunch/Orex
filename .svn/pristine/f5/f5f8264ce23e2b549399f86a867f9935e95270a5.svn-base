import { Avatar, Button, Card, Dialog, Tooltip } from 'components/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import {
  getRandomColor,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import HeaderExtra from 'views/Controls/HeaderExtra';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import DealMasterEditBYAPI from '../DealMaster/DealMasterEditBYAPI';
import { IoEyeOutline } from 'react-icons/io5';
import { getRandomColorClass } from 'views/Billing/BillGeneration/dtat';
const toolbarOptions = { groupBy: false, manageColumns: false };
const DealApprovalMaster = () => {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const [ApprovelPendingList, setApprovelPendingList] = useState([]);
  const [globalSearch, setglobalSearch] = useState('');
  const [IsOpenApproval, setIsOpenApproval] = useState(false);
  const [SelectedRowData, setSelectedRowData] = useState({});
  const [ManagedColumnDealApproval, setManagedColumnDealApproval] = useState(
    [],
  );
  const columns = useMemo(
    () => [
      {
        header: 'Deal No',
        accessorKey: 'DealCode',
      },
      {
        header: 'Executive',
        accessorKey: 'Emp_FirstName',
      },
      {
        header: 'Client',
        accessorKey: 'ClientName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div>
              <div className="flex items-center  ">
                <Avatar
                  size={25}
                  className={`dark:${getRandomColorClass()} ${getRandomColorClass()}`}
                >
                  {row.ClientName.slice(0, 1)}
                </Avatar>
                <p className="ml-2 capitalize">{row.ClientName}</p>
              </div>
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },
      {
        header: 'Agency',
        accessorKey: 'AgencyName',
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },
      {
        header: 'PayRoute',
        accessorKey: 'PayRouteName',
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },
      {
        header: 'Action',
        accessorKey: 'Action',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div>
              <Tooltip title="View Deal ">
                <Button
                  size="xs"
                  onClick={() => {
                    setIsOpenApproval(true);
                    setSelectedRowData(row);
                  }}
                  icon={<IoEyeOutline />}
                />
              </Tooltip>
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },
    ],
    [],
  );

  useEffect(() => {
    if (IsOpenApproval == false) {
      (async () => {
        let data = {};
        data.par_LocationCode = Channel.LocationCode;
        data.par_ChannelCode = Channel.ChannelCode;
        try {
          const resp = await apiCallstoreprocedure(
            'USP_DealsForApproval',
            data,
          );

          if (resp.status === 204) {
            setApprovelPendingList([]);
            return;
          }

          if (resp.status === 200) {
            const convertIntegersToStrings = () => {
              return resp.data.map((item) => {
                const newItem = { ...item };
                return newItem;
              });
            };
            setApprovelPendingList(convertIntegersToStrings());
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            openNotification('warning', 'Deal Not found');
            setApprovelPendingList([]);
          }
        }
      })();
    }
  }, [IsOpenApproval, Channel]);
  return (
    <Card header={<HeaderExtra />} bodyClass="grow">
      <div>
        {!IsOpenApproval && (
          <ReportsTable
            tableData={ApprovelPendingList}
            originalColumns={columns}
            managedColumns={ManagedColumnDealApproval}
            setManagedColumns={setManagedColumnDealApproval}
            exportFileName="Deal Approvel"
            columnsToFormatInINR={[]}
            toolbarOptions={toolbarOptions}
            externalGlobalFilter={globalSearch}
          />
        )}

        {IsOpenApproval && (
          <DealMasterEditBYAPI
            Deal={SelectedRowData}
            setIsOpenApproval={setIsOpenApproval}
          />
        )}
      </div>
    </Card>
  );
};

export default DealApprovalMaster;
