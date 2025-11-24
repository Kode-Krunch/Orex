import React, { useEffect } from 'react';
import Scheduler from 'views/Controls/Scheduler/Scheduler';
import { hideStackedSideNav } from 'views/Scheduling/general';
import './index.css';

function TestScheduling() {
  /* USE EFFECTS */
  useEffect(() => {
    try {
      hideStackedSideNav();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="h-[89vh]">
      <Scheduler></Scheduler>
    </div>
  );
}

export default TestScheduling;
