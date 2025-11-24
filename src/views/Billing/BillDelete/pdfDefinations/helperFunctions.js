import {
  FORMATDATE_FOR_EVERY,
  getDateFromDateTime,
} from 'views/Controls/GLOBALFUNACTION';

const getTaxPercentage = (taxes, invoice, taxName) => {
  try {
    return taxes.filter(
      (tax) => tax.TaxName === taxName && tax.BillNumber === invoice.BillNumber,
    )[0];
  } catch (error) {
    throw error;
  }
};

const getTelecastDate = (fromDate, uptoDate) => {
  try {
    return `${FORMATDATE_FOR_EVERY(
      fromDate,
    )}     to    ${FORMATDATE_FOR_EVERY(uptoDate)}`;
  } catch (error) {
    throw error;
  }
};

export { getTaxPercentage, getTelecastDate };
