import React, { useState } from 'react'
import Table from 'components/ui/Table'
import { Button, Input, Notification, toast } from 'components/ui'
import { openNotification } from 'views/Controls/GLOBALFUNACTION'

const { Tr, Th, Td, THead, TBody } = Table

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
]



const SeasonMapping = ({ Season, setSeason }) => {
    const [seasonInput, setSeasonInput] = useState('')
    const [Start, setStart] = useState('')
    const [seaEnd, setSEnd] = useState('')
    const [editingRow, setEditingRow] = useState(null)

    const handleAdd = () => {
        if (!seasonInput || !Start || !seaEnd) {
            openNotification('danger', ` All Field Are Required`)
        } else {
            const newData = {
                Season: seasonInput,
                Start: Start,
                End: seaEnd,
            }
            setSeason([...Season, newData])
        }

        setSeasonInput('')
        setStart('')
        setSEnd('')
    }

    const handleEdit = (index) => {
        setEditingRow(index)
    }

    const handleSave = (index) => {
        // Update the data with the edited values
        if (!seasonInput || !Start || !seaEnd) {
            openNotification('danger', ` All Field Are Required`)
        } else {
            const updatedData = [...Season]
            updatedData[index] = {
                Season: seasonInput,
                Start: Start,
                End: seaEnd,
            }

            setSeason(updatedData)
            setSeasonInput('')
            setStart('')
            setSEnd('')
            setEditingRow(null)

        }
        // Clear the input fields and reset the editing row
    }

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
                    <Tr>
                        <Td>
                            <Input
                                size="xs"
                                value={seasonInput}
                                onChange={(event) => {
                                    const limit = 5
                                    const regex = /^[0-9]*$/
                                    const input = event.target.value

                                    if (regex.test(input)) {
                                        setSeasonInput(input.slice(0, limit))
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
                                    const limit = 5
                                    const regex = /^[0-9]*$/
                                    const input = event.target.value

                                    if (regex.test(input)) {
                                        setSEnd(input.slice(0, limit))
                                    }
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
                                            const regex = /^[0-9]*$/
                                            const input = event.target.value

                                            if (regex.test(input)) {
                                                setSeasonInput(
                                                    input.slice(0, limit)
                                                )
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
                                        value={seaEnd}
                                        size="xs"
                                        onChange={(event) => {
                                            const limit = 5
                                            const regex = /^[0-9]*$/
                                            const input = event.target.value

                                            if (
                                                regex.test(input) &&
                                                parseInt(input) >
                                                parseInt(Start)
                                            ) {
                                                setSEnd(input.slice(0, limit))
                                            }
                                        }}
                                    />
                                ) : (
                                    e.End
                                )}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {editingRow === index ? (
                                    <Button
                                        type="button"
                                        size="xs"
                                        onClick={() => handleSave(index)}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        size="xs"
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default SeasonMapping
