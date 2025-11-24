import {
  apiautoshufflepromo,
  apiautoshufflepromoId,
} from 'services/LibraryService';
import {
  convertDateToHHMMSSFF,
  openNotification,
  timeToSeconds,
} from 'views/Controls/GLOBALFUNACTION';
import { rowDataTypesEnum } from 'views/Scheduling/Scheduler/enum';

const getTemplateOptions = async (channel) => {
  let templateOptions = [];
  try {
    let param = {
      LocationCode: channel.LocationCode,
      ChannelCode: channel.ChannelCode,
    };
    const response = await apiautoshufflepromo(param);
    if (response.status === 200) {
      templateOptions = response.data.map((template) => ({
        label: template.TemplateNo,
        value: template.TemplateNo,
      }));
    } else if (response.status === 204) {
      openNotification('info', 'No templates found');
    } else {
      openNotification(
        'danger',
        'Something went wrong while retrieving Auto Shuffle Template',
      );
    }
  } catch (error) {
    openNotification(
      'danger',
      'Something went wrong while retrieving Auto Shuffle Template',
    );
  }
  return templateOptions;
};

const getPromosFromTemplateId = async (templateId) => {
  let promos = [];
  try {
    const response = await apiautoshufflepromoId(templateId);
    if (response.status === 200) {
      promos = response.data.map((promo) => ({
        PromoCode: promo.PromoMaster.PromoCode,
        VideoID: promo.PromoMaster.VideoID,
        Event_Name: promo.PromoMaster.PromoCaption,
        Duration: promo.PromoMaster.PromoDuration,
        TapeId: promo.PromoMaster.VideoID,
      }));
    } else if (response.status === 204) {
      openNotification('info', 'No Promos found for selected template');
    } else {
      openNotification(
        'danger',
        'Something went wrong while retrieving Promos for selected template',
      );
    }
  } catch (error) {
    openNotification(
      'danger',
      'Something went wrong while retrieving Promos for selected template',
    );
    console.error(error);
  }
  return promos;
};

function insertPromos(schedulingTableData, promoList, time) {
  let newData = [];
  let idCounter = 1;
  let startTime = convertDateToHHMMSSFF(time.start);
  let endTime = convertDateToHHMMSSFF(time.end);
  for (let i = 0; i < schedulingTableData.length; i++) {
    let item = schedulingTableData[i];
    let itemTime =
      item.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION
        ? `${item.FPC_Time}:00:00`
        : `${item.Tel_Time}:00:00`;
    newData.push(item);
    let isWithinRange = itemTime >= startTime && itemTime <= endTime && itemTime != null;
    if (!isWithinRange) continue;
    if (item["F_C_S_P"] === rowDataTypesEnum.SEGMENT) {
      let calculatedValue = item["Calculated_Value"];
      let lastInsertedPromo = null;
      while (calculatedValue > 0) {
        let eligiblePromos = promoList.filter(
          promo => timeToSeconds(promo["Duration"]) <= calculatedValue && promo["PromoCode"] !== lastInsertedPromo
        );
        if (eligiblePromos.length === 0) break;
        let randomIndex = Math.floor(Math.random() * eligiblePromos.length);
        let promo = eligiblePromos[randomIndex];
        let promoDuration = timeToSeconds(promo["Duration"]);
        newData.push({
          PromoCode: promo["PromoCode"],
          VideoID: promo["VideoID"],
          Event_Name: promo["Event_Name"],
          Duration: promo["Duration"],
          Tape_ID: promo["TapeId"],
          Id: idCounter++,
          FPC_ID: item.FPC_ID,
          LocationCode: null,
          ChannelCode: null,
          FPC_Time: "",
          FPC_TimeTo: "00:00:00:00",
          Start_Time: "00:00:00:00",
          ContentCode: item.ContentCode,
          PromoTypeCode: "2",
          SeasonNo: "1",
          Ep_No: "1",
          BreakNumber: item.BreakNumber,
          F_C_S_P: rowDataTypesEnum.PROMO,
          EventDefaultFrontColor: "#333333",
          EventDefaultBackColor: "#3d84c7",
          Position: 1,
          isFiltered: true,
          Tel_Time: "00:00:00:00",
          SequenceNo: idCounter,
        });
        lastInsertedPromo = promo["PromoCode"];
        calculatedValue -= promoDuration;
      }
    }
  }
  return newData;
}

export { getTemplateOptions, getPromosFromTemplateId, insertPromos };
