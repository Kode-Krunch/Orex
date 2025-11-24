import React from 'react';
import './TimescaleBar.css';

const TimescaleBar = ({ timeRanges }) => {
  const bars = [];
  const colors = ['rgb(83 238 145)', 'rgb(248 106 106)', '#ffff']; // Green, Red, Orange

  let prevEndTime = null;
  let pxwidht = 1;
  let diffDuration = 0; // Initialize diffDuration outside the loop

  timeRanges.forEach((range, index) => {
    const [start, end, actualEnd] = range.map(time => {
      const [hour, minute] = time.split(':').map(str => parseInt(str, 10));
      return hour * 60 + minute;
    });

    //console.log('rangerange', range[3])
    let Event_name = range[3]
    let marginLeft = 0;
    if (prevEndTime !== null) {
      marginLeft = prevEndTime + 'px';
    }

    let duration = end - start;
    let width = duration * pxwidht + 'px';
    let colorIndex = 0;

    const subBars = [];

    // Adding label for start time
    subBars.push(
      <div key={index + '_start'} className="label">
        {Event_name} [ {range[0]}] {/* Displaying the start time */}
      </div>
    );
    diffDuration = actualEnd - end;
    console.log('diffDuration', diffDuration)

    if (actualEnd > end) {
      // Case 1: Actual end time exceeds expected end time
      duration = end - start;
      width = duration * pxwidht + 'px';
      subBars.push(
        <div
          key={index}
          className="hour-bar"
          style={{
            backgroundColor: colors[0], // Green
            width: width,
            height: '9px',
            marginLeft: marginLeft,
          }}
        ></div>
      );

      // Calculate the difference in duration


      duration = actualEnd - end;
      width = duration * pxwidht + 'px';
      colorIndex = 1; // Red for exceeded portion
      subBars.push(
        <div
          key={index + '_extra'}
          className="hour-bar"
          style={{
            backgroundColor: colors[colorIndex],
            width: width,
            height: '9px',
          }}
        ></div>
      );
    } else {
      // Case 2: Actual end time within the expected range
      duration = actualEnd - start;
      width = duration * pxwidht + 'px';
      subBars.push(
        <div
          key={index}
          className="hour-bar"
          style={{
            backgroundColor: colors[0], // Green
            width: width,
            height: '9px',
            marginLeft: marginLeft,
          }}
        ></div>
      );

      if (actualEnd < end) {
        duration = end - actualEnd;
        width = duration * pxwidht + 'px';
        colorIndex = 2; // Orange for remaining portion
        subBars.push(
          <div
            key={index + '_remaining'}
            className="hour-bar"
            style={{
              backgroundColor: colors[colorIndex],
              width: width,
              height: '9px',
            }}
          ></div>
        );
      }
    }

    // Adding label for duration
    subBars.push(
      <div key={index + '_diff'} className="label">
        {diffDuration > 0 ? `+${diffDuration}` : diffDuration} min
      </div>
    );

    // Wrap subBars in a single div for each range
    bars.push(
      <div key={index} className="sub-bars">
        {subBars}
      </div>
    );

    // Update prevEndTime
    if (prevEndTime === null) {
      prevEndTime = end - start;
    } else {
      prevEndTime = prevEndTime + end - start;
    }
    prevEndTime = 0;
    // Add a line break after each sub-array except the last one
    if (index < timeRanges.length - 1) {
      bars.push(<span key={index + '_br'} />);
    }
  });

  return <div className="timescale-bar">{bars}</div>;
};

export default TimescaleBar;
