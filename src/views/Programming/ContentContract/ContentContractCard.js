import { Avatar, Button, Card, Tag, Tooltip } from 'components/ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiGetcontentcontractmasterId } from 'services/ProgrammingService';
import { setContent, setQueryParams } from 'store/base/commonSlice';

const ContentContractCard = ({ data, globalFilter }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {data
        .filter((item) => {
          // Check if the globalFilter exists and filter by matching fields
          return globalFilter
            ? item.ContractName.toLowerCase().includes(
              globalFilter.toLowerCase(),
            ) ||
            item.AgreementDate.toLowerCase().includes(
              globalFilter.toLowerCase(),
            ) ||
            item.ContractNo.toString().includes(globalFilter) ||
            item.Content.filter((content) =>
              content.ContentName.toLowerCase().includes(
                globalFilter.toLowerCase(),
              ),
            ).length > 0 ||
            item.SupplierName.toLowerCase().includes(
              globalFilter.toLowerCase(),
            )
            : true; // If no filter, show all items
        })
        .map((contractDetail) => (
          <Card
            className="dark:hover:bg-slate-600 hover:bg-gray-300 dark:bg-slate-800 bg-gray-100 hover:cursor-pointer "
            style={{ minHeight: '10rem' }}
            bodyClass="p-3 h-full flex flex-col"
            onClick={async () => {
              dispatch(setQueryParams(contractDetail.ContractCode));
              navigate('/ContentContractEdit');
            }}
          >
            <>
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-dashed border-dash-2 border-b-gray-600">
                <Tooltip title="Content Name">
                  <h6 className="!text-[0.9rem] ">
                    {contractDetail.ContractName}
                  </h6>
                </Tooltip>
              </div>
              <ul className="flex flex-col gap-2 ">
                <li className={'flex items-center justify-between gap-2'}>
                  <span>Contract No</span>
                  <span className="font-semibold dark:!text-slate-300 ">
                    {contractDetail.ContractNo}
                  </span>
                </li>
                <li className={'flex items-center justify-between gap-2'}>
                  <span>Agreement Date </span>
                  <span className="font-semibold dark:!text-slate-300 ">
                    {contractDetail.AgreementDate}
                  </span>
                </li>
                <li
                  className={
                    'flex items-center justify-between gap-2 whitespace-nowrap '
                  }
                >
                  <p>Supplier Name</p>
                  <Tooltip
                    wrapperClass="grow w-0"
                    title={contractDetail.SupplierName}
                  >
                    <span className="w-full text-end text-ellipsis overflow-hidden whitespace-nowrap font-semibold dark:!text-slate-300 ">
                      {contractDetail.SupplierName}
                    </span>
                  </Tooltip>
                </li>
              </ul>
            </>
            <div className="mt-5 flex justify-between items-center ">
              <Avatar.Group
                chained
                maxCount={4}
                size="sm"
                omittedAvatarProps={{ shape: 'circle' }}
              >
                {contractDetail.Content?.length !== 0 &&
                  contractDetail.Content?.map((item) => (
                    <Tooltip title={item.ContentName} key={item.ContentCode}>
                      <Avatar
                        shape="circle"
                        size="sm"
                        src={item.Content_Image}
                      />
                    </Tooltip>
                  ))}
              </Avatar.Group>
              <Tooltip title="Status">
                {contractDetail.IsActive == 1 ? (
                  <Tag
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded mb-1 "
                    showCloseButton={false}
                  >
                    Active
                  </Tag>
                ) : (
                  <Tag
                    className="bg-red-100 text-red-600 dark:bg-red-500/60 dark:text-red-100 border-0 rounded mb-1 "
                    showCloseButton={false}
                  >
                    Expired
                  </Tag>
                )}
              </Tooltip>
            </div>
          </Card>
        ))}
    </>
  );
};

export default ContentContractCard;
