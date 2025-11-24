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
import { Postproduct, Putproduct } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  ProductName: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Product Name Required'),
  SubProductCode: Yup.string().required('Product Name Required'),
  IsActive: Yup.string().required('IsActives Required'),
});
//const PromoTypeEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const productEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, SubProduct } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const Addproduct = async (values, token) => {
    try {
      const resp = await Postproduct(values, token);
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
      if (resp.status == 200) {
        openNotification('success', 'Data Inserted Successfully.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        openNotification('warning', 'Server Error.');
        return;
      }
    }
  };
  const Editproduct = async (values, token) => {
    try {
      const resp = await Putproduct(values, token);
      if (resp.status == 200) {
        openNotification('success', 'Data Updated Successfully');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        openNotification('warning', 'Server Error.');
        return;
      }
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          ProductCode: editData.ProductCode || '',
          SubProductCode: editData.SubProductMaster?.SubProductCode || '',
          ProductName: editData.ProductName || '',
          ERPCode: editData.ERPCode || '',
          Remarks: editData.Remarks || '',
          IsActive:
            editData.IsActive !== undefined ? editData.IsActive === 1 : true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.ProductCode) {
              new Promise((resolve, reject) => {
                Addproduct(values, token)
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
                Editproduct(values, token)
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
                  type="ProductCode"
                  autoComplete="off"
                  name="ProductCode"
                  placeholder="ProductCode"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="Product Name"
                  invalid={errors.ProductName && touched.ProductName}
                  errorMessage={errors.ProductName}
                >
                  <Field
                    type="ProductName"
                    autoComplete="off"
                    size="sm"
                    name="ProductName"
                    placeholder="Product Name"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  asterisk
                  label="Sub Product"
                  invalid={errors.SubProductCode && touched.SubProductCode}
                  errorMessage={errors.SubProductCode}
                  className="col-span-1"
                >
                  <Field name="SubProductCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={SubProduct}
                        value={SubProduct.filter(
                          (product) => product.value === values.SubProductCode,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                        size="sm"
                      />
                    )}
                  </Field>
                </FormItem>
                <div>
                  <FormItem
                    label="ERPCode"
                    invalid={errors.ERPCode && touched.ERPCode}
                    errorMessage={errors.ERPCode}
                  >
                    <Field name="ERPCode">
                      {({ field, form }) => (
                        <Input
                          size="sm"
                          field={field}
                          form={form}
                          value={values.ERPCode}
                          onChange={(option) => {
                            console.log(option);
                            let inputValue = option.target.value;

                            if (
                              inputValue.length <= 20 &&
                              /^[0-9a-zA-Z\s]*$/.test(inputValue)
                            ) {
                              form.setFieldValue(field.name, inputValue);
                            }
                          }}
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>
              </div>
              <br></br>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
                <FormItem
                  label="Remarks"
                  invalid={errors.Remarks && touched.Remarks}
                  errorMessage={errors.Remarks}
                >
                  <Field
                    type="Remarks"
                    autoComplete="off"
                    name="Remarks"
                    size="sm"
                    placeholder="Remarks"
                    component={Input}
                  />
                </FormItem>
              </div>
              <br></br>
              <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
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

export default productEdit;
