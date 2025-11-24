import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postsubproduct, Putsubproduct } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  SubProductName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('SubProduct Name Required'),

  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
//const PromoTypeEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const subproductEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, Product } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const Addsubproduct = async (values, token) => {
    try {
      const resp = await Postsubproduct(values, token);
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
  const Editsubproduct = async (values, token) => {
    try {
      const resp = await Putsubproduct(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'SubProduct Already Exists') {
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
          SubProductCode: editData.SubProductCode || '',
          SubProductName: editData.SubProductName || '',
          ProductCode: editData.ProductName?.ProductCode || '',

          ERPCode: editData.ERPCode || '',
          Remarks: editData.Remarks || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.SubProductCode) {
              new Promise((resolve, reject) => {
                Addsubproduct(values, token)
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
                Editsubproduct(values, token)
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
              <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
                <Field
                  type="SubProductCode"
                  autoComplete="off"
                  name="SubProductCode"
                  placeholder="SubProductCode"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="Product Category"
                  invalid={errors.SubProductName && touched.SubProductName}
                  errorMessage={errors.SubProductName}
                >
                  <Field
                    type="SubProductName"
                    autoComplete="off"
                    name="SubProductName"
                    placeholder="Product Category"
                    component={Input}
                  />
                </FormItem>

                <FormItem
                  asterisk
                  label="Product"
                  invalid={errors.ProductCode && touched.ProductCode}
                  errorMessage={errors.ProductCode}
                  style={{ width: '250px' }}
                >
                  <Field name="ProductCode" style={{ width: '250px' }}>
                    {({ field, form }) => (
                      <Select
                        style={{ width: '250px' }}
                        field={field}
                        form={form}
                        className="mb-4 w-50"
                        options={Product}
                        value={Product.filter(
                          (option) => option.value === values.ProductCode,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
                  </div>
                </FormItem>
              </div>

              {/* <FormItem>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItem> */}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default subproductEdit;
