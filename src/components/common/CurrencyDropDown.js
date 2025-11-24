import { Select, FormItemcompact } from 'components/ui'
import { apiGetCurrencymaster } from 'services/MasterService'
import React, { useState, useRef, useEffect } from 'react'

const CurrencyDropDown = ({
    errors,
    touched,
    CurrencyCode,
    setCurrencyCode,
}) => {
    const count = useRef(0)
    const [Currency, setCurrency] = useState(null)

    useEffect(() => {
        count.current = count.current + 1
        if (count.current == 1) {
            ;(async (values) => {
                const Currency = await apiGetCurrencymaster(values)
                const formattedOptions = Currency.data.map((option) => ({
                    value: option.CurrencyCode,
                    label: option.CurrencyName,
                }))
                setCurrency(formattedOptions)
            })()
        }
    }, [])

    return (
        <>
            <div className="col-span-1">
                <FormItemcompact
                    asterisk
                    label="Currency"
                    invalid={errors.CurrencyCode && touched.CurrencyCode}
                    errorMessage={errors.CurrencyCode}
                >
                    {Currency !== null ? (
                        <Select
                            placeholder="Please Select"
                            options={Currency}
                            onChange={(e) => {
                                setCurrencyCode(e.value)
                            }}
                            defaultValue={
                                Currency[
                                    Currency.findIndex(
                                        (currency) =>
                                            currency.value === CurrencyCode
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

export default CurrencyDropDown
