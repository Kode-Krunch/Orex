import { Card } from 'components/ui';

export const details = (item) => {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div>
          <div className="flex gap-1.5 items-end mb-2">
            <h5 className="font-bold leading-none">{item.ContentName}</h5>
            {/* <p className="font-semibold">Episode {item.EpisodeNo}</p> */}
          </div>
          <p className="flex items-center gap-1">
            <span>Season {item.SeasonNo}</span>
          </p>
          <p className="font-semibold flex items-center gap-1">
            <span>Episode {item.EpisodeNo}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export function formatDateYMD(dateStr) {
  // Parse the date string into a Date object
  const dateObj = new Date(dateStr);

  // Format the date using locale-aware formatting options
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);

  // Return the formatted date
  return formattedDate;
}
export const formatDateWDMY = (date, is) => {
  if (!date || isNaN(new Date(date + 'T00:00:00').getTime())) {
    return null;
  }

  const options = {
    ...(!is && { weekday: 'long' }),
    ...(!is && { day: 'numeric' }),
    ...(!is && { month: 'short' }),
    ...(!is && { year: 'numeric' }),
  };

  return new Intl.DateTimeFormat('en-GB', options).format(new Date(date + 'T00:00:00'));
};


export function formatTime(timeStr) {
  // Parse the time string into a Date object
  const dateObj = new Date(`1970-01-01T${timeStr}:00`);

  // Get the hours and minutes
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  // Determine the meridian (AM or PM)
  const meridian = hours >= 12 ? 'PM' : 'AM';

  // Format the hours in 12-hour format
  const formattedHours = hours % 12 || 12; // Handle 00:00 as 12:00 AM

  // Return the formatted time string
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${meridian}`;
}
export function getDates(fpcnew) {
  let dates = [];
  let res = '';
  let part2 = '';

  fpcnew.forEach((data) => {
    console.log(data);

    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach((day) => {
      res = data[day].split('|');
      part2 = res[1];
      if (part2.trim() == '-5963868') {
        dates.push(new Date('2024-02-' + res[0]));
      }
    });
  });
  return dates;
}
