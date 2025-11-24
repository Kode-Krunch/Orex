import { Input } from 'components/ui'
import { Field } from 'formik'
import React from 'react'

const Validationfunaltion = () => {
    return (
        <div>
            Validationfunaltion

            <div>Only for formik</div>
            <div> only Alphabate</div>
            <Input

                onChange={(e) => {
                    const newValue = e.target.value;

                    if (/^[a-zA-Z ]+$/.test(newValue)) {

                        form.setFieldValue(field.name, newValue);
                    }
                    if (newValue == '') {
                        form.setFieldValue(field.name, '');
                    }
                }}

            />
            <div> only PANCARD</div>
            {({ field, form }) => (<Input
                onChange={(e) => {
                    const newValue = e.target.value;

                    if (/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(newValue)) {

                        form.setFieldValue(field.name, newValue);
                    }
                    if (newValue == '') {
                        form.setFieldValue(field.name, '');
                    }
                }}
            />)}
            <div> only Alphabate & numaric</div>
            {({ field, form }) => (<Input
                onChange={(e) => {
                    const newValue = e.target.value;

                    if (/^[a-zA-Z0-9\s]*$/.test(newValue)) {

                        form.setFieldValue(field.name, newValue);
                    }
                    if (newValue == '') {
                        form.setFieldValue(field.name, '');
                    }
                }}

            />)}

            <div> only  numaric</div>
            {({ field, form }) => (<Input
                onChange={(e) => {
                    const newValue = e.target.value;

                    if (/^[0-9]*$/.test(newValue)) {

                        form.setFieldValue(field.name, newValue);
                    }
                    if (newValue == '') {
                        form.setFieldValue(field.name, '');
                    }
                }}

            />)}


        </div>
    )
}

export default Validationfunaltion