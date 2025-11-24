import { Select, FormItemcompact } from 'components/ui'
import { apiGetTimeBandmaster } from 'services/CreditcontrolService'
import React, { useState, useRef, useEffect } from 'react'

const TimeBandDropDown = ({
    errors,
    touched,
    TimeBandCode,
    setTimeBandCode,
}) => {
    const count = useRef(0)
    const [TimeBand, setTimeBand] = useState(null)

    useEffect(() => {
        count.current = count.current + 1
        if (count.current == 1) {
            ;(async (values) => {
                const TimeBand = await apiGetTimeBandmaster(values)
                const formattedOptions = TimeBand.data.map((option) => ({
                    value: option.TimeBandCode,
                    label: option.TimeBandName,
                }))
                setTimeBand(formattedOptions)
            })()
        }
    }, [])

    return (
        <>
            <div className="col-span-1">
                <FormItemcompact
                    asterisk
                    label="TimeBand Name"
                    invalid={errors.TimeBandCode && touched.TimeBandCode}
                    errorMessage={errors.TimeBandCode}
                    style={{
                        width: '250px',
                    }}
                >
                    {TimeBand !== null ? (
                        <Select
                            placeholder="Please Select"
                            options={TimeBand}
                            onChange={(e) => {
                                setTimeBandCode(e.value)
                            }}
                            defaultValue={
                                TimeBand[
                                    TimeBand.findIndex(
                                        (TimeBand) =>
                                            TimeBand.value === TimeBandCode
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

export default TimeBandDropDown
