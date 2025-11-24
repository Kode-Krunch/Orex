import { useState } from 'react'
import Table from 'components/ui/Table'
import { Button, Input, Notification, toast } from 'components/ui'
import { FaPenSquare, FaRegSave, FaTrashAlt } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { openNotification } from './GLOBALFUNACTION'

const { Tr, Th, Td, THead, TBody } = Table
const THD = [
    {
        name: 'Season No',
    },
    {
        name: 'Episode No',
    },
    {
        name: 'Remark',
    },
    {
        name: 'Action',
    },
]


console.log()
const EpisodeRestrictions = ({ detail, setContentdetail }) => {
    const [seasonInput, setSeasonInput] = useState('')
    const [End, setEnd] = useState('')
    const [Start, setStart] = useState('')
    const [editingRow, setEditingRow] = useState(null)
    const [editingRowcopy, seteditingRowcopy] = useState();
    const handleok = (index) => {
        setEditingRow(null)

        replaceObjectAtIndex(index, editingRowcopy);


    }

    const replaceObjectAtIndex = (index, newData) => {
        const newArray = [...detail]; // Create a copy of the original array
        newArray[index] = newData; // Replace the object at the specified index with the new data
        setContentdetail(newArray); // Update the state with the new array
    }
    const handleAdd = () => {
        if (!seasonInput || !End || !Start) {
            openNotification('danger', `All fields are required`);
            return;
        }
        const isDuplicate = detail.some(
            (item) => item.Season === seasonInput && item.Start === Start
        );
        if (isDuplicate) {
            openNotification('danger', `This season and episode combination already exists!`);
            return;
        }
        const newData = {
            Season: seasonInput,
            End: End,
            Start: Start,
        };
        setContentdetail([...detail, newData]);
        setSeasonInput('');
        setEnd('');
        setStart('');
    };

    // console.log(detail)
    const handleSave = (index) => {
        if (!seasonInput || !Start || !End) {
            openNotification('danger', `All fields are required`);
            return;
        }

        // Check if the same season and episode already exist, excluding the current index
        const isDuplicate = detail.some(
            (item, idx) => idx !== index && item.Season === seasonInput && item.Start === Start
        );

        if (isDuplicate) {
            openNotification('danger', `This season and episode combination already exists!`);
            return;
        }

        const updatedData = [...detail];
        updatedData[index] = {
            Season: seasonInput,
            Start: Start,
            End: End,
        };

        setContentdetail(updatedData);
        setSeasonInput('');
        setStart('');
        setEnd('');
        setEditingRow(null);
    };

    // console.log(editingRow)
    const handleEdit = (index, e) => {
        setEditingRow(index)
        seteditingRowcopy(e);
        setEditingRow(index)
        setContentdetail(detail.map((season, Id) => {
            if (Id === index) {
                return {
                    Season: "", // Emptying Season property
                    Start: "",  // Emptying Start property
                    End: ""     // Emptying End property
                };
            }
            return season;
        }))
    }
    return (
        <div>
            <Table compact>
                <THead>
                    <Tr>
                        {THD.map((Td, index) => (
                            <Th key={index}>{Td.name}</Th>
                        ))}
                    </Tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td>
                            <Input
                                size="xs"
                                value={seasonInput}


                                onChange={(event) => {
                                    const limit = 5
                                    const regex = /^[0-9]*$/ // Allow only numbers including 0
                                    const input = event.target.value

                                    if (regex.test(input)) {
                                        // Check if the seasonInput already exists in the seasons array
                                        // const seasonExists = detail.some(season => season.Season === input);
                                        const seasonExists = false
                                        if (input == "0" || input == 0) {
                                            setSeasonInput('');
                                            return
                                        }
                                        // If seasonInput doesn't exist in the seasons array, update the state
                                        if (!seasonExists || input == "0") {
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
                                onChange={(event) => {
                                    const limit = 5
                                    const regex = /^[0-9]*$/
                                    const input = event.target.value
                                    if (input == "0" || input == 0) {
                                        setStart('');
                                        return
                                    }
                                    if (regex.test(input)) {
                                        setStart(input.slice(0, limit))
                                    }
                                }}
                            />
                        </Td>
                        <Td>
                            <Input
                                value={End}
                                size="xs"
                                maxLength='200'
                                onChange={(e) => setEnd(e.target.value)}
                            />
                        </Td>

                        <Td>
                            <Button
                                size="xs"

                                onClick={() => handleAdd()}
                            >
                                Add
                            </Button>
                        </Td>
                    </Tr>
                    {detail.map((e, index) => (
                        <Tr key={index} style={{ border: '1px solid #E3E5EB' }}>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {editingRow === index ? (
                                    <Input
                                        size="xs"
                                        value={seasonInput}
                                        onChange={(event) => {
                                            const limit = 5
                                            const regex = /^[0-9]*$/ // Allow only numbers including 0
                                            const input = event.target.value
                                            if (input == "0" || input == 0) {
                                                setSeasonInput('');
                                                return
                                            }
                                            if (regex.test(input)) {
                                                // Check if the seasonInput already exists in the seasons array
                                                const seasonExists = false

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
                                        size="xs"
                                        onChange={(event) => {
                                            const limit = 5
                                            const regex = /^[0-9]*$/
                                            const input = event.target.value
                                            if (input == "0" || input == 0) {
                                                setStart('');
                                                return
                                            }
                                            if (regex.test(input)) {
                                                setStart(input.slice(0, limit))
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
                                        value={End}
                                        maxLength='200'
                                        size="xs"
                                        onChange={(e) => setEnd(e.target.value)}
                                    />
                                ) : (
                                    e.End
                                )}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {editingRow === index ? (
                                    <div className='flex'>
                                        <Button
                                            type="button"
                                            shape="circle"
                                            variant="plain"
                                            size="xs"
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
                                        /></div>
                                ) : (
                                    <div className='flex'>
                                        <Button
                                            type="button"
                                            size="xs"
                                            onClick={() => handleEdit(index, e)}
                                            icon={<FaPenSquare />}
                                        ></Button>

                                        <Button
                                            type="button"
                                            shape="circle"
                                            variant="plain"
                                            size="xs"
                                            onClick={() => {
                                                const newArray = detail.filter(
                                                    (item, indexs) =>
                                                        indexs !== index
                                                )

                                                // console.log(newArray)
                                                setContentdetail(newArray)
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
    )
}
export default EpisodeRestrictions
