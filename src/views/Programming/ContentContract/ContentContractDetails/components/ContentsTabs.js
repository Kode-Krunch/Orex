import { Button, Tabs, Tooltip } from 'components/ui';
import TabContent from 'components/ui/Tabs/TabContent';
import TabList from 'components/ui/Tabs/TabList';
import TabNav from 'components/ui/Tabs/TabNav';
import React, { memo, useEffect, useMemo, useState } from 'react';
import DebouncedInput from './SelectableTable/DebouncedInput';
import { IoMdAddCircle } from 'react-icons/io';
import BulkEditDialog from './BulkEditDialog/BulkEditDialog';
import SelectableTable from './SelectableTable/SelectableTable';
import LicensedContentsCard from './LicensedContentsCard';
import { apiGetContentmasterbyid } from 'services/ProgrammingService';
import ContentInfoDialog from 'views/Programming/FPCMaster/FPC_Edit/components/Toolbar/components/ContentInfoDialog';
import { format } from 'date-fns';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

function ContentsTabs({
  newContents,
  setNewContents,
  newContSelRowIds,
  setNewContSelRowIds,
  licensedContents,
  setLicensedContents,
  licensedContSelRowIds,
  setLicensedContSelRowIds,
  countryOptions,
  amortisationTypeOptions,
  isAllContractMasterFieldsFilled,
  clearSelections,
  originalContentsReponse,
  selectedCurrency,
}) {
  /* STATES */
  const [activeTab, setActiveTab] = useState('newContents');
  const [newContGlobalFilter, setNewContGlobalFilter] = useState('');
  const [licensedContGlobalFilter, setLicensedContGlobalFilter] = useState('');
  const [filteredLicensedCont, setFilteredLicensedCont] = useState(licensedContents);
  const [isBulkEditDialogOpen, setIsBulkEditDialogOpen] = useState(false);
  const [isContentInfoDialogOpen, setIsContentInfoDialogOpen] = useState(false);
  const [contentInfo, setContentInfo] = useState({});

  /* HOOKS - MEMOS */
  const isAddBtnDisabled = useMemo(
    () =>
      !isAllContractMasterFieldsFilled ||
      Object.keys(newContSelRowIds).length === 0,
    [isAllContractMasterFieldsFilled, newContSelRowIds],
  );

  const newContentsColumns = useMemo(() => [
    {
      header: 'ContentName',
      accessorKey: 'ContentName',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="flex items-center gap-2 py-0.5 cursor-pointer ">
            <div
              style={{
                width: 25,
                height: 25,
                backgroundImage: `url(${row?.Content_Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="rounded-full dark:!text-slate-700"
              onClick={() => getContentById(row.ContentCode)}
            />
            {row.ContentName}
          </div>
        )
      },
    },
    {
      header: 'EventType',
      accessorKey: 'EventType',
    },
    {
      header: 'ContentType',
      accessorKey: 'ContentType',
    },
    {
      header: 'Genre',
      accessorKey: 'Genre',
    },
    {
      header: 'ReleaseDate',
      accessorKey: 'ReleaseDate',
      cell: ({ row }) => format(row.original.ReleaseDate, 'dd-MMM-yyyy'),
    },
    {
      header: 'Duration [Min]',
      accessorKey: 'SlotDuration',
    },],
    []
  )

  /* USE EFFECTS */
  useEffect(() => {
    const filteredLicensedCont =
      licensedContGlobalFilter === ''
        ? [...licensedContents]
        : licensedContents.filter(
          (content) =>
            content.ContentName.toLowerCase().includes(
              licensedContGlobalFilter.toLowerCase(),
            ) ||
            content.ProgCost.toString().includes(licensedContGlobalFilter),
        );
    setFilteredLicensedCont(filteredLicensedCont);
  }, [licensedContents, licensedContGlobalFilter]);

  /* EVENT HANDLERS */
  const openBulkEditDialog = () => setIsBulkEditDialogOpen(true);

  const getContentById = async (contentCode) => {
    try {
      const response = await apiGetContentmasterbyid(contentCode);
      if (response.status === 200) {
        setIsContentInfoDialogOpen(true);
        setContentInfo(response.data);
      }
      else if (response.status === 204) {
        openNotification('info', 'Content not found');
      }
    } catch (error) {
      console.error('Error fetching content info:', error);
      openNotification('info', 'Content not found');
    }
  };

  return (
    <>
      <Tabs value={activeTab} onChange={setActiveTab} variant="pill">
        <TabList className="mb-2 flex items-center justify-between border-b !border-b-gray-600">
          <div className="flex">
            <TabNav
              value="newContents"
              className={`${activeTab === 'newContents' && '!text-white !bg-teal-700'
                }`}
            >
              Contents {newContents.length > 0 ? `(${newContents.length})` : ''}
            </TabNav>
            <TabNav
              value="licensedContents"
              className={`${activeTab === 'licensedContents' && '!text-white !bg-teal-700'
                }`}
            >
              Licensed Contents{' '}
              {licensedContents.length > 0
                ? `(${licensedContents.length})`
                : ''}
            </TabNav>
          </div>
          <div className="flex gap-2 items-center mt-2 mb-1.5">
            <DebouncedInput
              value={
                activeTab === 'newContents'
                  ? newContGlobalFilter
                  : licensedContGlobalFilter ?? ''
              }
              placeholder={`${activeTab === 'newContents'
                ? 'Search all columns'
                : 'Search contents'
                }`}
              size="sm"
              className="!px-[2] !h-8"
              onChange={
                activeTab === 'newContents'
                  ? setNewContGlobalFilter
                  : setLicensedContGlobalFilter
              }
            />
            {activeTab === 'newContents' && (
              <>
                {isAddBtnDisabled ? (
                  <Tooltip
                    title="Please fill all master fields and select a content to add contract"
                    placement="left"
                  >
                    <Button
                      size="xs"
                      className="!h-8 text-sm"
                      icon={<IoMdAddCircle className="text-[0.9rem]" />}
                      disabled={isAddBtnDisabled}
                    >
                      Add Contract
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    size="xs"
                    className="!h-8 text-sm"
                    icon={<IoMdAddCircle className="text-[0.9rem]" />}
                    onClick={openBulkEditDialog}
                    disabled={isAddBtnDisabled}
                  >
                    Add Contract
                  </Button>
                )}
              </>
            )}
          </div>
        </TabList>
        <TabContent value="newContents">
          {newContents.length > 0 ? (
            <div className="h-[60vh] ">
              <SelectableTable
                columns={newContentsColumns}
                tableData={newContents}
                selectedRowIds={newContSelRowIds}
                setSelectedRowIds={setNewContSelRowIds}
                externalSearch={{
                  globalFilter: newContGlobalFilter,
                  setGlobalFilter: setNewContGlobalFilter,
                }}
              />
            </div>
          ) : (
            <div className="h-[60vh] flex items-center justify-center">
              No new contents to show
            </div>
          )}
        </TabContent>
        <TabContent value="licensedContents">
          <div className="h-[60vh] pt-2">
            {filteredLicensedCont.length > 0 ? (
              <div className="h-full grid grid-cols-3 gap-4 overflow-auto">
                {filteredLicensedCont.map((content, index) => (
                  <LicensedContentsCard
                    imageWidth={'25%'}
                    content={content}
                    key={content.ContentCode}
                    index={index}
                    setLicensedContSelRowIds={setLicensedContSelRowIds}
                    openBulkEditDialog={openBulkEditDialog}
                    originalContentsReponse={originalContentsReponse}
                    setNewContents={setNewContents}
                    setLicensedContents={setLicensedContents}
                    selectedCurrency={selectedCurrency}
                    getContentById={getContentById}
                  />
                ))}
              </div>
            ) : (
              <div className="h-[60vh] flex items-center justify-center">
                No licensed contents to show
              </div>
            )}
          </div>
        </TabContent>
      </Tabs>
      {isBulkEditDialogOpen && (
        <BulkEditDialog
          isOpen={isBulkEditDialogOpen}
          setIsOpen={setIsBulkEditDialogOpen}
          newContents={newContents}
          setNewContents={setNewContents}
          newContentsColumns={newContentsColumns}
          newContSelRowIds={newContSelRowIds}
          licensedContents={licensedContents}
          setLicensedContents={setLicensedContents}
          licensedContSelRowIds={licensedContSelRowIds}
          clearSelections={clearSelections}
          operationMode={activeTab === 'newContents' ? 'add' : 'edit'}
          countryOptions={countryOptions}
          amortisationTypeOptions={amortisationTypeOptions}
          selectedCurrency={selectedCurrency}
        />
      )}
      {isContentInfoDialogOpen && (
        <ContentInfoDialog
          isDialogOpen={isContentInfoDialogOpen}
          setIsDialogOpen={setIsContentInfoDialogOpen}
          contentInfo={contentInfo}
        />
      )}
    </>
  );
}

export default memo(ContentsTabs);
