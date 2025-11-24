import { FormItem } from 'components/ui'
// import { Validate,showError2} from 'components/validators';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react'
import dayjs from 'dayjs'
const minBudgetDate = dayjs(new Date())
    .subtract(1, 'year')
    .startOf('day')
    .toDate()

const BudgetYearC = ({ BudgetYear, setBudgetYear, errors, touched, setErrors, setTouched }) => {
    let res = BudgetYear == null ? null : new Date(BudgetYear + '-01-01')
    const [date, setdate] = useState(res)

    return (
        <FormItem
            asterisk
            label="Budget Year"
            invalid={errors.BudgetYear && touched.BudgetYear}
            errorMessage={errors.BudgetYear}
        >

            <Calendar
                value={date}
                minDate={minBudgetDate}

                onChange={(e) => {
                    // console.log(e.value);
                    setBudgetYear(e.value.getFullYear())
                    setdate(e.value)
                }}
                view="year" dateFormat="yy" />
        </FormItem>

    )

}

export default BudgetYearC

{/* <DatePicker
        inputFormat="YYYY"
        minDate={minBudgetDate}
                                                            onChange={(
                                                                date
                                                            ) => {
                                                                setBudgetYear(
                                                                    date.getFullYear()
                                                                )
                                                            }}
                                                        /> */}                                                      