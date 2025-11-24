import NumberFormat from 'react-number-format'
import Input from 'components/ui/Input'

function charIsNumber(char) {
    return !!(char || '').match(/\d/)
}
function caretUnknownFormatBoundary(formattedValue) {
    const boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(
        () => true
    )

    for (let i = 0, ln = boundaryAry.length; i < ln; i++) {
        boundaryAry[i] = Boolean(
            charIsNumber(formattedValue[i]) ||
                charIsNumber(formattedValue[i - 1])
        )
    }

    return boundaryAry
}

function defaultRemoveFormatting(value) {
    return value.replace(/[^0-9]/g, '')
}

const NumberInput = ({ inputSuffix, inputPrefix, ...props }) => {
    return (
        <Input
            {...props}
            value={props.value}
            suffix={inputSuffix}
            prefix={inputPrefix}
        />
    )
}

const NumberFormatInput = ({ onValueChange, form, field, ...rest }) => {
    return (
        <NumberFormat
            customInput={NumberInput}
            form={form}
            field={field}
            onBlur={field?.onBlur}
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const FormCustomFormatInput = ({
    form,
    field,
    inputSuffix,
    inputPrefix,
    onValueChange,
    format = (value) => value,
    getCaretBoundary = caretUnknownFormatBoundary,
    removeFormatting = defaultRemoveFormatting,
    ...rest
}) => {
    return (
        <NumberFormatInput
            form={form}
            field={field}
            inputPrefix={inputPrefix}
            inputSuffix={inputSuffix}
            format={format}
            getCaretBoundary={getCaretBoundary}
            removeFormatting={removeFormatting}
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

export default FormCustomFormatInput
