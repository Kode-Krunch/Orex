import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
  Badge,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postfpcorgrep, Putfpcorgrep } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useState } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import classNames from 'classnames';
import { components } from 'react-select';
import { HiCheck } from 'react-icons/hi';

const { Control } = components;
const colorList = [
  { label: 'Red', value: 'red' },
  { label: 'Orange', value: 'orange' },
  { label: 'Amber', value: 'amber' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Lime', value: 'lime' },
  { label: 'Green', value: 'green' },
  { label: 'Emerald', value: 'emerald' },
  { label: 'Teal', value: 'teal' },
  { label: 'Cyan', value: 'cyan' },
  { label: 'Sky', value: 'sky' },
  { label: 'Blue', value: 'blue' },
  { label: 'Indigo', value: 'indigo' },
  { label: 'Violet', value: 'violet' },
  { label: 'Purple', value: 'purple' },
  { label: 'Fuchsia', value: 'fuchsia' },
  { label: 'Pink', value: 'pink' },
  { label: 'Rose', value: 'rose' },
];

const colorLevelList = [
  { label: '100', value: 100 },
  { label: '200', value: 200 },
  { label: '300', value: 300 },
  { label: '400', value: 400 },
  { label: '500', value: 500 },
  { label: '600', value: 600 },
  { label: '700', value: 700 },
  { label: '800', value: 800 },
  { label: '900', value: 900 },
];
const validationSchema = Yup.object().shape({
  OriginalRepeatName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('OriginalRepeatName Required'),
  ShortName: Yup.string()
    .min(3, 'Too Short!')
    .max(10, 'Too Long!')
    .required('ShortName Required'),
  NewColourCode: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Color code Required'),

  //IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
//const OriginalRepeatEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const OriginalRepeatEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const token = useSelector((state) => state.auth.session.token);
  const [colorname, setcolorname] = useState(
    editData.NewColourCode ? editData.NewColourCode?.split('-')[0] : '',
  );
  const [colorOp, setcolorop] = useState(
    editData.NewColourCode
      ? editData.NewColourCode?.split('-')[
          editData.NewColourCode?.split('-').length - 1
        ]
      : '',
  );
  const onThemeColorChange = ({ value }) => {
    setcolorname(value);
  };

  const onThemeColorLevelChange = ({ value }) => {
    setcolorop(value);
  };
  const Addfpcorgrep = async (values, token) => {
    try {
      const resp = await Postfpcorgrep(values, token, colorname, colorOp);

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
  const Editfpcorgrep = async (values, token) => {
    try {
      const resp = await Putfpcorgrep(values, token, colorname, colorOp);
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
  const ColorBadge = ({ className, themeColor }) => {
    return (
      <Badge
        className={className}
        innerClass={classNames(`bg-${themeColor}-${colorOp}`)}
      />
    );
  };

  const CustomSelectOption = ({ innerProps, label, value, isSelected }) => {
    return (
      <div
        className={`flex items-center justify-between p-2 ${
          isSelected
            ? 'bg-gray-100 dark:bg-gray-500'
            : 'hover:bg-gray-50 dark:hover:bg-gray-600'
        }`}
        {...innerProps}
      >
        <div className="flex items-center gap-2">
          <ColorBadge themeColor={value} />
          <span>{label}</span>
        </div>
        {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
      </div>
    );
  };

  const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0];

    return (
      <Control {...props}>
        {selected && (
          <ColorBadge themeColor={colorname} className="ltr:ml-4 rtl:mr-4" />
        )}
        {children}
      </Control>
    );
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          OriginalRepeatCode: editData.OriginalRepeatCode || '',
          OriginalRepeatName: editData.OriginalRepeatName || '',
          ShortName: editData.ShortName || '',
          NewColourCode: editData.NewColourCode || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          if (colorname && colorOp) {
            setTimeout(() => {
              if (!editData.OriginalRepeatCode) {
                new Promise((resolve, reject) => {
                  Addfpcorgrep(values, token)
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
                  Editfpcorgrep(values, token)
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
          } else {
            // alert('h');
          }
        }}
      >
        {({ values, touched, errors }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-2 gap-2">
                <Field
                  type="OriginalRepeatCode"
                  autoComplete="off"
                  name="OriginalRepeatCode"
                  placeholder="OriginalRepeatCode"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="OriginalRepeat Name"
                  invalid={
                    errors.OriginalRepeatName && touched.OriginalRepeatName
                  }
                  errorMessage={errors.OriginalRepeatName}
                >
                  <Field
                    type="OriginalRepeatName"
                    autoComplete="off"
                    name="OriginalRepeatName"
                    placeholder="OriginalRepeat Name"
                    disabled
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  asterisk
                  label="Short Name"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    type="ShortName"
                    autoComplete="off"
                    name="ShortName"
                    placeholder="Short Name"
                    disabled
                    component={Input}
                  />
                </FormItem>
                <div className="col-span-2">
                  <FormItem
                    asterisk
                    label="Colour"
                    invalid={errors.NewColourCode && touched.NewColourCode}
                    errorMessage={errors.NewColourCode}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        size="sm"
                        placeholder="Select Color"
                        options={colorList}
                        components={{
                          Option: CustomSelectOption,
                          Control: CustomControl,
                        }}
                        value={colorList.filter(
                          (color) => color.value === colorname,
                        )}
                        onChange={onThemeColorChange}
                      />
                      <Select
                        size="sm"
                        placeholder="Select Darkness"
                        options={colorLevelList}
                        value={colorLevelList.filter(
                          (color) => color.value == colorOp,
                        )}
                        onChange={onThemeColorLevelChange}
                      />
                    </div>
                    <div
                      className={'bg-' + colorname + '-' + colorOp}
                      style={{ marginTop: 10, height: '10px', width: '50%' }}
                    ></div>
                  </FormItem>
                </div>
              </div>
              <div>
                <FormItem
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
                  </div>
                </FormItem>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default OriginalRepeatEdit;
