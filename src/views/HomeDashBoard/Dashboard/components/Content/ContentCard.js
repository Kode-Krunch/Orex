import { Card } from 'components/ui';
import { useEffect, useState } from 'react';
import SpotsDialog from './SpotsDialog';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

function ContentCard({ content, date }) {
  /* REDUX */
  const loginId = useSelector((state) => state.auth.session.LoginId);

  /* STATES */
  const [streamedPercent, setStreamedPercent] = useState(null);
  const [isSpotsDialogOpen, setIsSpotsDialogOpen] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (content) {
        if (isContentActive()) {
          setStreamedPercent(getStreamedPercent());
        } else {
          setStreamedPercent(null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [content]);

  /* HELPER FUNCTIONS */
  const isContentActive = () => {
    try {
      const curTime = getCurTime();
      const startTime = content.startTime;
      const endTime = content.endTime;
      const telecastDate = new Date(content.telecastDate).getDate();
      const curDate = new Date().getDate();
      if (
        telecastDate === curDate &&
        curTime >= startTime &&
        curTime <= endTime
      ) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  const getCurTime = () => {
    try {
      const date = new Date();
      let hours = date.getHours();
      hours = hours < 10 ? `0${hours}` : hours;
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutes}`;
    } catch (error) {
      throw error;
    }
  };

  const getStreamedPercent = () => {
    try {
      const startMinutes = getTimeInMinutes(content.startTime);
      const endMinutes = getTimeInMinutes(content.endTime);
      const curMinutes = getTimeInMinutes(getCurTime());
      const totalDuration = endMinutes - startMinutes;
      const elapsedDuration = curMinutes - startMinutes;
      const percent = Math.round((elapsedDuration / totalDuration) * 100);
      return percent;
    } catch (error) {
      throw error;
    }
  };

  const getTimeInMinutes = (time) => {
    try {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    } catch (error) {
      throw error;
    }
  };

  /* CONSTANTS */
  let isUserAgency = loginId === 120 ? true : false;

  return (
    <>
      <Card
        className={`hover:bg-gray-600 hover:cursor-pointer transition-all ${
          typeof streamedPercent === 'number' &&
          'rounded-bl-none !border-teal-600'
        }`}
        bodyClass={'p-3 flex flex-col gap-2'}
        {...{
          onClick:
            isUserAgency && content.commCount > 0
              ? () => setIsSpotsDialogOpen(true)
              : undefined,
        }}
      >
        <div className="flex items-center justify-between">
          <p className="font-semibold text-teal-600 text-sm">
            {content.contentType}
          </p>
          {isUserAgency && content.commCount > 0 && (
            <p className="!text-white font-semibold py-1 px-2 rounded-md bg-gradient-to-r from-indigo-600 to-sky-600">
              {content.commCount} Spots
            </p>
          )}
        </div>
        <p className="font-semibold text-sm dark:text-slate-300 text-slate-800">
          {content.contentName.length > 70
            ? `${content.contentName.substring(0, 70)}...`
            : content.contentName}
        </p>
        <div className="flex justify-between text-sm dark:text-slate-300 text-slate-800">
          <p>{content.startTime}</p>
          <p>{content.endTime}</p>
        </div>
      </Card>
      {typeof streamedPercent === 'number' && (
        <div
          className={`bg-teal-600 h-1 rounded-bl rounded-br`}
          style={{ width: `${streamedPercent}%` }}
        />
      )}
      {isSpotsDialogOpen && (
        <SpotsDialog
          isOpen={isSpotsDialogOpen}
          setIsOpen={setIsSpotsDialogOpen}
          date={format(date, 'yyyy-MM-dd')}
          startTime={content.startTime}
        />
      )}
    </>
  );
}

export default ContentCard;
