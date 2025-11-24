import { Select, FormItemcompact } from 'components/ui'
import { apiGetSuppliermaster } from 'services/ProgrammingService'
import React, { useState, useRef, useEffect } from 'react'

const SupplierDropDown = ({ errors, touched, SupplierCode, setSupplierCode }) => {
    const count = useRef(0)
    const [Supplier, setSupplier] = useState(null)

    useEffect(() => {
        count.current = count.current + 1
        if (count.current == 1) {
            ; (async (values) => {
                const Supplier = await apiGetSuppliermaster(values)
                const formattedOptions = Supplier.data.map((option) => ({
                    value: option.SupplierCode,
                    label: option.SupplierName,
                }))
                setSupplier(formattedOptions)
            })()
        }
    }, [])

    return (
        <>
            <FormItemcompact
                asterisk
                label="Supplier Name"
                invalid={errors.SupplierCode &&
                    touched.SupplierCode}
                errorMessage={errors.SupplierCode}
                style={{
                    width: '250px',
                }}
            >

                {(Supplier !== null) ? (
                    <Select
                        placeholder="Please Select"
                        options={Supplier}
                        onChange={(e) => {
                            setSupplierCode(
                                e.value
                            );
                        }}

                        defaultValue={Supplier[Supplier.findIndex(supplier => supplier.value === SupplierCode)]}
                    />
                ) : ''}
            </FormItemcompact>
        </>
    )

}

export default SupplierDropDown 