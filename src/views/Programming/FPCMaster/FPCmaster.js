import { useEffect, useState } from 'react';
import { Alert } from 'components/ui';
import { Card } from 'components/ui';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import Calendar from 'views/crm/Calendar';
import { useSelector } from 'react-redux';
import SelectChannelDialog from 'views/Controls/SelectChannelDialog';


const Contentmaster = () => {
  /* REDUX */
  const Channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [log, setlog] = useState('');

  /* HOOKS */
  const [message, setMessage] = useTimeOutMessage();

  useEffect(() => {
    const gboxElement = document.getElementsByClassName('Gbox2')[0];
    const gboxElementchild =
      document.getElementsByClassName('Gbox2')[0].children[1];

    if (gboxElement) {
      gboxElement.style.display = 'block';
      gboxElementchild.style.display = 'none';
    } // Optionally, you might want to revert the change when the component unmounts
    return () => {
      if (gboxElement) {
        gboxElement.style.display = 'none';
        gboxElementchild.style.display = 'none';
      }
    };
  }, []);
  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <Card>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-3">
            <Calendar objChannel={Channel}></Calendar>
          </div>
        </div>
      </Card>
      <SelectChannelDialog />
    </>
  );
};

export default Contentmaster;
