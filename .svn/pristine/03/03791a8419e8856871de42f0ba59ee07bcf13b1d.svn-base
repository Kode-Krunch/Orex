import { FormContainer, Input } from 'components/ui';
import { Field, useFormikContext } from 'formik';
import CustomFormItem from 'views/Controls/CustomFormItem';
import { FAX_NO_REGEX, PHONE_NO_REGEX } from '../../../../regex';

function ContactDetailsForm() {
  /* HOOKS */
  const { touched, errors, setFieldValue } = useFormikContext();

  return (
    <div>
      <h6 className="mb-2">CONTACT DETAILS</h6>
      <FormContainer size="sm" className="flex flex-col gap-5">
        <div className="grid grid-cols-12 gap-x-3 gap-y-5">
          <CustomFormItem
            label="Mobile"
            className="col-span-4"
            asterisk={true}
            invalid={errors.mobile && touched.mobile}
            errorMessage={errors.mobile}
          >
            <Field
              type="tel"
              placeholder="Mobile"
              component={Input}
              name="mobile"
              maxLength={16}
              onChange={(event) =>
                (PHONE_NO_REGEX.test(event.target.value) ||
                  event.target.value === '') &&
                setFieldValue('mobile', event.target.value)
              }
            />
          </CustomFormItem>
          <CustomFormItem
            label="Phone"
            className="col-span-4"
            invalid={errors.phone && touched.phone}
            errorMessage={errors.phone}
          >
            <Field
              type="tel"
              placeholder="Phone"
              component={Input}
              name="phone"
              maxLength={16}
              onChange={(event) =>
                (PHONE_NO_REGEX.test(event.target.value) ||
                  event.target.value === '') &&
                setFieldValue('phone', event.target.value)
              }
            />
          </CustomFormItem>
          <CustomFormItem
            label="FAX"
            className="col-span-4"
            invalid={errors.fax && touched.fax}
            errorMessage={errors.fax}
          >
            <Field
              type="text"
              placeholder="FAX"
              component={Input}
              name="fax"
              maxLength={16}
              onChange={(event) =>
                (FAX_NO_REGEX.test(event.target.value) ||
                  event.target.value === '') &&
                setFieldValue('fax', event.target.value)
              }
            />
          </CustomFormItem>
          <CustomFormItem
            label="Contact Person"
            className="col-span-4"
            asterisk={true}
            invalid={errors.contactPerson && touched.contactPerson}
            errorMessage={errors.contactPerson}
          >
            <Field
              type="text"
              placeholder="Contact Person"
              component={Input}
              name="contactPerson"
              maxLength={50}
            />
          </CustomFormItem>
          <CustomFormItem
            label="Email"
            className="col-span-4"
            asterisk={true}
            invalid={errors.email && touched.email}
            errorMessage={errors.email}
          >
            <Field
              type="email"
              placeholder="Email"
              component={Input}
              name="email"
            />
          </CustomFormItem>
        </div>
      </FormContainer>
    </div>
  );
}

export default ContactDetailsForm;
