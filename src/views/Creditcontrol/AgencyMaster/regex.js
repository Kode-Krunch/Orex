const BASIC_TEXT_INPUT_REGEX = /^[A-Za-z0-9_\-,(). ]*$/;
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]*$/;
const PAN_NUMBER_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const GST_NUMBER_REGEX = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
const PHONE_NO_REGEX = /^\+?[0-9]*$/;
const FAX_NO_REGEX = /^\+?[0-9\- ]*$/;
const ONLY_ALPHABETS_REGEX = /^[A-Za-z ]*$/;
const ONLY_NUMBERS_REGEX = /^[0-9]*$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export {
  BASIC_TEXT_INPUT_REGEX,
  ALPHANUMERIC_REGEX,
  PAN_NUMBER_REGEX,
  GST_NUMBER_REGEX,
  PHONE_NO_REGEX,
  FAX_NO_REGEX,
  ONLY_ALPHABETS_REGEX,
  ONLY_NUMBERS_REGEX,
  EMAIL_REGEX,
};
