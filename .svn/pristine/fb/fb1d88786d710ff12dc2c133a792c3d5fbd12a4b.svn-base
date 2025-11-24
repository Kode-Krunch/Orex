import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'components/ui';
import { IoIosTrash } from 'react-icons/io';

export function MultipleAddressesDataTable(
  addresses,
  getcountry,
  getstate,
  getcity,
  SelectedAddress,
  setSelectedAddress,
  Content,
  setIsEditAddressClicked,
  setagencycity,
) {
  // const [selectedProduct, setSelectedProduct] = useState(null)
  const handleDelete = (id) => {
    // Filter out the row with the matching id
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    console.log(updatedAddresses);
    setagencycity(updatedAddresses);
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
        dataKey="AddressLine1"
        value={addresses}
        size={'small'}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="AddressLine1" header="Address"></Column>
        <Column field="CountryCode" header="Country" body={getcountry}></Column>
        <Column field="StateCode" header="State" body={getstate}></Column>
        <Column field="PlaceCode" header="City" body={getcity}></Column>
        <Column field="PinCode" header="PinCode"></Column>
        <Column field="GSTN_id" header="GST"></Column>
        {/* <Column field="NovCode" header="NovCode"></Column> */}
        <Column field="IsActive" header="IsActive"></Column>

        {/* Add a delete column */}
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
