import React from 'react';

const FormatDate = ({ dateString }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: '2-digit', // Day with leading zero if necessary
      month: 'short', // Abbreviated month name
      year: 'numeric', // Full year
    });
  };

  return <div>{formatDate(dateString)}</div>;
};

export default FormatDate;
