import { Select, FormItemcompact } from 'components/ui'
import { apiGetContentmaster } from 'services/ProgrammingService'
import React, { useState, useRef, useEffect } from 'react'

const ContentDropDown = ({
    ContentCode,
    setContentCode,
    errors,
    touched,
    setErrors,
    setTouched,
    options
}) => {

    const count = useRef(0)
    const [Content, setContent] = useState(options)

    useEffect(() => {
        count.current = count.current + 1
        if ((count.current == 1) && (options == null)) {
            ; (async (values) => {
                const Content = await apiGetContentmaster(values)
                const formattedOptions = Content.data.map((option) => ({
                    value: option.ContentCode,
                    label: option.ContentName,
                }))
                setContent(formattedOptions)
            })()
        }
    }, [])

    return (
        <>
            <FormItemcompact
                asterisk
                label="Content"
                invalid={errors.ContentCode && touched.ContentCode}
                errorMessage={errors.ContentCode}
                style={{
                    width: '250px',
                }}
            >
                {Content !== null ? (
                    <Select
                        placeholder="Please Select"
                        options={Content}
                        onChange={(e) => {
                            setContentCode(e.value)
                        }}
                        defaultValue={
                            Content[
                            Content.findIndex(
                                (Content) => Content.value === ContentCode
                            )
                            ]
                        }
                    />
                ) : (
                    ''
                )}
            </FormItemcompact>
        </>
    )
}

export default ContentDropDown
