import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import './index.css';
import { InputText } from 'primereact/inputtext';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { apiGetLocalEventMaster, apiPutLocalEventMaster } from 'services/EventServices';

function LocalEventTable({
  filters,
  globalFilterFields,
  subGenreOptions = [],
  token,
  setShowLoader,
}) {
  const mode = useSelector((state) => state.theme.mode);
  const [localEvents, setLocalEvents] = useState([]);
  const [editingRowBackup, setEditingRowBackup] = useState(null);

  // 🔄 Fetch Local Events
  const loadLocalEvents = async () => {
    try {
      setShowLoader(true);
      const res = await apiGetLocalEventMaster();
      if (res?.status === 200) {
        setLocalEvents(res.data || []);
      } else {
        openNotification('danger', 'Failed to load local events.');
      }
    } catch (err) {
      console.error(err);
      openNotification('danger', 'Error fetching local events.');
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    loadLocalEvents();
  }, []);

  // 🧠 Row Edit Handlers
  const onRowEditInit = (e) => {
    setEditingRowBackup({ ...e.data });
  };


  const onRowEditCancel = (e) => {
    loadLocalEvents()
  };

  const onRowEditComplete = async (e) => {
    const { newData } = e;

    if (!newData.LocalEventName?.trim()) {
      openNotification('danger', 'Please enter a valid Local Event Name.');
      return;
    }

    if (!newData.SubGenreCode) {
      openNotification('danger', 'Please select a Sub Genre.');
      return;
    }

    const payload = {
      LocalEventCode: newData.LocalEventCode,
      LocalEventName: newData.LocalEventName.trim(),
      SubGenreCode: newData.SubGenreCode,
      IsActive: newData.IsActive ?? true,
    };

    try {
      setShowLoader(true);
      const res = await apiPutLocalEventMaster(payload);
      if (res?.status === 200) {
        openNotification('success', 'Local Event updated successfully.');
        await loadLocalEvents();
      } else {
        openNotification('danger', `Update failed (${res?.status})`);
      }
    } catch (err) {
      console.error(err);
      openNotification('danger', 'Error while updating local event.');
    } finally {
      setShowLoader(false);
      setEditingRowBackup(null);
    }
  };

  // ✏️ Editors
  const localEventNameEditor = (options) => (
    <InputText
      value={options.value || ''}
      onChange={(e) => options.editorCallback(e.target.value)}
      placeholder="Enter Event Name"
      className="w-full"
    />
  );

  const subGenreEditor = (options) => (
    <Dropdown
      value={options.value || ''}
      options={subGenreOptions}
      optionLabel="label"
      optionValue="value"
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="Select Sub Genre"
      className="w-full custom-dropdown"
    />
  );

  // 💡 Column Body Templates
  const subGenreBody = (rowData) => {
    const selected = subGenreOptions.find(
      (opt) => opt.value === rowData.SubGenreCode
    );
    return selected ? selected.label : '';
  };

  return (
    <DataTable
      value={localEvents}
      editMode="row"
      dataKey="Id"
      onRowEditInit={onRowEditInit}
      onRowEditCancel={onRowEditCancel}
      onRowEditComplete={onRowEditComplete}
      filters={filters}
      globalFilterFields={globalFilterFields}
      tableStyle={{ minWidth: '50rem' }}
      size="small"
      className="p-datatable-sm"
    >
      <Column
        field="LocalEventName"
        header="Local Event Name"
        editor={localEventNameEditor}
        style={{ width: '40%' }}
        bodyStyle={mode === 'dark' ? {} : { border: '1px solid #e5e7eb' }}
      />
      <Column
        field="SubGenreCode"
        header="Sub Genre"
        editor={subGenreEditor}
        body={subGenreBody}
        style={{ width: '30%' }}
        bodyStyle={
          mode == 'dark'
            ? {}
            : {
              border: '1px solid #e5e7eb',
              color: 'black',
            }
        }
      />
      <Column
        header="Action"
        rowEditor
        headerStyle={{ width: '10%', minWidth: '8rem' }}
      />
    </DataTable>
  );
}

export default LocalEventTable;
