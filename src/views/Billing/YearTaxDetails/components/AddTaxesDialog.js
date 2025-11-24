import {
  Button,
  Dialog,
  FormContainer,
  FormItemcompact,
  Input,
  Select,
} from 'components/ui';
import { isNumbers } from 'components/validators';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { apiCreateYearTaxDetails } from 'services/BillingService';
import { apiGetTaxMaster } from 'services/SalesAdminService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import * as Yup from 'yup';

/* CONSTANTS */
const validationSchema = Yup.object().shape({
  selectedTaxes: Yup.array().min(1, 'Atleast 1 tax required'),
});

function AddTaxesDialog({
  isAddTaxesDialogOpen,
  setIsAddTaxesDialogOpen,
  clickedYearTaxDetail,
  setClickedYearTaxDetail,
  setYearTaxDetailsFromAPI,
  setShowLoader,
  addTaxesDialogType,
  setAddTaxesDialogType,
  token,
}) {
  /* STATES */
  const [taxOptions, setTaxOptions] = useState([]);
  const [initialValues, setInitialValues] = useState(null);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);
        // Get available taxes
        const response = await apiGetTaxMaster();
        if (response.status === 200) {
          let taxOptions = [];
          response.data.forEach((tax) => {
            if (tax.IsActive === 1) {
              taxOptions.push({ value: tax.TaxCode, label: tax.TaxName });
            }
          });
          setTaxOptions(taxOptions);
        } else if (response.status === 204) {
          setTaxOptions([]);
        } else {
          openNotification(
            'danger',
            `Unable to fetch taxes. Server responded with status code ${response.status}`,
          );
        }
        setShowLoader(false);
      } catch (error) {
        openNotification(
          ('danger', 'Something went wrong while fetching taxes'),
        );
        console.error(error);
        setShowLoader(false);
      }
    })();
  }, []);

  useEffect(() => {
    try {
      if (clickedYearTaxDetail !== null) {
        // set initial values
        let newInitialValues = { selectedTaxes: [] };
        clickedYearTaxDetail.Yeartaxdetails.forEach((tax) => {
          newInitialValues.selectedTaxes.push({
            value: tax.TaxCode,
            label: tax.TaxName,
          });
          newInitialValues[tax.TaxName] = tax.TaxPercentage;
        });
        setInitialValues(newInitialValues);
      } else {
        setInitialValues(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [clickedYearTaxDetail]);

  /* EVENT HANDLERS */
  const handleSelectTaxesChanges = (option, values, form, field) => {
    try {
      if (option.length === 0) {
        clearForm(form);
      } else {
        if (!(option.at(-1).label in values)) {
          form.setFieldValue(option.at(-1).label, '');
          form.setFieldValue(field.name, option);
        } else if (getRemovedTaxField(option, values)) {
          form.setFieldValue(field.name, option);
          form.setFormikState((oldState) => {
            let newState = JSON.parse(JSON.stringify(oldState));
            delete newState.values[getRemovedTaxField(option, values)];
            newState.values[field.name] = option;
            return newState;
          });
        } else {
          form.setFieldValue(field.name, option);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaxInputChange = (event, field, form) => {
    try {
      let totalTax = 0;
      Object.keys(form.values).forEach((key) => {
        if (key !== 'selectedTaxes' && key !== field.name) {
          totalTax = totalTax + form.values[key];
        }
      });
      if (event.target.value === '') {
        form.setFieldValue(field.name, event.target.value);
      } else if (
        isNumbers(event.target.value) &&
        parseInt(event.target.value) > 0 &&
        parseInt(event.target.value) <= 100 - totalTax
      ) {
        form.setFieldValue(field.name, parseInt(event.target.value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setShowLoader(true);
      const data = values.selectedTaxes.map((tax) => {
        return { TaxCode: tax.value, TaxPercentage: values[tax.label] };
      });
      await apiCreateYearTaxDetails(clickedYearTaxDetail.Yearcode, data, token);
      await setYearTaxDetailsFromAPI();
      setShowLoader(false);
      openNotification(
        'success',
        `Year tax details ${
          addTaxesDialogType === 'add' ? 'added' : 'updated'
        } successfully`,
      );
      onDialogClose();
    } catch (error) {
      openNotification('danger', 'Something went wrong');
      console.error(error);
      setShowLoader(false);
    }
  };

  const onDialogClose = () => {
    try {
      setIsAddTaxesDialogOpen(false);
      setClickedYearTaxDetail(null);
      setAddTaxesDialogType(null);
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const getRemovedTaxField = (selectedTaxes, values) => {
    try {
      let removedTaxField = null;
      const valueKeys = Object.keys(values);
      const selectedTaxesLabels = selectedTaxes.map((tax) => tax.label);
      valueKeys.forEach((key) => {
        if (!selectedTaxesLabels.includes(key)) {
          removedTaxField = key;
          return;
        }
      });
      return removedTaxField;
    } catch (error) {
      throw error;
    }
  };

  const isAllFieldsFilled = (values) => {
    try {
      let isFilled = true;
      Object.keys(values).forEach((key) => {
        if (key === 'selectedTaxes') {
          if (values[key].length === 0) isFilled = false;
          return;
        } else {
          if (typeof values[key] != 'number') {
            isFilled = false;
            return;
          }
        }
      });
      return isFilled;
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = (form) => {
    try {
      form.setFormikState((oldState) => {
        let newState = JSON.parse(JSON.stringify(oldState));
        Object.keys(newState.values).forEach((key) => {
          if (key === 'selectedTaxes') {
            newState.values[key] = [];
          } else {
            delete newState.values[key];
          }
        });
        return newState;
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {initialValues && (
        <Dialog
          isOpen={isAddTaxesDialogOpen}
          onClose={onDialogClose}
          onRequestClose={onDialogClose}
          contentClassName="flex flex-col"
        >
          <h5 className="mb-4">Add Taxes</h5>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, touched, errors }) => (
                <Form>
                  <FormContainer className="flex flex-col gap-3 h-[60vh] overflow-auto px-2">
                    <FormItemcompact
                      asterisk
                      label="Taxes"
                      invalid={Boolean(
                        errors.selectedTaxes && touched.selectedTaxes,
                      )}
                      errorMessage={errors.selectedTaxes}
                    >
                      <Field name="selectedTaxes">
                        {({ field, form }) => (
                          <Select
                            isMulti
                            field={field}
                            form={form}
                            placeholder="Select"
                            options={taxOptions}
                            onChange={(option) => {
                              handleSelectTaxesChanges(
                                option,
                                values,
                                form,
                                field,
                              );
                            }}
                            value={values.selectedTaxes}
                            defaultMenuIsOpen
                            className="caret-white mt-1"
                            autoFocus
                            size="sm"
                          />
                        )}
                      </Field>
                    </FormItemcompact>
                    {values.selectedTaxes.map((tax) => (
                      <FormItemcompact
                        asterisk
                        label={tax.label.trim()}
                        invalid={errors.tax && touched.tax}
                        errorMessage={errors.tax}
                      >
                        <Field name={tax.label}>
                          {({ field, form }) => (
                            <Input
                              placeholder={tax.label.trim()}
                              type="number"
                              suffix="%"
                              className="mt-1"
                              size="sm"
                              value={values[tax.label]}
                              onChange={(event) =>
                                handleTaxInputChange(event, field, form)
                              }
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    ))}
                  </FormContainer>
                  <div className="text-right mt-6">
                    <Button
                      className="ltr:mr-2 rtl:ml-2"
                      variant="plain"
                      onClick={onDialogClose}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      disabled={!isAllFieldsFilled(values)}
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default AddTaxesDialog;
