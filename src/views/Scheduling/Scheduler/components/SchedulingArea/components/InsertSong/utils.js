import { apiGetSongScheduling2 } from 'services/SchedulingService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { getDummyRow, getRowId } from '../../utils/utils';
import { tableTypesEnum } from 'views/Scheduling/Scheduler/enum';
import { apiGetSongcategoryDrop } from 'services/MasterService';
import { apiCallstoreprocedure } from 'services/CommonService';

const getSongTypeSelectorOptions = async () => {
  try {
    let options = [
      { value: 1, label: 'All' },
      { value: -2, label: 'Not Used Last 2 Days' },
      { value: -1, label: 'Frequntly used in 7 Days' },
    ];
    const response = await apiGetSongcategoryDrop();
    if (response.status === 200) {
      response.data.forEach((songType) =>
        options.push({
          value: songType.SongCategoryCode,
          label: songType.SongCategoryName,
        }),
      );
    } else if (response.status === 204) {
      openNotification('info', 'No song types found');
    } else {
      openNotification(
        'danger',
        `Something went wrong while fetching song types. Server responded with status code ${response.status}`,
      );
    }
    return options;
  } catch (error) {
    throw error;
  }
};

const closeDropDowns = (event, dropdownRef, setSecTableToolbarState) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setSecTableToolbarState((prevState) => ({
      ...prevState,
      isManageColumnsDropdownVisible: false,
    }));
  }
};

const getSongs = async (param) => {
  try {
    let tableData = [];
    const response = await apiCallstoreprocedure('USP_Sch_Get_All_Song', param);
    if (response.status === 200) {
      if (response.data.length === 0) {
        openNotification('info', 'No songs found');
      } else {
        tableData = [getDummyRow(response.data[0]), ...response.data].map(
          (row, index) => ({
            ...row,
            rowId: getRowId(tableTypesEnum.SECONDARY, row),
            rowIndex: index,
          }),
        );
      }
    } else if (response.status === 204) {
      openNotification('info', 'No songs found');
    } else {
      openNotification(
        'danger',
        `Something went wrong while fetching songs. Server responded with status code ${response.status}`,
      );
    }
    return tableData;
  } catch (error) {
    throw error;
  }
};

export { getSongTypeSelectorOptions, closeDropDowns, getSongs };
