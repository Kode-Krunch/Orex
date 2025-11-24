import { FormItem } from 'components/ui';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import dayjs from 'dayjs';

const BudgetYearC2 = ({ BudgetYear, setFormState, name }) => {
    const inputDate = new Date(BudgetYear);
    const outputDateString = new Date(
        inputDate.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        })
    );

    const minDate = new Date(); // Today's date

    return (
        <div className='hshs'>

            <Calendar
                value={BudgetYear == null ? BudgetYear : outputDateString}
                style={{
                    color: 'white !important',
                    height: '20px',
                }}
                onChange={(e) => {
                    const selectedDate = e.value;


                    setFormState((prevFormState) => ({
                        ...prevFormState,
                        [name]: selectedDate,
                    }));
                }}
                view='year'
                dateFormat='yy'
                maxDate={minDate}
            />

        </div>
    );
};

export default BudgetYearC2;
