import { Select } from 'components/ui'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setThemeFontLevel } from 'store/theme/themeSlice'
const FontLevelList = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
]
const FontSize = () => {
    const dispatch = useDispatch()
    const primaryFontLevel = useSelector(
        (state) => state.theme.primaryFontLevel
    )

    const onThemeFontLevelChange = ({ value }) => {
        dispatch(setThemeFontLevel(value))
    }
    return (
        <Select
            size="sm"
            options={FontLevelList}
            value={FontLevelList.filter(
                (Font) => Font.value === primaryFontLevel
            )}
            onChange={onThemeFontLevelChange}
        />
    )
}

export default FontSize
