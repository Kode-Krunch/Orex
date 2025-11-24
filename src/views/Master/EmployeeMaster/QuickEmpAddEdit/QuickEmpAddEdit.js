import React, { forwardRef, useEffect, useState } from 'react';
import { FormContainer, Button, Alert, Card } from 'components/ui';
import { StickyFooter } from 'components/shared';
import { Form, Formik } from 'formik';
import cloneDeep from 'lodash/cloneDeep';
import { AiOutlineSave } from 'react-icons/ai';
import * as Yup from 'yup';
import { useLocation } from 'react-router';
import {
  apiGetEmployeemasterdrop,
  apishowplaceTree,
} from 'services/MasterService';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderExtra from 'views/Controls/HeaderExtra';
import QuickUserDetails from './QuickUserDetails';
import { convertDateToYMD } from 'components/validators';
import { addYears } from 'date-fns';
import { AddLocation, EditLocation } from '../utils';

const validationSchema = Yup.object().shape({
  Emp_FirstName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  Emp_LastName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  Emp_Email: Yup.string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters long')
    .max(254, 'Email must be less than 255 characters long')
    .required('required'),
  Emp_Contact1: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
    .min(10, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
});

const initialData = {
  Emp_Image: '',
  EmployeeCode: '',
  Emp_FirstName: '',
  Emp_LastName: '',
  Emp_Code: '',
  Emp_Email: '',
  Emp_Addr1: 'address line 1',
  Emp_Addr2: 'NA',
  PlaceCode: '',
  StateCode: '',
  CountryCode: '',
  Emp_Contact1: '',
  Emp_Contact2: '1234567890',
  Emp_Grade: 'A',
  Emp_DOB: '1999-03-12',
  Emp_DOJ: convertDateToYMD(new Date()),
  Emp_DOL: convertDateToYMD(addYears(new Date(), 1)),
  Emp_BloodGroup: 'A+',
  Pincode: '000000',
  DepartmentCode: 9,
  DesignationCode: 1,
  ReportingTo: '',
  RegionCode: 4,
  Emp_Description: '',
  IsActive: true,
  tags: [],
};

const QuickEmpAddEdit = forwardRef((props, ref) => {
  /* REDUX */
  const { token } = useSelector((state) => state.auth.session);
  const Username = useSelector((state) => state.auth.session.Username);

  /* STATES */
  const [formikInitData, setFormikInitData] = useState(initialData);
  const [log, setlog] = useState('');

  /* HOOKS */
  const navigate = useNavigate();
  const [message, setMessage] = useTimeOutMessage();
  const { state } = useLocation();

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      let newFormikData = cloneDeep(initialData);
      const Place = await apishowplaceTree();
      const placesArray = [];
      Place.data.forEach((country) => {
        country.children.forEach((state) => {
          state.children.forEach((place) => {
            placesArray.push({
              CountryCode: country.CountryCode,
              StateCode: `${state.StateCode}`,
              PlaceCode: `${place.PlaceCode}`,
              PlaceName: `${place.PlaceName}`,
              value: `${place.PlaceCode}`,
              label: place.PlaceName,
            });
          });
        });
      });
      const Reporting = await apiGetEmployeemasterdrop();
      const reportingToOptions = Reporting.data.map((option) => ({
        value: option.EmployeeCode,
        label: option.Emp_FirstName,
      }));
      // Set defaults if state is not yet available
      newFormikData = {
        ...newFormikData,
        PlaceCode: `${placesArray[0]?.PlaceCode}` || '',
        StateCode: `${placesArray[0]?.StateCode}` || '',
        CountryCode: `${placesArray[0]?.CountryCode}` || '',
        ReportingTo: reportingToOptions[0]?.value || '',
      };
      // If editing, override with editData
      if (state?.editData) {
        newFormikData = {
          ...newFormikData,
          Emp_FirstName: state.editData.Emp_FirstName || '',
          Emp_LastName: state.editData.Emp_LastName || '',
          Emp_Email: state.editData.Emp_Email || '',
          PlaceCode: `${state.editData.PlaceCode || newFormikData.PlaceCode}`,
          StateCode: `${state.editData.StateCode || newFormikData.StateCode}`,
          CountryCode: `${
            state.editData.CountryCode || newFormikData.CountryCode
          }`,
          ReportingTo: state.editData.ReportingTo || newFormikData.ReportingTo,
          EmployeeCode: state.editData.EmployeeCode || '',
          Emp_Image: state.editData.Emp_Image || '',
          Emp_Code: state.editData.Emp_Code || '',
          Emp_Addr1: state.editData.Emp_Addr1 || '',
          Emp_Addr2: state.editData.Emp_Addr2 || 'NA',
          Emp_Contact1: state.editData.Emp_Contact1 || '',
          Emp_Contact2: state.editData.Emp_Contact2 || '1234567890',
          Emp_Grade: state.editData.Emp_Grade || '',
          Emp_DOB: state.editData.Emp_DOB || '',
          Emp_DOJ: state.editData.Emp_DOJ || '',
          Emp_DOL: state.editData.Emp_DOL || '',
          Emp_BloodGroup: state.editData.Emp_BloodGroup || '',
          Pincode: state.editData.Pincode || '',
          DepartmentCode: state.editData.DepartmentCode || '',
          DesignationCode: state.editData.DesignationCode || '',
          RegionCode: state.editData.RegionCode || '',
          Emp_Description: state.editData.Emp_Description || '',
          IsActive: state.editData.IsActive === 0 ? false : true,
        };
      }
      setFormikInitData(newFormikData);
    })();
  }, [state]);

  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <Card
        header={<HeaderExtra />}
        className="h-full flex flex-col"
        bodyClass="grow h-0"
      >
        <Formik
          enableReinitialize={true}
          innerRef={ref}
          initialValues={formikInitData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
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
          {({ touched, errors, isSubmitting }) => (
            <Form className="h-full">
              <FormContainer className="h-full flex flex-col">
                <div className="grow h-0">
                  <QuickUserDetails touched={touched} errors={errors} />
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

QuickEmpAddEdit.defaultProps = {
  type: 'edit',
};

export default QuickEmpAddEdit;
