import React, { useEffect, useState } from 'react';
import Table from 'components/ui/Table';
import { Alert, Button, Input } from 'components/ui';

import {
  Postcepsmapping,
  Postcontentlocchnmap,
  apiGetcepsmapping,
  apiGetcontentlocchnmap,
} from 'services/MasterService';
import { useDispatch, useSelector } from 'react-redux';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { setDialogbox } from 'store/base/commonSlice';
import { FaPenSquare, FaRegSave } from 'react-icons/fa';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import MapChannel from 'views/Controls/MapChannel';
import { apiCallstoreprocedure } from 'services/CommonService';

const { Tr, Th, Td, THead, TBody } = Table;

const THD = [
  {
    name: 'Season No',
  },
  {
    name: 'Start Episode',
  },
  {
    name: 'End Episode',
  },
  {
    name: 'Action',
  },
];

const SeasonMappingPOP = () => {
  const dispatch = useDispatch();
  const [seasonInput, setSeasonInput] = useState('');
  const [Start, setStart] = useState('');
  const [seaEnd, setSEnd] = useState('');
  const [dispalyor, setdispalyor] = useState(true);
  const [Season, setSeason] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [SelectedRow, setSelectedRow] = useState(null);
  const [ticketData, setTicketData] = useState([]);
  const [MaxEpisodeByContent, setMaxEpisodeByContent] = useState([]);
  const token = useSelector((state) => state.auth.session.token);
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const { Content } = useSelector((state) => state.base.common);
  console.log(ticketData);
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetcepsmapping(Content.ContentCode);
      const Da = resp.data.map((resp) => ({
        ContentCode: Content.ContentCode,
        SeasonNo: resp.SeasonNo,
        StartEpisode: resp.StartEpisode,
        EndEpisodes: resp.EndEpisodes,
        OldData: 1,
      }));

      setSeason(...Season, Da);
    })();
    let data = {};
    data.par_LocationCode = Channel.LocationCode;
    data.par_ChannelCode = Channel.ChannelCode;
    data.par_ContentCode = Content.ContentCode;

    apiCallstoreprocedure('USP_PG_MaxEpisodeByContent', data)
      .then((response) => {
        if (response.status == 200) {
          setMaxEpisodeByContent(response.data);
          console.log(response.status);
        }

        if (response.status == 204) {
        }
      })
      .catch((error) => {
        if (error.response.status) {
          setMaxEpisodeByContent(null);
        }
      });
  }, []);
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetcontentlocchnmap(Content.ContentCode);
      const formattedData = resp.data.map((item) => ({
        ChannelCode: item.Channel.ChannelCode,
        ChannelName: item.Channel.ChannelName,
        LocationCode: item.locations.LocationCode,
        ColorClass: 'bg-rose-500',
        LocationName: item.locations.LocationName,
        label: item.locations.LocationName + '-' + item.Channel.ChannelName,
        value: item.locations.LocationCode + '-' + item.Channel.ChannelCode,
      }));
      setTicketData(formattedData);
    })();
  }, []);

  const handleAdd = () => {
    if (!seasonInput || !Start || !seaEnd) {
      openNotification('danger', ` All Field Are Required`);
    } else {
      const newData = {
        ContentCode: Content.ContentCode,
        SeasonNo: seasonInput,
        StartEpisode: Start,
        EndEpisodes: seaEnd,
        OldData: 0,
      };
      setSeason([...Season, newData]);
    }

    setSeasonInput('');
    setStart('');
    setSEnd('');
  };

  const handleEdit = (index, e) => {
    setEditingRow(index);
    setSelectedRow(e);
    setSeasonInput(e.SeasonNo);
    setStart(e.StartEpisode);
    setdispalyor(!dispalyor);
    setSEnd(e.EndEpisodes);
  };

  const handleSave = (index) => {
    // Update the data with the edited values

    if (!seasonInput || !Start || !seaEnd) {
      openNotification('danger', ` All Field Are Required`);
    } else {
      const updatedData = [...Season];
      updatedData[index] = {
        SeasonNo: seasonInput,
        StartEpisode: Start,
        EndEpisodes: seaEnd,
        OldData: SelectedRow?.OldData,
      };
      setdispalyor(!dispalyor);
      setSeason(updatedData);
      setSeasonInput('');
      setStart('');
      setSEnd('');
      setEditingRow(null);
    }
  };

  const handleSumbit = async () => {
    const Da = ticketData.map((resp) => ({
      ContentCode: Content.ContentCode,
      ChannelCode: Number(resp.ChannelCode),
      LocationCode: Number(resp.LocationCode),
      IsActive: 1,
    }));

    const Da2 = Season.map((resp) => ({
      ContentCode: Content.ContentCode,
      SeasonNo: Number(resp.SeasonNo),
      StartEpisode: Number(resp.StartEpisode),
      EndEpisodes: Number(resp.EndEpisodes),
      IsActive: 1,
    }));

    try {
      const resp = await Postcepsmapping(Da2, token);
      const resp2 = await Postcontentlocchnmap(Da, token);
      console.log(resp.status);
      if (resp.status == 200) {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        setTimeout(() => dispatch(setDialogbox(false)), 500);
        return;
      } else if (resp.status === 'Server Error.') {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    } catch (errors) {
      return {};
    }
  };

  return (
    <div>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}

      {ticketData && (
        <MapChannel ticketData={ticketData} setTicketData={setTicketData} />
      )}
      <Table style={{ border: '2px solid #E3E5EB' }} compact>
        <THead>
          <Tr style={{ border: '1px solid #E3E5EB' }}>
            {THD.map((Td, index) => (
              <Th key={index}>{Td.name}</Th>
            ))}
            {/* <Th>Edit</Th> */}
          </Tr>
        </THead>
        <TBody>
          {dispalyor && (
            <Tr>
              <Td>
                <Input
                  size="xs"
                  value={seasonInput}
                  onChange={(event) => {
                    const limit = 5;
                    const regex = /^[0-9]*$/;
                    const input = event.target.value;

                    if (regex.test(input)) {
                      setSeasonInput(input.slice(0, limit));
                    }
                  }}
                  onBlur={(e) => {
                    const input = e.target.value;
                    const SeasonExist = Season.filter(
                      (item) => item.SeasonNo == input,
                    );
                    if (SeasonExist.length == 1) {
                      openNotification(
                        'warning',
                        'This Season No Already Exist',
                      );
                      setSeasonInput('');
                      return;
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={Start}
                  size="xs"
                  onChange={(event) => {
                    const limit = 5;
                    const regex = /^[0-9]*$/;
                    const input = event.target.value;
                    if (regex.test(input)) {
                      setStart(input.slice(0, limit));
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={seaEnd}
                  size="xs"
                  onChange={(event) => {
                    const limit = 5;
                    const regex = /^[0-9]*$/;
                    const input = event.target.value;
                    if (regex.test(input)) {
                      setSEnd(input.slice(0, limit));
                    }
                  }}
                />
              </Td>
              <Td>
                <Button size="xs" onClick={() => handleAdd()} type="button">
                  Add
                </Button>
              </Td>
            </Tr>
          )}

          {Season.map((e, index) => (
            <Tr
              key={index}
              style={{ border: '1px solid #E3E5EB' }}
              className="fontsetting"
            >
              <Td style={{ border: '1px solid #E3E5EB' }}>
                {editingRow === index ? (
                  <Input
                    value={seasonInput}
                    disabled={SelectedRow?.OldData == 1}
                    size="xs"
                    onChange={(event) => {
                      const limit = 5;
                      const regex = /^[0-9]*$/;
                      const input = event.target.value;
                      if (regex.test(input)) {
                        setSeasonInput(input.slice(0, limit));
                      }
                    }}
                  />
                ) : (
                  e.SeasonNo
                )}
              </Td>
              <Td style={{ border: '1px solid #E3E5EB' }}>
                {editingRow === index ? (
                  <Input
                    value={Start}
                    size="xs"
                    disabled={SelectedRow?.OldData == 1}
                    onChange={(event) => {
                      const limit = 5;
                      const regex = /^[0-9]*$/;
                      const input = event.target.value;

                      if (regex.test(input)) {
                        setStart(input.slice(0, limit));
                      }
                    }}
                    onBlur={(event) => {
                      const input = event.target.value;
                      if (parseInt(seaEnd)) {
                        if (parseInt(seaEnd) < parseInt(input)) {
                          openNotification(
                            'warning',
                            'End Episode Cannot be less then Start Episode',
                          );
                          setSEnd('');
                        }
                      }
                    }}
                  />
                ) : (
                  e.StartEpisode
                )}
              </Td>
              <Td style={{ border: '1px solid #E3E5EB' }}>
                {editingRow === index ? (
                  <Input
                    value={seaEnd}
                    size="xs"
                    onChange={(event) => {
                      const limit = 5;
                      const regex = /^[0-9]*$/;
                      const input = event.target.value;

                      if (regex.test(input)) {
                        setSEnd(input.slice(0, limit));
                      }
                    }}
                    onBlur={(event) => {
                      const input = event.target.value;

                      const EpisodeRestriction = MaxEpisodeByContent.filter(
                        (item) => item.SeasonNo == SelectedRow.SeasonNo,
                      );

                      if (
                        EpisodeRestriction[0].LastEpisodeNo > input &&
                        SelectedRow.OldData == 1
                      ) {
                        openNotification(
                          'warning',
                          'Sagment is Created of this Episode ',
                        );
                        setSEnd(SelectedRow.EndEpisodes);
                        return;
                      }
                      if (parseInt(Start)) {
                        if (parseInt(input) < parseInt(Start)) {
                          openNotification(
                            'warning',
                            'End Episode Cannot be less then Start Episode',
                          );
                          setSEnd('');
                        }
                      }
                    }}
                  />
                ) : (
                  e.EndEpisodes
                )}
              </Td>
              <Td style={{ border: '1px solid #E3E5EB' }}>
                {editingRow === index ? (
                  <Button
                    type="button"
                    size="xs"
                    onClick={() => handleSave(index)}
                    icon={<FaRegSave />}
                  />
                ) : (
                  <Button
                    type="button"
                    size="xs"
                    onClick={() => handleEdit(index, e)}
                    icon={<FaPenSquare />}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
      <Button variant="solid" className="mt-2" onClick={() => handleSumbit()}>
        Save
      </Button>
    </div>
  );
};

export default SeasonMappingPOP;
