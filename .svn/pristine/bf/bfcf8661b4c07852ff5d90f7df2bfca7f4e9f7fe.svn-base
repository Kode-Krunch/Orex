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
import { Postagencygroup, Putagencygroup } from 'services/CreditcontrolService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import { CheckListBox } from 'views/Controls/CheckListBox';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  AgencyGroupName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('AgencyGroup Name Required'),
  AgencyCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('AgencyCode Name Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
var SelectedAgency = {};

const AgencyGroupEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, AgencyList } = props;

  const token = useSelector((state) => state.auth.session.token);

  // console.log('editData:', editData)
  var CheckedList;
  if (editData && editData.details) {
    // Use Set to get unique AgencyCodes from details
    CheckedList = [
      ...new Set(editData.details.map((detail) => detail.AgencyCode)),
    ];
  }
  console.log(SelectedAgency);
  const Addagencygroup = async (values, token) => {
    const mergedData = {
      AgencyGroup: {
        AgencyGroupName: values.AgencyGroupName,
        IsActive: values.IsActive ? 1 : 0,
      },
      Details: SelectedAgency.map((item) => ({
        AgencyCode: item.AgencyCode,
      })),
    };
    try {
      const resp = await Postagencygroup(mergedData, token);
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
  const Editagencygroup = async (values, token) => {
    console.log(values);
    const mergedData = {
      AgencyGroup: {
        AgencyGroupName: values.AgencyGroupName,
        IsActive: values.IsActive ? 1 : 0,
      },
      Details: SelectedAgency.map((item) => ({
        AgencyCode: item.AgencyCode,
      })),
    };
    console.log(SelectedAgency);
    try {
      // console.log(mergedData)
      const resp = await Putagencygroup(
        mergedData,
        values.AgencyGroupCode,
        token,
      );
      // console.log(resp)
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
  const handleSelectionChange = (selItems) => {
    console.log(selItems);
    const mappedItems = selItems.map((item) => ({
      AgencyCode: item.code,
    }));
    SelectedAgency = mappedItems;
    console.log('SelectedAgency:', SelectedAgency);
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          AgencyGroupCode: editData.AgencyGroupCode || '',
          AgencyGroupName: editData.AgencyGroupName || '',

          IsActive: editData.IsActive === 1 ? true : false || '',
          ShareDifference: 0,
        }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          // console.log('values:,', values)
          values['Detail'] = SelectedAgency;
          // console.log('values:,', values)
          setTimeout(() => {
            if (!editData.AgencyGroupCode) {
              new Promise((resolve, reject) => {
                Addagencygroup(values, token)
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
                Editagencygroup(values, token)
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
              <div>
                <Field
                  size="sm"
                  type="AgencyGroupCode"
                  autoComplete="off"
                  name="AgencyGroupCode"
                  placeholder="AgencyGroup Name"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="AgencyGroup Name"
                  invalid={errors.AgencyGroupCode && touched.AgencyGroupCode}
                  errorMessage={errors.AgencyGroupName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="AgencyGroupName"
                    placeholder="AgencyGroup Name"
                    component={Input}
                  />
                </FormItemcompact>
              </div>

              {/* //CreditPeriod */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                <FormItemcompact
                  label="IsActive"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
                  </div>
                </FormItemcompact>
              </div>
              <div className="mt-3">
                <CheckListBox
                  data={AgencyList}
                  checkedList={CheckedList || []}
                  hdr="Agency's"
                  onSelectionChange={handleSelectionChange}
                ></CheckListBox>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});
export default AgencyGroupEdit;
