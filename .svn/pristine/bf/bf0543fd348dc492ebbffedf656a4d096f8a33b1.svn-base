import {
  FormItem,
  Switcher,
  Input,
  FormContainer,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { Postbrand, Putbrand } from 'services/CreditcontrolService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  BrandName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('BrandName  Required'),

  ProductCode: Yup.string().required('ProductName Required'),
  ERPCode: Yup.string().min(3, 'Too Short!'),
  BarcCode: Yup.string().min(3, 'Too Short!'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
  clients: Yup.array().min(1, 'At least one client is required!'),
});

const BrandEdit = forwardRef((props, ref) => {
  /* PROPS */
  const { onDrawerClose, editData, Product, ClientList } = props;

  /* HOOKS */
  const token = useSelector((state) => state.auth.session.token);
  const Username = useSelector((state) => state.auth.session.Username);

  /* CORE FUNCTIONS */
  const handleFormSubmit = (values, { resetForm, setSubmitting }) => {
    try {
      if (!editData.BrandCode) {
        new Promise((resolve, reject) => {
          AddBrand(values, token)
            .then((response) => {
              onDrawerClose(0, 0);
              resolve(response);
              resetForm();
            })
            .catch((errors) => {
              reject(errors);
            });
        });
      } else {
        new Promise((resolve, reject) => {
          setSubmitting(false);
          EditBrand(values, token)
            .then((response) => {
              onDrawerClose(0, 0);
              resolve(response);
              resetForm();
            })
            .catch((errors) => {
              reject(errors);
            });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const AddBrand = async (values, token) => {
    const mergedData = {
      request: {
        BrandName: values.BrandName,
        IsActive: values.IsActive ? 1 : 0,
        ERPCode: values.ERPCode,
        ProductCode: values.ProductCode,
        BarcCode: values.BarcCode,
        Remarks: values.Remarks,
      },
      clientmap: values.clients.map((item) => ({
        ClientCode: item.code,
        IsActive: values.IsActive ? 1 : 0,
      })),
    };
    try {
      const resp = await Postbrand(mergedData, token);
      if (resp.status == 200) {
        openNotification('success', 'Data Inserted Successfully.');
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

  const EditBrand = async (values, token) => {
    const mergedData = {
      request: {
        BrandName: values.BrandName,
        IsActive: values.IsActive ? 1 : 0,
        ERPCode: values.ERPCode,
        ProductCode: values.ProductCode,
        BarcCode: values.BarcCode,
        Remarks: values.Remarks,
      },
      clientmap: values.clients.map((item) => ({
        ClientCode: item.code,
        IsActive: values.IsActive ? 1 : 0,
      })),
    };
    try {
      const resp = await Putbrand(mergedData, values.BrandCode, token);
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
          BrandCode: editData.BrandCode || '',
          BrandName: editData.BrandName || '',
          ProductCode: editData.ProductCode || '',
          ERPCode: editData.ERPCode || '',
          BarcCode: editData.BarcCode || '',
          Remarks: editData.Remarks || '',
          IsActive:
            editData.IsActive === 1 || editData.IsActive === undefined
              ? true
              : false,
          clients:
            editData && editData.clientmap
              ? editData.clientmap.map(
                (clientX) =>
                  ClientList.filter(
                    (clientY) => clientX.ClientCode === clientY.code,
                  )[0],
              )
              : [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, touched, errors }) => (
          <Form>
            <FormContainer>
              <Field
                type="BrandCode"
                autoComplete="off"
                name="BrandCode"
                placeholder="BrandCode"
                component={Input}
                hidden
              />
              <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
                <FormItem
                  asterisk
                  label="Brand Name"
                  invalid={errors.BrandName && touched.BrandName}
                  errorMessage={errors.BrandName}
                >
                  <Field
                    type="BrandName"
                    autoComplete="off"
                    name="BrandName"
                    maxLength="50"
                    size="sm"
                    placeholder="Brand Name"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  asterisk
                  label="Product"
                  invalid={errors.ProductCode && touched.ProductCode}
                  errorMessage={errors.ProductCode}
                >
                  <Field name="ProductCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={Product}
                        value={Product.filter(
                          (option) => option.value === values.ProductCode,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                        size="sm"
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem
                  label="ERPCODE"
                  invalid={errors.ERPCode && touched.ERPCode}
                  errorMessage={errors.ERPCode}
                >
                  <Field
                    type="ERPCode"
                    autoComplete="off"
                    name="ERPCode"
                    size="sm"
                    maxLength="20"
                    placeholder="ERPCODE"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="BARC Code"
                  invalid={errors.BarcCode && touched.BarcCode}
                  errorMessage={errors.BarcCode}
                >
                  <Field
                    type="BarcCode"
                    autoComplete="off"
                    name="BarcCode"
                    size="sm"
                    maxLength="20"
                    placeholder="BARC Code"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Remarks"
                  invalid={errors.Remarks && touched.Remarks}
                  errorMessage={errors.Remarks}
                >
                  <Field
                    autoComplete="off"
                    name="Remarks"
                    placeholder="Remarks"
                    size="sm"
                    maxLength="100"
                    component={Input}
                  />
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
                <FormItem
                  label="Clients"
                  className="col-span-2"
                  asterisk
                  errorMessage={errors.clients}
                  invalid={Boolean(errors.clients && touched.clients)}
                >
                  <Field name="clients">
                    {({ field, form }) => (
                      <Select
                        isMulti
                        placeholder="Select"
                        field={field}
                        form={form}
                        options={ClientList}
                        value={values.clients}
                        onChange={(option) => {
                          form.setFieldValue(field.name, option);
                        }}
                        size="sm"
                        styles={{
                          valueContainer: (base) => ({
                            ...base,
                            padding: '5px 8px',
                          }),
                          multiValue: (base) => ({
                            ...base,
                            marginRight: '8px',
                            marginBlock: '5px',
                            color: 'white',
                            fontWeight: '400',
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            fontWeight: '400',
                          }),
                          input: (base) => ({
                            ...base,
                            color: 'white',
                          }),
                        }}
                      />
                    )}
                  </Field>
                </FormItem>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default BrandEdit;
