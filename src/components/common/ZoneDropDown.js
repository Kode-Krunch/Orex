import { Select, FormItemcompact } from 'components/ui'
import React, { useState, useRef, useEffect } from 'react'
import { apiGetZonemaster } from 'services/MasterService'

const ZoneDropDown = ({ errors, touched, ZoneCode, setZoneCode }) => {
    const count = useRef(0)
    const [Zone, setZone] = useState(null)

    useEffect(() => {
        count.current = count.current + 1
        if (count.current == 1) {
            ;(async (values) => {
                const Zone = await apiGetZonemaster(values)
                const formattedOptions = Zone.data.map((option) => ({
                    value: option.ZoneCode,
                    label: option.ZoneName,
                }))
                setZone(formattedOptions)
            })()
        }
    }, [])

    return (
        <>
            <div className="col-span-1">
                <FormItemcompact
                    asterisk
                    label="Zone"
                    invalid={errors.ZoneCode && touched.ZoneCode}
                    errorMessage={errors.ZoneCode}
                    style={{
                        width: '250px',
                    }}
                >
                    {Zone !== null ? (
                        <Select
                            placeholder="Please Select"
                            options={Zone}
                            onChange={(e) => {
                                setZoneCode(e.value)
                            }}
                            defaultValue={
                                Zone[
                                    Zone.findIndex(
                                        (Zone) => Zone.value === ZoneCode
                                    )
                                ]
                            }
                        />
                    ) : (
                        ''
                    )}
                </FormItemcompact>
            </div>
        </>
    )
}

export default ZoneDropDown
