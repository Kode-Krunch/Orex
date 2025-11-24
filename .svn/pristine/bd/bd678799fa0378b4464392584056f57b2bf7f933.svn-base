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
const SpotCancelDrop = ({
    selected,
    setSelected,
    List,
    name,
    get
}) => {
    const ContentDemo = [{ value: '', label: 'Data Not Found' }]

    return (
        <div className="card flex flex-column align-items-center  h-9">
            <Select
                size="sm"
                className="mb-4 w-full"
                placeholder="Select"
                options={List}
                value={
                    List !== null
                        ? List.filter((option) => option.value == selected?.value)
                        : ContentDemo.filter((option) => option.value)
                }
                onChange={(selectedOption) => {

                    setSelected((prevFormState) => ({
                        ...prevFormState,
                        [name]: selectedOption,
                    }))
                    if (name == 'Client') {

                        get(selectedOption.value)
                    }
                    if (name == 'Brand') {

                        get(selectedOption.value)

                    }
                }
                }
            ></Select>
        </div>
    )
}

export default SpotCancelDrop
