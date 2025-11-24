import { Button, Dialog, Select } from 'components/ui';
import React, { useEffect } from 'react';
import { HiCheck } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetChannelmasterdrop } from 'services/MasterService';
import {
  setChannelList,
  setIsSelectChannelDialogOpen,
  setselectedChannel,
} from 'store/locale/localeSlice';
import { components } from 'react-select';
import { isChannelSelected } from './GLOBALFUNACTION';
import ChannelSelector from './ChannelSelector';

const { Control } = components;

function SelectChannelDialog() {
  /* REDUX STATES */
  const isSelectChannelDialogOpen = useSelector(
    (state) => state.locale.isSelectChannelDialogOpen,
  );
  const channel = useSelector((state) => state.locale.selectedChannel);
  const channelList = useSelector((state) => state.locale.channelList);
  const loginId = useSelector((state) => state.auth.session.LoginId);

  /*HOOKS */
  const dispatch = useDispatch();

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        if (!isChannelSelected(channel)) {
          dispatch(setIsSelectChannelDialogOpen(true));
        } else {
          dispatch(setIsSelectChannelDialogOpen(false));
        }
        if (!channelList) {
          const fetchedChannelList = await getChannelList();
          dispatch(setChannelList(fetchedChannelList));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    try {
      if (isChannelSelected(channel)) {
        dispatch(setIsSelectChannelDialogOpen(false));
      }
    } catch (error) {
      console.error(error);
    }
  }, [channel]);

  /* EVENT HANDLERS */
  const onDialogClose = () => {
    try {
      dispatch(setIsSelectChannelDialogOpen(false));
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const getChannelList = async () => {
    try {
      const resp = await apiGetChannelmasterdrop(loginId);
      const channelList = resp.data.map((item) => ({
        value: item.ChannelCode,
        label: item.LocationName + ' ' + item.ChannelName,
        ChannelCode: item.ChannelCode,
        LocationCode: item.LocationCode,
        ChannelName: item.ChannelName,
        ColorClass: 'bg-rose-500',
        LocationName: item.LocationName,
        imgPath: item.Channel_Image,
      }));
      return channelList;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {Array.isArray(channelList) && (
        <Dialog
          isOpen={isSelectChannelDialogOpen}
          onClose={onDialogClose}
          onRequestClose={onDialogClose}
        >
          <h5 className="mb-6">Select Channel</h5>
          <p className="text-white mb-1">Channel</p>
          <ChannelSelector
            channel={channel}
            channelList={channelList}
            onChange={(e) => {
              dispatch(setselectedChannel(e));
            }}
          />
          <div className="text-right mt-6">
            <Button variant="solid" onClick={onDialogClose}>
              Close
            </Button>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default SelectChannelDialog;
