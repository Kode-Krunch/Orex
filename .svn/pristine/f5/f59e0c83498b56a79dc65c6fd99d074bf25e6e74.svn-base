import { useEffect, useState } from 'react'
import Table from 'components/ui/Table'
import { Alert, Button, Input, } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { Postcontentepsrestriction, apicontentepsrestriction, apideleteEpisoderestriction } from 'services/ProgrammingService'
import { FaPenSquare, FaRegSave, FaTrashAlt } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { setDialogbox, } from 'store/base/commonSlice'
import { openNotification } from 'views/Controls/GLOBALFUNACTION'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';

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

const EpisodeRestrictionsPop = () => {
    const [seasonInput, setSeasonInput] = useState('')
    const [Start, setStart] = useState('')
    const [seaEnd, setSEnd] = useState('')
    const [Season, setSeason] = useState([])
    const token = useSelector((state) => state.auth.session.token)
    const [editingRow, setEditingRow] = useState(null)
    const [editingRowcopy, seteditingRowcopy] = useState();
    const { Content } = useSelector((state) => state.base.common)
    const [message, setMessage] = useTimeOutMessage();
    const [log, setlog] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        ; (async (values) => {
            const resp = await apicontentepsrestriction(Content.ContentCode)
            if (resp.status === 204) return
            if (resp.status === 200) {
                const Da = resp.data?.map((resp) => ({
                    ContentCode: Content.ContentCode,
                    Season: resp.SeasonNo,
                    Episode: resp.EpisodeNo,
                    Reason: resp.Reason,
                }))

                setSeason(...Season, Da)
            }
        })()

    }, [])
    const handleok = (index) => {
        setEditingRow(null)

        replaceObjectAtIndex(index, editingRowcopy);


    }
    const replaceObjectAtIndex = (index, newData) => {
        const newArray = [...Season]; // Create a copy of the original array
        newArray[index] = newData; // Replace the object at the specified index with the new data
        setSeason(newArray); // Update the state with the new array
    }

    const handleAdd = () => {
        if (!seasonInput || !Start || !seaEnd) {
            openNotification('danger', `All fields are required`);
            return;
        }
        const isDuplicate = Season.some(
            (item) => item.Season === seasonInput && item.Episode === Start
        );
        if (isDuplicate) {
            openNotification('danger', `This season and episode combination already exists!`);
            return;
        }
        const newData = {
            ContentCode: Content.ContentCode,
            Season: seasonInput,
            Episode: Start,
            Reason: seaEnd,
        };

        setSeason([...Season, newData]);
        setSeasonInput('');
        setStart('');
        setSEnd('');
    };

    const handleEdit = (index, e) => {
        setEditingRow(index)
        seteditingRowcopy(e);
        setSeason(Season.map((season, Id) => {
            if (Id === index) {
                return {
                    Season: "", // Emptying Season property
                    Episode: "",  // Emptying Start property
                    Reason: ""     // Emptying End property
                };
            }
            return season;
        }))
    }

    const handleSave = (index) => {
        if (!seasonInput || !Start || !seaEnd) {
            openNotification('danger', `All fields are required`);
            return;
        }
        const isDuplicate = Season.some(
            (item, idx) => idx !== index && item.Season === seasonInput && item.Episode === Start
        );
        if (isDuplicate) {
            openNotification('danger', `This season and episode combination already exists!`);
            return;
        }
        const updatedData = [...Season];
        updatedData[index] = {
            Season: seasonInput,
            Episode: Start,
            Reason: seaEnd,
        };
        setSeason(updatedData);
        setSeasonInput('');
        setStart('');
        setSEnd('');
        setEditingRow(null);
    };


    const handleSubmit = async () => {
        console.log(Season.length);

        if (Season.length === 0) {
            try {
                const resp = await apideleteEpisoderestriction(Content.ContentCode);
                if (resp.status === 200) {
                    setlog('success');
                    setMessage('Data Updated Successfully');
                    dispatch(setDialogbox(false));
                }
            } catch (error) {
                console.error("Error deleting episode restriction:", error);
                setlog('danger');
                setMessage('Failed to update data');
            }
            return;
        }

        const payload = Season.map((resp) => ({
            ContentCode: Content.ContentCode,
            SeasonNo: Number(resp.Season),
            EpisodeNo: Number(resp.Episode),
            Reason: resp.Reason,
            ContentTypeCode: Content.ContentType.ContentTypeCode,
            IsActive: 1,
        }));

        try {
            const resp = await Postcontentepsrestriction(payload, token);
            if (resp.status === 200) {
                setlog('success');
                setMessage('Data Updated Successfully');
                dispatch(setDialogbox(false));
            }
        } catch (error) {
            console.error("Error posting content restriction:", error);
            setlog('danger');
            setMessage('Failed to update data');
        }
    };

    return (
        <div>
            {message && (
                <Alert className="mb-4" type={log} showIcon>
                    {message}
                </Alert>
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
                                        const seasonExists = false;

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
                                value={seaEnd}
                                size="xs"
                                onChange={(event) => {
                                    const input = event.target.value

                                    setSEnd(input)
                                }}
                            />
                        </Td>
                        <Td>
                            <Button
                                size="xs"
                                onClick={() => handleAdd()}
                                type="button"
                            >
                                Add
                            </Button>
                        </Td>
                    </Tr>
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
                                        size="xs" // onChange={(e) => setSeasonInput(e.target.value)}

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
                                        size="xs" //onChange={(e) => setStart(e.target.value)}
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
                                    e.Episode
                                )}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {editingRow === index ? (
                                    <Input
                                        value={seaEnd}
                                        size="xs"
                                        onChange={(event) => {

                                            const input = event.target.value


                                            setSEnd(input)

                                        }}
                                    />
                                ) : (
                                    e.Reason
                                )}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {editingRow === index ? (

                                    <>
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
                                        /></>
                                ) : (

                                    <>
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
                                                const newArray = Season.filter(
                                                    (item, indexs) =>
                                                        indexs !== index
                                                )

                                                // console.log(newArray)
                                                setSeason(newArray)
                                            }}
                                            icon={<FaTrashAlt />}
                                        ></Button>
                                    </>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
            <br />
            <Button variant="solid" onClick={() => handleSubmit()}>Save</Button>
        </div>
    )
}
export default EpisodeRestrictionsPop
