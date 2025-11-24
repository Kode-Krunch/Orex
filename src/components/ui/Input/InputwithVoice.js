import React, { useState, useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { CONTROL_SIZES, SIZES } from '../utils/constant'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import { HiMicrophone } from 'react-icons/hi'

const InputwithVoice = React.forwardRef((props, ref) => {
    const {
        asElement: Component,
        className,
        disabled,
        invalid,
        prefix,
        size,
        suffix,
        textArea,
        type,
        style,
        unstyle,
        field,
        form,
        ...rest
    } = props

    const [prefixGutter, setPrefixGutter] = useState(0)
    const [suffixGutter, setSuffixGutter] = useState(0)
    const [isListening, setIsListening] = useState(false)
    const [inputValue, setInputValue] = useState(props.value || '')

    const { themeColor, controlSize, primaryColorLevel, direction } = useConfig()
    const formControlSize = useForm()?.size
    const inputGroupSize = useInputGroup()?.size

    const inputSize = size || inputGroupSize || formControlSize || controlSize

    const fixControlledValue = (val) => {
        if (typeof val === 'undefined' || val === null) {
            return ''
        }
        return val
    }

    if ('value' in props) {
        rest.value = fixControlledValue(props.value)
        delete rest.defaultValue
    }

    const isInvalid = useMemo(() => {
        let validate = false
        if (!isEmpty(form)) {
            const { touched, errors } = form
            const touchedField = get(touched, field?.name)
            const errorField = get(errors, field?.name)
            validate = touchedField && errorField
        }
        if (typeof invalid === 'boolean') {
            validate = invalid
        }

        return validate
    }, [form, invalid, field])

    const inputDefaultClass = 'input'
    const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`
    const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`
    const inputWrapperClass = `input-wrapper ${prefix || suffix ? className : ''}`
    const inputClass = classNames(
        inputDefaultClass,
        !textArea && inputSizeClass,
        !isInvalid && inputFocusClass,
        !prefix && !suffix ? className : '',
        disabled && 'input-disabled',
        isInvalid && 'input-invalid',
        textArea && 'input-textarea'
    )

    const prefixNode = useRef()
    const suffixNode = useRef()
    const inputRef = useRef()
    const recognitionRef = useRef()

    const getAffixSize = () => {
        if (!prefixNode.current && !suffixNode.current) {
            return
        }
        const prefixNodeWidth = prefixNode?.current?.offsetWidth
        const suffixNodeWidth = suffixNode?.current?.offsetWidth

        if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
            return
        }

        if (prefixNodeWidth) {
            setPrefixGutter(prefixNodeWidth)
        }

        if (suffixNodeWidth) {
            setSuffixGutter(suffixNodeWidth)
        }
    }

    useEffect(() => {
        getAffixSize()
    }, [prefix, suffix])

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition()
            recognition.continuous = false
            recognition.interimResults = false
            recognition.lang = 'en-US'

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                setInputValue(transcript)

                if (field?.onChange) {
                    field.onChange({
                        target: { value: transcript, name: field.name },
                    })
                } else {
                    if (inputRef.current) {
                        inputRef.current.value = transcript
                        const event = new Event('input', { bubbles: true })
                        inputRef.current.dispatchEvent(event)
                    }
                    if (props.onChange) {
                        props.onChange({
                            target: { value: transcript, name: field?.name },
                        })
                    }
                }

                setIsListening(false)
            }

            recognition.onend = () => {
                setIsListening(false)
            }

            recognition.onerror = (event) => {
                setIsListening(false)
            }

            recognitionRef.current = recognition
        }
    }, [field, props.onChange])

    const startListening = () => {
        if (recognitionRef.current) {
            setIsListening(true)
            recognitionRef.current.start()
        }
    }

    const remToPxConvertion = (pixel) => 0.0625 * pixel

    const affixGutterStyle = () => {
        const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`
        const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`
        let gutterStyle = {}

        if (direction === 'ltr') {
            if (prefix) {
                gutterStyle.paddingLeft = leftGutter
            }

            if (suffix) {
                gutterStyle.paddingRight = rightGutter
            }
        }

        if (direction === 'rtl') {
            if (prefix) {
                gutterStyle.paddingRight = leftGutter
            }

            if (suffix) {
                gutterStyle.paddingLeft = rightGutter
            }
        }

        return gutterStyle
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
        if (field?.onChange) {
            field.onChange(e)
        }
        if (props.onChange) {
            props.onChange(e)
        }
    }

    const inputProps = {
        className: !unstyle ? inputClass : '',
        disabled,
        type,
        ref: inputRef,
        value: inputValue,
        onChange: handleChange,
        ...field,
        ...rest,
    }

    const renderTextArea = <textarea style={style} {...inputProps}></textarea>

    const renderInput = (
        <div className="relative flex items-center">
            <Component
                style={{ ...affixGutterStyle(), ...style, paddingRight: suffix ? '2.5rem' : undefined }}
                {...inputProps}
            />
            {type == "text" && (
                <HiMicrophone
                    className={classNames("absolute right-3 text-xl cursor-pointer", { "text-blue-500": isListening })}
                    onClick={startListening}
                />)}
        </div>
    )

    const renderAffixInput = (
        <span className={inputWrapperClass}>
            {prefix ? (
                <div
                    className="input-suffix-start"
                    ref={(node) => (prefixNode.current = node)}
                >
                    {prefix}
                </div>
            ) : null}
            {renderInput}
            {suffix ? (
                <div
                    className="input-suffix-end"
                    ref={(node) => (suffixNode.current = node)}
                >
                    {suffix}
                </div>
            ) : null}
        </span>
    )

    const renderChildren = () => {
        if (textArea) {
            return renderTextArea
        }

        if (prefix || suffix) {
            return renderAffixInput
        } else {
            return renderInput
        }
    }

    return renderChildren()
})

InputwithVoice.propTypes = {
    asElement: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
    value: PropTypes.any,
    invalid: PropTypes.bool,
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    unstyle: PropTypes.bool,
    onChange: PropTypes.func,
}

InputwithVoice.defaultProps = {
    type: 'text',
    asElement: 'input',
    className: '',
    unstyle: false,
}

export default InputwithVoice
