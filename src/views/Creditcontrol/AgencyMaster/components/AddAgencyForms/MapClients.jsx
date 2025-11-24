import { FormContainer } from 'components/ui';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import CustomFormItem from 'views/Controls/CustomFormItem';
import SelectXs from 'views/Controls/SelectXs/SelectXs';

function MapClients({ clientOptions }) {
  /* HOOKS */
  const { values, errors, touched } = useFormikContext();

  return (
    <div className="h-full">
      <FormContainer size="sm" className="grid grid-cols-12 gap-x-3 gap-y-5">
        <CustomFormItem
          label="Assign Clients"
          className="col-span-12"
          asterisk={true}
          invalid={errors.mappedClients && touched.mappedClients}
          errorMessage={errors.mappedClients}
        >
          <Field name="mappedClients">
            {({ field, form }) => (
              <SelectXs
                isMulti
                field={field}
                form={form}
                options={clientOptions}
                value={values.mappedClients}
                onChange={(option) => {
                  form.setFieldValue(field.name, option);
                }}
                onBlur={() => {
                  form.setFieldTouched(field.name, true);
                }}
              />
            )}
          </Field>
        </CustomFormItem>
      </FormContainer>
    </div>
  );
}

export default MapClients;
