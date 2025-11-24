import { Select } from 'components/ui'
import { Dropdown } from 'primereact/dropdown'
import React from 'react'

// const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormState((prevFormState) => ({
//         ...prevFormState,
//         [name]: value,
//     }))
// }
const PromoTypeDropNewContent = ({
    selected,
    setSelected,
    List,
    name,
    disabled
}) => {
    const ContentDemo = [{ value: '', label: 'Data Not Found' }]

    return (
        <div className="card flex flex-column align-items-center  h-9">
            <Select
                size="sm"
                className="mb-4 w-full"
                placeholder="Select"
                options={List}
                isDisabled={disabled}
                value={
                    List !== null
                        ? List.filter((option) => option.value === selected)
                        : ContentDemo.filter((option) => option.value)
                }
                onChange={(selectedOption) => {

                    setSelected((prevFormState) => ({
                        ...prevFormState,
                        epNo: selectedOption.end,
                    }))
                    setSelected((prevFormState) => ({
                        ...prevFormState,
                        [name]: selectedOption.value,
                    }))
                    // setSelected(selectedOption) // Call the callback with the selected option
                }}
            ></Select>
        </div>
    )
}

export default PromoTypeDropNewContent
