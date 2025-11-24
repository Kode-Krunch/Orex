import React from 'react';
import classNames from 'classnames';
import { Badge } from 'components/ui';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

export const eventColors = {
  red: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-red-500',
  },
  orange: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-orange-500',
  },
  amber: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-amber-500',
  },
  yellow: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-yellow-500',
  },
  yellow300: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-yellow-300',
  },
  lime: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-lime-500',
  },
  green: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-green-500',
  },
  emerald: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-emerald-500',
  },
  teal: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-teal-500',
  },
  cyan: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-cyan-500',
  },
  sky: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-sky-500',
  },
  blue: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-blue-500',
  },
  indigo: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-indigo-500',
  },
  purple: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-purple-500',
  },
  fuchsia: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-fuchsia-500',
  },
  pink: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-pink-500',
  },
  rose: {
    bg: 'bg-transparent dark:bg-transparent',
    text: 'text-white dark:text-white',
    dot: 'bg-rose-500',
  },
};

export const eventColorsAg = {
  red: {
    bg: 'bg-red-50 dark:bg-red-800',
    text: 'text-red-800 dark:text-red-100',
    dot: 'bg-red-800',
    button: 'red-600',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-800',
    text: 'text-orange-800 dark:text-orange-100',
    dot: 'bg-orange-800',
    button: 'orange-600',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-800',
    text: 'text-amber-800 dark:text-amber-100',
    dot: 'bg-amber-800',
    button: 'amber-600',
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-100',
    dot: 'bg-yellow-800',
    button: 'yellow-600',
  },
  lime: {
    bg: 'bg-lime-50 dark:bg-lime-800',
    text: 'text-lime-800 dark:text-lime-100',
    dot: 'bg-lime-800',
    button: 'lime-600',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-800',
    text: 'text-green-800 dark:text-green-100',
    dot: 'bg-green-800',
    button: 'green-600',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-800',
    text: 'text-emerald-800 dark:text-emerald-100',
    dot: 'bg-emerald-800',
    button: 'emerald-600',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-800',
    text: 'text-teal-800 dark:text-teal-100',
    button: 'teal-600',
    dot: 'bg-teal-800',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-800',
    text: 'text-cyan-800 dark:text-cyan-100',
    button: 'cyan-600',
    dot: 'bg-cyan-800',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-800',
    text: 'text-sky-800 dark:text-sky-100',
    button: 'sky-600',
    dot: 'bg-sky-800',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-800',
    text: 'text-blue-800 dark:text-blue-100',
    button: 'blue-600',
    dot: 'bg-blue-800',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-800',
    text: 'text-indigo-800 dark:text-indigo-100',
    button: 'indigo-600',
    dot: 'bg-indigo-800',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-800',
    text: 'text-purple-800 dark:text-purple-100',
    button: 'purple-600',
    dot: 'bg-purple-800',
  },
  fuchsia: {
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-800',
    text: 'text-fuchsia-800 dark:text-fuchsia-100',
    button: 'fuchsia-600',
    dot: 'bg-fuchsia-800',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-800',
    text: 'text-pink-800 dark:text-pink-100',
    button: 'pink-600',
    dot: 'bg-pink-800',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-800',
    text: 'text-rose-800 dark:text-rose-100',
    button: 'rose-600',
    dot: 'bg-rose-800',
  },
};
const CalendarView = (props) => {
  const { wrapperClass, ...rest } = props;

  return (
    <div className={classNames('calendar', wrapperClass)}>
      <FullCalendar
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'title',
          center: '',
          // right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next',
          right: 'prev,next',
        }}
        dayMaxEvents={2}
        eventContent={(arg) => {
          const { extendedProps } = arg.event;
          const { isEnd, isStart } = arg;
          return (
            <div
              className={classNames(
                'custom-calendar-event flex items-center !min-h-0 mx-1',
                extendedProps.eventColor
                  ? eventColors[extendedProps.eventColor]?.bg
                  : '',
                extendedProps.eventColor
                  ? eventColors[extendedProps.eventColor]?.text
                  : '',
                isEnd &&
                !isStart &&
                '!rounded-tl-none !rounded-bl-none !rtl:rounded-tr-none !rtl:rounded-br-none',
                !isEnd &&
                isStart &&
                '!rounded-tr-none !rounded-br-none !rtl:rounded-tl-none !rtl:rounded-bl-none',
              )}
            >
              {!(isEnd && !isStart) && (
                <Badge
                  className={classNames(
                    'mr-1 rtl:ml-1',
                    extendedProps.eventColor
                      ? eventColors[extendedProps.eventColor].dot
                      : '',
                  )}
                />
              )}
              {/* {!(isEnd && !isStart) && <span>{arg.timeText}</span>} */}
              <span className="ml-1 rtl:mr-1 font-semibold event-name">
                {arg.event.title}
              </span>
            </div>
          );
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        {...rest}
      />
    </div>
  );
};

export default CalendarView;
