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
  clientName: '',
  clientShortName: '',
  clientDetailsErpCode: '',
  pan: '',
  tan: '',
  barcCode: '',
  creditRateLimit: null,
  clientFlags: [],
  status: true,
  remarks: '',
  mobile: '',
  phone: '',
  fax: '',
  contactPerson: '',
  email: '',
  multipleAddresses: [],
  mappedExecutives: [],
};

const validationSchema = Yup.object().shape({
  // Client Details
  clientName: Yup.string()
    .min(3, 'Too short')
    .matches(
      BASIC_TEXT_INPUT_REGEX,
      `Only '-_()' are allowed as special characters`,
    )
    .required('Required'),
  clientShortName: Yup.string()
    .min(3, 'Too short')
    .matches(
      BASIC_TEXT_INPUT_REGEX,
      `Only '-_()' are allowed as special characters`,
    )
    .required('Required'),
  clientDetailsErpCode: Yup.string()
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
  mappedExecutives: Yup.array().min(1, 'Please assign atleast one executive'),
});

export { formikInitValue, validationSchema };
