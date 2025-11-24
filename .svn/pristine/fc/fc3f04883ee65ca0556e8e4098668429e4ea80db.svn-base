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
import { Postgroupname, Putgroupname } from 'services/EventPlannerService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import { CheckListBox } from 'views/Controls/CheckListBox';

const validationSchema = Yup.object().shape({
  GroupName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Group Name Required'),
  TeamCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('TeamCode Name Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
var SelectedTeam = {};

const GroupEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, TeamList } = props;

  const token = useSelector((state) => state.auth.session.token);

  // console.log('editData:', editData)
  var CheckedList;
  if (editData && editData.details) {
    // Use Set to get unique AgencyCodes from details
    CheckedList = [
      ...new Set(editData.details.map((detail) => detail.TeamCode)),
    ];
  }
  console.log(SelectedTeam);
  const Addgroup = async (values, token) => {
    const mergedData = {
      Group: {
        GroupName: values.GroupName,
        ContentCode: '1',
        IsActive: values.IsActive ? 1 : 0,
      },
      Details: SelectedTeam.map((item) => ({
        TeamCode: item.TeamCode,
      })),
    };
    try {
      const resp = await Postgroupname(mergedData, token);
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
  const Editgroup = async (values, token) => {
    console.log(values);
    const mergedData = {
      Group: {
        GroupName: values.GroupName,
        ContentCode: '1',
        IsActive: values.IsActive ? 1 : 0,
      },
      Details: SelectedTeam.map((item) => ({
        TeamCode: item.TeamCode,
      })),
    };
    console.log(SelectedTeam);
    try {
      // console.log(mergedData)
      const resp = await Putgroupname(mergedData, values.GroupCode, token);
      // console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'Location is Already Exists') {
        setlog('warning');
        setMessage(resp.data.msg);
        return;
      }
    } catch (errors) {
      return {};
    }
  };
  const handleSelectionChange = (selItems) => {
    console.log(selItems);
    const mappedItems = selItems.map((item) => ({
      TeamCode: item.code,
    }));
    SelectedTeam = mappedItems;
    console.log('SelectedTeam:', SelectedTeam);
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          GroupCode: editData.GroupCode || '',
          GroupName: editData.GroupName || '',
          ContentCode: editData.ContentCode || '',

          IsActive: editData.IsActive === 1 ? true : false || '',
          ShareDifference: 0,
        }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          // console.log('values:,', values)
          values['Detail'] = SelectedTeam;
          // console.log('values:,', values)
          setTimeout(() => {
            if (!editData.GroupCode) {
              new Promise((resolve, reject) => {
                Addgroup(values, token)
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
                Editgroup(values, token)
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
                  type="GroupCode"
                  autoComplete="off"
                  name="GroupCode"
                  placeholder="Group Name"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="Group Name"
                  invalid={errors.GroupCode && touched.GroupCode}
                  errorMessage={errors.GroupName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="GroupName"
                    placeholder="Group Name"
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
                  data={TeamList}
                  checkedList={CheckedList || []}
                  hdr="teams"
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
export default GroupEdit;
