import { Card, Notification, toast as toa } from 'components/ui';
import React, { useEffect, useRef, useState } from 'react';
import {
    UpdateNTCGroup,
    AddNTCGroup,
    apiNTCGroupMaster,
} from 'services/NTCService';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import DisplaytablewithEdit, {
    headerExtra,
} from 'views/Controls/DisplaytablewithEdit';

const NTCGroupMaster = () => {
    const token = useSelector((state) => state.auth.session.token);
    const Username = useSelector((state) => state.auth.session.Username);
    const count = useRef(0);
    function closeAfter2000ms(mes, ty) {
        toa.push(
            <Notification
                closable
                type={ty}
                duration={1000}
                title={ty.charAt(0).toUpperCase() + ty.slice(1)}
            >
                {mes}
            </Notification>,
        );
    }
    const [NTCGroupName, setNTCGroupName] = useState('');
    const [addnew, setaddnew] = useState(false);
    const [visible, setVisible] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [yup, setyup] = useState();
    const toast = useRef(null);
    const accept = () => {
        toggleSwitch(yup);
    };
    const [NTCType, setNTCType] = useState();
    useEffect(() => {
        count.current = count.current + 1;
        if (count.current == 1) {
            (async (values) => {
                const respGener = await apiNTCGroupMaster();
                const reversedSongCategoriesWithNumbers = [...respGener.data]
                    .reverse()
                    .map((category, index) => ({
                        ...category,
                        serialNumber: index + 1,
                    }));
                setNTCType(reversedSongCategoriesWithNumbers);
            })();
        }
    }, []);

    const onRowEditComplete = (e) => {
        let _NTCType = [...NTCType];
        let { newData, index } = e;
        _NTCType[index].NTCGroupName = newData.NTCGroupName;
        _NTCType[index].IsActive = newData.IsActive;
        if (!newData.NTCGroupName) {
            return;
        }

        UpdateNTCGroup(newData, token)
            .then((response) => {
                if (response.status == 204) {
                    console.log(response);
                    closeAfter2000ms('Data Already Exists.', 'warning');
                    return null;
                }
                if (response.status == 200) {
                    closeAfter2000ms('Data Updated Succesfully', 'success');
                }
                return response.json();
            })
            .then((data) => {
                _NTCType[index] = data;
                _NTCType[index].serialNumber = newData.serialNumber;
                _NTCType[index].NTCGroupName = newData.NTCGroupName;
                _NTCType[index].IsActive = newData.IsActive;
                setNTCType(_NTCType);
                closeAfter2000ms('Data Updated Succesfully', 'success');
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };
    const addNewRecord = () => {
        if (NTCGroupName) {
            const newRecord = {
                NTCGroupName: NTCGroupName,
                IsActive: 1,
            };
            AddNTCGroup(newRecord, token)
                .then((response) => {
                    if (response.status == 204) {
                        closeAfter2000ms('Data Already Exists.', 'warning');
                    }
                    if (response.status == 200) {
                        newRecord.serialNumber = NTCType.length + 1;
                        setNTCType((prevNTCType) => [...prevNTCType, newRecord]);
                        // show('Data Added Successfully')
                        closeAfter2000ms('Data Added Succesfully', 'success');
                    }
                    setNTCGroupName('');
                    setaddnew(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            closeAfter2000ms('Kindly Enter NTC Type ', 'danger');
        }
    };

    const toggleSwitch = (index) => {
        console.log('toggleSwitch', index);
        const updatedNTCType = [...NTCType];
        let row = updatedNTCType[index];
        console.log('row1', row);
        row.IsActive = row.IsActive == 1 ? 0 : 1;
        console.log('row2', row);
        UpdateNTCGroup(row, token)
            .then((response) => {
                if (response.status == 204) {
                    console.log(response);
                    closeAfter2000ms('Data Already Exists.', 'warning');
                    return null;
                }
                if (response.status == 200) {
                    closeAfter2000ms('Data Updated Succesfully', 'success');
                }
                return response.json();
            })
            .then((data) => {
                data.serialNumber = row.serialNumber;
                data.IsActive = row.IsActive;
                data.NTCGroupName = row.NTCGroupName;
                updatedNTCType[index] = data;
                setNTCType(updatedNTCType);

                closeAfter2000ms('Status Updated Succesfully', 'success');
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };
    const columns = [
        { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
        { field: 'NTCGroupName', header: 'NTCGroup', width: '20%' },
    ];

    return (
        <>
            <Toast ref={toast} />

            <ConfirmDialog
                group="declarative"
                visible={visible}
                onHide={() => setVisible(false)}
                message="Are you sure you want to proceed?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={accept}
            />
            <Card
                header={
                    <div className="flex justify-between">
                        <div>
                            <span className="flex items-center">
                                <HeaderExtra ModuleText="NTC" Component={'NTC Type'} />
                            </span>
                        </div>
                        <div
                            className="flex flex-col items-center"
                            style={{ marginLeft: '-20%' }}
                        ></div>

                        <div></div>
                    </div>
                }
                headerExtra={headerExtra(
                    globalFilter,
                    setGlobalFilter,
                    setaddnew,
                    addnew,
                    addNewRecord,
                    NTCGroupName,
                    setNTCGroupName,
                    'NTC Group',
                    NTCType,
                    columns,
                )}
                bodyClass="text-center"
            >
                <DisplaytablewithEdit
                    data={NTCType || []}
                    onRowEditComplete={onRowEditComplete}
                    globalFilter={globalFilter}
                    dataKey="NTCGroupCode"
                    columns={columns}
                    setyup={setyup}
                    scrollHeight="70vh"
                    setVisible={setVisible}
                />
            </Card>
        </>
    );
};


export default NTCGroupMaster;
