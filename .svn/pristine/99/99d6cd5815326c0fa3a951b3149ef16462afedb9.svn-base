import { Select, FormItemcompact } from 'components/ui'
import React, { useState, useRef, useEffect } from 'react'
import { apiGetDealtypemaster } from 'services/CreditcontrolService'

const ExecutiveDropDown = ({
    errors,
    touched,
    DealTypeCode,
    setDealTypeCode,
}) => {
    const count = useRef(0)
    const [DealType, setDealType] = useState(null)

    useEffect(() => {
        count.current = count.current + 1
        if (count.current == 1) {
            ;(async (values) => {
                const DealType = await apiGetDealtypemaster(values)
                const formattedOptions = DealType.data.map((option) => ({
                    value: option.DealTypeCode,
                    label: option.DealTypeName,
                }))
                setDealType(formattedOptions)
            })()
        }
    }, [])

    return (
        <>
            <div className="col-span-1">
                <FormItemcompact
                    asterisk
                    label="Executive"
                    invalid={errors.DealTypeCode && touched.DealTypeCode}
                    errorMessage={errors.DealTypeCode}
                    style={{
                        width: '250px',
                    }}
                >
                    {DealType !== null ? (
                        <Select
                            placeholder="Please Select"
                            options={DealType}
                            onChange={(e) => {
                                setDealTypeCode(e.value)
                            }}
                            defaultValue={
                                DealType[
                                    DealType.findIndex(
                                        (DealType) =>
                                            DealType.value === DealTypeCode
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

export default ExecutiveDropDown
