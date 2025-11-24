import { Select, FormItemcompact } from 'components/ui'
import { apiGetAmortisationTypeMaster } from 'services/ProgrammingService'
import React, { useState, useRef, useEffect } from 'react'

const AmortisationDropDown = ({ AmortisationTypeCode, setAmortisationTypeCode, errors, touched, setErrors, setTouched }) => {
    const count = useRef(0)
    const [Amortisation, setAmortisation] = useState(null)

    useEffect(() => {
        count.current = count.current + 1
        if (count.current == 1) {
            ; (async (values) => {
                const Amortisation = await apiGetAmortisationTypeMaster(values)
                const formattedOptions = Amortisation.data.map((option) => ({
                    value: option.AmortisationTypeCode,
                    label: option.AmortisationTypeName,
                }))
                setAmortisation(formattedOptions)
            })()
        }
    }, [])

    return (
        <>
            <FormItemcompact
                asterisk
                label="Amortisation Name"
                invalid={errors.AmortisationTypeCode &&
                    touched.AmortisationTypeCode}
                errorMessage={errors.AmortisationTypeCode}
                style={{
                    width: '250px',
                }}
            >

                {(Amortisation !== null) ? (
                    <Select
                        placeholder="Please Select"
                        options={Amortisation}
                        onChange={(e) => {
                            setAmortisationTypeCode(
                                e.value
                            );
                        }}

                        defaultValue={Amortisation[Amortisation.findIndex(Amortisation => Amortisation.value === AmortisationTypeCode)]}
                    />
                ) : ''}
            </FormItemcompact>
        </>
    )

}

export default AmortisationDropDown 