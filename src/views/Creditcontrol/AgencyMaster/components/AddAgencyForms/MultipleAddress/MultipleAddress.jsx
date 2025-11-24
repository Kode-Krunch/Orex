import React, { useState } from 'react';
import AddressDetailsForm from './AddressDetailsForm';
import { useFormikContext } from 'formik';
import SimpleTable from 'views/Controls/SimpleTable/SimpleTable';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button, Tooltip } from 'components/ui';
import {
  getCityOptions,
  getStateOptions,
} from 'views/Creditcontrol/AgencyMaster/utils';

/* CONSTANTS */
const COLUMNS = [
  { accessorKey: 'fullAddress', header: 'Address' },
  {
    accessorKey: 'country',
    header: 'Country',
    cell: (props) => props.row.original.country.label,
  },
  {
    accessorKey: 'state',
    header: 'State',
    cell: (props) => props.row.original.state.label,
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: (props) => props.row.original.city.label,
  },
  { accessorKey: 'postalCode', header: 'Postal Code' },
  // { accessorKey: 'erpCode', header: 'ERP Code' },
  { accessorKey: 'gstNumber', header: 'GST Number' },
];

function MultipleAddress({
  countryOptions,
  stateOptions,
  cityOptions,
  setStateOptions,
  setCityOptions,
  fullAddress,
  setFullAddress,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  postalCode,
  setPostalCode,
  erpCode,
  setErpCode,
  isGstRegistered,
  setIsGstRegistered,
  gstNumber,
  setGstNumber,
}) {
  /* STATES */
  const [editAddressId, setEditAddressId] = useState(null);

  /* HOOKS */
  const { values, setFieldValue } = useFormikContext();

  /* CONSTANTS */
  let columns = [
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (props) => {
        const isRowSelected = props.row.original.id === editAddressId;
        return (
          <div
            className={`flex gap-1 items-center ${
              isRowSelected ? 'justify-end' : 'justify-center'
            }`}
          >
            {!isRowSelected && (
              <Tooltip title="Edit">
                <Button
                  type="button"
                  size="xs"
                  icon={<MdEdit />}
                  onClick={() => handleEditClick(props.row.original)}
                />
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <Button
                type="button"
                size="xs"
                icon={<MdDelete />}
                onClick={() => {
                  setFieldValue(
                    'multipleAddresses',
                    [...values.multipleAddresses].filter(
                      (row) => row.id !== props.row.original.id,
                    ),
                  );
                  resetForm();
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
    ...COLUMNS,
  ];

  /* EVENT HANDLERS */
  const handleEditClick = async (row) => {
    setFullAddress(row.fullAddress);
    setCountry(row.country);
    setState(row.state);
    setStateOptions(await getStateOptions(row.country.value));
    setCity(row.city);
    setCityOptions(await getCityOptions(row.state.value));
    setPostalCode(row.postalCode);
    // setErpCode(row.erpCode);
    setIsGstRegistered(row.isGstRegistered);
    setGstNumber(row.gstNumber);
    setEditAddressId(row.id);
  };

  /* HELPER FUNCTIONS */
  const resetForm = () => {
    setFullAddress('');
    setCountry(null);
    setState(null);
    setStateOptions([]);
    setCity(null);
    setCityOptions([]);
    setPostalCode('');
    // setErpCode('');
    setIsGstRegistered(false);
    setGstNumber('');
    setEditAddressId(null);
  };

  const getTrClassName = (row) => {
    return row.id === editAddressId ? 'bg-gray-600' : '';
  };

  return (
    <div className="grid grid-cols-3 h-full">
      <div className="pr-3 border-r border-r-gray-700">
        <AddressDetailsForm
          countryOptions={countryOptions}
          stateOptions={stateOptions}
          cityOptions={cityOptions}
          setStateOptions={setStateOptions}
          setCityOptions={setCityOptions}
          fullAddress={fullAddress}
          setFullAddress={setFullAddress}
          country={country}
          setCountry={setCountry}
          state={state}
          setState={setState}
          city={city}
          setCity={setCity}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          erpCode={erpCode}
          setErpCode={setErpCode}
          isGstRegistered={isGstRegistered}
          setIsGstRegistered={setIsGstRegistered}
          gstNumber={gstNumber}
          setGstNumber={setGstNumber}
          editAddressId={editAddressId}
          resetForm={resetForm}
        />
      </div>
      <div className="col-span-2 px-3 h-full flex flex-col">
        <h6 className="mb-3">MULTIPLE ADDRESSES</h6>
        {values.multipleAddresses.length === 0 ? (
          <p className="text-red-600">Please add atleast one address</p>
        ) : (
          <div className="grow h-0">
            <SimpleTable
              data={values.multipleAddresses}
              columns={columns}
              trClassNames={getTrClassName}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MultipleAddress;
