import { FormItem } from 'components/ui'
import React from 'react'

function CustomFormItem({ children, labelClass, ...rest }) {
    return <FormItem labelClass={`mb-1 !text-gray-300 ${labelClass ? labelClass : ''}`} {...rest}>{children}</FormItem>
}

export default CustomFormItem