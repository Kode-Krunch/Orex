import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import withHeaderItem from 'utils/hoc/withHeaderItem';
import { Button, toast, Notification } from 'components/ui';
import useThemeClass from 'utils/hooks/useThemeClass';
import navigationIcon from 'configs/navigation-icon.config';
import debounce from 'lodash/debounce';
import {
  HiOutlineSearch,
  HiChevronRight,
  HiPencilAlt,
  HiMicrophone,
} from 'react-icons/hi';
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
  const { icon, label, isLast, keyWord, handleClear, Deatils } = props;
  const { textTheme } = useThemeClass();

  return (
    <div>
      <div
        className={classNames(
          'flex items-center justify-between rounded-lg p-3.5 cursor-pointer user-select',
          'bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700/90',
          !isLast && 'mb-3',
        )}
      >
        <div className="flex items-center">
          <div>{icon && navigationIcon[icon]}</div>
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
        {Deatils.length == 0 && (
          <HiPencilAlt
            onClick={() => {
              handleClear();
            }}
            className="text-lg"
          />
        )}
      </div>
    </div>
  );
};

export const SearchInputBooking = ({
  className,
  data,
  placeholder,
  SelectedItem,
  setSelectedItem,
  DealData,
  length,
  setFormState,
  setCheckedItems,
  setThe_data_I_want_To_Upload,
  setInputValue,
  InputValue,
  Deatils,
  maxListHeight = 900,
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
      recognition.interimResults = false;
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
    if (noResult) {
      setNoResult(false);
    }
    const value = query;

    if (value.length >= 1) {
      const filteredOptions = data
        .filter((option) =>
          option.label.toLowerCase().includes(value.toLowerCase()),
        )
        .slice(0, 50);
      setSearchResult(filteredOptions);
      setSearchDialogOpen(true);
    } else {
      setSearchResult([]);
    }
  }
  function closeNotification(key) {
    if (typeof key !== 'string') {
      key.then((resolvedValue) => {
        toast.remove(resolvedValue);
      });
    } else {
      toast.remove(key);
    }
  }

  function openNotificationw(mes) {
    const notificationKey = toast.push(
      <Notification title="" duration={0}>
        <div>{mes}</div>
        <div className="text-right mt-3">
          <Button
            size="sm"
            variant="solid"
            className="mr-2"
            onClick={() => {
              closeNotification(notificationKey);
              setCheckedItems([]);
              setInputValue('');
              setSearchResult([]);
              setSearchDialogOpen(false);
              setSelectedItem([]);
              setThe_data_I_want_To_Upload();
              setFormState({
                MID: 2,
                position: 3,
                datesrange: [],
              });
            }}
          >
            Confirm
          </Button>
          <Button size="sm" onClick={() => closeNotification(notificationKey)}>
            Close
          </Button>
        </div>
      </Notification>,
    );
  }

  const handleClear = () => {
    console.log(length);
    if (length > 0) {
      openNotificationw('Are you Sure you want to clear the data.?');
      return;
    } else {
      // closeNotification(notificationKey);
      setCheckedItems([]);
      setInputValue('');
      setSearchResult([]);
      setSearchDialogOpen(false);
      setSelectedItem([]);
      setFormState({
        MID: 2,
        position: 3,
        datesrange: [],
      });
      setThe_data_I_want_To_Upload();
    }
  };

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
            {/* <div className="flex items-center" > */}
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
            icon={
              SelectedItem.label ||
              `${
                DealData?.DealCode +
                ' | ' +
                DealData?.ClientName +
                ' | ' +
                DealData?.AgencyName
              }`
            }
            label={
              SelectedItem.label ||
              `${
                DealData?.DealCode +
                ' | ' +
                DealData?.ClientName +
                ' | ' +
                DealData?.AgencyName
              }`
            }
            setSelectedItem={setSelectedItem}
            handleClear={handleClear}
            Deatils={Deatils}
          />
        )}
        {searchDialogOpen && (
          <div
            className="py-6 px-5 overflow-y-auto"
            style={{ maxHeight: `${maxListHeight}px` }}
          >
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

export default withHeaderItem(SearchInputBooking);
