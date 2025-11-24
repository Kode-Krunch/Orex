import {
  billingSeriesRouteTitle,
  ntcBillingSeriesRouteTitle,
} from 'configs/routes.config';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  apiUpdateInvoiceSeries,
  apiUpdateInvoiceSeriesNTC,
} from 'services/BillingService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

function InvoiceSeriesTable({
  filters,
  globalFilterFields,
  invoiceSeries,
  setInvoiceSeries,
  financialYearOptions,
  channel,
  token,
  validateMaxNoLength,
  isEditModeOn,
  setIsEditModeOn,
  currentRouteTitle,
  setShowLoader,
}) {
  /* STATES */
  const [editingRowDateBeforeEdit, setEditingRowDateBeforeEdit] =
    useState(null);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (isEditModeOn) {
        disableEditBtns();
      } else {
        enableEditBtns();
      }
    } catch (error) {
      console.error(error);
    }
  }, [isEditModeOn]);

  /* EVENT LISTENERS */
  const onRowEditInit = (e) => {
    try {
      setIsEditModeOn(true);
      setEditingRowDateBeforeEdit(e.data.YearMaster.Description);
    } catch (error) {
      console.error(error);
    }
  };

  const onRowEditComplete = async (e) => {
    try {
      setShowLoader(true);
      let newInvoiceSeries = [...invoiceSeries];
      let { newData, index } = e;
      newInvoiceSeries[index] = newData;

      const data = {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        YearCode: financialYearOptions.filter(
          (option) => option.label === newData.YearMaster.Description,
        )[0].value,
        LastNo: newData.LastNo,
        IsActive: newData.IsActive,
      };

      if (!data.LastNo) {
        openNotification(
          'danger',
          'Billing series not updated due to invalid Last No.',
        );
      } else if (!data.YearCode) {
        openNotification(
          'danger',
          'Billing series not updated due to invalid Financial Year.',
        );
      } else {
        let response = null;
        if (currentRouteTitle === billingSeriesRouteTitle) {
          response = await apiUpdateInvoiceSeries(data, newData.Id, token);
        } else if (currentRouteTitle === ntcBillingSeriesRouteTitle) {
          response = await apiUpdateInvoiceSeriesNTC(data, newData.Id, token);
        }
        if (response) {
          if (response.status === 200) {
            setInvoiceSeries(newInvoiceSeries);
            setEditingRowDateBeforeEdit(null);
            openNotification('success', 'Billing series updated successfully.');
          } else {
            openNotification(
              'danger',
              `Unable to update Billing series. Server returned with status code: ${response.status}`,
            );
          }
        } else {
          openNotification('danger', `Something went wrong`);
        }
      }
      setIsEditModeOn(false);
      setShowLoader(false);
    } catch (error) {
      if (
        'response' in error &&
        'data' in error.response &&
        'detail' in error.response.data &&
        error.response.data.detail === 'Data is Already Exists'
      ) {
        openNotification(
          'danger',
          `Billing series for selected year already exist.`,
        );
      } else {
        openNotification('danger', `Something went wrong.`);
      }
      setShowLoader(false);
      console.error(error);
    }
  };

  const onRowEditCancel = (e) => {
    try {
      // Revert to original column datas here
      setInvoiceSeries((oldInvoiceSeries) => {
        let newInvoiceSeries = Object.assign([], oldInvoiceSeries);
        newInvoiceSeries.forEach((curInvoiceSeries) => {
          if (curInvoiceSeries.Id === e.data.Id) {
            curInvoiceSeries.YearMaster.Description = editingRowDateBeforeEdit;
          }
        });
        return newInvoiceSeries;
      });
      setIsEditModeOn(false);
    } catch (error) {
      console.log(error);
    }
  };

  /* HELPER FUNCTIONS */
  const getFinancialYearOptions = (initialValue) => {
    try {
      let options = [];
      const invoiceSeriesDesc = invoiceSeries.map(
        (curInvoiceSeries) => curInvoiceSeries.YearMaster.Description,
      );
      financialYearOptions.forEach((curOption, index) => {
        if (index === 0) {
          options.push(initialValue);
        }
        if (!invoiceSeriesDesc.includes(curOption.label)) {
          options.push(curOption.label);
        }
      });
      return options;
    } catch (error) {
      console.log(error);
    }
  };

  const financialYearEditor = (options) => {
    try {
      return (
        <Dropdown
          value={options.value}
          options={getFinancialYearOptions(options.value)}
          onChange={(e) => {
            return options.editorCallback(e.value);
          }}
          placeholder="Select"
          className="w-full custom-dropdown"
        />
      );
    } catch (error) {
      console.error(error);
    }
  };

  const lastNoEditor = (options) => {
    try {
      return (
        <InputText
          type="text"
          value={options.value}
          onChange={(e) => {
            if (validateMaxNoLength(e.target.value, 5)) {
              return options.editorCallback(e.target.value);
            }
          }}
          className="text-white px-1"
        />
      );
    } catch (error) {
      console.error(error);
    }
  };

  const disableEditBtns = () => {
    try {
      Array.from(document.getElementsByName('row-edit')).forEach(
        (curEditBtn) => {
          curEditBtn.disabled = true;
          curEditBtn.style.color = 'rgb(100 116 139)';
          curEditBtn.classList.add('hover:cursor-not-allowed');
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const enableEditBtns = () => {
    try {
      Array.from(document.getElementsByName('row-edit')).forEach(
        (curEditBtn) => {
          curEditBtn.disabled = false;
          curEditBtn.style.color = 'inherit';
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  const mode = useSelector((state) => state.theme.mode);
  return (
    <DataTable
      value={invoiceSeries}
      editMode="row"
      dataKey="Id"
      size="small"
      onRowEditComplete={onRowEditComplete}
      tableStyle={{ minWidth: '50rem' }}
      onRowEditInit={onRowEditInit}
      onRowEditCancel={onRowEditCancel}
      filters={filters}
      globalFilterFields={globalFilterFields}
    >
      <Column
        field="Channel.ChannelName"
        header="Channel"
        style={{ width: '20%' }}
        bodyStyle={
          mode == 'dark'
            ? {}
            : {
                border: '1px solid #e5e7eb',
                color: 'black',
              }
        }
      ></Column>
      <Column
        field="YearMaster.Description"
        header="Financial Year"
        editor={(options) => financialYearEditor(options)}
        style={{ width: '20%' }}
        bodyStyle={
          mode == 'dark'
            ? {}
            : {
                border: '1px solid #e5e7eb',
                color: 'black',
              }
        }
      ></Column>
      <Column
        field="LastNo"
        header="Last No."
        editor={(options) => lastNoEditor(options)}
        style={{ width: '20%' }}
        bodyStyle={
          mode == 'dark'
            ? {}
            : {
                border: '1px solid #e5e7eb',
                color: 'black',
              }
        }
      ></Column>
      <Column
        header="Action"
        rowEditor
        headerStyle={{ width: '10%', minWidth: '8rem' }}
        bodyStyle={
          mode == 'dark'
            ? {}
            : {
                border: '1px solid #e5e7eb',
                color: 'black',
                textAlign: 'start',
              }
        }
      ></Column>
    </DataTable>
  );
}

export default InvoiceSeriesTable;
