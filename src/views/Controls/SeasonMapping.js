import React, { useEffect, useState } from 'react';
import Table from 'components/ui/Table';
import { Button, Input, Notification, toast } from 'components/ui';
import { FaPenSquare, FaRegSave, FaTrashAlt } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { openNotification } from './GLOBALFUNACTION';

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

const openNotification2 = (type) => {
  toast.push(
    <Notification title="Required" type={type}>
      All Fields Are Required
    </Notification>,
  );
};

const SeasonMapping = ({ Season, setSeason, ContentTypeValue }) => {
  const [seasonInput, setSeasonInput] = useState('');
  const [Start, setStart] = useState('');
  const [seaEnd, setSEnd] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [editingRowcopy, seteditingRowcopy] = useState(null);

  const handleAdd = () => {
    if (!seasonInput || !Start || !seaEnd) {
      openNotification2('danger');
    } else {
      const newData = {
        Season: seasonInput,
        Start: Start,
        End: seaEnd,
      };
      setSeason([...Season, newData]);
    }

    setSeasonInput('');
    setStart('');
    setSEnd('');
  };

  const handleEdit = (index, e) => {
    seteditingRowcopy(e);
    // Set the current values of the row to the state variables
    setSeasonInput(e.Season);
    setStart(e.Start);
    setSEnd(e.End);
    // Set the editing row

    // setSeason(Season.filter((_, Id) => Id !== index));
    setEditingRow(index);
    setSeason(
      Season.map((season, Id) => {
        if (Id === index) {
          return {
            Season: '', // Emptying Season property
            Start: '', // Emptying Start property
            End: '', // Emptying End property
          };
        }
        return season;
      }),
    );
  };
  const handleok = (index) => {
    setEditingRow(null);
    seteditingRowcopy(null);
    setSeasonInput('');
    setStart('');
    setSEnd('');
    replaceObjectAtIndex(index, editingRowcopy);
  };

  const replaceObjectAtIndex = (index, newData) => {
    const newArray = [...Season]; // Create a copy of the original array
    newArray[index] = newData; // Replace the object at the specified index with the new data
    setSeason(newArray); // Update the state with the new array
  };
  const handleSave = (index) => {
    // Update the data with the edited values
    if (!seasonInput || !Start || !seaEnd) {
      openNotification2('danger');
    } else {
      const updatedData = [...Season];
      updatedData[index] = {
        Season: seasonInput,
        Start: Start,
        End: seaEnd,
      };

      setSeason(updatedData);
      setSeasonInput('');
      setStart('');
      setSEnd('');
      setEditingRow(null);
      seteditingRowcopy(null);
    }
    // Clear the input fields and reset the editing row
  };
  console.log(Season);
  useEffect(() => {
    if (ContentTypeValue?.EpisodeSpecific == 0) {
      setSeasonInput(1);
      setStart(1);
      setSEnd(1);
    } else {
      setSeasonInput('');
      setStart('');
      setSEnd('');
    }
  }, [ContentTypeValue]);

  return (
    <div>
      <Table style={{ border: '3px solid #E3E5EB' }} compact>
        <THead>
          <Tr style={{ border: '1px solid #E3E5EB' }}>
            {THD.map((Td, index) => (
              <Th key={index}>{Td.name}</Th>
            ))}
            {/* <Th>Edit</Th> */}
          </Tr>
        </THead>
        <TBody>
          {editingRowcopy == null && (
            <Tr>
              <Td>
                <Input
                  size="xs"
                  value={seasonInput}
                  disabled={ContentTypeValue?.EpisodeSpecific == 0 && true}
                  onChange={(event) => {
                    const limit = 5;
                    const regex = /^[0-9]*$/; // Allow only numbers including 0
                    const input = event.target.value;

                    if (regex.test(input)) {
                      // Check if the seasonInput already exists in the seasons array
                      const seasonExists = Season.some(
                        (season) => season.Season === input,
                      );

                      if (input == '0' || input == 0) {
                        setSeasonInput('');
                        return;
                      }
                      // If seasonInput doesn't exist in the seasons array, update the state
                      if (!seasonExists || input == '0') {
                        setSeasonInput(input.slice(0, limit));
                      }
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={Start}
                  size="xs"
                  disabled={ContentTypeValue?.EpisodeSpecific == 0 && true}
                  onChange={(event) => {
                    const limit = 5;
                    const regex = /^[0-9]*$/;
                    const input = event.target.value;

                    if (input == '0' || input == 0) {
                      setStart('');
                      return;
                    }

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
              </Td>
              <Td>
                <Input
                  value={seaEnd}
                  size="xs"
                  disabled={ContentTypeValue?.EpisodeSpecific == 0 && true}
                  onChange={(event) => {
                    const limit = 5;
                    const regex = /^[0-9]*$/;
                    const input = event.target.value;
                    if (input == '0' || input == 0) {
                      setSEnd('');
                      return;
                    }
                    // Check if the input is empty
                    if (input === '') {
                      setSEnd(''); // Clear the state if input is empty
                    } else if (regex.test(input)) {
                      setSEnd(input.slice(0, limit));
                    }
                  }}
                  onBlur={(event) => {
                    const input = event.target.value;
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
              </Td>
              <Td>
                {ContentTypeValue?.EpisodeSpecific == 0 ? null : (
                  <Button size="xs" onClick={() => handleAdd()} type="button">
                    Add
                  </Button>
                )}
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
                    size="xs"
                    value={seasonInput}
                    onChange={(event) => {
                      const limit = 5;
                      const regex = /^[0-9]*$/; // Allow only numbers including 0
                      const input = event.target.value;

                      if (input == '0' || input == 0) {
                        setSeasonInput('');
                        return;
                      }
                      if (regex.test(input)) {
                        // Check if the seasonInput already exists in the seasons array
                        const seasonExists = Season.some(
                          (season) => season.Season === input,
                        );

                        // If seasonInput doesn't exist in the seasons array, update the state
                        if (!seasonExists) {
                          setSeasonInput(input.slice(0, limit));
                        }
                      }
                    }}
                  />
                ) : (
                  e.Season
                )}
              </Td>
              <Td style={{ border: '1px solid #E3E5EB' }}>
                {editingRow === index ? (
                  <Input
                    value={Start}
                    size="xs" //onChange={(e) => setStart(e.target.value)}
                    onChange={(event) => {
                      const limit = 5;
                      const regex = /^[0-9]*$/;
                      const input = event.target.value;

                      if (input == '0' || input == 0) {
                        setStart('');
                        return;
                      }
                      if (regex.test(input)) {
                        setStart(input.slice(0, limit));
                      }
                    }}
                  />
                ) : (
                  e.Start
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

                      if (input == '0' || input == 0) {
                        setSEnd('');
                        return;
                      }
                      // Check if the input is empty
                      if (input === '') {
                        setSEnd(''); // Clear the state if input is empty
                      } else if (
                        regex.test(input) &&
                        parseInt(input) >= parseInt(Start)
                      ) {
                        setSEnd(input.slice(0, limit));
                      }
                    }}
                  />
                ) : (
                  e.End
                )}
              </Td>
              <Td style={{ border: '1px solid #E3E5EB' }}>
                {editingRow === index ? (
                  <div className="flex">
                    <Button
                      type="button"
                      size="xs"
                      shape="circle"
                      onClick={() => handleSave(index)}
                      icon={<FaRegSave />}
                    />
                    &nbsp;
                    <Button
                      type="button"
                      size="xs"
                      shape="circle"
                      onClick={() => handleok(index)}
                      icon={<CgClose />}
                    />
                  </div>
                ) : (
                  <div className="flex">
                    <Button
                      type="button"
                      size="xs"
                      shape="circle"
                      onClick={() => handleEdit(index, e)}
                      icon={<FaPenSquare />}
                    />
                    &nbsp;
                    <Button
                      type="button"
                      shape="circle"
                      size="xs"
                      onClick={() => {
                        const newArray = Season.filter(
                          (item, indexs) => indexs !== index,
                        );
                        setSeason(newArray);
                      }}
                      icon={<FaTrashAlt />}
                    ></Button>
                  </div>
                )}
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
};

export default SeasonMapping;
