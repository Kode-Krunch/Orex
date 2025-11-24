import { Select, FormItemcompact } from 'components/ui'
import React, { useState, useRef, useEffect } from 'react'
import { apiGetagencymasterDrop } from 'services/CreditcontrolService'
// import { apiGetAgencymasterdropmaster } from 'services/CreditcontrolService'

const AgencyDropDown = ({ errors, touched, AgencyCode, setAgencyCode }) => {
    const count = useRef(0)
    const [Agency, setAgency] = useState(null)

    useEffect(() => {
        count.current = count.current + 1
        if (count.current == 1) {
            ;(async (values) => {
                const Agency = await apiGetagencymasterDrop(values)
                const formattedOptions = Agency.data.map((option) => ({
                    value: option.AgencyCode,
                    label: option.AgencyName,
                }))
                setAgency(formattedOptions)
            })()
        }
    }, [])

    return (
        <>
            <div className="col-span-1">
                <FormItemcompact
                    asterisk
                    label="Agency Name"
                    invalid={errors.AgencyCode && touched.AgencyCode}
                    errorMessage={errors.AgencyCode}
                    style={{
                        width: '250px',
                    }}
                >
                    {Agency !== null ? (
                        <Select
                            placeholder="Please Select"
                            options={Agency}
                            onChange={(e) => {
                                setAgencyCode(e.value)
                            }}
                            defaultValue={
                                Agency[
                                    Agency.findIndex(
                                        (Agency) => Agency.value === AgencyCode
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

export default AgencyDropDown
