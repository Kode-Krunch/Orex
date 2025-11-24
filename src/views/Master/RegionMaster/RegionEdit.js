import {
  FormItemcompact,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { PostRegion, PutRegion } from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  RegionName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Region Name Required'),
  ShortName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('ShortName Required'),
  ZoneCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Zone Name Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
//const RegionEdit = ({ onDrawerClose, editData, setMessage, setlog, Zone }) => {
const RegionEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, Zone } = props;
  const token = useSelector((state) => state.auth.session.token);
  //console.log(editData)

  const AddRegion = async (values, token) => {
    try {
      const resp = await PostRegion(values, token);
      if (resp.data.msg === 'success') {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        return;
      } else if (resp.data.msg === 'Server Error.') {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    } catch (errors) {
      return {};
    }
  };
  const EditRegion = async (values, token) => {
    try {
      const resp = await PutRegion(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'Region Already Exists') {
        setlog('warning');
        setMessage(resp.data.msg);
        return;
      }
    } catch (errors) {
      return {};
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          RegionCode: editData.RegionCode || '',
          RegionName: editData.RegionName || '',
          ShortName: editData.ShortName || '',
          ZoneCode: editData.Zone?.ZoneCode || '',

          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.RegionCode) {
              new Promise((resolve, reject) => {
                AddRegion(values, token)
                  .then((response) => {
                    onDrawerClose(0, 0);
                    resolve(response);
                  })
                  .catch((errors) => {
                    reject(errors);
                  });
              });
            } else {
              new Promise((resolve, reject) => {
                setSubmitting(false);
                EditRegion(values, token)
                  .then((response) => {
                    onDrawerClose(0, 0);
                    resolve(response);
                  })
                  .catch((errors) => {
                    reject(errors);
                  });
              });
            }

            resetForm();
          }, 400);
        }}
      >
        {({ values, touched, errors }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Field
                  size="sm"
                  type="RegionCode"
                  autoComplete="off"
                  name="RegionCode"
                  placeholder="RegionCode name"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="Region Name"
                  invalid={errors.RegionName && touched.RegionName}
                  errorMessage={errors.RegionName}
                >
                  <Field
                    size="sm"
                    type="RegionName"
                    autoComplete="off"
                    name="RegionName"
                    placeholder="Region Name"
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="ShortName"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    size="sm"
                    type="ShortName"
                    maxlength="4"
                    autoComplete="off"
                    name="ShortName"
                    placeholder="ShortName"
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Zone Name"
                  invalid={errors.ZoneCode && touched.ZoneCode}
                  errorMessage={errors.ZoneCode}
                  style={{ width: '250px' }}
                >
                  <Field size="sm" name="ZoneCode" style={{ width: '250px' }}>
                    {({ field, form }) => (
                      <Select
                        style={{ width: '250px' }}
                        field={field}
                        form={form}
                        className="mb-4 w-50"
                        options={Zone}
                        value={Zone.filter(
                          (option) => option.value === values.ZoneCode,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                      />
                    )}
                  </Field>
                </FormItemcompact>
              </div>
              <FormItemcompact
                label="Status"
                invalid={errors.IsActive && touched.IsActive}
                errorMessage={errors.IsActive}
              >
                <div>
                  <Field size="sm" name="IsActive" component={Switcher} />
                </div>
              </FormItemcompact>

              {/* <FormItemcompact>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItemcompact> */}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default RegionEdit;
