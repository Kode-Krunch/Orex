import { FormContainer } from 'components/ui';
import { Field, useFormikContext } from 'formik';
import CustomFormItem from 'views/Controls/CustomFormItem';
import SelectXs from 'views/Controls/SelectXs/SelectXs';

function MapExecutives({ executiveOptions }) {
  /* HOOKS */
  const { values, errors, touched } = useFormikContext();

  return (
    <div className="h-full">
      <FormContainer size="sm" className="grid grid-cols-12 gap-x-3 gap-y-5">
        <CustomFormItem
          label="Assign Executives"
          className="col-span-12"
          asterisk={true}
          invalid={errors.mappedExecutives && touched.mappedExecutives}
          errorMessage={errors.mappedExecutives}
        >
          <Field name="mappedExecutives">
            {({ field, form }) => (
              <SelectXs
                isMulti
                field={field}
                form={form}
                options={executiveOptions}
                value={values.mappedExecutives}
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

export default MapExecutives;
