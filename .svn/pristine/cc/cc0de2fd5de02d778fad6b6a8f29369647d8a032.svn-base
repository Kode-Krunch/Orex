import {
  FormItem,
  Switcher,
  Input,
  FormContainer,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postsubproduct, Putsubproduct } from 'services/CreditcontrolService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  SubProductName: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('SubProduct Name Required'),

  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});

const subproductEdit = forwardRef((props, ref) => {
  /* PROPS */
  const { onDrawerClose, editData, setMessage, setlog, ProductList } = props;

  /* HOOKS */
  const token = useSelector((state) => state.auth.session.token);

  /* CORE FUNCTIONS */
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  const Addsubproduct = async (data, token) => {
    try {
      const resp = await Postsubproduct(data, token);
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

  const Editsubproduct = async (data, token) => {
    try {
      const resp = await Putsubproduct(data, token);
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
          ERPCode: editData.ERPCode || '',
          Remarks: editData.Remarks || '',
          IsActive:
            editData.IsActive !== undefined ? editData.IsActive === 1 : true,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
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
                  className="col-span-1"
                >
                  <Field
                    type="SubProductName"
                    autoComplete="off"
                    name="SubProductName"
                    placeholder="Product Category"
                    component={Input}
                    size="sm"
                  />
                </FormItem>

                <FormItem
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                  className="col-span-1"
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
                  </div>
                </FormItem>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default subproductEdit;
