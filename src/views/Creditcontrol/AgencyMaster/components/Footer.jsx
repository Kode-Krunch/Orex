import { Button, Tooltip } from 'components/ui';
import { useFormikContext } from 'formik';
import React from 'react';
import { agencyDetailsTooltip, isAgencyDetailsValid } from '../utils';

function Footer({ step, setStep, className }) {
  /* HOOKS */
  const { values, errors, submitForm, validateForm } = useFormikContext();

  /* EVENT HANDLERS */
  const handlePrevClick = () => setStep((prev) => prev - 1);

  const handleNextClick = async () => {
    if (step < 3) setStep((prev) => prev + 1);
    else {
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        submitForm();
      } else {
        console.warn('Form has errors:', errors);
      }
    }
  };

  /* CONSTANTS */
  const IS_SUBMIT_BTN_DISABLED =
    step === 0
      ? !isAgencyDetailsValid(values, errors)
      : step === 1
      ? values.multipleAddresses.length === 0
      : step === 2
      ? values.mappedExecutives.length === 0
      : step === 3
      ? values.mappedClients.length === 0
      : false;

  const NEXT_BTN_TOOLTIP =
    step === 0
      ? agencyDetailsTooltip(values, errors)
      : step === 1
      ? values.multipleAddresses.length === 0
        ? 'Please add atleast one address'
        : false
      : step === 2
      ? values.mappedExecutives.length === 0
        ? 'Please assign atleast one executive'
        : false
      : step === 3
      ? values.mappedClients.length === 0
        ? 'Please assign atleast one client'
        : false
      : false;

  return (
    <div className={`flex justify-end gap-3 ${className}`}>
      <Button type="button" disabled={step === 0} onClick={handlePrevClick}>
        Previous
      </Button>
      {NEXT_BTN_TOOLTIP ? (
        <Tooltip title={NEXT_BTN_TOOLTIP}>
          <Button
            type="button"
            variant="solid"
            disabled={IS_SUBMIT_BTN_DISABLED}
            onClick={handleNextClick}
          >
            {step < 3 ? 'Next' : 'Submit'}
          </Button>
        </Tooltip>
      ) : (
        <Button
          type="button"
          variant="solid"
          disabled={IS_SUBMIT_BTN_DISABLED}
          onClick={handleNextClick}
        >
          {step < 3 ? 'Next' : 'Submit'}
        </Button>
      )}
    </div>
  );
}

export default Footer;
