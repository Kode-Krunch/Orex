import {
  FormItemcompact,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
  Upload,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import { Postmam, Putmam } from 'services/MasterService';
import { FcImageFile } from 'react-icons/fc';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  MamName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('MAM Name Required'),

  ShortName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(4, 'Too Long!'),
  MAMFileFormat: Yup.string()
    .min(1, 'Too Short!')
    .max(5, 'Too Long!')
    .required('MAM File Format Required'),
});

const MamEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddMAM = async (values, token) => {
    try {
      const resp = await Postmam(values, token);

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
  const EditMAM = async (values, token) => {
    try {
      const resp = await Putmam(values, token);
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
  // useEffect(() => {
  //     ; (async (values) => {
  //         const Place = await apiGetPlaceMaster(values)
  //         const formattedOptions = Place.data.map((option) => ({
  //             value: option.PlaceCode,
  //             label: option.PlaceName,
  //             Country: option.Country.CountryCode,
  //             State: option.State.StateCode,
  //         }))
  //         console.log(Place.data)
  //         setPlace(formattedOptions)
  //     })()
  //}, [])
  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          MamCode: editData.MamCode || '',
          MamName: editData.MamName || '',
          MAMFileFormat: editData.MAMFileFormat || '',
          ShortName: editData.ShortName || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);
          setTimeout(() => {
            if (!editData.MamCode) {
              new Promise((resolve, reject) => {
                AddMAM(values, token)
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
                EditMAM(values, token)
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
              <Field
                size="sm"
                type="MamCode"
                autoComplete="off"
                name="MamCode"
                placeholder=""
                component={Input}
                hidden
              />
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                <FormItemcompact
                  asterisk
                  label="MAM Name"
                  invalid={errors.MamName && touched.MamName}
                  errorMessage={errors.MamName}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="MamName"
                    placeholder=" "
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  label="ShortName"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="ShortName"
                    placeholder=" "
                    component={Input}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="MAM File Format"
                  invalid={errors.MAMFileFormat && touched.MAMFileFormat}
                  errorMessage={errors.MAMFileFormat}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="MAMFileFormat"
                    placeholder=" "
                    component={Input}
                  />
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
export default MamEdit;
