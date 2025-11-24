import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useState, useEffect } from 'react'

export function StarcastDataTable(
    addresses,
    getcountry,
    getstate,
    getcity,
    SelectedAddress,
    setSelectedAddress
) {
    // const [selectedProduct, setSelectedProduct] = useState(null);
    // console.log(addresses);

    return (
        <div className="card">
            <DataTable
                selectionMode="single"
                selection={SelectedAddress}
                onSelectionChange={(e) => {
                    setSelectedAddress(e.value) //console.log(e.value);
                }}
                dataKey="id"
                value={addresses}
                size={'small'}
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column
                    field="StarCastTypeCode"
                    header="StarCast Type"
                ></Column>
                <Column field="StarCastCode" header="StarCast"></Column>
            </DataTable>
        </div>
    )
}
