import React, { useState } from 'react'
const GlobalFilter = ({ column, themeColor }) => {
    const { setFilter } = column
    const [filter, setLocalFilter] = useState(column.filterValue || '')

    const handleFilterChange = (e) => {
        //console.log(e)
        //console.log(e.target.value)
        setLocalFilter(e.target.value)
        setFilter(e.target.value)
    }

    return (
        <input
            type="text"
            value={filter || ''}
            onChange={handleFilterChange}
            placeholder={`Filter ${column.Header}`}
            style={{
                borderColor: themeColor,
                padding: '8px 12px', // Adjust padding
                borderRadius: '4px', // Add rounded corners
                border: '1px solid #ccc', // Specify a border style
                fontSize: '11px', // Set font size
                width: '70%', // Make it full width
            }}
        />
    )
}
export default GlobalFilter
