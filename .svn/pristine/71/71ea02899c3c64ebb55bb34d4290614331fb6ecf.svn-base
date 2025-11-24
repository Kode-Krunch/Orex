import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postgenre, Putgenre } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  GenreName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('GenreName Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
//const GenreEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const GenreEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddGenre = async (values, token) => {
    try {
      const resp = await Postgenre(values, token);

      if (resp.status == 200) {
        openNotification('success', 'Data Inserted Successfully.');
        return;
      }
      if (resp.status == 204) {
        openNotification('info', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification('danger', 'Server Error.');
        return;
      }
    }
  };
  const EditGenre = async (values, token) => {
    try {
      const resp = await Putgenre(values, token);

      if (resp.status == 200) {
        openNotification('success', 'Data Updated Successfully');
        return;
      }
      if (resp.status == 204) {
        openNotification('info', 'Data already Exists');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification('danger', 'Server Error.');
        return;
      }
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          GenreCode: editData.GenreCode || '',
          GenreName: editData.GenreName || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.GenreCode) {
              new Promise((resolve, reject) => {
                AddGenre(values, token)
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
                EditGenre(values, token)
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Field
                  type="GenreCode"
                  autoComplete="off"
                  name="GenreCode"
                  placeholder="GenreCode"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="Genre Name"
                  invalid={errors.GenreName && touched.GenreName}
                  errorMessage={errors.GenreName}
                >
                  <Field
                    type="GenreName"
                    autoComplete="off"
                    name="GenreName"
                    placeholder="Genre Name"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <FormItem
                  asterisk
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

export default GenreEdit;
