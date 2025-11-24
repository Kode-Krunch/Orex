import React, { forwardRef, useState } from 'react';
import { FormContainer, Button, hooks, Alert, Card } from 'components/ui';
import { StickyFooter } from 'components/shared';
import { Form, Formik } from 'formik';
import ContactDetail from './ContactDetail';
import cloneDeep from 'lodash/cloneDeep';
import { AiOutlineSave } from 'react-icons/ai';
import * as Yup from 'yup';
import { useLocation } from 'react-router';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DepartmentManagement from './DepartmentManagement';
import ProfilePicture from './ProfilePicture';
import UserDetails from './UserDetails';
import { AddLocation, EditLocation } from './utils';

const { useUniqueId } = hooks;

const validationSchema = Yup.object().shape({
  Emp_FirstName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  Emp_Code: Yup.string().min(1, 'Too Short!').max(10, 'Too Long!'),
  // .required('Code Required'),
  Emp_LastName: Yup.string()
    .min(1, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  Emp_Email: Yup.string()
    .email('Invalid email format') // Checks for valid email format
    .min(5, 'Email must be at least 5 characters long') // Minimum length
    .max(254, 'Email must be less than 255 characters long') // Maximum length
    .required('required'), // Required field
  Emp_Addr1: Yup.string()
    .min(1, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  ReportingTo: Yup.string().required('Required'),
  PlaceCode: Yup.string().required('Required'),

  Emp_Contact1: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
    .min(10, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  Emp_Grade: Yup.string().required('Required'),
  Emp_DOB: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  Emp_DOJ: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  Emp_BloodGroup: Yup.string().required('Required'),
  DepartmentCode: Yup.string().required('Required'),
  DesignationCode: Yup.string().required('Required'),
  RegionCode: Yup.string().required('Required'),
  Pincode: Yup.string()
    .min(6, 'Too Short!')
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed'),
});

const ProductForm = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const { token } = useSelector((state) => state.auth.session);
  const Username = useSelector((state) => state.auth.session.Username);
  const { state } = useLocation();

  const initialData = {
    Emp_Image: state?.editData.Emp_Image || '',
    EmployeeCode: state?.editData.EmployeeCode || '',
    Emp_FirstName: state?.editData.Emp_FirstName || '',
    Emp_LastName: state?.editData.Emp_LastName || '',
    Emp_Code: state?.editData.Emp_Code || '',
    Emp_Email: state?.editData.Emp_Email || '',
    Emp_Addr1: state?.editData.Emp_Addr1 || '',
    Emp_Addr2: state?.editData.Emp_Addr2 || 'NA',
    PlaceCode: state?.editData.PlaceCode || '',
    StateCode: state?.editData.StateCode || '',
    CountryCode: state?.editData.CountryCode || '',
    Emp_Contact1: state?.editData.Emp_Contact1 || '',
    Emp_Contact2: state?.editData.Emp_Contact2 || '1234567890',
    Emp_Grade: state?.editData.Emp_Grade || '',
    Emp_DOB: state?.editData.Emp_DOB || '',
    Emp_DOJ: state?.editData.Emp_DOJ || '',
    Emp_DOL: state?.editData.Emp_DOL || '',
    Emp_BloodGroup: state?.editData.Emp_BloodGroup || '',
    Pincode: state?.editData.Pincode || '',
    DepartmentCode: state?.editData.DepartmentCode || '',
    DesignationCode: state?.editData.DesignationCode || '',
    ReportingTo: state?.editData.ReportingTo || '',
    RegionCode: state?.editData.RegionCode || '',
    Emp_Description: state?.editData.Emp_Description || '',
    IsActive: state?.editData.IsActive === 0 ? false : true,
    is2FAAllowed: state?.editData.is2FAAllowed == 0 ? false : true,
  };

  const { type, onFormSubmit, onDiscard, onDelete } = props;
  const newId = useUniqueId('product-');
  const [selectedNodeKey, setSelectedNodeKey] = useState(
    initialData.PlaceCode +
    '-' +
    initialData.StateCode +
    '-' +
    initialData.CountryCode,
  );
  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <Card header={<HeaderExtra />}>

        <Formik
          innerRef={ref}
          initialValues={{
            ...initialData,
            tags: initialData?.tags
              ? initialData.tags.map((value) => ({
                label: value,
                value,
              }))
              : [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            values.PlaceCode = selectedNodeKey.split('-')[0];
            values.CountryCode = selectedNodeKey.split('-')[2];
            values.StateCode = selectedNodeKey.split('-')[1];
            const formData = cloneDeep(values);
            formData.tags = formData.tags.map((tag) => tag.value);

            onFormSubmit?.(formData, setSubmitting);
            setTimeout(() => {
              if (state === null) {
                new Promise((resolve, reject) => {
                  AddLocation(
                    values,
                    token,
                    setMessage,
                    setlog,
                    navigate,
                    Username,
                  )
                    .then((response) => {
                      resolve(response);
                    })
                    .catch((errors) => {
                      reject(errors);
                    });
                });
              } else {
                new Promise((resolve, reject) => {
                  setSubmitting(false);
                  EditLocation(
                    values,
                    token,
                    setMessage,
                    setlog,
                    navigate,
                    Username,
                  )
                    .then((response) => {
                      resolve(response);
                    })
                    .catch((errors) => {
                      reject(errors);
                    });
                });
              }
            }, 400);
          }}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <UserDetails
                      touched={touched}
                      errors={errors}
                      values={values}
                    />
                    <ContactDetail
                      touched={touched}
                      errors={errors}
                      values={values}
                      ecode={state === null ? null : state.editData}
                      selectedNodeKey={selectedNodeKey}
                      setSelectedNodeKey={setSelectedNodeKey}
                    />
                    <DepartmentManagement
                      touched={touched}
                      errors={errors}
                      values={values}
                    />
                  </div>
                  <div className="col-span-1">
                    <ProfilePicture
                      touched={touched}
                      errors={errors}
                      values={values}
                      Emp_Image={state?.editData.Emp_Image}
                    />
                  </div>
                </div>
                <StickyFooter
                  className="-mx-8 px-8 flex items-center justify-between py-4"
                  stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <div className="md:flex items-center flex">
                    <Button
                      size="sm"
                      className="ltr:mr-3 rtl:ml-3"
                      onClick={() => navigate('/UserMaster')}
                      type="button"
                    >
                      Discard
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      loading={isSubmitting}
                      icon={<AiOutlineSave />}
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                </StickyFooter>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
});

ProductForm.defaultProps = {
  type: 'edit',
};

export default ProductForm;
