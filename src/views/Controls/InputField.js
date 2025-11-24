import { FormItemcompact, act, Input, Switcher } from 'components/ui';
import {
  isAddress,
  isChar,
  isCharAndNum,
  isCharAndNumforOTTNAME,
} from 'components/validators';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import NumberFormat from 'react-number-format';

const PriceInput = (props) => {
  return (
    <Input {...props} name="Contact" value={props.field.value} prefix="" />
  );
};
const NumberFormatInput = ({ onValueChange, ...rest }) => {
  return (
    <NumberFormat
      customInput={Input}
      type="text"
      onValueChange={onValueChange}
      autoComplete="off"
      {...rest}
    />
  );
};
const withValueCap = (inputObj) => {
  const MAX_VAL = 9999999999;
  const { value } = inputObj;
  if (value <= MAX_VAL) return true;
  return false;
};
const InputField = ({
  lable,
  placeholder,
  name,
  type,
  errors,
  touched,
  asterisk,
  max,
  category,
  values,
}) => {
  // console.log(values);
  const { setFieldValue } = useFormikContext();
  return (
    <>
      {category == 'text' ? (
        <FormItemcompact
          asterisk={asterisk}
          label={lable}
          errorMessage={errors[name]}
          invalid={errors[name] && touched[name]}
        >
          <Field
            size="sm"
            type={type}
            autoComplete="off"
            name={name}
            placeholder={placeholder}
            component={Input}
            value={values[name]}
            maxLength={max}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isCharAndNumforOTTNAME(newValue)) {
                setFieldValue(name, newValue);
              }
            }}
          />
        </FormItemcompact>
      ) : category == 'Address' ? (
        <FormItemcompact
          asterisk={asterisk}
          label={lable}
          errorMessage={errors[name]}
          invalid={errors[name] && touched[name]}
        >
          <Field
            size="sm"
            type={type}
            autoComplete="off"
            name={name}
            placeholder={placeholder}
            component={Input}
            value={values[name]}
            maxLength={max}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isAddress(newValue)) {
                setFieldValue(name, newValue);
              }
            }}
          />
        </FormItemcompact>
      ) : category == 'Status' ? (
        <FormItemcompact
          asterisk={asterisk}
          label={lable}
          invalid={errors[name] && touched[name]}
          errorMessage={errors[name]}
        >
          <Field size="sm" name={name} component={Switcher} />
        </FormItemcompact>
      ) : category == 'number' ? (
        <FormItemcompact
          asterisk
          label={lable}
          invalid={errors[name] && touched[name]}
          errorMessage={errors[name]}
        >
          <Field name={name} component={Input} size="sm">
            {({ field, form }) => {
              return (
                <NumberFormatInput
                  focused
                  size="sm"
                  form={form}
                  field={field}
                  name={name}
                  placeholder={placeholder}
                  customInput={PriceInput}
                  isAllowed={withValueCap}
                  onValueChange={(e) => {
                    const maxLength = 10;
                    const newValue = e.value
                      .replace(/[^0-9]/g, '')
                      .slice(0, maxLength);
                    form.setFieldValue(field.name, newValue);
                  }}
                />
              );
            }}
          </Field>
        </FormItemcompact>
      ) : category == 'pan' ? (
        <FormItemcompact
          label={lable}
          asterisk
          invalid={errors[name] && touched[name]}
          errorMessage={errors[name]}
        >
          <Field
            size="sm"
            type={type}
            autoComplete="off"
            name={name}
            placeholder={lable}
            value={values.PANNO}
            maxLength={max}
            component={Input}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isCharAndNum(newValue)) {
                setFieldValue(name, newValue);
              }
            }}
          />
        </FormItemcompact>
      ) : category == 'ContactPerson' ? (
        <FormItemcompact
          label={lable}
          invalid={errors[name] && touched[name]}
          errorMessage={errors[name]}
        >
          <Field name={name}>
            {({ field, form }) => {
              return (
                <Input
                  focused
                  size="sm"
                  form={form}
                  field={field}
                  name={name}
                  placeholder={placeholder}
                  onChange={(e) => {
                    const newValue = e.target.value;

                    if (/^[a-zA-Z ]+$/.test(newValue)) {
                      console.log(newValue);
                      form.setFieldValue(field.name, newValue);
                    }
                    if (newValue == '') {
                      form.setFieldValue(field.name, '');
                    }
                  }}
                />
              );
            }}
          </Field>
        </FormItemcompact>
      ) : null}
    </>
  );
};

export default InputField;
