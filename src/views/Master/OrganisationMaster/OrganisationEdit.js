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
import {
  Postorganisation,
  Putorganisation,
  apiGetCountryMaster,
  apiGetStateMasterbyId,
  apiGetPlaceMasterbyId,
  Postorganisationdetail,
  apiGetentitydropfororg,
  apiorganisationdetailbyid,
} from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import {
  isAddress,
  isChar,
  isCharAndNum,
  isNumbers,
} from 'components/validators';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { IoCreateOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const validationSchema = Yup.object().shape({
  OrganisationName: Yup.string()
    .min(1, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Organisation Name Required'),
  PermAddress: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Permanent Address Required'),
  CorpAddress: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Corporate Address Required'),
  ContactPerson: Yup.string()
    .min(1, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Contact Person Required')
    .matches(/^[a-zA-Z ]+$/, 'Only alphabets are allowed.'),
  PlaceCode: Yup.string().required('City Required'),
  StateCode: Yup.string().required('State Required'),
  CountryCode: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Country Required'),
  Contact: Yup.string()
    .matches(/^[0-9]{10}$/, 'Only 10 digits are allowed.')
    .required('Contact Number is required'),
  PANNO: Yup.string()
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('PANNO Required')
    .matches(panRegex, 'Invalid PANCARD Number Format'),
  ServiceTaxNo: Yup.string()
    .min(1, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Service TaxNo Required'),
  CINNumber: Yup.string()
    .min(1, 'Too Short!')
    .max(17, 'Too Long!')
    .required('CIN Number Required'),

  rememberMe: Yup.bool(),
});

const OrganisationEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, Place, values, ecode } =
    props;
  const nav = useNavigate();
  const token = useSelector((state) => state.auth.session.token);

  const [Country, setCountry] = useState([[]]);
  const [City, setCity] = useState([]);
  const [State, setState] = useState([]);

  const AddOrganisation = async (values, token) => {
    try {
      const Da = EntityDeatils.map((resp) => ({
        OrganisationCode: values.OrganisationCode,
        EntityCode: resp.value,
        IsActive: 1,
      }));
      const resp = await Postorganisation(values, token);
      const resp2 = await Postorganisationdetail(Da, token);
      if (resp.status == 200 && resp2.status === 200) {
        openNotification('success', 'Data Inserted Successfully.');
        return;
      }
      if (resp.status == 204 && resp2.status === 204) {
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
  const EditOrganisation = async (values, token) => {
    try {
      const Da = EntityDeatils.map((resp) => ({
        OrganisationCode: values.OrganisationCode,
        EntityCode: resp.value,
        IsActive: 1,
      }));
      const resp = await Putorganisation(values, token);
      const resp2 = await Postorganisationdetail(Da, token);
      if (resp.status === 200 && resp2.status === 200) {
        openNotification('success', 'Data Updated Successfully');
        return;
      }
      if (resp.status == 204 && resp2.status === 204) {
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
  const [Entity, setEntity] = useState([]);
  const [EntityDeatils, setEntityDeatils] = useState([]);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetentitydropfororg(LoginId);
      console.log(resp.data);
      const EntityBYID = resp.data.map((Entity, index) => ({
        value: Entity.EntityCode,
        label: Entity.EntityName,
      }));
      setEntity(EntityBYID);
    })();
    if (editData.OrganisationCode) {
      (async () => {
        const resp = await apiorganisationdetailbyid(editData.OrganisationCode);
        console.log(resp.data);

        const EntityBYID = resp.data.map((item) => ({
          value: item.Entity.EntityCode,
          label: item.Entity.EntityName,
        }));

        setEntityDeatils(EntityBYID);
      })();
    }

    (async (values) => {
      const Country = await apiGetCountryMaster(values);
      const formattedOptions = Country.data.map((option) => ({
        value: option.CountryCode,
        label: option.CountryName,
      }));
      setCountry(formattedOptions);
    })();
    if (editData?.OrganisationCode) {
      (async (values) => {
        const State = await apiGetStateMasterbyId(
          editData.Country?.CountryCode,
        );
        console.log(State);
        const formattedOptions = State.data.map((option) => ({
          value: option.StateCode,
          label: option.StateName,
        }));
        setState(formattedOptions);
      })();
      (async (values) => {
        const City = await apiGetPlaceMasterbyId(editData.State?.StateCode);
        const formattedOptions = City.data.map((option) => ({
          value: option.PlaceCode,
          label: option.PlaceName,
        }));
        setCity(formattedOptions);
      })();
    }
  }, []);
  const getCountry = async (id) => {
    const State = await apiGetStateMasterbyId(id);
    const formattedOptions = State.data.map((option) => ({
      value: option.StateCode,
      label: option.StateName,
    }));
    setState(formattedOptions);
  };
  const getplace = async (id) => {
    const City = await apiGetPlaceMasterbyId(id);
    const formattedOptions = City.data.map((option) => ({
      value: option.PlaceCode,
      label: option.PlaceName,
    }));
    setCity(formattedOptions);
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          OrganisationCode: editData.OrganisationCode,
          OrganisationName: editData.OrganisationName,
          PermAddress: editData.PermAddress,
          CorpAddress: editData.CorpAddress,
          ContactPerson: editData.ContactPerson,
          CountryCode: editData.Country?.CountryCode || '',
          StateCode: editData.State?.StateCode || '',
          PlaceCode: editData.Place?.PlaceCode || '',
          Contact: editData.Contact,
          PANNO: editData.PANNO || '',
          ServiceTaxNo: editData.ServiceTaxNo,
          CINNumber: editData.CINNumber,
          IsActive: editData.IsActive === 1 ? true : false || true,
          MapEntity: EntityDeatils || [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.OrganisationCode) {
              new Promise((resolve, reject) => {
                AddOrganisation(values, token)
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
                EditOrganisation(values, token)
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
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-2 gap-2">
                <Field
                  size="sm"
                  type="OrganisationCode"
                  autoComplete="off"
                  name="OrganisationCode"
                  placeholder="OrganisationCode"
                  component={Input}
                  hidden
                />

                <FormItemcompact
                  asterisk
                  label="Organisation Name"
                  invalid={errors.OrganisationName && touched.OrganisationName}
                  errorMessage={errors.OrganisationName}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="OrganisationName"
                    value={values.OrganisationName}
                    maxlength="30"
                    placeholder="Organisation Name"
                    component={Input}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isCharAndNum(newValue)) {
                        setFieldValue('OrganisationName', newValue);
                      }
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Contact Person"
                  invalid={errors.ContactPerson && touched.ContactPerson}
                  errorMessage={errors.ContactPerson}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    value={values.ContactPerson}
                    name="ContactPerson"
                    maxlength="10"
                    placeholder="Contact Person"
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isChar(newValue)) {
                        setFieldValue('ContactPerson', newValue);
                      }
                    }}
                    component={Input}
                  />
                </FormItemcompact>

                <div className="col-span-2 ">
                  <FormItemcompact
                    asterisk
                    label="Permanent Address"
                    invalid={errors.PermAddress && touched.PermAddress}
                    errorMessage={errors.PermAddress}
                  >
                    <Field
                      size="sm"
                      type="text"
                      autoComplete="off"
                      maxlength="200"
                      value={values.PermAddress}
                      name="PermAddress"
                      placeholder="Permanent Address"
                      component={Input}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (isAddress(newValue)) {
                          setFieldValue('PermAddress', newValue);
                        }
                      }}
                    />
                  </FormItemcompact>
                </div>
                <div className="col-span-2 ">
                  <FormItemcompact
                    asterisk
                    label="Corporate Address"
                    invalid={errors.CorpAddress && touched.CorpAddress}
                    errorMessage={errors.CorpAddress}
                  >
                    <Field
                      size="sm"
                      type="text"
                      autoComplete="off"
                      name="CorpAddress"
                      value={values.CorpAddress}
                      maxlength="200"
                      placeholder="Corporate Address"
                      component={Input}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (isAddress(newValue)) {
                          setFieldValue('CorpAddress', newValue);
                        }
                      }}
                    />
                  </FormItemcompact>
                </div>

                <FormItemcompact
                  asterisk
                  label="Country"
                  invalid={errors.CountryCode && touched.CountryCode}
                  errorMessage={errors.CountryCode}
                  style={{ width: '250px' }}
                >
                  <Field
                    size="sm"
                    autoComplete="off"
                    name="CountryCode"
                    placeholder="Select"
                    component={Select}
                    options={Country}
                    value={Country.filter(
                      (option) => option.value === values.CountryCode,
                    )}
                    onChange={(e) => {
                      const newValue = e.value;
                      if (isAddress(newValue)) {
                        getCountry(newValue);
                        setFieldValue('CountryCode', newValue);
                      }
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="State"
                  invalid={errors.StateCode && touched.StateCode}
                  errorMessage={errors.StateCode}
                  style={{ width: '250px' }}
                >
                  <Field
                    size="sm"
                    autoComplete="off"
                    name="StateCode"
                    placeholder="Select"
                    component={Select}
                    options={State}
                    value={State.filter(
                      (option) => option.value === values.StateCode,
                    )}
                    onChange={(e) => {
                      const newValue = e.value;
                      if (isAddress(newValue)) {
                        getplace(newValue);
                        setFieldValue('PlaceCode', '');
                        setFieldValue('StateCode', newValue);
                      }
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="City"
                  invalid={errors.PlaceCode && touched.PlaceCode}
                  errorMessage={errors.PlaceCode}
                  style={{ width: '250px' }}
                >
                  <Field
                    size="sm"
                    autoComplete="off"
                    name="PlaceCode"
                    placeholder="Select"
                    component={Select}
                    options={City}
                    value={City.filter(
                      (option) => option.value === values.PlaceCode,
                    )}
                    onChange={(e) => {
                      const newValue = e.value;
                      if (isAddress(newValue)) {
                        setFieldValue('PlaceCode', newValue);
                      }
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Contact Number"
                  invalid={errors.Contact && touched.Contact}
                  errorMessage={errors.Contact}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="Contact"
                    minlength="10"
                    maxlength="10"
                    placeholder="Contact Number"
                    value={values.Contact}
                    component={Input}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isNumbers(newValue)) {
                        setFieldValue('Contact', newValue);
                      }
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="PAN Number"
                  invalid={errors.PANNO && touched.PANNO}
                  errorMessage={errors.PANNO}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    minlength="10"
                    maxlength="10"
                    name="PANNO"
                    placeholder="PAN Number"
                    value={values.PANNO}
                    component={Input}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setFieldValue('PANNO', newValue);
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Tax Number"
                  invalid={errors.ServiceTaxNo && touched.ServiceTaxNo}
                  errorMessage={errors.ServiceTaxNo}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxLength="30"
                    autoComplete="off"
                    name="ServiceTaxNo"
                    value={values.ServiceTaxNo}
                    placeholder="Tax No"
                    component={Input}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isCharAndNum(newValue)) {
                        setFieldValue('ServiceTaxNo', newValue);
                      }
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="CIN Number"
                  invalid={errors.CINNumber && touched.CINNumber}
                  errorMessage={errors.CINNumber}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="CINNumber"
                    maxLength="30"
                    value={values.CINNumber}
                    placeholder="CIN Number"
                    component={Input}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isCharAndNum(newValue)) {
                        setFieldValue('CINNumber', newValue);
                      }
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field size="sm" name="IsActive" component={Switcher} />
                  </div>
                </FormItemcompact>
                <div>
                  <FormItemcompact
                    asterisk
                    label="Map Entity"
                    invalid={errors.MapEntity && touched.MapEntity}
                    errorMessage={errors.MapEntity}
                  >
                    <Field name="MapEntity">
                      {({ field, form }) => (
                        <Select
                          isMulti
                          // componentAs={CreatableSelect}
                          field={field}
                          form={form}
                          options={Entity}
                          value={EntityDeatils}
                          onChange={(option) => {
                            form.setFieldValue(field.name, option);
                            setEntityDeatils(option);
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>
                </div>
                <div className="flex items-end ">
                  <Button
                    size="sm"
                    icon={<IoCreateOutline />}
                    variant="twoTone"
                    onClick={() => nav('/EntityMaster')}
                    type="button"
                  >
                    Create Entity
                  </Button>
                </div>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default OrganisationEdit;
