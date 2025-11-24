import { Select } from 'components/ui'
import { Dropdown } from 'primereact/dropdown'
import React from 'react'

const CommercialTypeDrop = ({ selected, setSelected, List }) => {
    const ContentDemo = [{ value: '', label: 'Data Not Found' }]
    return (
        <div className="card flex flex-column align-items-center  h-9">
            <Select
                size="sm"
                className="mb-4 w-full"
                placeholder="Please Select"
                options={List}
                // components={{
                //     Option: CustomSelectOption,
                //     Control: CustomControl,
                // }}
                value={
                    List !== null
                        ? List.filter(
                              (option) => option.value === selected?.value
                          )
                        : ContentDemo.filter((option) => option.value)
                }
                onChange={(selectedOption) => {
                    setSelected(selectedOption) // Call the callback with the selected option
                }}
            ></Select>
        </div>
    )
}

export default CommercialTypeDrop
