import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Button, Drawer, Switcher, Tooltip } from 'components/ui';
import { HiOutlineCog } from 'react-icons/hi';
import withHeaderItem from 'utils/hoc/withHeaderItem';
import { setMode, setNavMode, setPanelExpand } from 'store/theme/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  Postusersettings,
  apiGetChannelmasterdrop,
  apiGetusersettings,
} from 'services/MasterService';
import { setselectedChannel } from 'store/locale/localeSlice';
import { AiOutlineSave } from 'react-icons/ai';
import { MODE_DARK, MODE_LIGHT } from 'constants/theme.constant';
import appConfig from 'configs/app.config';
import { CLIENT } from 'views/Controls/clientListEnum';
const { switchMode } = appConfig;
export const SidePanel = (props) => {
  const dispatch = useDispatch();

  const { className, ...rest } = props;

  const panelExpand = useSelector((state) => state.theme.panelExpand);
  const mode = useSelector((state) => state.theme.mode);
  const direction = useSelector((state) => state.theme.direction);

  const openPanel = () => {
    dispatch(setPanelExpand(true));
  };

  const closePanel = () => {
    dispatch(setPanelExpand(false));
    const bodyClassList = document.body.classList;
    if (bodyClassList.contains('drawer-lock-scroll')) {
      bodyClassList.remove('drawer-lock-scroll', 'drawer-open');
    }
  };

  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const Channel = useSelector((state) => state.locale.selectedChannel);

  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [channelList, setchannelList] = useState([]);

  const [channelselected, setchannelselected] = useState([]);
  const [usersettings, setusersettings] = useState([]);

  useEffect(() => {
    chenllist();

    setchannelselected(Channel);
  }, [Channel]);

  const chenllist = async () => {
    try {
      const resp = await apiGetChannelmasterdrop(LoginId);

      const data = resp.data.map((item) => ({
        value: item.ChannelCode,
        label: item.ChannelName + ' ' + item.LocationName,
        ChannelCode: item.ChannelCode,
        LocationCode: item.LocationCode,
        ChannelName: item.ChannelName,
        ColorClass: 'bg-rose-500',
        LocationName: item.LocationName,
        imgPath: '/img/countries/us.png',
      }));
      setchannelList(data);
    } catch (error) { }
  };

  const chenllist2 = async () => {
    try {
      const resp2 = await apiGetusersettings();
      dispatch(
        setselectedChannel({
          value: resp2.data.ChannelCode,
          label: resp2.data.ChannelName,
          ChannelCode: resp2.data.ChannelCode,
          LocationCode: resp2.data.LocationCode,
          LocationName: resp2.data.LocationName,
          ColorClass: 'bg-rose-500',
          AutoSave: resp2.data.AutoSave == 1 ? true : false,
          Promo_Programbase: resp2.data.Promo_Programbase == 1 ? true : false,
          Promo_showCombrk: resp2.data.Promo_showCombrk == 1 ? true : false,
        }),
      );
      setChecked(resp2.data.AutoSave == 1 ? true : false);
      setChecked2(resp2.data.Promo_Programbase == 1 ? true : false);
      setChecked3(resp2.data.Promo_showCombrk == 1 ? true : false);
      setusersettings(resp2.data);
    } catch (error) { }
  };

  const token = useSelector((state) => state.auth.session.token);
  const add = async (e) => {
    const resp = await Postusersettings(
      channelselected,
      checked,
      checked2,
      checked3,
      token,
    );
    closePanel();
    chenllist2();
    dispatch(
      setselectedChannel({
        ...channelselected,
        AutoSave: checked,
        Promo_Programbase: checked2,
        Promo_showCombrk: checked3,
      }),
    );
  };

  const onSwitcherToggle = (val) => {
    setChecked(!val);
  };
  const onSwitcherToggleMode = () => {
    if (mode === MODE_LIGHT) {
      dispatch(setMode(MODE_DARK));
      dispatch(setNavMode(MODE_DARK));
      localStorage.setItem('themeMode', MODE_DARK);
      localStorage.setItem('navMode', MODE_DARK);
    }
    if (mode === MODE_DARK) {
      dispatch(setMode(MODE_LIGHT));
      dispatch(setNavMode(MODE_LIGHT));
      localStorage.setItem('themeMode', MODE_LIGHT);
      localStorage.setItem('navMode', MODE_LIGHT);
    }
  };
  const onSwitcherToggle2 = (val) => {
    setChecked2(!val);
  };
  const onSwitcherToggle3 = (val) => {
    setChecked3(!val);
  };
  return (
    <div className="Gbox1">
      {CLIENT.ANI_PLUS !== Channel.label &&
        <Tooltip
          title="User Settings"
          position="bottom"
          wrapperClass="flex items-center"
        >
          <div
            className={classNames('text-2xl', className)}
            onClick={openPanel}
            {...rest}
          >
            <HiOutlineCog />
          </div>
        </Tooltip>}
      <Drawer
        title="User Settings"
        isOpen={panelExpand}
        onClose={closePanel}
        onRequestClose={closePanel}
        placement={direction === 'rtl' ? 'left' : 'right'}
        width={375}
        footer={
          <div className="text-left w-full flex">
            <Button size="sm" className="mr-2" onClick={closePanel}>
              Discard
            </Button>

            <Button
              size="sm"
              className="mr-2"
              variant="solid"
              onClick={() => add(Channel)}
              icon={<AiOutlineSave />}
            >
              Save
            </Button>
          </div>
        }
      >
        <h6 className="mb-6 pb-2 border-b border-b-gray-600">Scheduling</h6>
        <div className="flex flex-col gap-y-6">
          <div className="flex justify-between items-center">
            <p className="w-1/2 font-medium">Auto Save</p>
            <Switcher checked={checked} onChange={onSwitcherToggle} />
          </div>
          {switchMode && <div className="flex justify-between items-center">
            <p className="w-1/2 font-medium">Switch Mode</p>
            <Switcher
              checked={mode === MODE_DARK}
              onChange={onSwitcherToggleMode}
            />
          </div>}

          <div className="flex justify-between items-center">
            <p className="w-1/2 font-medium">Promo Programbase</p>
            <Switcher checked={checked2} onChange={onSwitcherToggle2} />
          </div>
          <div className="flex justify-between items-center">
            <p className="w-1/2 font-medium">Promo showCombrk</p>
            <Switcher checked={checked3} onChange={onSwitcherToggle3} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default withHeaderItem(SidePanel);
