import { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { CAROUSEL_SETTINGS } from './constants';
import './styles.css';

export default function TimeSelector({
  selectedTime,
  setSelectedTime,
  times,
  carouselSettings = CAROUSEL_SETTINGS,
}) {
  /* HOOKS */
  const sliderRef = useRef(null);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(selectedTime);
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedTime]);

  /* EVENT HANDLERS */
  const handleWheel = (event) => {
    try {
      if (event.shiftKey && sliderRef.current) {
        if (event.deltaY < 0) {
          sliderRef.current.slickPrev();
        } else {
          sliderRef.current.slickNext();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onWheel={handleWheel} className="grid grid-cols-1">
      <Slider {...carouselSettings} ref={sliderRef}>
        {times.map((curTime) => (
          <h6
            key={curTime.value}
            className={`px-4 py-2 dark:border-r dark:border-r-gray-700 border border-gray-700 text-center font-semibold hover:cursor-pointer hover:bg-teal-700 transition rounded ${
              selectedTime === curTime.value ? 'bg-teal-700' : ''
            }`}
            style={{ textWrap: 'nowrap' }}
            onClick={() => setSelectedTime(curTime.value)}
          >
            {curTime.label}
          </h6>
        ))}
      </Slider>
    </div>
  );
}
