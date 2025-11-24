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
import { Postcontenttype, Putcontenttype } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  ContentTypeName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
// const ContentTypeEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     // currency,
// }) => {
const ContentTypeEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddContentType = async (values, token) => {
    try {
      const resp = await Postcontenttype(values, token);

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
  const EditContentType = async (values, token) => {
    try {
      const resp = await Putcontenttype(values, token);
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
          ContentTypeCode: editData.ContentTypeCode || '',
          ContentTypeName: editData.ContentTypeName || '',
          MultiPart: editData.MultiPart === 1 ? true : false,
          EpisodeSpecific: editData.EpisodeSpecific === 1 ? true : false,
          LiveEvent: editData.LiveEvent === 1 ? true : false,
          SportEvent: editData.SportEvent === 1 ? true : false,
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.ContentTypeCode) {
              new Promise((resolve, reject) => {
                AddContentType(values, token)
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
                EditContentType(values, token)
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
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <Field
                  type="ContentTypeCode"
                  autoComplete="off"
                  name="ContentTypeCode"
                  placeholder="ContentTypeCode"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="Content Type Name"
                  invalid={errors.ContentTypeName && touched.ContentTypeName}
                  errorMessage={errors.ContentTypeName}
                >
                  <Field
                    type="ContentTypeName"
                    autoComplete="off"
                    name="ContentTypeName"
                    placeholder="ContentType Name"
                    component={Input}
                  />
                </FormItemcompact>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                <FormItemcompact
                  label="MultiPart"
                  invalid={errors.MultiPart && touched.MultiPart}
                  errorMessage={errors.MultiPart}
                >
                  <div>
                    <Field name="MultiPart" component={Switcher} />
                  </div>
                </FormItemcompact>

                <FormItemcompact
                  label="EpisodeSpecific"
                  invalid={errors.EpisodeSpecific && touched.EpisodeSpecific}
                  errorMessage={errors.EpisodeSpecific}
                >
                  <div>
                    <Field name="EpisodeSpecific" component={Switcher} />
                  </div>
                </FormItemcompact>

                <FormItemcompact
                  label="LiveEvent"
                  invalid={errors.LiveEvent && touched.LiveEvent}
                  errorMessage={errors.LiveEvent}
                >
                  <div>
                    <Field name="LiveEvent" component={Switcher} />
                  </div>
                </FormItemcompact>
                <FormItemcompact
                  label="SportEvent"
                  invalid={errors.SportEvent && touched.SportEvent}
                  errorMessage={errors.SportEvent}
                >
                  <div>
                    <Field name="SportEvent" component={Switcher} />
                  </div>
                </FormItemcompact>
              </div>
              <br></br>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <FormItemcompact
                  label="Active"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
                  </div>
                </FormItemcompact>
              </div>
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

export default ContentTypeEdit;
