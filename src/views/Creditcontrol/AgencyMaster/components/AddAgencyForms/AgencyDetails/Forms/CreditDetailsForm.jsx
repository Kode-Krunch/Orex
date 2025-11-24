import { FormContainer, Input, Radio } from 'components/ui';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import CustomFormItem from 'views/Controls/CustomFormItem';
import { ONLY_NUMBERS_REGEX } from '../../../../regex';

function CreditDetailsForm() {
  /* HOOKS */
  const { values, touched, errors, setFieldValue } = useFormikContext();

  return (
    <>
      <h6 className="mb-2">CREDIT DETAILS</h6>
      <FormContainer size="sm" className="flex flex-col gap-5">
        <div className="grid grid-cols-12 gap-3">
          <CustomFormItem
            label="Credit Type"
            className="col-span-8"
            asterisk={true}
            invalid={errors.creditType && touched.creditType}
            errorMessage={errors.creditType}
          >
            <Field name="creditType">
              {({ field, form }) => (
                <Radio.Group
                  value={values.creditType}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                >
                  <Radio value={1}>Credit</Radio>
                  <Radio value={2}>Advance Payment</Radio>
                  <Radio value={3}>PDC</Radio>
                </Radio.Group>
              )}
            </Field>
          </CustomFormItem>
          {values.creditType === 1 && (
            <CustomFormItem
              label="Credit Days"
              className="col-span-4"
              asterisk={true}
              invalid={errors.creditDays && touched.creditDays}
              errorMessage={errors.creditDays}
            >
              <Input
                type="text"
                placeholder="Days"
                name="creditDays"
                value={values.creditDays}
                onChange={(event) => {
                  if (ONLY_NUMBERS_REGEX.test(event.target.value)) {
                    setFieldValue('creditDays', event.target.value);
                  }
                }}
              />
            </CustomFormItem>
          )}
        </div>
      </FormContainer>
    </>
  );
}

export default CreditDetailsForm;
