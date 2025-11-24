import { Button, Dialog, Input, Select } from 'components/ui';
import { Slider } from 'primereact/slider';
import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';

function SearchContentDialog({
  IsDialogOpen,
  setIsDialogOpen,
  setSelectedContentToSearch,
  SelectedRow,
  setSelectedRow,
  LICENCE_OPTIONS,
  selectedLicence,
  setSelectedLicence,
  genreOptions,
  selectedGeneres,
  setSelectedGeneres,
  slotDurationValue,
  setSlotDurationValue,
  minSlotDuration,
  maxSlotDuration,
  ContentList,
  selectedContentToSearch,
  addNewContent,
  setSelContent,
  setSlotduration,
}) {
  /* EVENT HANDLERS */
  const onDialogClose = () => {
    setSelectedRow(null);
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      isOpen={IsDialogOpen}
      width={1200}
      className="z-10"
      height={'95%'}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      contentClassName="my-4 flex flex-col"
    >
      <div className="flex justify-between items-center mr-3">
        <h4>Search Contenttttt</h4>
        <Input
          size="sm"
          prefix={<HiOutlineSearch className="text-lg" />}
          placeHolder="Search Content"
          onChange={(e) => setselectedContentToSearch(e.target.value)}
          className="w-[30%]"
        />
      </div>
      <div className="flex justify-between items-center gap-2 mt-3 mb-4 mr-3">
        <div className="flex gap-2 grow">
          {SelectedRow !== null && (
            <div
              className="flex items-center h-full p-2 border border-gray-700 rounded bg-teal-900 hover:cursor-not-allowed"
              style={{ textWrap: 'nowrap' }}
            >
              <p className="dark:!text-white text-black ">
                <span>Insert Start Time - </span>
                <span className="font-bold">{SelectedRow?.StartTime}</span>
              </p>
            </div>
          )}
          <Select
            size="sm"
            placeholder="License"
            className="min-w-[20%] max-w-20%]"
            options={LICENCE_OPTIONS}
            value={selectedLicence}
            onChange={(value) => setSelectedLicence(value)}
          />
          <Select
            isMulti
            size="sm"
            placeholder="Genre"
            className="min-w-[30%] max-w-full"
            options={genreOptions}
            value={selectedGeneres}
            onChange={(value) => setSelectedGeneres(value)}
          />
        </div>
        <div className=" w-[30%] flex items-center">
          <span className="dark:!text-white text-black ">
            {slotDurationValue[0]} Min
          </span>
          {maxSlotDuration != null && (
            <Slider
              value={slotDurationValue}
              onChange={(e) => {
                if (e.value[0] > e.value[1]) {
                  setSlotDurationValue([e.value[1], e.value[0]]);
                } else {
                  setSlotDurationValue(e.value);
                }
              }}
              min={minSlotDuration}
              max={maxSlotDuration}
              range
              className="w-[180px] mx-3"
            />
          )}
          <span className="dark:!text-white text-black ">
            {slotDurationValue[1]} Min
          </span>
        </div>
      </div>
      <div className="grow grid grid-cols-2 gap-2 auto-rows-max mr-3 overflow-auto pr-2">
        {ContentList.filter((item) =>
          item.ContentName?.toLowerCase().includes(
            selectedContentToSearch.toLowerCase(),
          ),
        ).map((item, index) => (
          <div
            key={index}
            className="dark:!border-b dark:!border-[#484545] border-b border-[#49484857] pb-2"
          >
            <div className="bgp">
              <div className="flex justify-between">
                <div className="flex ">
                  <div>
                    <img
                      src={item.Content_Image}
                      alt="No Image Found"
                      className="rounded-lg hover:rounded-t-lg"
                      style={{ height: 100, width: 70 }}
                    />
                  </div>
                  <div>
                    <p className=" dark:!text-white text-black  font-semibold px-4 capitalize">
                      {index + 1}. {item.ContentName}
                    </p>
                    <div className="flex items-center mt-2">
                      <p className="px-4 capitalize">
                        {' '}
                        {new Date(item.FPCReleaseDate)?.getFullYear()}
                      </p>{' '}
                      <div
                        className="flex items-center text-xs dark:!text-white text-black  mr-2"
                        style={{
                          border: '1px solid #f6e6e61a',
                          padding: '2px 10px',
                          background: '#00000029',
                        }}
                      >
                        {item.View?.ViewName}
                      </div>{' '}
                      <p className="text-sm text-blue-400">
                        {item.ContentType.ContentTypeName}
                      </p>
                    </div>
                    <p className="text-sm  text-orange-400 px-4 mt-2">
                      {item.SlotDuration} Min
                    </p>
                  </div>
                </div>
                <Button
                  size="xs"
                  shape="circle"
                  icon={<MdOutlineAdd />}
                  onClick={() => {
                    addNewContent(item.ContentName);
                    setSelContent(item);
                    setSlotduration(item.SlotDuration);
                  }}
                />
              </div>
            </div>
            {/* <div className="flex justify-center">
                  <img
                    src={item.Content_Image}
                    alt="No Image Found"
                    className="rounded-lg hover:rounded-t-lg"
                    style={{ height: 180, width: 250 }}
                  />
                </div>

                <div>
                  <div className="text-center mt-2">
                    <p
                      className="dark:!text-white text-black  font-semibold px-4 capitalize"
                      style={{
                        textWrap: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.ContentName}
                    </p>
                  </div>
                  <div className="flex items-center mb-2 justify-center">
                    <div className="flex mr-2">
                      <p className="text-xs">{item.SlotDuration} Min</p>
                    </div>
                    <div
                      className="flex items-center text-xs dark:!text-white text-black  mr-2"
                      style={{
                        border: '1px solid #f6e6e61a',
                        padding: '2px 10px',
                        background: '#00000029',
                      }}
                    >
                      {item.View?.ViewName}
                    </div>

                    <Button
                      size="xs"
                      shape="circle"
                      icon={<MdOutlineAdd />}
                      onClick={() => {
                        AddContent(item.ContentName);
                        setSelContent(item);
                      }}
                    />
                  </div>
                </div> */}
          </div>
        ))}
      </div>
    </Dialog>
  );
}

export default SearchContentDialog;
