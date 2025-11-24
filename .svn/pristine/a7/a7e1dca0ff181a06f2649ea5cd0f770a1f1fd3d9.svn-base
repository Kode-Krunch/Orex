import { Select } from 'components/ui'
import React from 'react'

const NTCTypeDrop = ({ selected, setSelected, List, name, name2, handlePromoTypeChange, disabled }) => {
    const ContentDemo = [{ value: '', label: 'Data Not Found' }]
    // console.log(selected);

    // console.log(selected);
    // console.log(name);
    return (
        <div className="card flex flex-column align-items-center  h-9">
            <Select
                size="sm"
                // isDisabled={name == 'NTCTypeCode' && selected == null ? false : true}
                className="mb-4 w-full"
                placeholder="Select"
                isDisabled={disabled ? disabled : false}
                options={List}
                value={
                    List !== null
                        ? List.filter((option) => option.value == selected)
                        : ContentDemo.filter((option) => option.value)
                }
                onChange={(selectedOption) => {
                    if (name == 'NTCTypeCode') {
                        handlePromoTypeChange(selectedOption.value)
                    }

                    setSelected((prevFormState) => ({
                        ...prevFormState,
                        [name]: selectedOption.value,
                    }))
                    setSelected((prevFormState) => ({
                        ...prevFormState,
                        [name2]: selectedOption.LocationCode,
                    }))
                }}
            ></Select>
        </div>
    )
}

export default NTCTypeDrop




