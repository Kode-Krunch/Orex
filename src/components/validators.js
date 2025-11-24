import { apigetpincode } from 'services/MasterService';
import appConfig from 'configs/app.config';

const CLIENT_NAME_REGEX = appConfig.validation.clientNameRegex;
const GST_NO_REGEX = appConfig.validation.gstNoRegex;
const ALPHA_NUMERIC_UPPER_REGEX =
  appConfig.validation.alphaNumericUpperRegexWithoutSpaces;
const ALPHA_NUMERIC_REGEX = appConfig.validation.alphaNumericRegexWithSpace;

export const validate = (field) => {
  if (field != null) {
    return !(
      field === '' ||
      Object.is(field, null) ||
      Object.is(field, undefined)
    );
  }
};

export const validateInput = (value, inputField) => {
  try {
    if (inputField === 'ClientName') {
      if (CLIENT_NAME_REGEX.test(value)) {
        return true;
      } else return false;
    } else if (inputField === 'GST') {
      if (value.length === 15) {
        if (GST_NO_REGEX.test(value)) {
          return true;
        }
      } else if (value.length < 15) {
        if (ALPHA_NUMERIC_UPPER_REGEX.test(value)) {
          if (value.length > 0) {
            return true;
          }
        }
      }
      return false;
    } else if (inputField === 'GlobalSearch') {
      if (ALPHA_NUMERIC_REGEX.test(value)) {
        return true;
      }
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const validateFields = (client) => {
  const requiredFields = [
    'ClientName',
    'ClientShortName',
    'CreditRateCode',
    'MainAddress1',
    'CountryCode',
    'StateCode',
    'PlaceCode',
    'ERPCODE',
  ];
  const invalidFields = requiredFields.filter(
    (fieldName) => !client[fieldName],
  );
  return invalidFields.length > 0 ? invalidFields : null;
};

export const validateFieldsAgency = (client) => {
  const requiredFields = [
    'AgencyName',
    'AgencyShortName',
    'CreditRateCode',
    'BusinessTypeCode',
    'CountryCode',
    'StateCode',
    'PlaceCode',
    'PinCode',
  ];
  const invalidFields = requiredFields.filter(
    (fieldName) => !client[fieldName],
  );
  return invalidFields.length > 0 ? invalidFields : null;
};

export const validateCustomFields = (client, fields) => {
  const invalidFields = fields.filter((fieldName) => !client[fieldName]);
  return invalidFields.length > 0 ? invalidFields : null;
};

export const showError = (fieldname) =>
  setTimeout(() => {
    if (document.getElementById(fieldname)) {
      document.getElementById(
        fieldname,
      ).parentElement.parentElement.parentElement.style.marginBottom = '1.5rem';
    }
  }, 30);
export const showError2 = (fieldname, marginBottom = '1.5rem') =>
  setTimeout(() => {
    if (document.getElementsByName(fieldname)) {
      let field = document.getElementsByName(fieldname)[0];
      if (!Object.is(field, undefined)) {
        field.parentElement.parentElement.parentElement.style.marginBottom =
          marginBottom;
      }
    }
  }, 30);
export const removeError = (fieldname) =>
  setTimeout(() => {
    if (document.getElementById(fieldname)) {
      document.getElementById(
        fieldname,
      ).parentElement.parentElement.parentElement.style.marginBottom = '0';
    }
  }, 30);

export const validatePINCODE = (
  field,
  countrys,
  states,
  citys,
  setSelectedNodeKey,
) => {
  if (!field.length) return;
  apigetpincode(field)
    .then((response) => response.data)

    .then((data) => {
      if (data.Status === 'Success') {
        const firstRow = data.PostOffice[0];
        if (citys.indexOf(firstRow.Taluk) != '-1')
          setSelectedNodeKey(
            countrys.indexOf(firstRow.Country) +
            '-' +
            states.indexOf(firstRow.State) +
            '-' +
            citys.indexOf(firstRow.Taluk),
          );
      } else {
        console.error('API error:', data.Message);
      }
    })
    .catch((error) => {
      console.error('API fetch error:', error);
    });
};

export function validatePAN(panNumber) {
  // Regular expression for PAN number format
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  // Check if the PAN number matches the regular expression
  if (!panRegex.test(panNumber)) {
    return false;
  }

  // Calculate the checksum using the formula
  // const checksum = calculateChecksum(panNumber);

  // // Check if the calculated checksum matches the last digit of the PAN number
  // if (checksum !== panNumber.charAt(panNumber.length - 1)) {
  //   return false;
  // }

  // If all checks pass, the PAN number is valid
  return true;
}

// Function to calculate the checksum for a PAN number
function calculateChecksum(panNumber) {
  const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let checksum = 0;

  for (let i = 0; i < panNumber.length; i++) {
    checksum += parseInt(panNumber.charAt(i)) * weights[i];
  }

  checksum = checksum % 11;
  if (checksum === 0) {
    return 'X';
  } else {
    return checksum;
  }
}

export function formatNumberToIndianSystem(value) {
  if (value == null || value === '' || value === undefined) return '';
  if (value >= 10000000) {
    // Convert to crores if value is 10 million or more
    return (value / 10000000).toFixed(2) + ' Cr';
  } else if (value >= 100000) {
    // Convert to lakhs if value is 1 lakh or more
    return (value / 100000).toFixed(2) + ' Lakh';
  } else {
    // Return as is if less than 1 lakh
    return value.toString();
  }
}

export const generateTimeArray = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute++) {
      const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(
        2,
        '0',
      )}:00`;
      const period = hour < 12 ? 'am' : 'pm';
      const hour12 = hour % 12 || 12;
      const label = `${hour12}:${String(minute).padStart(2, '0')}${period}`;
      times.push({ label: label, value: value });
    }
  }
  return times;
};
export function convertDateToYMD(date) {
  if (date != null) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1 to get the correct month number
    const day = date.getDate();

    // Pad the month and day with leading zeros if necessary

    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');

    // Combine the year, month, and day into the YMD format
    const ymd = `${year}-${paddedMonth}-${paddedDay}`;
    return ymd;
  }
}
export function convertDateToDMY(date) {
  if (date != null) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1 to get the correct month number
    const day = date.getDate();

    // Pad the month and day with leading zeros if necessary

    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');

    // Combine the year, month, and day into the YMD format
    const ymd = `${paddedDay}-${paddedMonth}-${year}`;
    return ymd;
  }
}
export function convertDateToYMDStr(dateString) {
  if (dateString != null) {
    // Split the date string into day, month, and year parts
    const parts = dateString.split(' ');
    const day = parseInt(parts[0]);
    const monthAbbreviation = parts[1];
    const year = parseInt(parts[2]);

    // Convert month abbreviation to month number
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames.indexOf(monthAbbreviation) + 1;

    // Pad the month and day with leading zeros if necessary
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');

    // Combine the year, month, and day into the YMD format
    const ymd = `${year}-${paddedMonth}-${paddedDay}`;
    return ymd;
  }
}

export function convertDateToDMSTRIY(dateString) {
  const dateObject = new Date(dateString);

  // Array of month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Extract day, month, and year
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = monthNames[dateObject.getMonth()]; // Use month names array
  const year = dateObject.getFullYear();

  // Construct the formatted date string in "dd-mm-yyyy" format with month as a string
  const formattedDate = `${day}-${month}-${year}`;
  const gd = [{ day: day, month: month, year: year }];
  return gd;
}

export function validateAddress(address, length) {
  const regex = /^[a-zA-Z0-9\.\s\,\-\/]+$/;
  const validAddress = regex.test(address);
  const maxLength = length;
  const addressLengthValid = address.length <= maxLength;

  if (!validAddress || !addressLengthValid) {
    const errorMessage = validAddress
      ? `Maximum address length is ${maxLength} characters`
      : `Address contains invalid characters`;
    return { isValid: false, errorMessage: errorMessage };
  }

  return { isValid: true };
}

export const Validate = (value, name) => {
  if (value === '' || Object.is(value, null) || Object.is(value, undefined)) {
    return { isValid: false, errorMessage: `${name} is required` };
  }
  return { isValid: true };
};

export function isArrayEqual(arr1, arr2) {
  // Check if both arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Compare each element of the arrays
  for (let i = 0; i < arr1.length; i++) {
    // Convert objects to JSON strings for easy comparison
    const obj1 = JSON.stringify(arr1[i]);
    const obj2 = JSON.stringify(arr2[i]);

    // If any element is different, return false
    if (obj1 !== obj2) {
      return false;
    }
  }

  // If all elements are the same, return true
  return true;
}
export function transformData(data, page) {
  const eventColor =
    page === 'commercialScheduling'
      ? 'yellow300'
      : page === 'songScheduling'
        ? 'pink'
        : page === 'promoScheduling'
          ? 'sky'
          : 'teal';
  return data
    .filter((item) => item.TotalScheduled > 0)
    .map((item, index) => ({
      id: String(index), // Convert index to string for "id"
      title: `Total Scheduled ${item.EventSchdule}`,
      //title: `Total Scheduled ${item.PromoSchdule}`,
      start: item.TelecastDate.split('T')[0], // Extract date part
      eventColor: eventColor,
    }));
}
export function transformDataAsrun(data, page) {

  const eventColor =
    page === 'commercialScheduling'
      ? 'yellow300'
      : page === 'songScheduling'
        ? 'pink'
        : page === 'promoScheduling'
          ? 'sky'
          : 'teal';
  return data
    .filter((item) => item.TelecastSpots > 0)
    .map((item, index) => ({
      id: String(index), // Convert index to string for "id"
      title: `Total Scheduled ${item.EventSchdule}`,
      //title: `Total Scheduled ${item.PromoSchdule}`,
      start: item.TelecastDate.split('T')[0], // Extract date part
      eventColor: eventColor,
    }));
}
export function Finalog(data, IsChannelwise) {
  const resp = data
    .map((item, index) => {
      if (item.FieldValue === null || item.FieldValue === 0) {
        return null;
      }

      let transformedItem = {};

      switch (
      item.FieldType // Assuming FieldType is a property of item
      ) {
        case 'Content':
          transformedItem = {
            id: String(index),
            title: IsChannelwise ? `Template- ${item.FieldValue}` : `Content- ${item.FieldValue}`,
            start: item.TelecastDate.split('T')[0], // Extract date part
            eventColor: 'teal',
          };
          break;
        case 'Promo':
          transformedItem = {
            id: String(index), // Convert index to string for "id"
            title: IsChannelwise ? `Content- ${item.FieldValue}` : `Promo- ${item.FieldValue}`,
            start: item.TelecastDate.split('T')[0], // Extract date part
            eventColor: 'sky',
          };
          break;
        case 'Commercial':
          transformedItem = {
            id: String(index), // Convert index to string for "id"
            title: `Commercial- ${item.FieldValue}`,
            start: item.TelecastDate.split('T')[0], // Extract date part
            eventColor: 'yellow300',
          };
          break;
        case 'Songs':
          transformedItem = {
            id: String(index), // Convert index to string for "id"
            title: `Songs- ${item.FieldValue}`,
            start: item.TelecastDate.split('T')[0], // Extract date part
            eventColor: 'pink',
          };
          break;
        default:
          break;
      }

      return transformedItem;
    })

    .filter((item) => item !== null);

  return resp;
}
export function ARUN(data) {
  const data1 = [];
  data
    .filter((curData) => curData.SchduleSpots > 0)
    .forEach((item, index) => {
      data1.push({
        id: String(index), // Convert index to string for "id"
        title: ` ${'Telecasted - ' + item.TelecastSpots}`,
        start: item.TelecastDate.split('T')[0], // Extract date part
        eventColor: 'emerald',
      });
      data1.push({
        id: String(index), // Convert index to string for "id"
        title: ` ${'Not Telecasted - ' + item.NotTelecastSpots}`,
        start: item.TelecastDate.split('T')[0], // Extract date part
        eventColor: 'rose',
      });
    });
  return data1;
}
export function FPC(data) {
  const resp = data
    .map((item, index) => {
      if (item.FieldValue === null || item.FieldValue === 0) {
        return null;
      }

      let transformedItem = {};

      switch (
      item.FieldType // Assuming FieldType is a property of item
      ) {
        case 'Total Counts':
          transformedItem = {
            id: String(index),
            title: `Total Counts - ${item.FieldValue}`,
            start: item.TelecastDate, // Extract date part
            eventColor: 'teal',
          };
          break;
        case 'REP':
          transformedItem = {
            id: String(index), // Convert index to string for "id"
            title: `Repeat - ${item.FieldValue}`,
            start: item.TelecastDate, // Extract date part
            eventColor: 'sky',
          };
          break;
        case 'ORG':
          transformedItem = {
            id: String(index),
            title: `Original - ${item.FieldValue}`,
            start: item.TelecastDate,
            eventColor: 'green',
          };
          break;
        case 'LIVE':
          transformedItem = {
            id: String(index), // Convert index to string for "id"
            title: `Live - ${item.FieldValue}`,
            start: item.TelecastDate, // Extract date part
            eventColor: 'yellow300',
          };
          break;
        case 'EPISODIC':
          transformedItem = {
            id: String(index), // Convert index to string for "id"
            title: `Episodic - ${item.FieldValue}`,
            start: item.TelecastDate, // Extract date part
            eventColor: 'pink',
          };
          break;
        case 'NONEPISODIC':
          transformedItem = {
            id: String(index),
            title: `Non Episodic - ${item.FieldValue}`,
            start: item.TelecastDate,
            eventColor: 'fuchsia',
          };
          break;
        default:
          break;
      }

      return transformedItem;
    })

    .filter((item) => item !== null);

  return resp;
}

const getRandomChar = (characters) =>
  characters[Math.floor(Math.random() * characters.length)];

const shuffleString = (string) =>
  string
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

export function generatePassword(employee) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+';

  // Generate a random password combining all necessary characters
  let password = '';
  password += getRandomChar(uppercaseChars);
  password += getRandomChar(lowercaseChars);
  password += getRandomChar(numbers);
  password += getRandomChar(symbols);

  // Add characters from employee properties
  password += employee.Emp_FirstName.charAt(0).toUpperCase();
  password += employee.Emp_LastName.charAt(0).toUpperCase();
  password += employee.Emp_Code.toString().slice(-2);

  // Fill the rest of the password with random characters
  const remainingLength = 12 - password.length;
  for (let i = 0; i < remainingLength; i++) {
    const charSet = uppercaseChars + lowercaseChars + numbers + symbols;
    password += getRandomChar(charSet);
  }

  // Shuffle the generated password
  password = shuffleString(password);

  return password;
}

export function isNumeric(value) {
  return /^\d+$/.test(value);
}

export function isSymbols(value) {
  // Check if the first character is a space
  if (value[0] === ' ') {
    return false;
  }
  // Check if the value contains only letters and spaces
  return /^[£$€¥₹₩रू]*$/.test(value);
}
export function isChar(value) {
  // Check if the first character is a space
  if (value[0] === ' ') {
    return false;
  }
  // Check if the value contains only letters and spaces
  return /^[a-zA-Z\s]*$/.test(value);
}
export function isCharAndComa(value) {
  // Check if the first character is a space
  if (value[0] === ' ') {
    return false;
  }
  // Check if the value contains only letters and spaces
  return /^[a-zA-Z\s,]*$/.test(value);
}
export function isCharSong(value) {
  // Check if the first character is a space
  if (value[0] === ' ') {
    return false;
  }
  // Check if the value contains only letters and spaces
  return /^[0-9a-zA-Z()&-\s]*$/.test(value);
}
export function isName(value) {
  // Check if the first character is a space
  if (value[0] === ' ') {
    return false;
  }
  // Check if the value contains only letters and spaces
  return /^[a-zA-Z]*$/.test(value);
}

export function isInitial(value) {
  // Check if the first character is a space
  if (value[0] === ' ') {
    return false;
  }
  // Check if the value contains only letters and spaces
  return /^[a-z A-Z0-9]*$/.test(value);
}
export function isEmail(value) {
  // Check if the first character is a space
  if (value[0] === ' ') {
    return false;
  }
  // Check if the value contains only letters and spaces
  return /^[0-9a-zA-Z@.]*$/.test(value);
}
export function isAddress(value) {
  // Check if the first character is a space
  if (value[0] === ' ' || value[0] === '/' || value[0] === '-') {
    return false;
  }
  // Check if the value contains only letters and spaces
  return /^[0-9a-zA-Z-/\,.()\s]*$/.test(value);
}
export function isCharAndNum(value) {
  if (value[0] === ' ') {
    return false;
  }
  return /^[0-9a-zA-Z\s]*$/.test(value);
}
export function isCharAndNumRef(value) {
  if (value[0] === ' ') {
    return false;
  }
  return /^[0-9a-zA-Z]*$/.test(value);
}
export function isCharAndNumforOTTNAME(value) {
  if (value[0] === ' ') {
    return false;
  }
  return /^[0-9a-zA-Z\s&+#@]*$/.test(value);
}
export function isNumbers(value) {
  return /^[0-9]*$/.test(value);
}
export function isNumbersBooking(value) {
  if (value[0] === ' ') {
    return false;
  }
  return /^[0-9]*$/.test(value);
}
export function isPin(value) {
  return /^[1-9][0-9]{5}$/.test(value);
}

export function isPAN(value) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
}
