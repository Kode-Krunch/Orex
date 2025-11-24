import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Button, Upload, Avatar, Input, Notification } from 'components/ui';
import { Transition } from '@headlessui/react';
import { LuImage, } from 'react-icons/lu';
import { FaCircleCheck } from 'react-icons/fa6';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types'; // Added import
import CustomField from 'views/Controls/CustomField';
import { apiPostCategoryMaster, apiPostLocalEventMaster, apiPostSportsMaster, apiPostTeamMaster } from 'services/EventServices';
import { apiPostCountrymaster } from 'services/MasterService';
import { PiImage } from 'react-icons/pi';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const AddItemDialog = ({ isOpen, setIsOpen, dialogProps, setDialogProps, addFn, selCategory, selCountry, selSport, selEvent }) => {
  const channel = useSelector((state) => state.locale.selectedChannel);
  const [options, setOptions] = useState(cloneDeep(dialogProps?.options?.sort((a, b) => a.name.localeCompare(b.name)) || []));
  const [selOptions, setSelOptions] = useState(cloneDeep(dialogProps?.selOptions || []));
  const [fullName, setFullName] = useState('');
  const [shortName, setShortName] = useState('');
  const [image, setImage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setShowCreateForm(false);
    resetCreateForm();
    setDialogProps({});
  };

  const toggleItem = (item) => {
    setSelOptions((prev) =>
      prev.some((opt) => opt.id === item.id)
        ? prev.filter((opt) => opt.id !== item.id)
        : [...prev, item]
    );
  };

  const handleAdd = () => {
    addFn(selOptions.sort((a, b) => a.name.localeCompare(b.name)));
    handleClose();
  };

  const onFileUpload = (files) => {
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const beforeUpload = (files) => {
    const allowedFileType = ['image/jpeg', 'image/jpg', 'image/png'];
    for (const file of files) {
      if (!allowedFileType.includes(file.type)) {
        return 'Please upload a .jpeg or .png file!';
      }
    }
    return true;
  };

  const handleCreateItem = async () => {
    if (!fullName || !shortName) {
      setShowError(true);
      return;
    }
    try {
      let option = { name: fullName, shortName, icon: image, children: [] };
      let apiResponse;
      switch (dialogProps.id) {
        case 'addCategories':
          apiResponse = await apiPostCategoryMaster({
            CategoryName: fullName,
            Type: 'others',
            IsActive: 1,
          });
          option.id = apiResponse.data.CategoryCode;
          openNotification('success', 'Category is created successfully');
          break;
        case 'addEvents':
          apiResponse = await apiPostLocalEventMaster({
            LocalEventName: fullName,
            SubGenreCode: selSport.id,
            IsActive: 1,
          });
          option.id = apiResponse.data.LocalEventCode;
          openNotification('success', 'Local Event is created successfully');
          break;
        case 'addSports':
          apiResponse = await apiPostSportsMaster({
            SubGenreName: fullName,
            Genre_Image: image,
            LocationCode: channel.LocationCode,
            ChannelCode: channel.ChannelCode,
            IsActive: 1,
          });
          option.id = apiResponse.data.SubGenreCode;
          openNotification('success', 'Sports is created successfully');
          break;
        case 'addCountries':
          apiResponse = await apiPostCountrymaster({
            CountryName: fullName,
            ShortName: shortName,
            IsActive: 1,
          });
          option.id = apiResponse.data.CountryCode;
          openNotification('success', 'Country is created successfully');
          break;
        case 'addTeams':
          apiResponse = await apiPostTeamMaster({
            TeamName: fullName,
            ShortName: shortName,
            CategoryCode: selCategory.id,
            CountryCode: selCountry?.id || 0,
            SubGenerCode: selSport.id,
            LocalEventCode: selEvent.id,
            Team_Image: image,
            IsActive: 1,
          });
          option.id = apiResponse.data.TeamCode;
          openNotification('success', 'Team is created successfully');
          break;
        default:
          throw new Error('Invalid dialog ID');
      }
      setOptions([option, ...options]);
      setSelOptions([option, ...selOptions]);
      Notification({ type: 'success', message: `${dialogProps.title.replace('Add ', '')} created successfully!` });
      resetCreateForm();
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating item:', error);
      Notification({ type: 'error', message: 'Failed to create item', description: error.message });
      setShowError(true);
    }
  };

  const resetCreateForm = () => {
    setFullName('');
    setShortName('');
    setImage(null);
    setShowError(false);
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} onRequestClose={handleClose} className="max-w-lg">
      <div className="flex flex-col h-[70vh] justify-between">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-semibold">{dialogProps.title}</h5>
          {!showCreateForm && (
            <Button size="sm" variant="solid" onClick={() => setShowCreateForm(true)} aria-label={`Create new ${dialogProps.title.toLowerCase().replace('add ', '')}`}>
              Create
            </Button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-3">
          <Transition
            show={showCreateForm}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 -translate-y-5"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-300"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-5"
          >
            <div className="bg-slate-900 bg-opacity-50 p-4 rounded-lg">
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2 flex justify-center">
                  <Upload
                    className="cursor-pointer"
                    accept=".jpeg,.jpg,.png"
                    showList={false}
                    uploadLimit={1}
                    beforeUpload={beforeUpload}
                    onChange={onFileUpload}
                    aria-label="Upload image"
                  >
                    <Avatar
                      size={130}
                      shape="circle"
                      src={image}
                      icon={<LuImage className="text-gray-300 text-3xl" />}
                    />
                  </Upload>
                </div>
                <div className="col-span-3 flex flex-col gap-4">
                  <CustomField
                    label="Full Name"
                    field={
                      <Input
                        size="sm"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        aria-label="Full Name"
                      />
                    }
                    errorMsg={showError && !fullName ? 'Required' : ''}
                  />
                  <CustomField
                    label="Short Name"
                    field={
                      <Input
                        size="sm"
                        placeholder="Short Name"
                        maxLength={10}
                        value={shortName}
                        onChange={(e) => setShortName(e.target.value)}
                        aria-label="Short Name"
                      />
                    }
                    errorMsg={showError && !shortName ? 'Required' : ''}
                  />
                  <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={() => { setShowCreateForm(false); resetCreateForm(); }} aria-label="Close create form">Close</Button>
                    <Button size="sm" variant="solid" onClick={handleCreateItem} aria-label="Create item">Create</Button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          {options.map((item) => (
            <div
              key={item.id}
              className={classNames(
                'p-3 rounded-lg hover:bg-gray-600 hover:cursor-pointer border hover:border-teal-400 transition-all flex justify-between items-center',
                selOptions.some((opt) => opt.id === item.id) ? 'bg-gray-600 bg-opacity-20 border-teal-400' : 'bg-gray-600 bg-opacity-20 border-none'
              )}
              onClick={() => toggleItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleItem(item)}
              aria-label={`Toggle ${item.name}`}
            >
              <div className="flex items-center gap-3">
                <Avatar size={27} shape="circle" src={item.icon} icon={<PiImage />} />
                <p className="text-white font-semibold">{item.name}</p>
              </div>
              {selOptions.some((opt) => opt.id === item.id) && <FaCircleCheck className="text-teal-400" />}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button size="sm" onClick={handleClose} aria-label="Cancel">Cancel</Button>
          <Button size="sm" variant="solid" onClick={handleAdd} aria-label="Submit selections">Submit</Button>
        </div>
      </div>
    </Dialog>
  );
};

AddItemDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  dialogProps: PropTypes.object.isRequired,
  setDialogProps: PropTypes.func.isRequired,
  addFn: PropTypes.func.isRequired,
  selCategory: PropTypes.object,
  selCountry: PropTypes.object,
  selSport: PropTypes.object,
  selEvent: PropTypes.object,
};

export default AddItemDialog;