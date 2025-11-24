import { useEffect, useState } from 'react'

import {
    apiGetChannelmasterdrop,
    apiGetEntityDropmaster,
    apiGetEntitymaster,
    apiGetentitydropfororg,
    apiorganisationdetailbyid,
} from 'services/MasterService'
import { Badge, Dropdown, Tag } from 'components/ui'
import { useSelector } from 'react-redux'

function MapEntity({ ticketData, setTicketData, editData }) {
    const [Entity, setEntity] = useState([])
    const [Entitybk, setEntitybk] = useState([])
    console.log(editData.OrganisationCode)
    const LoginId = useSelector((state) => state.auth.session.LoginId)
    const colorClasses = [
        'bg-rose-500',
        'bg-indigo-500',
        'bg-blue-500',
        'bg-amber-400',
    ]

    useEffect(() => {
        console.log('ticketData', ticketData)
        console.log('editData', editData)

        if (editData.OrganisationCode) {
            ; (async (values) => {
                const resp = await apiorganisationdetailbyid(
                    editData.OrganisationCode
                )

                const EntityBYID = resp.data.map((Entity, index) => ({
                    EntityCode: Entity.Entity.EntityCode,
                    EntityName: Entity.Entity.EntityName,
                    ColorClass: colorClasses[index % colorClasses.length],
                }))
                setTicketData(EntityBYID)
            })()
                ; (async (values) => {
                    const resp = await apiGetentitydropfororg(LoginId)
                    console.log(resp.data)
                    const EntityBYID = resp.data.map((Entity, index) => ({
                        EntityCode: Entity.EntityCode,
                        EntityName: Entity.EntityName,
                        ColorClass: colorClasses[index % colorClasses.length],
                    }))
                    setEntity(EntityBYID)
                    setEntitybk(EntityBYID)
                })()
        } else {
            ; (async (values) => {
                const resp = await apiGetentitydropfororg(LoginId)
                console.log(resp.data)
                const EntityBYID = resp.data.map((Entity, index) => ({
                    EntityCode: Entity.EntityCode,
                    EntityName: Entity.EntityName,
                    ColorClass: colorClasses[index % colorClasses.length],
                }))
                setEntity(EntityBYID)
                setEntitybk(EntityBYID)
            })()
        }
    }, [])

    const onRemoveChannel = (labelToRemove) => {
        // Use filter to create a new array that excludes the label to be removed
        const updatedLabels = ticketData.filter(
            (label) => label.EntityCode !== labelToRemove
        )

        var removedLabel = Entitybk.find(
            (label) => label.EntityCode === labelToRemove
        );
        if (removedLabel === undefined) {
            removedLabel = ticketData.filter(
                (label) => label.EntityCode === labelToRemove)
        }

        console.log('removedLabel', removedLabel)
        console.log('Entity', Entity)

        setTicketData(updatedLabels)

        setEntity([...Entity, ...removedLabel]);

    }
    useEffect(() => {
        console.log('Entity_Entity', Entity)

    }, [Entity])

    const onAddLabelClick = (label) => {
        const updatedEntityList = Entity.filter(
            (item) => item.EntityCode !== label.EntityCode
        );

        // Update the state with the new channelList and add the label to ticketData
        setEntity(updatedEntityList);


        setTicketData([...ticketData, label])
    }

    return (
        <div className="py-4 px-6">
            <div className="mt-4">
                {/* <div className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    Channels:
                </div> */}
                <div>
                    {ticketData.length > 0
                        ? ticketData.map((label, index) => {
                            return (
                                <Tag
                                    key={index}
                                    className="mr-2 rtl:ml-2 mb-2"
                                    prefix
                                    prefixClass={label.ColorClass}
                                    onClose={() =>
                                        onRemoveChannel(label.EntityCode)
                                    }
                                >
                                    {label.EntityName}
                                </Tag>
                            )
                        })
                        : null}
                    <Dropdown
                        renderTitle={
                            <Tag
                                showCloseButton={false}
                                className="border-dashed cursor-pointer mr-2 rtl:ml-2"
                            >
                                Map Entity
                            </Tag>
                        }
                        placement="bottom-end"
                    >
                        {Entity.map((label, index) => (
                            <Dropdown.Item
                                onSelect={() => onAddLabelClick(label)}
                                eventKey={index}
                                key={index}
                            >
                                <div className="flex items-center">
                                    <Badge innerClass={label.ColorClass} />
                                    <span className="ml-2 rtl:mr-2">
                                        {label.EntityName}
                                    </span>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}
export default MapEntity
