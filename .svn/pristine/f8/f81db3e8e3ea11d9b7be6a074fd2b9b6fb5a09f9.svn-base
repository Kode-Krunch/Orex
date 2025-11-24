/* COMMON FUNCTIONS USED THROUGHOUT WHOLE SCHEDULER COMPONENT */
import { convertDateToYMD } from 'components/validators';
import { pagesEnum } from './enum';
import { CLIENT } from 'views/Controls/clientListEnum';

const setPageHeading = (page, dispatch, setdateForm, date, channel) => {
  try {
    const gboxElement = document.getElementsByClassName('Gbox2')[0];
    const gboxElementchild =
      document.getElementsByClassName('Gbox2')[0].children[1];
    if (page === pagesEnum.PROMO) {
      dispatch(setdateForm([convertDateToYMD(date), 'Promo Scheduling']));
    } else if (page === pagesEnum.SONG) {
      dispatch(setdateForm([convertDateToYMD(date), 'Song Scheduling']));
    } else if (page === pagesEnum.COMMERCIAL) {
      dispatch(setdateForm([convertDateToYMD(date), 'Commercial Scheduling']));
    } else if (page === pagesEnum.NTC) {
      dispatch(setdateForm([convertDateToYMD(date), 'NTC Scheduling']));
    } else if (page === pagesEnum.FINAL_LOG) {
      dispatch(
        setdateForm([
          convertDateToYMD(date),
          channel.label === CLIENT.USA_Forbes ? 'PlayList Final' : 'Final Log',
        ]),
      );
    }
    if (gboxElement) {
      gboxElement.style.display = 'block';
      gboxElementchild.style.display = 'block';
    }
  } catch (error) {
    throw error;
  }
};

export { setPageHeading };
