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
import { Postclientgroup, Putclientgroup } from 'services/CreditcontrolService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { MultiSelect } from 'primereact/multiselect';
import { CheckListBox } from 'views/Controls/CheckListBox';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  ClientGroupName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('ClientGroup Name Required'),
  ClientCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('ClientCode Name Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
var SelectedClient = {};

const ClientGroupEdit = forwardRef((props, ref) => {
  const [DetailItem, setDetailItem] = useState([]);

  const { onDrawerClose, editData, setMessage, setlog, ClientList } = props;

  const token = useSelector((state) => state.auth.session.token);

  // console.log('editData:', editData)
  var CheckedList;
  if (editData && editData.details) {
    // Use Set to get unique ClientCodes from details
    CheckedList = [
      ...new Set(editData.details.map((detail) => detail.ClientCode)),
    ];
  }
  // console.log(SelectedClient)
  const Addclientgroup = async (values, token) => {
    const mergedData = {
      ClientGroup: {
        ClientGroupName: values.ClientGroupName,
        IsActive: values.IsActive ? 1 : 0,
      },
      Details: SelectedClient.map((item) => ({
        ClientCode: item.ClientCode,
      })),
    };
    try {
      const resp = await Postclientgroup(mergedData, token);

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
  const Editclientgroup = async (values, token) => {
    console.log(values);
    const mergedData = {
      ClientGroup: {
        ClientGroupName: values.ClientGroupName,
        IsActive: values.IsActive ? 1 : 0,
      },
      Details: SelectedClient.map((item) => ({
        ClientCode: item.ClientCode,
      })),
    };
    console.log(mergedData);
    try {
      // console.log(mergedData)
      const resp = await Putclientgroup(
        mergedData,
        values.ClientGroupCode,
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
    const mappedItems = selItems.map((item) => ({ ClientCode: item.code }));
    SelectedClient = mappedItems;
    // console.log('SelectedClient:', SelectedClient)
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          ClientGroupCode: editData.ClientGroupCode || '',
          ClientGroupName: editData.ClientGroupName || '',

          IsActive: editData.IsActive === 1 ? true : false || '',
          ShareDifference: 0,
        }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          // console.log('values:,', values)
          values['Detail'] = SelectedClient;
          // console.log('values:,', values)
          setTimeout(() => {
            if (!editData.ClientGroupCode) {
              new Promise((resolve, reject) => {
                Addclientgroup(values, token)
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
                Editclientgroup(values, token)
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
                  type="ClientGroupCode"
                  autoComplete="off"
                  name="ClientGroupCode"
                  placeholder="ClientGroup Name"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="ClientGroup Name"
                  invalid={errors.ClientGroupCode && touched.ClientGroupCode}
                  errorMessage={errors.ClientGroupName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="ClientGroupName"
                    placeholder="ClientGroup Name"
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
                  data={ClientList}
                  checkedList={CheckedList || []}
                  hdr="client's"
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
export default ClientGroupEdit;
