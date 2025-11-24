import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import withHeaderItem from 'utils/hoc/withHeaderItem';
import useThemeClass from 'utils/hooks/useThemeClass';
import navigationIcon from 'configs/navigation-icon.config';
import debounce from 'lodash/debounce';
import {
  HiOutlineSearch,
  HiChevronRight,
  HiPencilAlt,
  HiMicrophone,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';

const ListItem = (props) => {
  const { icon, label, url = '', isLast, keyWord, onNavigate } = props;
  const { textTheme } = useThemeClass();

  return (
    <div onClick={onNavigate}>
      <div
        className={classNames(
          'flex items-center justify-between rounded-lg p-3.5 cursor-pointer user-select',
          'bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700/90',
          !isLast && 'mb-3',
        )}
      >
        <div className="flex items-center">
          <div
            className={classNames(
              'mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm text-xl group-hover:shadow h-6 w-6 flex items-center justify-center bg-white dark:bg-gray-700',
              textTheme,
              'dark:text-gray-100',
            )}
          >
            {icon && navigationIcon[icon]}
          </div>
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
    </div>
  );
};

const SelectedText = (props) => {
  const { isLast, keyWord, ResetData, SelectedItem } = props;
  const { textTheme } = useThemeClass();

  return (
    <div>
      <div
        className={classNames(
          'flex items-center justify-between rounded-lg p-2 cursor-pointer user-select',
          'bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700/90',
          !isLast && 'mb-3',
        )}
      >
        <div className="flex items-center">
          <div>
            {SelectedItem?.label && navigationIcon[SelectedItem?.label]}
          </div>
          <div className="text-gray-900 dark:text-gray-300">
            <Highlighter
              autoEscape
              highlightClassName={classNames(
                textTheme,
                'underline bg-transparent font-semibold dark:text-white',
              )}
              searchWords={[keyWord]}
              textToHighlight={SelectedItem?.label}
            />
          </div>
        </div>
        <HiPencilAlt
          onClick={() => {
            // alert('hk');
            ResetData();
          }}
          className="text-lg"
        />
      </div>
    </div>
  );
};

export const Search = ({
  className,
  data,
  placeholder,
  SelectedItem,
  setSelectedItem,
  setInputValue,
  InputValue,
  ResetData,
}) => {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const [isListening, setIsListening] = useState(false);

  const inputRef = useRef();
  const recognitionRef = useRef();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSearch({ target: { value: transcript } });
      };
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const debounceFn = debounce(handleDebounceFn, 200);

  async function handleDebounceFn(query) {
    setSelectedItem([]);
    // handleClear()
    if (noResult) {
      setNoResult(false);
    }
    const value = query;
    console.log('value', value);
    console.log('data', data);
    if (value.length >= 1) {
      const filteredOptions = data
        .filter((option) =>
          option.label?.toLowerCase().includes(value.toLowerCase()),
        )
        .slice(0, 50);
      setSearchResult(filteredOptions);
      setSearchDialogOpen(true);
    } else {
      setSearchResult([]);
    }
  }

  const handleSearch = (e) => {
    console.log(e);
    console.log(e.target.value);
    setInputValue(e.target.value);
    debounceFn(e.target.value);
  };

  const handleSelectOption = (label, value) => {
    setInputValue(label);
    setSelectedItem({ label: label, value: value });
    setSearchDialogOpen(false);
  };

  return (
    <>
      <div>
        {SelectedItem.length === 0 ? (
          <div className="px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
            {/* <div className="flex items-center"> */}
            <HiOutlineSearch className="text-xl" />
            <input
              ref={inputRef}
              value={InputValue}
              className="ring-0 outline-none block w-full p-2 text-base bg-transparent text-gray-900 dark:text-gray-100"
              placeholder={placeholder}
              onChange={handleSearch}
            />
            {/* <HiMicrophone
                                className={classNames("text-xl ml-2 cursor-pointer", { "text-blue-500": isListening })}
                                onClick={startListening}
                            /> */}
            {/* </div> */}
            <HiMicrophone
              className={classNames('text-xl ml-2 cursor-pointer', {
                'text-blue-500': isListening,
              })}
              onClick={startListening}
            />
            {/* <Button onClick={handleClear} size="xs">
                            X
                        </Button> */}
          </div>
        ) : (
          <SelectedText
            key={SelectedItem.value}
            icon={SelectedItem.label}
            label={SelectedItem.label}
            SelectedItem={SelectedItem}
            setSelectedItem={setSelectedItem}
            ResetData={ResetData}
          />
        )}
        {searchDialogOpen && (
          <div className="py-6 px-5 max-h-[550px] overflow-y-auto">
            {searchResult.map((data, index) => (
              <ListItem
                key={data.value}
                icon={data.label}
                label={data.label}
                keyWord={inputRef.current?.value || ''}
                onNavigate={(e) => handleSelectOption(data.label, data.value)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default withHeaderItem(Search);
