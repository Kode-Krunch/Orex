import React, { useEffect, useState } from 'react';
import {
  apiCreateInvoiceSeries,
  apiCreateInvoiceSeriesNTC,
} from 'services/BillingService';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  Button,
  Dialog,
  FormContainer,
  FormItem,
  Input,
  Select,
} from 'components/ui';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  billingSeriesRouteTitle,
  ntcBillingSeriesRouteTitle,
} from 'configs/routes.config';

/* CONSTANTS */
const validationSchema = Yup.object().shape({
  channel: Yup.string().required('Channel Required'),
  financialYear: Yup.string().required('Financial Year Required'),
  lastNo: Yup.string()
    .required('Last No Required')
    .max(5, 'Max Number is 99999')
    .matches(/^[0-9]*$/, 'Only Numbers Allowed'),
});

function AddInvoiceSeriesDialog({
  showDialog,
  setShowDialog,
  invoiceSeries,
  setInvoiceSeries,
  financialYears,
  financialYearOptions,
  channel,
  token,
  validateMaxNoLength,
  currentRouteTitle,
  setShowLoader,
}) {
  /* STATES */
  const [fYSelectorOptions, setFYSelectorOptions] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (showDialog && Array.isArray(financialYearOptions)) {
        const options = getFinancialYearOptions();
        if (options.length === 0) {
          openNotification(
            'info',
            'Billing series for all financial years are already added.',
          );
        }
        setFYSelectorOptions(options);
      }
    } catch (error) {
      console.error(error);
    }
  }, [showDialog, financialYearOptions]);

  /* EVENT HANDLERS */
  const handleFormSubmit = async (values) => {
    try {
      setShowLoader(true);
      const data = {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        YearCode: values.financialYear,
        LastNo: values.lastNo,
        IsActive: financialYears.filter(
          (year) => year.Yearcode === values.financialYear,
        )[0].IsActive,
      };
      let response = null;
      if (currentRouteTitle === billingSeriesRouteTitle) {
        response = await apiCreateInvoiceSeries(data, token);
      } else if (currentRouteTitle === ntcBillingSeriesRouteTitle) {
        response = await apiCreateInvoiceSeriesNTC(data, token);
      }
      if (response) {
        if (response.status === 200) {
          if (response.data) {
            setInvoiceSeries([response.data, ...invoiceSeries]);
          }
          openNotification('success', 'Billing series added successfully.');
          onDialogClose();
        } else if (response.status === 204) {
          openNotification(
            'info',
            'Billing series already present for selected Financial Year and Last No.',
          );
        } else {
          openNotification(
            'error',
            `Something went wrong. Server returned with status code: ${response.status}.`,
          );
        }
      } else {
        openNotification('danger', `Something went wrong`);
      }
      setShowLoader(false);
    } catch (error) {
      if (
        'response' in error &&
        'status' in error.response &&
        error.response.status === 404 &&
        'data' in error.response &&
        'detail' in error.response.data &&
        error.response.data.detail === 'Data is Already Exists'
      ) {
        openNotification(
          'danger',
          `Billing series already present for selected financial year.`,
        );
      } else if ('response' in error && 'status' in error.response) {
        openNotification(
          'danger',
          `Something went wrong. Server returned with status code: ${error.response.status}`,
        );
      } else {
        openNotification('danger', 'Something went wrong.');
      }
      setShowLoader(false);
      console.error(error);
    }
  };

  const onDialogClose = (e) => {
    setShowDialog(false);
  };

  /* HELPER FUNCTIONS */
  const getFinancialYearOptions = () => {
    try {
      let options = [];
      const invoiceSeriesYears = invoiceSeries.map(
        (curSeries) => curSeries.YearMaster.Description,
      );
      financialYearOptions.forEach((option) => {
        if (!invoiceSeriesYears.includes(option.label)) {
          options.push(option);
        }
      });
      return options;
    } catch (error) {
      console.error(error);
    }
  };

  const getDateRangeForFinancialYear = (yearCode) => {
    try {
      const financialYear = financialYears.filter(
        (year) => yearCode === year.Yearcode,
      )[0];
      return `${financialYear.StartDate.slice(
        0,
        10,
      )} - ${financialYear.EndDate.slice(0, 10)}`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      isOpen={showDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-6">New Billing Series</h5>
      <Formik
        initialValues={{
          channel: channel.label,
          financialYear: '',
          lastNo: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ touched, errors, values }) => (
          <Form>
            <FormContainer className="flex flex-col gap-4">
              <FormItem
                label="Channel"
                invalid={errors.channel && touched.channel}
                errorMessage={errors.channel}
                asterisk
              >
                <Field
                  type="test"
                  autoComplete="off"
                  name="channel"
                  placeholder="Channel"
                  size="sm"
                  disabled
                  value={values.channel}
                  component={Input}
                />
              </FormItem>
              <FormItem
                asterisk
                label="Financial Year"
                invalid={errors.financialYear && touched.financialYear}
                errorMessage={errors.financialYear}
              >
                <Field name="financialYear">
                  {({ field, form }) => (
                    <>
                      <Select
                        placeholder="Select"
                        size="sm"
                        options={fYSelectorOptions}
                        field={field}
                        form={form}
                        value={fYSelectorOptions.filter(
                          (option) => option.value === values.financialYear,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                      />
                      <p className="mt-2">
                        {values.financialYear &&
                          getDateRangeForFinancialYear(values.financialYear)}
                      </p>
                    </>
                  )}
                </Field>
              </FormItem>
              <FormItem
                label="Last No."
                invalid={errors.lastNo && touched.lastNo}
                errorMessage={errors.lastNo}
                asterisk
              >
                <Field name="lastNo">
                  {({ field, form }) => (
                    <Input
                      type="text"
                      autoComplete="off"
                      placeholder="Last No"
                      size="sm"
                      value={values.lastNo}
                      onChange={(e) => {
                        if (validateMaxNoLength(e.target.value, 5)) {
                          form.setFieldValue('lastNo', e.target.value);
                        }
                      }}
                    />
                  )}
                </Field>
              </FormItem>
              <div className="text-right mt-6">
                <Button
                  className="ltr:mr-2 rtl:ml-2"
                  variant="plain"
                  onClick={onDialogClose}
                >
                  Discard
                </Button>
                <Button
                  variant="solid"
                  type="submit"
                  disabled={
                    !values.channel || !values.financialYear || !values.lastNo
                  }
                >
                  Submit
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default AddInvoiceSeriesDialog;
