import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { IoIosTrash } from 'react-icons/io';
import { Button } from 'components/ui';

export function MultipleAddressesDataTable(
  addresses,
  getcountry,
  getstate,
  getcity,
  SelectedAddress,
  setSelectedAddress,
  Content,
  setIsEditAddressClicked,
  setclientcity,
) {
  const handleDelete = (id) => {
    // Filter out the row with the matching id
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    console.log(updatedAddresses);
    setclientcity(updatedAddresses);
  };
  return (
    <div className="card">
      <DataTable
        selectionMode="single"
        selection={SelectedAddress}
        onSelectionChange={(e) => {
          setSelectedAddress(e.value);

          if (Content) {
            if (e.value?.New == 1) {
              setIsEditAddressClicked(false);
            } else {
              setIsEditAddressClicked(true);
            }
          }
        }}
        dataKey="id"
        value={addresses}
        size={'small'}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="AddressLine1" header="Address1"></Column>
        <Column field="AddressLine2" header="Address2"></Column>
        <Column field="CountryCode" header="Country" body={getcountry}></Column>
        <Column field="StateCode" header="State" body={getstate}></Column>
        <Column field="PlaceCode" header="City" body={getcity}></Column>
        <Column field="GSTN_id" header="GST"></Column>{' '}
        <Column
          header="Actions"
          body={(rowData) =>
            rowData.id ? (
              <Button
                size="xs"
                className="pt-1 pb-1  mt-1 mb-1"
                onClick={() => handleDelete(rowData.id)}
                icon={<IoIosTrash />}
              />
            ) : (
              <Button
                size="xs"
                className="pt-1 pb-1 mt-1 mb-1"
                disabled
                icon={<IoIosTrash />}
              />
            )
          }
        ></Column>
      </DataTable>
    </div>
  );
}
