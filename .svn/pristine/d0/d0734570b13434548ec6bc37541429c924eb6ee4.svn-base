import { useEffect, useState } from 'react';
import Table from 'components/ui/Table';
import { Button, Checkbox, Select } from 'components/ui';
import {
  apiGetStarCastTypemaster,
  apiGetStarCastmaster,
  apiPostContenStarCast,
  apiStarcastmasterDrop,
} from 'services/ProgrammingService';
import { FaTrashAlt } from 'react-icons/fa';
import { openNotification } from './GLOBALFUNACTION';
import { useDispatch, useSelector } from 'react-redux';
import { setLOADERCHECK } from 'store/locale/localeSlice';
import Loader from './Loader';
import { setDialogbox } from 'store/base/commonSlice';

const { Tr, Th, Td, THead, TBody } = Table;
const THD = [
  { name: 'Select' },
  { name: 'StarCast Type' },
  { name: 'StarCast' },
  { name: 'Action' },
];

const MapStarcast = ({
  setMapStarcast,
  sMapStarcast,
  isEditMode, GetContents, path
}) => {

  const { Content } = useSelector((state) => state.base.common);
  const { LOADERCHECK, STARCAST } = useSelector((state) => state.locale);
  const [StarCastType, setStarCastType] = useState(null);
  const [StartCast, setStartCast] = useState(null);
  const [StarCastTypeList, setStarCastTypeList] = useState([]);
  const [StarCastList, setStarCastList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    initializeData();
  }, [STARCAST]);

  const initializeData = async () => {
    if (STARCAST && STARCAST.star) {
      dispatch(setLOADERCHECK(true));
      const starCastListResponse = await apiStarcastmasterDrop(5);
      const initialData = STARCAST.star.map((actor) => {
        const starOption = starCastListResponse.data.find(
          (option) => option.StarCastName === actor,
        );
        return {
          StarCastTypeCode: 5,
          StarCastTypeName: 'Star',
          StarCastName: actor,
          StarCastCode: starOption ? starOption.StarCastCode : null,
        };
      });
      setMapStarcast(initialData);
      dispatch(setLOADERCHECK(false));
    }
  };

  useEffect(() => {
    (async () => {
      const starCastTypeListResponse = await apiGetStarCastTypemaster();
      const formattedOptions = starCastTypeListResponse.data.map((option) => ({
        value: option.StarCastTypeCode,
        label: option.StarCastTypeName,
      }));
      setStarCastTypeList(formattedOptions);
    })();
  }, [LOADERCHECK]);

  const fetchStarCastList = async (id) => {
    const starCastListResponse = await apiStarcastmasterDrop(id);
    const formattedOptions = starCastListResponse.data.map((option) => ({
      value: option.StarCastCode,
      label: option.StarCastName,
    }));
    setStarCastList(formattedOptions);
  };

  const handleAdd = () => {
    if (!StarCastType || !StartCast) {
      openNotification('danger', 'Select Star Cast And Type');
      return;
    }
    const seasonExists = sMapStarcast.some(
      (ef) => ef.StarCastName === StartCast.label,
    );
    if (seasonExists) {
      openNotification('danger', 'StarCast Already Exist');
      return;
    }
    const newData = {
      StarCastCode: StartCast.value,
      StarCastName: StartCast.label,
      StarCastTypeCode: StarCastType.value,
      StarCastTypeName: StarCastType.label,
    };
    setMapStarcast([...sMapStarcast, newData]);
    setStartCast(null);
  };

  const handleSelectRow = (index) => {
    const newSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];
    setSelectedRows(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sMapStarcast.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    const newArray = sMapStarcast.filter(
      (_, index) => !selectedRows.includes(index),
    );
    setMapStarcast(newArray);
    setSelectedRows([]);
    setSelectAll(false);
  };
  const editStarCast = async () => {
    const updatedStarcast = sMapStarcast.map(item => ({
      ...item,
      ContentCode: Content.ContentCode // or any default value like '', 0, or 'N/A'
    }));
    try {
      const resp = await apiPostContenStarCast(Content.ContentCode, updatedStarcast);
      if (resp.status === 200) {

        if (path == '/EventTeamPlaner' || path == 'EventTeamPlaner') {
          GetContents(1);
        } else {
          GetContents(0);

        }
        openNotification('success', 'Data Updated Successfully');
        setTimeout(() => dispatch(setDialogbox(false)), 500);
      } else if (resp.data.msg === 'Entity is Already Exists') {

      }
    } catch (errors) {
      openNotification('danger', 'Somthing Went Wrong');
      setTimeout(() => dispatch(setDialogbox(false)), 500);
    }
  };
  return (
    <div>
      <Loader showLoader={LOADERCHECK} />
      <div className="grid grid-cols-10 gap-2 mb-4">
        <div className="col-span-4">
          <h6 className="mb-2">StarCast Type</h6>
          <Select
            options={StarCastTypeList}
            value={StarCastType}
            onChange={(e) => {
              setStarCastType(e);
              setStarCastList([]);
              setStartCast(null);
              fetchStarCastList(e.value);
            }}
          />
        </div>
        <div className="col-span-4">
          <h6 className="mb-2">StarCast</h6>
          <Select
            options={StarCastList}
            value={StartCast}
            onChange={(e) => setStartCast(e)}
          />
        </div>
        <div className="col-span-1">
          <Button size="sm" onClick={handleAdd} type="button" className="mt-8">
            Add
          </Button>
        </div>
      </div>

      {sMapStarcast.length === 0 ? (
        <div className="flex justify-center">
          <h4>No Record Found</h4>
        </div>
      ) : (
        <>
          <Button
            size="sm"
            onClick={handleDeleteSelected}
            type="button"
            className="mb-4"
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </Button>
          <Table compact style={{ height: 'auto' }}>
            <THead>
              <Tr>
                <Th style={{ textAlign: 'center' }}>
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                </Th>
                {THD.slice(1).map((Td, index) => (
                  <Th
                    key={index}
                    style={{ textAlign: 'center', textTransform: 'capitalize' }}
                  >
                    {Td.name}
                  </Th>
                ))}
              </Tr>
            </THead>
            <TBody>
              {sMapStarcast.map((e, index) => (
                <Tr key={index} style={{ border: '1px solid #E3E5EB' }}>
                  <Td
                    style={{ border: '1px solid #E3E5EB', textAlign: 'center' }}
                  >
                    <Checkbox
                      checked={selectedRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                    />
                  </Td>
                  <Td
                    style={{ border: '1px solid #E3E5EB', textAlign: 'center' }}
                  >
                    {e.StarCastTypeName}
                  </Td>
                  <Td
                    style={{ border: '1px solid #E3E5EB', textAlign: 'center' }}
                  >
                    {e.StarCastName}
                  </Td>
                  <Td
                    style={{ border: '1px solid #E3E5EB', textAlign: 'center' }}
                  >
                    <Button
                      type="button"
                      shape="circle"
                      style={{ fontSize: '14px' }}
                      size="xs"
                      onClick={() => {
                        const newArray = sMapStarcast.filter(
                          (_, indexs) => indexs !== index,
                        );
                        setMapStarcast(newArray);
                      }}
                      icon={<FaTrashAlt />}
                    />
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </>
      )}
      {isEditMode && sMapStarcast.length !== 0 && (
        <div className="flex justify-start mt-4">
          <Button
            size="sm"
            onClick={editStarCast}
            type="button"
            className="mb-4"
          // disabled={selectedRows.length === 0}
          >
            Save
          </Button>
        </div>
      )}

    </div>
  );
};

export default MapStarcast;
