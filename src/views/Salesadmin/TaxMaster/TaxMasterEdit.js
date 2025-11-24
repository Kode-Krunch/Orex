import {
  FormItemcompact,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
  DatePicker,
  FormItem,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  AddTax,
  UpdateTax,
  apiGetYearMaster,
} from 'services/SalesAdminService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import { apiGetCurrencymasterdrop } from 'services/MasterService';
const validationSchema = Yup.object().shape({
  TaxName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('TaxName Required'),

  TaxPercentage: Yup.string()
    .matches(/^[0-9.]+$/, 'Only numeric characters are allowed')
    .min(1, 'Too Short!')
    .max(2, 'Too Long!')
    .required('TaxPercentage Required'),

  YearCode: Yup.string().required('Year Required'),

  IsActive: Yup.string().required('IsActives Required'),
});
// const dateGap = 30
// const minDate = dayjs(new Date())
//     .subtract(dateGap, 'day')
//     .startOf('day')
//     .toDate()

// const maxDate = dayjs(new Date()).add(dateGap, 'day').toDate()
// const handleInputChange2 = (value, name) => {
//     setFormState((prevFormState) => ({
//         ...prevFormState,
//         [name]: value,
//     }))
// }

const options = [
  { value: 1, label: 'Foo' },
  { value: 1, label: 'Bar' },
];
const TaxMasterEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, seteditData } = props;
  // const FtpSettingEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)
  const [dateVdaid, setdateVdaid] = useState(true);
  const AddTaxr = async (values, token) => {
    // //console.log(values)
    const res = {
      request: {
        TaxName: values.TaxName,
        IsActive: 1,
      },
      yeartax: [
        {
          YearCode: values.YearCode,
          TaxPercentage: values.TaxPercentage,
        },
      ],
    };
    try {
      const resp = await AddTax(res);
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
  const UpdateTaxr = async (values, token) => {
    const res = {
      request: {
        TaxName: values.TaxName,
        IsActive: 1,
      },
      yeartax: [
        {
          YearCode: values.YearCode,
          TaxPercentage: values.TaxPercentage,
        },
      ],
    };
    try {
      const resp = await UpdateTax(res, values.TaxCode);
      //console.log(resp)
      seteditData([]);
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');

        return;
      } else if (resp.data.msg === 'TAX Already Exists') {
        setlog('warning');
        setMessage(resp.data.msg);
        return;
      }
    } catch (errors) {
      return {};
    }
  };
  const [Year, setYear] = useState([]);
  useEffect(() => {
    (async (values) => {
      const Years = await apiGetYearMaster(values);
      const formattedOptions = Years.data.map((option) => ({
        value: option.Yearcode,
        label: option.Description,
      }));
      setYear(formattedOptions);
    })();
  }, []);

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          TaxCode: (editData && editData.TaxCode) || '',
          TaxName: (editData && editData.TaxName) || '',
          YearCode:
            (editData &&
              editData.YeartaxDetail &&
              editData.YeartaxDetail[0]?.YearCode) ||
            '',
          TaxPercentage:
            (editData &&
              editData.YeartaxDetail &&
              editData.YeartaxDetail[0]?.TaxPercentage) ||
            '',
          IsActive: editData && editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.TaxCode) {
              new Promise((resolve, reject) => {
                AddTaxr(values, token)
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
                UpdateTaxr(values, token)
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
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                <div className="col-span-3">
                  <FormItem
                    asterisk
                    label="Year"
                    invalid={errors.YearCode && touched.YearCode}
                    errorMessage={errors.YearCode}
                    style={{ width: '250px' }}
                  >
                    <Field size="sm" name="YearCode" style={{ width: '250px' }}>
                      {({ field, form }) => (
                        <Select
                          style={{ width: '250px' }}
                          field={field}
                          form={form}
                          className="mb-4 w-50"
                          options={Year}
                          value={Year.filter(
                            (option) => option.value == values.YearCode,
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option?.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                <FormItem>
                  <div className="col-span-2 ">
                    <Field
                      size="sm"
                      type="TaxCode"
                      autoComplete="off"
                      name="TaxCode"
                      placeholder="TaxCode"
                      component={Input}
                      hidden
                    />
                    <FormItemcompact
                      asterisk
                      label="Tax Name"
                      invalid={errors.TaxName && touched.TaxName}
                      errorMessage={errors.TaxName}
                    >
                      <Field
                        size="sm"
                        type="TaxName "
                        autoComplete="on"
                        name="TaxName"
                        placeholder="Tax Name"
                        component={Input}
                      />
                    </FormItemcompact>
                  </div>
                </FormItem>
                <FormItem>
                  <div className="col-span-2 ">
                    <Field
                      size="sm"
                      type="TaxCode"
                      autoComplete="off"
                      name="TaxCode"
                      placeholder="TaxCode"
                      component={Input}
                      hidden
                    />
                    <FormItemcompact
                      asterisk
                      label="Tax %"
                      invalid={errors.TaxPercentage && touched.TaxPercentage}
                      errorMessage={errors.TaxPercentage}
                    >
                      <Field
                        size="sm"
                        type="number"
                        autoComplete="on"
                        name="TaxPercentage"
                        placeholder="Tax %"
                        component={Input}
                      />
                    </FormItemcompact>
                  </div>
                </FormItem>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormItemcompact
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field size="sm" name="IsActive" component={Switcher} />
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

export default TaxMasterEdit;
