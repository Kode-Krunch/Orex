import DatePicker from 'components/ui/DatePicker'
import dayjs from 'dayjs'

const DisableOutOfRangeDate = ({ RefDate }) => {
    // Only able to select previous & future 7 days start from today
    const minDate = dayjs(new Date(RefDate))
        .subtract(0, 'day')
        .startOf('day')
        .toDate()

    const maxDate = dayjs(new Date()).add(0, 'day').toDate()

    const disabledDate = (current) => {
        // Disable dates before today
        return current && current < dayjs().startOf('day')
    }

    return (
        <DatePicker
            placeholder="Pick a date"
            minDate={minDate}
            disabledDate={disabledDate}
        />
    )
}

export default DisableOutOfRangeDate
