import { Checkbox, FormContainer, Input, Switcher } from 'components/ui';
import { Field, useFormikContext } from 'formik';
import CustomFormItem from 'views/Controls/CustomFormItem';
import SelectXs from 'views/Controls/SelectXs/SelectXs';

function BasicDetailsForm({ creditRateLimitOptions }) {
  /* HOOKS */
  const { values, touched, errors, setFieldValue } = useFormikContext();

  return (
    <>
      <h6 className="mb-3">BASIC DETAILS</h6>
      <FormContainer size="sm" className="grid grid-cols-12 gap-x-3 gap-y-5">
        <CustomFormItem
          label="Client Name"
          className="col-span-8"
          asterisk={true}
          invalid={errors.clientName && touched.clientName}
          errorMessage={errors.clientName}
        >
          <Field
            type="text"
            placeholder="Client Name"
            component={Input}
            name="clientName"
            maxLength={50}
          />
        </CustomFormItem>
        <CustomFormItem
          label="Short Name"
          className="col-span-4"
          asterisk={true}
          invalid={errors.clientShortName && touched.clientShortName}
          errorMessage={errors.clientShortName}
        >
          <Field
            type="text"
            placeholder="Short Name"
            component={Input}
            name="clientShortName"
            maxLength={4}
          />
        </CustomFormItem>
        <CustomFormItem
          label="ERP Code"
          className="col-span-4"
          invalid={errors.clientDetailsErpCode && touched.clientDetailsErpCode}
          errorMessage={errors.clientDetailsErpCode}
        >
          <Field
            type="text"
            placeholder="ERP Code"
            component={Input}
            name="clientDetailsErpCode"
            maxLength={50}
          />
        </CustomFormItem>
        <CustomFormItem
          label="PAN"
          className="col-span-4"
          invalid={errors.pan && touched.pan}
          errorMessage={errors.pan}
        >
          <Field
            type="text"
            placeholder="PAN"
            component={Input}
            name="pan"
            maxLength={10}
            onChange={(event) =>
              setFieldValue('pan', event.target.value.toUpperCase())
            }
          />
        </CustomFormItem>
        <CustomFormItem
          label="TAN"
          className="col-span-4"
          invalid={errors.tan && touched.tan}
          errorMessage={errors.tan}
        >
          <Field
            type="text"
            placeholder="TAN"
            component={Input}
            name="tan"
            maxLength={10}
            onChange={(event) =>
              setFieldValue('tan', event.target.value.toUpperCase())
            }
          />
        </CustomFormItem>
        <CustomFormItem
          label="BARC Code"
          className="col-span-4"
          invalid={errors.barcCode && touched.barcCode}
          errorMessage={errors.barcCode}
        >
          <Field
            type="text"
            placeholder="BARC Code"
            component={Input}
            name="barcCode"
            maxLength={50}
          />
        </CustomFormItem>
        <CustomFormItem
          label="Credit Rate Limit"
          className="col-span-5"
          asterisk={true}
        >
          <Field
            placeholder="Select"
            component={SelectXs}
            name="creditRateLimit"
            options={creditRateLimitOptions}
            value={values.creditRateLimit}
            onChange={(option) => setFieldValue('creditRateLimit', option)}
          />
        </CustomFormItem>
        <div></div>
        <CustomFormItem label="Status" className="col-span-2">
          <Field component={Switcher} name="status" />
        </CustomFormItem>
        <CustomFormItem label="Client Flags" className="col-span-12">
          <Field name="clientFlags">
            {() => (
              <Checkbox.Group
                value={values.clientFlags}
                onChange={(options) => setFieldValue('clientFlags', options)}
              >
                <Checkbox value={1}>IBF</Checkbox>
                <Checkbox value={2}>AAAI</Checkbox>
                <Checkbox value={3}>On Hold</Checkbox>
                <Checkbox value={4}>RCM</Checkbox>
              </Checkbox.Group>
            )}
          </Field>
        </CustomFormItem>

        <CustomFormItem label="Remarks" className="col-span-12">
          <Field placeholder="Select" component={Input} name="remarks" />
        </CustomFormItem>
      </FormContainer>
    </>
  );
}

export default BasicDetailsForm;
