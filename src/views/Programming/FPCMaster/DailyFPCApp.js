import { Button, Card, Tabs } from 'components/ui';
import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import React, { useState, useEffect } from 'react';
import { dailyfpcAprovel, dailyfpcAprovelSpots } from 'services/ProgrammingService';
import Table from 'components/ui/Table';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import ContentEdit from '../ContentsegMaster/ContentsegEdit';
import { setContentSeg } from 'store/base/commonSlice';
const { TabNav, TabList, TabContent } = Tabs;
const { Tr, Th, Td, THead, TBody } = Table;
const DailyFPCApp = ({
  data,
  setdata,
  LocationCode,
  ChannelCode,
  SelectedDate,
  emptySegmentData,
  setemptySegmentData,
}) => {
  const dispatch = useDispatch();

  const [dialogIsOpen, setIsOpen] = useState(false);
  const [TotalOrg, setTotalOrg] = useState(false);
  const [curTab, setCurTab] = useState('tab1');

  useEffect(() => {
    if (dialogIsOpen === false) {
      (async () => {
        try {
          let respfpc
          if (ChannelCode == 14) {
            respfpc = await dailyfpcAprovelSpots(
              LocationCode,
              ChannelCode,
              SelectedDate,
            );
          } else {
            respfpc = await dailyfpcAprovel(
              LocationCode,
              ChannelCode,
              SelectedDate,)
          }

          const transformedData = [];
          const emptySegmentData2 = [];
          let srNoCounterFIrst = 1;
          let srNoCounterSecond = 1;
          let srNoCounterThird = 1;
          respfpc.data.forEach((item, indexd) => {
            const transformedObject = {
              key: `${indexd}`,
              data: {
                ...item,
                Sr_NO: srNoCounterFIrst++, // Sequential Sr_NO
                segment: undefined,
                color: 'red',
              },
            };

            if (item.segment && item.segment.length > 0) {
              transformedObject.children = item.segment.map(
                (segment, index) => ({
                  key: `${indexd}-${index}`,
                  data: {
                    ...item,
                    Sr_NO: srNoCounterSecond++, // Sequential Sr_NO for segments
                    ContentName: segment.SegmentCaption,
                    StartTime: segment.TCIN,
                    EndTime: segment.TCOUT,
                    ContentCode: segment.ContentCode,
                  },
                }),
              );
            } else {
              emptySegmentData2.push({
                ...item,
                Sr_NO: srNoCounterThird++, // Sequential Sr_NO for empty segments
                ContentCode: item.ContentCode,
                ContentName: item.ContentName,
                ContentTypeCode: item.ContentTypeCode,
                StartTime: item.StartTime,
                EndTime: item.EndTime,
                EpisodeNo: item.EpisodeNo,
                SeasonNo: item.SeasonNo,
                open: 'dailyfpc',
                OriginalRepeatCode: item.OriginalRepeatCode,
                // Add other properties if needed
              });
            }
            transformedData.push(transformedObject);
          });

          const totalOrg = emptySegmentData2.filter(
            (item) => item.OriginalRepeatCode === 1,
          ).length;

          setTotalOrg(totalOrg);
          setemptySegmentData(emptySegmentData2);
          setdata(transformedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      })();
    }
  }, [LocationCode, ChannelCode, SelectedDate, dialogIsOpen]);

  const opendui = (item) => {
    setIsOpen(true);
    dispatch(setContentSeg(item));
  };
  const rowClassName = (rowData) => {
    return {
      'bg-teal-500 text-black': rowData.data?.status === 'ORG',
      'bg-orange-500 text-black': rowData.data?.status === 'REP',
    };
  };

  return (
    <div className="max-h-[450px] overflow-y-auto">
      {dialogIsOpen && <ContentEdit setIsOpen={setIsOpen} />}

      {!dialogIsOpen && (
        <Card bodyClass="p-3 pt-1">
          <Tabs value={curTab} onChange={(event) => setCurTab(event)}>
            <div className="flex justify-between items-center border-b-2 border-b-gray-700 mb-3">
              <TabList className="border-b-[0px]">
                <TabNav value="tab1">FPC</TabNav>
                <TabNav value="tab2">Missing Segment</TabNav>
              </TabList>
              {curTab === 'tab2' && (
                <p className="rounded-full border-2 border-gray-700 px-3 py-1 text-xs">
                  <span>Segments Not Found:</span>{' '}
                  <span className="font-bold">{TotalOrg}</span>
                </p>
              )}
            </div>
            <TabContent value="tab1">
              {' '}
              <div className="mt-2">
                <TreeTable
                  resizableColumns
                  value={data}
                  tableStyle={{ minWidth: '50rem' }}
                  rowClassName={rowClassName}
                  scrollable
                  scrollHeight="400px"
                >
                  <Column
                    field="Sr_NO"
                    header="Sr NO"
                    expander
                    style={{
                      width: '100px',
                    }}
                    body={(rowData) => {
                      return (
                        <span
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 600,
                            width: 70,
                          }}
                        >
                          {rowData.data?.Sr_NO}
                        </span>
                      );
                    }}
                  ></Column>
                  <Column
                    field="StartTime"
                    header="Start Time"
                    style={{
                      width: '100px',
                    }}
                    body={(rowData) => {
                      return (
                        <p
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 600,
                            width: 120,
                          }}
                        >
                          {rowData.data?.StartTime}
                        </p>
                      );
                    }}
                  ></Column>
                  <Column
                    field="EndTime"
                    header="End Time"
                    style={{
                      width: '100px',
                    }}
                    body={(rowData) => {
                      return (
                        <p
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 600,
                            width: 120,
                          }}
                        >
                          {rowData.data?.EndTime}
                        </p>
                      );
                    }}
                  ></Column>
                  <Column
                    field="ContentName"
                    header="Content"
                    style={{
                      width: '300px',
                    }}
                    body={(rowData) => {
                      return (
                        <p
                          style={{
                            color: 'black',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: 12,
                            fontWeight: 600,
                            padding: 2,
                            margin: 2,
                          }}
                        >
                          {rowData.data?.ContentName}
                        </p>
                      );
                    }}
                  ></Column>
                  <Column
                    field="SlotDuration"
                    header="Dur"
                    style={{
                      width: '100px',
                    }}
                    body={(rowData) => {
                      return (
                        <p
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 600,
                            width: 70,
                          }}
                        >
                          {rowData.data?.SlotDuration}
                        </p>
                      );
                    }}
                  ></Column>
                  <Column
                    field="status"
                    header="ORG/REP"
                    style={{
                      width: '100px',
                    }}
                    body={(rowData) => {
                      return (
                        <p
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 600,
                            width: 120,
                          }}
                        >
                          {rowData.data?.status}
                        </p>
                      );
                    }}
                  ></Column>
                  <Column
                    field="SeasonNo"
                    header="Season & Episode "
                    style={{
                      width: '150px',
                    }}
                    body={(rowData) => {
                      return (
                        <p
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 600,
                            width: 200,
                          }}
                        >
                          {rowData.data?.IsRecorded === 1
                            ? 'LIVE'
                            : rowData.data?.EpisodeSpecific === 0
                              ? rowData.data?.ContentTypeName
                              : `S${rowData.data?.SeasonNo} & E${rowData.data?.EpisodeNo}`}
                        </p>
                      );
                    }}
                  ></Column>
                </TreeTable>
              </div>
            </TabContent>{' '}
            <TabContent value="tab2">
              <Table
                compact
                borderlessRow={false}
                overflow={true}
                className="mt-2"
              >
                <THead>
                  <Tr>
                    <Th
                      style={{
                        width: 70,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      Sr No
                    </Th>
                    <Th
                      style={{
                        width: 70,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      Start Time
                    </Th>
                    <Th
                      style={{
                        width: 70,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      End Time
                    </Th>
                    <Th
                      style={{
                        width: 70,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      Content
                    </Th>
                    <Th
                      style={{
                        width: 70,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      SE & EP
                    </Th>
                    <Th
                      style={{
                        width: 70,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      ORG / REP
                    </Th>
                    <Th
                      style={{
                        width: 70,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      Action
                    </Th>
                  </Tr>
                </THead>
                <TBody>
                  {emptySegmentData.map((item, index) => (
                    <Tr
                      key={index}
                      className={
                        item.status === 'REP'
                          ? 'bg-orange-500 '
                          : 'bg-teal-500 '
                      }
                    >
                      <Td className="dark:text-black border border-current  ">
                        {item.Sr_NO}
                      </Td>
                      <Td
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                        className="dark:text-black border border-current "
                      >
                        {item.StartTime}
                      </Td>
                      <Td
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                        className="dark:text-black border border-current "
                      >
                        {item.EndTime}
                      </Td>
                      <Td
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                        className="dark:text-black border border-current "
                      >
                        {item.ContentName}
                      </Td>
                      <Td
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                        className="dark:text-black border border-current "
                      >
                        S{item.SeasonNo} & E{item.EpisodeNo}
                      </Td>
                      <Td
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                        className="dark:text-black border border-current "
                      >
                        {item.OriginalRepeatCode === 1 ? 'ORG' : 'REP'}
                      </Td>
                      <Td
                        style={{
                          width: 70,

                          fontWeight: 700,
                        }}
                      >
                        {item.OriginalRepeatCode === 1 ? (

                          <Button size="xs" variant="twoTone" onClick={() => opendui(item)} icon={<FaPlusCircle />} />
                        ) : (
                          <>
                          </>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </TabContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

export default DailyFPCApp;
