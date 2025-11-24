import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { getDummyRow, getRowId } from '../../utils/utils';
import { tableTypesEnum } from 'views/Scheduling/Scheduler/enum';
import { apiCallstoreprocedure } from 'services/CommonService';

const { apiGetPromotypemaster } = require('services/ProgrammingService');

const getPromoTypeSelectorOptions = async () => {
  try {
    let options = [];
    const response = await apiGetPromotypemaster();
    if (response.status === 200) {
      options = response.data.map((promoType) => ({
        value: `${promoType.PromoTypeCode}`,
        label: promoType.PromoTypeName,
      }));
      options = [{ value: 0, label: 'All' }, ...options];
    } else if (response.status === 204) {
      openNotification('info', 'No promo types found');
    } else {
      openNotification(
        'danger',
        `Something went wrong while fetching promo types. Server responded with status code ${response.status}`,
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

const getPromos = async (param) => {
  try {
    let tableData = [];
    const response = await apiCallstoreprocedure(
      'USP_Sch_Get_All_Promo',
      param,
    );
    if (response.status === 200) {
      if (response.data.length === 0) {
        openNotification('info', 'No promos found');
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
      openNotification('info', 'No promos found');
    } else {
      openNotification(
        'danger',
        `Something went wrong while fetching promos. Server responded with status code ${response.status}`,
      );
    }
    return tableData;
  } catch (error) {
    throw error;
  }
};

export { getPromoTypeSelectorOptions, closeDropDowns, getPromos };
