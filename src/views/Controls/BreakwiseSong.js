import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import React from 'react';
import './Common.css'
import { ScrollBar } from 'components/ui';


const BreakwiseSong = ({ BreakwiseData, colorMapping }) => {
  console.log('BreakwiseData', BreakwiseData);

  const rowClassName = (rowData) => {
    return rowData.parent ? 'sub-row' : 'sub-row';
  };
  const des = {
    alignItems: 'center',
    borderColor: 'rgb(70, 80, 94)',
    borderRadius: '9999px',
    borderWidth: '1px',
    display: 'inline-flex',
    fontSize: '.75rem',
    fontWeight: '600',
    lineHeight: '1rem',
    padding: '.25rem .625rem',
    whiteSpace: 'nowrap'
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        height: '335px',
        overflow: 'auto'
      }}>
        <div className='flex items-center mb-2'>
          {/* <div className="mr-1">
            <p style={des} >
              <span style={{
                marginRight: '.375rem',
                backgroundColor: 'red',
                borderRadius: '9999px',
                height: '.5rem',
                width: '.5rem'
              }}></span>B: Break
            </p>
          </div> */}
          {/* <div className="mr-1 ">

            <p style={des} >
              <span style={{
                marginRight: '.375rem',
                backgroundColor: colorMapping.CM,
                borderRadius: '9999px',
                height: '.5rem',
                width: '.5rem'
              }}></span>  C: Comm
            </p>
          </div> */}
          {/* <div className="mr-1">

            <p style={des} >
              <span style={{
                marginRight: '.375rem',
                backgroundColor: colorMapping.PR,
                borderRadius: '9999px',
                height: '.5rem',
                width: '.5rem'
              }}></span>  P: Promo
            </p>
          </div> */}
          <div className="mr-1">

            <p style={des} >
              <span style={{
                marginRight: '.375rem',
                backgroundColor: colorMapping.SG,
                borderRadius: '9999px',
                height: '.5rem',
                width: '.5rem'
              }}></span>  S: Song
            </p>
          </div>


        </div>

        <ScrollBar>
          <TreeTable
            value={BreakwiseData}
            resizableColumns
            showGridlines
            rowClassName={(rowData) => (rowData.parent ? 'subrow' : 'subrow')}
          >

            <Column
              style={{
                width: '150px',
                maxWidth: '150px',
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
            {/* <Column
              style={{
                width: '40px',
                maxWidth: '80px',
                background: '#111827',
                color: 'white',
                fontSize: '13px',
                textAlign: 'right',
              }}
              field="BreakNumber"
              header="B"
            ></Column> */}
            {/* <Column
              style={{
                width: '40px',
                maxWidth: '80px',
                background: '#111827',
                color: 'white',
                fontSize: '13px',
                textAlign: 'right',
              }}
              field="totalCMCount"
              header="C"
            ></Column> */}
            {/* <Column
              style={{
                width: '60px',
                maxWidth: '100px',
                background: '#111827',
                color: 'white',
                fontSize: '13px',
                textAlign: 'right',
              }}
              field="totalDuration"
              header="P"
            ></Column> */}
            <Column
              style={{
                width: '40px',
                maxWidth: '200px',
                background: '#111827',
                color: 'white',
                fontSize: '13px',
                textAlign: 'right',
              }}
              field="totalSGDuration"
              header="S"
            ></Column>
          </TreeTable></ScrollBar></div>
    </div>
  );
};

export default BreakwiseSong;
