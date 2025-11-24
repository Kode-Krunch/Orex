import * as Yup from 'yup';
import {
  BASIC_TEXT_INPUT_REGEX,
  EMAIL_REGEX,
  FAX_NO_REGEX,
  ONLY_ALPHABETS_REGEX,
  PAN_NUMBER_REGEX,
  PHONE_NO_REGEX,
} from './regex';

const formikInitValue = {
  agencyName: '',
  agencyShortName: '',
  agencyDetailsErpCode: '',
  pan: '',
  tan: '',
  barcCode: '',
  creditRateLimit: null,
  businessType: null,
  agencyFlags: [],
  status: true,
  remarks: '',
  mobile: '',
  phone: '',
  fax: '',
  contactPerson: '',
  email: '',
  creditType: null,
  creditDays: '',
  multipleAddresses: [],
  mappedExecutives: [],
  mappedClients: [],
};

const validationSchema = Yup.object().shape({
  // Agency Details
  agencyName: Yup.string()
    .min(3, 'Too short')
    .matches(
      BASIC_TEXT_INPUT_REGEX,
      `Only '-_()' are allowed as special characters`,
    )
    .required('Required'),
  agencyShortName: Yup.string()
    .min(3, 'Too short')
    .matches(
      BASIC_TEXT_INPUT_REGEX,
      `Only '-_()' are allowed as special characters`,
    )
    .required('Required'),
  agencyDetailsErpCode: Yup.string()
    .min(3, 'Too short')
    .matches(
      BASIC_TEXT_INPUT_REGEX,
      `Only '-_()' are allowed as special characters`,
    ),
  pan: Yup.string().matches(PAN_NUMBER_REGEX, 'Invalid PAN Number'),
  tan: Yup.string().matches(PAN_NUMBER_REGEX, 'Invalid TAN Number'),
  barcCode: Yup.string()
    .min(3, 'Too short')
    .matches(
      BASIC_TEXT_INPUT_REGEX,
      `Only '-_()' are allowed as special characters`,
    ),
  // Contact Details
  mobile: Yup.string()
    .matches(PHONE_NO_REGEX, `Invalid Mobile Number`)
    .required('Required'),
  phone: Yup.string().matches(PHONE_NO_REGEX, `Invalid Phone Number`),
  fax: Yup.string().matches(FAX_NO_REGEX, `Invalid FAX Number`),
  contactPerson: Yup.string()
    .min(3, 'Too short')
    .matches(ONLY_ALPHABETS_REGEX, `Invalid Name`)
    .required('Required'),
  email: Yup.string()
    .matches(EMAIL_REGEX, `Invalid Email Address`)
    .required('Required'),
  // Credit Details
  creditDays: Yup.number()
    .max(365, 'Days must be less than or equal to 365')
    .when('creditType', {
      is: 1,
      then: (schema) => schema.required('Required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  mappedExecutives: Yup.array().min(1, 'Please assign atleast one executive'),
  mappedClients: Yup.array().min(1, 'Please assign atleast one client'),
});

export { formikInitValue, validationSchema };
