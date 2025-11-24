import React from 'react';
import { useConfig } from '../ConfigProvider';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const Sorter = ({ sort }) => {
  const { themeColor, primaryColorLevel } = useConfig();

  const color = `text-${themeColor}-${primaryColorLevel}`;

  const renderSort = () => {
    if (typeof sort === 'boolean' && !sort) {
      return <FaSort />;
    }

    if (typeof sort === 'string' && sort === 'asc') {
      return <FaSortUp className={color} />;
    }

    if (typeof sort === 'string' && sort === 'desc') {
      return <FaSortDown className={color} />;
    }
  };

  return <div className="inline-flex">{renderSort()}</div>;
};

export default Sorter;
