import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import withHeaderItem from 'utils/hoc/withHeaderItem';
import { Button } from 'components/ui';
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
import { SetSegcaption, SetSegcaption1 } from 'store/auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetcontenttxversion } from 'services/ProgrammingService';
import { apiCallstoreprocedure } from 'services/CommonService';

const ListItem = (props) => {
  const { icon, label, isLast, keyWord, onNavigate } = props;
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
  const { label, ResetData, data, Content, setFieldValue } = props;
  return (
    <div>
      <div className="p-2 border rounded-md border-[#484545] ">
        <div className="bgp">
          <div className="flex justify-between">
            <div className="flex ">
              <div>
                <img
                  src={data?.Content_Image}
                  alt="No Image Found"
                  className="rounded-lg hover:rounded-t-lg"
                  style={{ height: 100, width: 70 }}
                />
              </div>
              <div>
                <p className=" text-green-500 font-bold px-4 capitalize text-xl">
                  {label}
                </p>
                <div className="flex items-center mt-2">
                  <p className="px-4 capitalize">
                    {new Date(data?.FPCReleaseDate)?.getFullYear()}
                  </p>
                  <div
                    className="flex items-center text-xs text-white mr-2"
                    style={{
                      border: '1px solid #f6e6e61a',
                      padding: '2px 10px',
                      background: '#00000029',
                    }}
                  >
                    {data?.View?.ViewName}
                  </div>
                  <p className="text-sm text-blue-400">
                    {data?.ContentType?.ContentTypeName}
                  </p>
                </div>
                <p className="text-sm  text-orange-400 px-4 mt-2">
                  {data?.SlotDuration} Min
                </p>
              </div>
            </div>
            {!Content && (
              <Button
                size="xs"
                shape="circle"
                icon={<HiPencilAlt />}
                onClick={() => {
                  ResetData();
                  setFieldValue('MaximumSegments', '');
                  setFieldValue('EpisodeDuration', '');
                  setFieldValue('VideoType', '');
                  setFieldValue('OriginalRepeatCode', '');
                  setFieldValue('Remarks', '');
                  setFieldValue('House', '');
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SearchInputForContent = ({
  data,
  placeholder,
  SelectedItem,
  setSelectedItem,
  setInputValue,
  InputValue,
  ResetData,
  setFieldValue,
  houseid,
  setContentTypeValue,
  setEpisodeNo,
  values,
}) => {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const recognitionRef = useRef();
  const { Content } = useSelector((state) => state.base.common);
  const { ContentSeg } = useSelector((state) => state.base.common);
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
    setSelectedItem({});
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

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    debounceFn(e.target.value);
  };

  const handleSelectOption = async (data, label, value) => {
    dispatch(SetSegcaption(label));
    setFieldValue('EpisodeDuration', '');
    if (data.ContentClassification?.ClassificationCode == 2) {
      setFieldValue('EpisodeCaption', label);
      setFieldValue(
        'ClassificationCode',
        data.ContentClassification?.ClassificationCode,
      );
    } else {
      setFieldValue('EpisodeCaption', '');
      setFieldValue(
        'ClassificationCode',
        data.ContentClassification?.ClassificationCode,
      );
    }

    setFieldValue('Resolution', data?.AspectRatio);

    setFieldValue('ContentTypeCode', data.ContentType?.ContentTypeCode);
    setFieldValue('ContentCode', data.value);
    setFieldValue('TapeTypeCode', 1);

    houseid(data.ContentType?.ContentTypeCode, setFieldValue);

    if (data.ContentClassification?.ClassificationCode == 2) {
      setContentTypeValue(true);
      setFieldValue('SeasonNo', 1);
      setFieldValue('EpisodeNo', 1);
    } else {
      setContentTypeValue(false);
      setFieldValue('SeasonNo', '');
      setFieldValue('EpisodeNo', '');
    }
    try {
      const TXVersion = await apiGetcontenttxversion(data.value);
      if (TXVersion.status == 200) {
        setFieldValue(
          'TxMasterCode',
          TXVersion.data[0].TXVersion.TXVersionCode,
        );
      }
      if (TXVersion.status == 204) {
        setFieldValue('TxMasterCode', '');
      }
    } catch (error) { }
    setInputValue(label);
    setSelectedItem(data);
    setSearchDialogOpen(false);
    if (ContentSeg != '' && ContentSeg.SeasonNo != 0) {
      alert(JSON.stringify(ContentSeg));
      setFieldValue('SeasonNo', ContentSeg.SeasonNo);
    }
  };

  const handleSelectOption2 = async (data) => {
    // alert('im am segment');
    if (data.EpisodeNo == 0) {
      let datas = {};
      datas.par_ContentCode = data.ContentCode;
      datas.par_SeasonNo = data.SeasonNo;

      apiCallstoreprocedure('usp_PG_GetEpisodewithoutSegmentation', datas)
        .then((response) => {
          if (response.status == 200) {
            const EPNO = response.data.map((item) => ({
              value: item.EpisodeNo,
              label: `${item.EpisodeNo}`,
            }));
            setEpisodeNo(EPNO);
            if (EPNO.length == 1) {
              // alert('hello');
              setFieldValue('EpisodeNo', EPNO[0].value);
            }
            // alert(JSON.stringify(EPNO));
          }

          if (response.status == 204) {
            setEpisodeNo([]);
            // alert(JSON.stringify('EPNO'));
          }
        })
        .catch((error) => {
          if (error.response.status) {
            setEpisodeNo([]);
          }
        });
    }

    dispatch(SetSegcaption(data.ContentName));
    console.log('ClassificationCode', data);
    console.log('ContentTypeCode', data.ContentTypeCode);
    setFieldValue('ClassificationCode', data.ClassificationCode);
    setFieldValue('ContentTypeCode', data.ContentTypeCode);
    setFieldValue('ContentCode', data.ContentCode);
    setFieldValue('TapeTypeCode', 1);
    if (data.ContentTypeCode == 8) {
      setFieldValue('ClassificationCode', 2);
    }
    houseid(data.ContentTypeCode, setFieldValue);

    if (data.EpisodeNo == 0) {
      setContentTypeValue(false);
      dispatch(SetSegcaption1(data.SeasonNo));
      setFieldValue('SeasonNo', data.SeasonNo);
      setFieldValue('EpisodeCaption', `${data.ContentName}`);
    } else {
      setContentTypeValue(true);
      dispatch(SetSegcaption1(data.SeasonNo));
      setFieldValue('SeasonNo', data.SeasonNo);
      setFieldValue('EpisodeNo', data.EpisodeNo);
      setFieldValue(
        'EpisodeCaption',
        `${data.ContentName}_S${data.SeasonNo}_E${data.EpisodeNo}`,
      );
    }
    try {
      const TXVersion = await apiGetcontenttxversion(data.ContentCode);
      if (TXVersion.status == 200) {
        setFieldValue(
          'TxMasterCode',
          TXVersion.data[0].TXVersion.TXVersionCode,
        );
      }
      if (TXVersion.status == 204) {
        setFieldValue('TxMasterCode', '');
      }
    } catch (error) { }
    setInputValue(data.ContentName);

    setFieldValue('Resolution', 1);
    return;
  };
  useEffect(() => {
    if (ContentSeg) {
      handleSelectOption2(ContentSeg);
    }
  }, [ContentSeg]);

  return (
    <>
      <div>
        {Object.keys(SelectedItem).length == 0 ? (
          <div className="px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
            <HiOutlineSearch className="text-xl" />
            <input
              ref={inputRef}
              value={InputValue}
              className="ring-0 outline-none block w-full p-2 text-base bg-transparent text-gray-900 dark:text-gray-100"
              placeholder={placeholder}
              onChange={handleSearch}
            />
            <HiMicrophone
              className={classNames('text-xl ml-2 cursor-pointer', {
                'text-blue-500': isListening,
              })}
              onClick={startListening}
            />
          </div>
        ) : (
          <SelectedText
            key={SelectedItem?.value}
            icon={SelectedItem?.label}
            label={SelectedItem?.label}
            data={SelectedItem}
            setSelectedItem={setSelectedItem}
            ResetData={ResetData}
            setFieldValue={setFieldValue}
            Content={Content}
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
                onNavigate={(e) =>
                  handleSelectOption(data, data.label, data.value)
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default withHeaderItem(SearchInputForContent);
