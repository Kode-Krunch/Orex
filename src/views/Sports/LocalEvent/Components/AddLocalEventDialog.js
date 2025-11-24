import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog, FormContainer, FormItem, Input, Select } from 'components/ui';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { apiPostLocalEventMaster } from 'services/EventServices';

/* Validation Schema */
const validationSchema = Yup.object().shape({
  subGenre: Yup.string().required('Sub Genre is required'),
  localEventName: Yup.string()
    .required('Local Event Name is required')
    .max(50, 'Maximum 50 characters allowed'),
});

function AddLocalEventDialog({
  showDialog,
  setShowDialog,
  subGenreOptions,
  LocationCode,
  ChannelCode,
  token,
  setShowLoader,
  refreshLocalEventList, // 🔹 parent function
}) {
  const [availableSubGenres, setAvailableSubGenres] = useState([]);

  useEffect(() => {
    if (showDialog && Array.isArray(subGenreOptions)) {
      setAvailableSubGenres(subGenreOptions);
    }
  }, [showDialog, subGenreOptions]);

  const onDialogClose = () => {
    setShowDialog(false);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setShowLoader(true);

      const payload = {
        LocationCode,
        ChannelCode,
        SubGenreCode: values.subGenre,
        LocalEventName: values.localEventName,
        IsActive: true,
      };

      const response = await apiPostLocalEventMaster(payload, token);
      const status = response?.status || 200; // handle backend returning direct data
      console.log(status);

      if (status === 200) {
        refreshLocalEventList();
        openNotification('success', 'Local Event added successfully.');
        resetForm();
        onDialogClose();
      } else if (status === 204) {
        openNotification('info', 'Local Event already exists.');
      } else {
        openNotification('danger', `Something went wrong (status: ${status})`);
      }
    } catch (error) {
      console.error('API Error:', error);
      openNotification('danger', 'Error while adding Local Event.');
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <Dialog isOpen={showDialog} onClose={onDialogClose}>
      <h5 className="mb-6">New Local Event</h5>
      <Formik
        initialValues={{
          subGenre: '',
          localEventName: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <FormContainer className="flex flex-col gap-4">
              {/* Local Event Name */}
              <FormItem
                label="Local Event Name"
                invalid={errors.localEventName && touched.localEventName}
                errorMessage={errors.localEventName}
                asterisk
              >
                <Field name="localEventName">
                  {({ field }) => (
                    <Input
                      type="text"
                      autoComplete="off"
                      placeholder="Enter Local Event Name"
                      size="sm"
                      {...field}
                    />
                  )}
                </Field>
              </FormItem>

              {/* Sub Genre Dropdown */}
              <FormItem
                asterisk
                label="Sub Genre"
                invalid={errors.subGenre && touched.subGenre}
                errorMessage={errors.subGenre}
              >
                <Field name="subGenre">
                  {({ field }) => (
                    <Select
                      placeholder="Select Sub Genre"
                      size="sm"
                      options={availableSubGenres}
                      value={availableSubGenres.find(
                        (opt) => opt.value === values.subGenre
                      )}
                      onChange={(option) =>
                        setFieldValue(field.name, option?.value)
                      }
                    />
                  )}
                </Field>
              </FormItem>

              {/* Buttons */}
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
                  disabled={!values.subGenre || !values.localEventName}
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

export default AddLocalEventDialog;
