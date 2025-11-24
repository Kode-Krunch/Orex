import { FormItemcompact, Input, FormContainer, Select } from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  PostEntity,
  PutEntity,
  addEntityMapping,
  apiGetEntityMappingDropByid,
  apishowplaceTree,
} from 'services/MasterService';
import { useSelector } from 'react-redux';
import enity from 'views/UsefullComp/Admin/Enity';
import InputField from 'views/Controls/InputField';
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { apiCallstoreprocedure_WithOutParamEntity } from 'services/DealServices';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const validationSchema = Yup.object().shape({
  entityname: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  PermAddress: Yup.string()
    .min(3, 'Too Short!')
    .max(99, 'Too Long!')
    .required('Required'),
  CorpAddress: Yup.string()
    .min(3, 'Too Short!')
    .max(99, 'Too Long!')
    .required('Required'),
  ContactPerson: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
  Contact: Yup.string()
    .min(10, 'Too Short!')
    .max(10, 'Too Long!')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('Required'),
  StateCode: Yup.string().required('Required'),
  PANNO: Yup.string()
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required')
    .matches(panRegex, 'Invalid PANCARD Number Format'),
  CINNumber: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!'),
});

//const EntityEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const EntityEdit = forwardRef((props, ref) => {
  const toast = useRef(null);
  const show = (detail) => {
    toast.current.show({ severity: 'error', summary: 'error', detail: detail });
  };
  const [Place, setPlace] = useState([]);
  console.log(Place);
  useEffect(() => {
    (async (values) => {
      const Place = await apishowplaceTree(values);

      const newArray = [];

      Place.data.forEach((country) => {
        country.children.forEach((state) => {
          state.children.forEach((place) => {
            newArray.push({
              CountryCode: country.CountryCode,
              StateCode: state.StateCode,
              PlaceCode: place.PlaceCode,
              PlaceName: place.PlaceName,
              value: place.PlaceCode,
              label: place.PlaceName,
            });
          });
        });
      });

      setPlace(newArray);
    })();
  }, []);

  const { onDrawerClose, editData } = props;

  const token = useSelector((state) => state.auth.session.token);
  const Username = useSelector((state) => state.auth.session.Username);
  const [ChannelList, setChannelList] = useState([]);
  const [selectedChannels, setselectedChannels] = useState([]);
  // console.log(selectedChannels);
  console.log('ChannelList', ChannelList);
  console.log('selectedChannels', selectedChannels);
  useEffect(() => {
    (async (values) => {
      const resp = await apiCallstoreprocedure_WithOutParamEntity(
        'GetAvailableLocationChannel',
      );
      console.log(resp.data);
      const channels = resp.data.map((channel) => {
        let res = {};
        res.name = channel.LocationName + '-' + channel.ChannelName;
        res.ChannelCode = channel.ChannelCode;
        // Below fields (label and value) is required by Elstar's <Select/> component
        res.label = channel.LocationName + '-' + channel.ChannelName;
        res.value = channel.LocationCode + '-' + channel.ChannelCode;
        res.LocationCode = channel.LocationCode;
        return res;
      });
      setChannelList(channels);
    })();

    if (editData.EntityCode) {
      (async (values) => {
        const resp = await apiGetEntityMappingDropByid(editData.EntityCode);
        console.log('resp.data', resp.data);
        let data = resp.data.map((row) => ({
          name: row.locations.LocationName + '-' + row.Channel.ChannelName,
          ChannelCode: row.Channel.ChannelCode,
          label: row.locations.LocationName + '-' + row.Channel.ChannelName,
          value: row.locations.LocationCode + '-' + row.Channel.ChannelCode,
          LocationCode: row.locations.LocationCode,
        }));

        setselectedChannels(data);
      })();
    }
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        innerRef={ref}
        initialValues={{
          EntityCode: editData.EntityCode,
          entityname: editData.EntityName,
          CorpAddress: editData.CorpAddress,
          PermAddress: editData.PermAddress,
          ContactPerson: editData.ContactPerson || '',
          Contact: editData.Contact,
          PANNO: editData.PANNO || '',
          CountryCode: editData.Country || '',
          StateCode: editData.State || '',
          PlaceCode: editData.Place || '',
          CINNumber: editData.CINNumber || '',
          IsActive: editData.IsActive === 1 ? true : false || true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          if (!editData.EntityCode) {
            PostEntity(values, token)
              .then((response) => {
                // console.log(response);
                return response;
              })
              .then((response) => {
                if (response.status == 200) {
                  let EntityCode = response.data.EntityCode;
                  let data = selectedChannels.map((row) => ({
                    EntityCode: EntityCode,
                    LocationCode: row.LocationCode,
                    ChannelCode: row.ChannelCode,
                  }));
                  openNotification('success', 'Data Added Sucessfully');
                  onDrawerClose(0, 0);
                  return addEntityMapping(data, token);
                  // console.log('EntityCode', EntityCode); console.log('ticketData', ticketData); console.log(res);
                } else {
                  show('some error occured');
                }
                console.log(response);
                onDrawerClose(0, 0);
                resetForm();
              })
              .catch((error) => {
                openNotification('warning', error.response.data.detail);
                onDrawerClose(0, 0);
                console.log(error);
              });
          } else {
            PutEntity(values, token)
              .then((response) => {
                return response;
              })
              .then((response) => {
                if (response.status == 200) {
                  console.log(selectedChannels);
                  let data = selectedChannels.map((row) => ({
                    EntityCode: editData.EntityCode,
                    LocationCode: row.LocationCode,
                    ChannelCode: row.ChannelCode,
                  }));
                  openNotification('success', 'Data Updated Sucessfully');
                  const rp = addEntityMapping(data, token);
                } else {
                  show('some error occured');
                }
                onDrawerClose(0, 0);
                resetForm();
              })
              .catch((error) => {
                // show(error.responsdata.detail);
                console.log(error);
              });
          }
        }}
      >
        {({ values, touched, errors }) => (
          <Form>
            <FormContainer>
              <Field
                size="sm"
                type="EntityCode"
                autoComplete="off"
                name="EntityCode"
                placeholder="EntityCode name"
                component={Input}
                hidden
              />

              <div className="grid grid-cols-2 md:grid-cols-2 gap-1">
                {enity.map((item, index) => (
                  <InputField
                    lable={item.lable}
                    placeholder={item.placeholder}
                    max={item.max}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    touched={touched}
                    asterisk={item.asterisk}
                    category={item.category}
                    values={values}
                  />
                ))}
                <FormItemcompact
                  asterisk={true}
                  label="City"
                  errorMessage={errors.StateCode}
                  invalid={errors.StateCode && touched.StateCode}
                >
                  <Field size="sm" name="StateCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={Place}
                        value={Place?.filter(
                          (option) => option.value == values.StateCode,
                        )}
                        onChange={(option) => {
                          console.log(option.CountryCode);
                          form.setFieldValue(field.name, option?.value);
                          form.setFieldValue(
                            'CountryCode',
                            option?.CountryCode,
                          );
                          form.setFieldValue('PlaceCode', option?.StateCode);
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <div></div>
                <div className="form-item vertical col-span-2">
                  <FormItemcompact label="Channel Map" asterisk={true}>
                    <Select
                      size="sm"
                      isMulti
                      placeholder="Select"
                      options={ChannelList}
                      value={selectedChannels}
                      onChange={(e) => {
                        console.log('e', e);
                        setselectedChannels(e);
                      }}
                      styles={{
                        valueContainer: (base) => ({
                          ...base,
                          padding: '5px 8px',
                        }),
                        multiValue: (base) => ({
                          ...base,
                          marginRight: '8px',
                          marginBlock: '5px',
                        }),
                        input: (base) => ({
                          ...base,
                          color: 'white',
                        }),
                      }}
                    />
                  </FormItemcompact>
                </div>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default EntityEdit;
