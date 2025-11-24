import classNames from 'classnames';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { HiChevronRight } from 'react-icons/hi';
import useThemeClass from 'utils/hooks/useThemeClass';

function ListItem({ value, label, keyWord, handleClick }) {
  /* HOOKS */
  const { textTheme } = useThemeClass();

  return (
    <div
      className={classNames(
        'flex items-center justify-between rounded-lg p-3.5 cursor-pointer user-select',
        'bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700/90',
      )}
      key={value}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="text-gray-900 dark:text-gray-300">
          <Highlighter
            autoEscape
            highlightClassName={classNames(
              textTheme,
              'underline bg-transparent font-semibold dark:text-white',
            )}
            searchWords={[keyWord]}
            textToHighlight={label}
          />
        </div>
      </div>
      <HiChevronRight className="text-lg" />
    </div>
  );
}

export default ListItem;
