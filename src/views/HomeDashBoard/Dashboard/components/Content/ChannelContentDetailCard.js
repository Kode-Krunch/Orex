import React, { useEffect } from 'react';
import ContentCard from './ContentCard';
import { useRef } from 'react';
import Slider from 'react-slick';
import { Card } from 'components/ui';

const CAROUSEL_SETTINGS = {
  dots: false,
  infinite: false,
  speed: 200,
  draggable: true,
  swipeToSlide: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CAROUSEL_SETTINGS_FOR_EMPTY_LIST = {
  dots: false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function ChannelContentDetailCard({
  channelName,
  channelContents,
  selectedTime,
  date,
}) {
  /* HOOKS */
  const sliderRef = useRef(null);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (sliderRef.current) {
        const formattedSelectedTime = `${
          selectedTime <= 9 ? `0${selectedTime}` : selectedTime
        }:00`;
        const goToIndex = channelContents.findIndex((content) => {
          return (
            (content.startTime === formattedSelectedTime &&
              content.endTime > formattedSelectedTime) ||
            (content.startTime < formattedSelectedTime &&
              content.endTime > formattedSelectedTime)
          );
        });
        sliderRef.current.slickGoTo(goToIndex);
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedTime, channelContents]);

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
    <div className="flex flex-col gap-2">
      <h6>{channelName}</h6>
      {channelContents.length > 0 ? (
        <div className="grid grid-cols-1 px-6" onWheel={handleWheel}>
          <Slider {...CAROUSEL_SETTINGS} ref={sliderRef}>
            {channelContents.map((content) => (
              <ContentCard content={content} date={date} />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="grid grid-cols-1 px-6">
          <Slider {...CAROUSEL_SETTINGS_FOR_EMPTY_LIST}>
            <Card
              className="h-24"
              bodyClass="h-full flex justify-center items-center"
            >
              No contents to show
            </Card>
          </Slider>
        </div>
      )}
    </div>
  );
}

export default ChannelContentDetailCard;
