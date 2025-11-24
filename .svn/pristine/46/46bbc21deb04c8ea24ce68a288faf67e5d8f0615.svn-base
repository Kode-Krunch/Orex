import React, { useEffect, useState } from 'react';
import { AdaptableCard } from 'components/shared';
import { Input, FormItem, Select } from 'components/ui';
import { Field, useFormikContext } from 'formik';
import { apiGetRegionMaster, apishowplaceTree } from 'services/MasterService';
import { isAddress, isNumbers } from 'components/validators';

const ContactDetail = (props) => {
  const {
    touched,
    errors,
    values,
    ecode,
    selectedNodeKey,
    setSelectedNodeKey,
  } = props;
  // console.log(values);
  const EmpDemo = [{ value: '', label: 'Data Not Found' }];
  const [Region, setRegion] = useState([]);
  const [Place, setPlace] = useState([]);
  console.log(selectedNodeKey);

  useEffect(() => {
    (async (values) => {
      const Region = await apiGetRegionMaster(values);
      const formattedOptions = Region.data.map((option) => ({
        value: option.RegionCode,
        label: option.RegionName,
      }));
      setRegion(formattedOptions);
      document.getElementsByClassName('p-component')[1].style.width = '50%';
    })();
    (async (values) => {
      const Place = await apishowplaceTree(values);

      const newArray = [];

      Place.data.forEach((country) => {
        country.children.forEach((state) => {
          state.children.forEach((place) => {
            newArray.push({
              CountryCode: country.CountryCode,
              StateCode: state.StateCode,
              PlaceCode: place.PlaceCode,
              PlaceName: place.PlaceName,
              value: place.PlaceCode,
              label: place.PlaceName,
            });
          });
        });
      });

      setPlace(newArray);
    })();
  }, []);
  const { setFieldValue } = useFormikContext();
  return (
    <AdaptableCard className="mb-4" divider>
      <h5>Contact Detail</h5>
      {/* <p className="mb-6">Section to config product sales information</p> */}
      <div className="grid  grid-cols-3 gap-2">
        <div className="col-span-3">
          <FormItem
            label="City"
            asterisk
            invalid={errors.PlaceCode && touched.PlaceCode}
            errorMessage={errors.PlaceCode}
          >
            <Field
              name="PlaceCode"
              maxLength="10"
              placeholder="Select"
              component={Select}
              options={Place}
              value={Place.filter(
                (option) => option.value == selectedNodeKey.split('-')[0],
              )}
              onChange={(option) => {
                setSelectedNodeKey(
                  option?.value +
                  '-' +
                  option?.StateCode +
                  '-' +
                  option?.CountryCode,
                );

                setFieldValue('PlaceCode', option?.value);
              }}
              size="sm"
            />
          </FormItem>
        </div>

        <div className="col-span-1">
          <FormItem
            asterisk
            label="Address"
            invalid={errors.Emp_Addr1 && touched.Emp_Addr1}
            errorMessage={errors.Emp_Addr1}
          >
            <Field
              name="Emp_Addr1"
              maxLength="99"
              placeholder="Address"
              component={Input}
              onChange={(e) => {
                const newValue = e.target.value;
                if (isAddress(newValue)) {
                  setFieldValue('Emp_Addr1', newValue);
                }
              }}
              size="sm"
            />
          </FormItem>
        </div>

        <div className="col-span-1">
          <FormItem
            asterisk
            label="Region"
            invalid={errors.RegionCode && touched.RegionCode}
            errorMessage={errors.RegionCode}
          >
            <Field
              name="RegionCode"
              maxLength="10"
              placeholder="Select"
              component={Select}
              options={Region}
              value={Region.filter(
                (option) => option.value === values.RegionCode,
              )}
              onChange={(e) => {
                const newValue = e.value;
                setFieldValue('RegionCode', newValue);
              }}
              size="sm"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="PIN Code"
            invalid={errors.Pincode && touched.Pincode}
            errorMessage={errors.Pincode}
          >
            <Field
              name="Pincode"
              maxLength="6"
              placeholder="PIN Code"
              component={Input}
              onChange={(e) => {
                const newValue = e.target.value;
                if (isNumbers(newValue)) {
                  setFieldValue('Pincode', newValue);
                }
              }}
              size="sm"
            />
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default ContactDetail;
