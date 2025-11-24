import { Button, Dialog } from 'components/ui';
import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import ActivityLogContext from '../../context/ActivityLogContext';
import ListItem from './ListItem';
import { apiGetclientmasterdropmaster } from 'services/CreditcontrolService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { apiGetBookingByClient } from 'services/SalesAdminService';
import { useSelector } from 'react-redux';
import { searchTypeEnum } from '../../enum';

function SearchDialog() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);

  /* CONTEXT */
  const {
    isSearchDialogOpen,
    setIsSearchDialogOpen,
    searchType,
    setSearchType,
    searchResult,
    setSearchResult,
    formState,
    setFormState,
    staticInfo,
    setStaticInfo,
    setShowLoader,
  } = useContext(ActivityLogContext);

  /* STATES */
  const [filteredResult, setFilteredResult] = useState([]);
  const [inputValue, setInputValue] = useState('');

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        if (isSearchDialogOpen) {
          setShowLoader(true);
          if (searchType === searchTypeEnum.client) {
            const response = await apiGetclientmasterdropmaster();
            if (response.status === 200) {
              setSearchResult(response.data);
            } else if (response.status === 204) {
              setSearchResult([]);
            } else {
              openNotification(
                'danger',
                `Unable to fetch clients. Server responded ${response.status}`,
              );
            }
          } else if (searchType === searchTypeEnum.booking) {
            const response = await apiGetBookingByClient(
              formState.client.value,
              channel,
              token,
            );
            if (response.status === 200) {
              setSearchResult(response.data);
            } else if (response.status === 204) {
              setSearchResult([]);
            } else {
              openNotification(
                'danger',
                `Unable to fetch clients. Server responded ${response.status}`,
              );
            }
          }
          setShowLoader(false);
        }
      } catch (error) {
        setShowLoader(false);
        openNotification(
          'danger',
          `Something went wrong while fetching ${searchType}`,
        );
        console.error(error);
      }
    })();
  }, [isSearchDialogOpen]);

  useEffect(() => {
    try {
      if (Array.isArray(searchResult)) {
        if (inputValue.length === 0) {
          setFilteredResult(Object.assign([], searchResult).splice(0, 3));
        } else {
          if (searchType === searchTypeEnum.client) {
            setFilteredResult(
              searchResult.filter((result) =>
                result.ClientName.toLowerCase().includes(
                  inputValue.toLowerCase(),
                ),
              ),
            );
          } else if (searchType === searchTypeEnum.booking) {
            setFilteredResult(
              searchResult.filter((result) =>
                result.BookingCode.toLowerCase().includes(
                  inputValue.toLowerCase(),
                ),
              ),
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [searchResult, inputValue, searchType]);

  /* EVENT HANDLERS */
  const handleSearchDialogClose = () => {
    try {
      setIsSearchDialogOpen(false);
      setSearchType(null);
      setInputValue('');
      setFilteredResult(searchResult.splice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (result) => {
    try {
      if (searchType === searchTypeEnum.client) {
        setFormState({
          booking: null,
          client: { value: result.ClientCode, label: result.ClientName },
        });
      } else if (searchType === searchTypeEnum.booking) {
        setFormState({
          ...formState,
          booking: { value: result.BookingNumber, label: result.BookingCode },
        });
        setStaticInfo({
          ...staticInfo,
          deal: { dealCode: result.DealCode, dealNumber: result.DealNumber },
          agency: {
            agencyName: result.AgencyName,
            agencyCode: result.AgencyCode,
          },
        });
      }
      handleSearchDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      contentClassName="p-0"
      isOpen={isSearchDialogOpen}
      closable={false}
      onRequestClose={handleSearchDialogClose}
    >
      <div>
        <div className="px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <HiOutlineSearch className="text-xl" />
            <input
              value={inputValue}
              className="ring-0 outline-none block w-full p-4 text-base bg-transparent text-gray-900 dark:text-gray-100"
              placeholder={`Search ${
                searchType === searchTypeEnum.client ? 'Client' : 'Booking'
              }`}
              onChange={(event) => setInputValue(event.target.value)}
              autoFocus
            />
          </div>
          <Button size="xs" onClick={handleSearchDialogClose}>
            Esc
          </Button>
        </div>
        <div className="py-6 px-5 max-h-[550px] overflow-y-auto flex flex-col gap-4">
          {filteredResult.length > 0 ? (
            <>
              {inputValue.length === 0 && (
                <h6>
                  Recent{' '}
                  {searchType === searchTypeEnum.client
                    ? 'Clients'
                    : 'Bookings'}
                </h6>
              )}
              {searchType === searchTypeEnum.client
                ? filteredResult.map((result) => (
                    <ListItem
                      key={result.ClientCode}
                      label={result.ClientName}
                      keyWord={inputValue}
                      handleClick={() => handleClick(result)}
                    />
                  ))
                : filteredResult.map((result) => (
                    <ListItem
                      key={result.BookingNumber}
                      label={result.BookingCode}
                      keyWord={inputValue}
                      handleClick={() => handleClick(result)}
                    />
                  ))}
            </>
          ) : (
            <div className="my-10 text-center text-base">
              {inputValue.length > 0 ? (
                <>
                  <span>No results for </span>
                  <span className="heading-text">'{inputValue}'</span>
                </>
              ) : (
                <span>No results</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default SearchDialog;
