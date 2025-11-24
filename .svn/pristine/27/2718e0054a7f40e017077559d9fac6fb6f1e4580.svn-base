const { Button } = require('components/ui');
const { VscRecord } = require('react-icons/vsc');
const { useSelector } = require('react-redux');
const {
  parseDurationE,
  numberToINRFormat,
} = require('views/Controls/GLOBALFUNACTION');

const ShowBookingFooter = ({
  Deatils,
  onDialogClose,
  onDialogOk,
  DealData,
}) => {
  const ChannelSetting = useSelector(
    (state) => state.auth.session.ChannelSetting,
  );
  let totalDuration = 0;
  let totalSpotAmount = 0;
  Deatils.forEach((item) => {
    totalDuration += parseDurationE(
      Number(ChannelSetting[0].FramePerSec),
      item.Duration,
    );
    totalSpotAmount += item.SpotAmount;
  });
  return (
    <div className="flex item-center justify-between">
      <div className="flex">
        {' '}
        <div
          className="mr-2 w-[150px]"
          style={{
            backgroundColor: 'rgb(26, 36, 48)',
            borderColor: 'rgb(75, 85, 99)',
            padding: '0.50rem',
            borderRadius: '10px',
          }}
        >
          <div className=" w-full">
            <div className="flex justify-between">
              <p>Total Amount</p>
              <p className="dark:text-sky-500 text-xl font-normal">
                {DealData?.CurrencySymbol}
              </p>
            </div>
            <h3>
              {DealData?.CurrencySymbol}
              {numberToINRFormat(totalSpotAmount)}
            </h3>
          </div>
        </div>
        <div
          className="mr-2 w-[150px]"
          style={{
            backgroundColor: 'rgb(26, 36, 48)',
            borderColor: 'rgb(75, 85, 99)',
            padding: '0.50rem',
            borderRadius: '10px',
          }}
        >
          <div className=" w-full">
            <div className="flex justify-between">
              <p>Duration [MIN]</p>
              <p className="dark:text-sky-500 text-xl font-normal">
                <VscRecord size={20} className="text-rose-700" />
              </p>
            </div>
            <h3 className="m-1">{Math.round(totalDuration / 60)}</h3>
          </div>
        </div>
        <div
          className="mr-2 w-[150px]"
          style={{
            backgroundColor: 'rgb(26, 36, 48)',
            borderColor: 'rgb(75, 85, 99)',
            padding: '0.50rem',
            borderRadius: '10px',
          }}
        >
          <div className=" w-full">
            <div className="flex justify-between">
              <p>Spots Count</p>
              <p className="dark:text-sky-500 text-xl font-normal">
                <VscRecord size={20} className="text-rose-700" />
              </p>
            </div>
            <h3 className="m-1">{Deatils.length}</h3>
          </div>
        </div>
      </div>
      <div className="text-right mt-6">
        <Button
          className="ltr:mr-2 rtl:ml-2"
          variant="plain"
          onClick={onDialogClose}
        >
          Cancel
        </Button>
        <Button variant="solid" onClick={onDialogOk}>
          Okay
        </Button>
      </div>
    </div>
  );
};

export default ShowBookingFooter;
