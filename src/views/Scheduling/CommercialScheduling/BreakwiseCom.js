import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import React from 'react';
import './Common.css'
import { ScrollBar } from 'components/ui';


const BreakwiseCom = ({ BreakwiseData }) => {

  return (
    <div style={{ width: '100%' }}>
      {/* <h6>BREAK:- BK</h6> <h6>Commercial :- CM</h6> */}
      <div style={{
        height: '335px',
        overflow: 'auto'
      }}>
        <ScrollBar>
          <TreeTable
            value={BreakwiseData}
            resizableColumns
            showGridlines
            rowClassName={(rowData) => (rowData.parent ? 'subrow' : 'subrow')}
          >

            <Column
              style={{
                width: '200px',
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                background: '#111827',
                color: 'white',
                fontSize: '13px',
              }}
              field="Event_Name"
              header="Event Name"
              expander
            ></Column>
            <Column
              style={{
                width: '40px',
                maxWidth: '80px',
                background: '#111827',
                color: 'white',
                fontSize: '13px',
                textAlign: 'right',
              }}
              field="BreakNumber"
              header="BK"
            ></Column>
            <Column
              style={{
                width: '60px',
                maxWidth: '100px',
                background: '#111827',
                color: 'white',
                fontSize: '13px',
                textAlign: 'right',
              }}
              field="totalCMDuration"
              header="CM"
            ></Column>

          </TreeTable></ScrollBar></div>
    </div>
  );
};

export default BreakwiseCom;
