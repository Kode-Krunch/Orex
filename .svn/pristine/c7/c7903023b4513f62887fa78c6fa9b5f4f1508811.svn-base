import React from 'react';
import { AdaptableCard } from 'components/shared';
import {
  Input,
  FormItem,
  DatePicker,
  Select,
  // FormItem,
} from 'components/ui';
import { Field, useFormikContext } from 'formik';
import { HiCake } from 'react-icons/hi';
import dayjs from 'dayjs';
import {
  showError2,
  validate,
  convertDateToYMD,
  isNumbers,
  isCharAndNum,
  isName,
  isEmail,
} from 'components/validators';
export const categories = [
  { label: 'Bags', value: 'bags' },
  { label: 'Cloths', value: 'cloths' },
  { label: 'Devices', value: 'devices' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Watches', value: 'watches' },
];
export const bloodgroup = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];

const maxDate2 = dayjs(new Date()).add(0, 'day').toDate();

const UserDetails = (props) => {
  const { touched, errors, values } = props;

  // console.log(values);
  let fields = Object.keys(errors);

  if (fields.length) {
    for (let field of fields) {
      showError2(field);
    }
  }
  const { setFieldValue } = useFormikContext();
  return (
    <AdaptableCard className="mb-4" divider>
      <h5>Basic Information</h5>
      {/* <p className="mb-6">Section to config basic product information</p> */}
      <div className="grid grid-cols-2 gap-2">
        {/* <div className="col-span-1"> */}
        <FormItem
          asterisk
          label="First Name"
          invalid={errors.Emp_FirstName && touched.Emp_FirstName}
          errorMessage={errors.Emp_FirstName}
        >
          <Field
            type="text"
            autoComplete="off"
            maxLength="15"
            name="Emp_FirstName"
            placeholder="First Name"
            component={Input}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isName(newValue)) {
                setFieldValue('Emp_FirstName', newValue);
              }
            }}
            size="sm"
          />
        </FormItem>
        <FormItem
          label="Last Name"
          asterisk
          invalid={errors.Emp_LastName && touched.Emp_LastName}
          errorMessage={errors.Emp_LastName}
        >
          <Field
            type="text"
            autoComplete="off"
            maxLength="15"
            name="Emp_LastName"
            placeholder="Last Name"
            component={Input}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isName(newValue)) {
                setFieldValue('Emp_LastName', newValue);
              }
            }}
            size="sm"
          />
        </FormItem>

        <FormItem
          label="Email"
          asterisk
          invalid={errors.Emp_Email && touched.Emp_Email}
          errorMessage={errors.Emp_Email}
        >
          <Field
            type="text"
            autoComplete="off"
            maxLength="45"
            name="Emp_Email"
            placeholder="Email"
            component={Input}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isEmail(newValue)) {
                setFieldValue('Emp_Email', newValue);
              }
            }}
            size="sm"
          />
        </FormItem>

        <FormItem
          asterisk
          label="Contact"
          invalid={errors.Emp_Contact1 && touched.Emp_Contact1}
          errorMessage={errors.Emp_Contact1}
        >
          <Field
            type="text"
            autoComplete="off"
            maxLength="10"
            name="Emp_Contact1"
            placeholder="Contact"
            component={Input}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isNumbers(newValue)) {
                setFieldValue('Emp_Contact1', newValue);
              }
            }}
            size="sm"
          />
        </FormItem>
        {/* </div> */}
        <div className="col-span-1">
          <FormItem
            asterisk
            label="Date Of Birth"
            invalid={errors.Emp_DOB && touched.Emp_DOB}
            errorMessage={errors.Emp_DOB}
          >
            <Field
              name="Emp_DOB"
              inputPrefix={<HiCake className="text-xl" />}
              defaultMonth={dayjs(new Date())
                .subtract(17, 'year')
                .startOf('day')
                .toDate()}
              maxDate={dayjs(new Date())
                .subtract(17, 'year')
                .startOf('day')
                .toDate()}
              value={validate(values.Emp_DOB) ? new Date(values.Emp_DOB) : ''}
              placeholder="Select"
              component={DatePicker}
              onChange={(date) => {
                setFieldValue('Emp_DOB', convertDateToYMD(date));
              }}
              size="sm"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            asterisk
            label="Date Of Joining"
            invalid={errors.Emp_DOJ && touched.Emp_DOJ}
            errorMessage={errors.Emp_DOJ}
          >
            <Field
              name="Emp_DOJ"
              maxDate={maxDate2}
              minDate={dayjs(new Date())
                .subtract(10000, 'day')
                .startOf('day')
                .toDate()}
              value={validate(values.Emp_DOJ) ? new Date(values.Emp_DOJ) : ''}
              placeholder="Select"
              component={DatePicker}
              onChange={(date) => {
                setFieldValue('Emp_DOJ', convertDateToYMD(date));
              }}
              size="sm"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Date Of Leave"
            invalid={errors.Emp_DOL && touched.Emp_DOL}
            errorMessage={errors.Emp_DOL}
          >
            <Field
              name="Emp_DOL"
              minDate={dayjs(new Date(values.Emp_DOJ))
                .subtract(0, 'day')
                .startOf('day')
                .toDate()}
              value={validate(values.Emp_DOL) ? new Date(values.Emp_DOL) : ''}
              placeholder="Select"
              component={DatePicker}
              onChange={(date) => {
                setFieldValue('Emp_DOL', convertDateToYMD(date));
              }}
              size="sm"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Code"
            invalid={errors.Emp_Code && touched.Emp_Code}
            errorMessage={errors.Emp_Code}
          >
            <Field
              name="Emp_Code"
              maxLength="10"
              placeholder="User Code"
              component={Input}
              onChange={(e) => {
                const newValue = e.target.value;
                if (isCharAndNum(newValue)) {
                  setFieldValue('Emp_Code', newValue);
                }
              }}
              size="sm"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            asterisk
            label="Blood Group"
            invalid={errors.Emp_BloodGroup && touched.Emp_BloodGroup}
            Emp_DOB
            errorMessage={errors.Emp_BloodGroup}
          >
            <Field
              name="Emp_BloodGroup"
              maxLength="10"
              placeholder="Select"
              component={Select}
              options={bloodgroup}
              value={bloodgroup.filter(
                (option) => option.value === values.Emp_BloodGroup,
              )}
              onChange={(e) => {
                const newValue = e.value;
                setFieldValue('Emp_BloodGroup', newValue);
              }}
              size="sm"
            />
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default UserDetails;
