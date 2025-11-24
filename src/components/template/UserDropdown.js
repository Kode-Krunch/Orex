import React, { useState } from 'react';
import { Avatar, Button, Dialog, Dropdown, Input, Select, Spinner } from 'components/ui';
import withHeaderItem from 'utils/hoc/withHeaderItem';
import useAuth from 'utils/hooks/useAuth';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import appConfig from 'configs/app.config';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import GifLoader from 'views/Controls/GifLoader';
import Lottie from 'lottie-react';
import signOutAnimation from "./signOutAnimation.json";
import { MdPassword } from 'react-icons/md';
import { TbPasswordUser } from 'react-icons/tb';
import ChangePasswordDialog from './ChangePasswordDialog';

const dropdownItemList = [];

export const UserDropdown = ({ className }) => {

  const { signOut } = useAuth();
  const Username = useSelector((state) => state.auth.session.Username);
  const UserImage = useSelector((state) => state.auth.session.UserImage);
  const LastLoginOn = useSelector((state) => state.auth.session.LastLoginOn);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const tokenS = useSelector((state) => state.auth.session.token);

  const [dialogIsOpen, setIsOpen] = useState(false);
  const [showgifLoader, setShowgifLoader] = useState(false);
  const [isPwdDialogOpen, setIsPwdDialogOpen] = useState(false);
  const UserAvatar = (
    <div className={classNames(className, 'flex items-center gap-2')}>
      {UserImage ? (
        <Avatar size={32} shape="circle" src={UserImage} />
      ) : (
        <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
      )}
      <div className="hidden md:block"></div>
    </div>
  );



  const onDialogClose = (e) => {
    setIsOpen(false);
  };

  const onDialogOk = async (e) => {
    setIsOpen(false);
  };
  const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },

    { value: 'blue', label: 'Blue', color: '#0052CC' },

    { value: 'purple', label: 'Purple', color: '#5243AA' },

    { value: 'red', label: 'Red', color: '#FF5630' },

    { value: 'orange', label: 'Orange', color: '#FF8B00' },

    { value: 'yellow', label: 'Yellow', color: '#FFC400' },

    { value: 'green', label: 'Green', color: '#36B37E' },

    { value: 'forest', label: 'Forest', color: '#00875A' },

    { value: 'slate', label: 'Slate', color: '#253858' },

    { value: 'silver', label: 'Silver', color: '#666666' },
  ];
  const logoutAndRedirectToNEXC = async (setShowgifLoader) => {
    try {
      setShowgifLoader(true);

      const url = localStorage.getItem('OneSolutionURL');
      const token = localStorage.getItem('tokenValue');

      // Clear localStorage before redirection
      localStorage.removeItem('tokenValue');
      localStorage.removeItem('OneSolutionURL');
      localStorage.removeItem('admin');

      if (url && token) {
        const config = {
          method: 'post',
          url: `${url}/logout`,
          headers: { 'Content-Type': 'application/json' },
          data: { token },
        };

        await axios.request(config);

      }

      // Hide loader and redirect
      setTimeout(() => {
        setShowgifLoader(false);
        if (url) window.location.href = url;
      }, 3000);

    } catch (error) {
      console.error('Error during logout:', error.response?.data || error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem('admin');
    if (window.localStorage.getItem('OneSolutionURL')) {
      logoutAndRedirectToNEXC()
      localStorage.removeItem('tokenValue');
      localStorage.removeItem('OneSolutionURL');
    } else {
      signOut();
    }
  };
  return (
    <div>
      <GifLoader showgifLoader={showgifLoader} icon={<Lottie animationData={signOutAnimation} loop autoplay style={{ height: '300px', width: '300px' }} speed={0.25} />} />
      <Dropdown
        menuStyle={{ width: 'max-content' }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <Dropdown.Item variant="header">
          <div className="py-2 px-3 flex items-center gap-2">
            {UserImage ? (
              <Avatar shape="circle" height={34} width={34} src={UserImage} />
            ) : (
              <Avatar
                shape="circle"
                icon={<HiOutlineUser />}
                height={34}
                width={34}
              />
            )}
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100 capitalize">
                {Username}
              </div>

              <div>
                <div className="flex gap-0.5 text-xs">
                  <span className="font-semibold">Last login:&nbsp;</span>
                  <span>
                    {LastLoginOn && formatDistanceToNow(new Date(LastLoginOn), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        {dropdownItemList.map((item) => (
          <Dropdown.Item
            key={item.label}
            eventKey={item.label}
            className="mb-1 px-0"
          >
            <Link className="flex h-full w-full px-2" to={item.path}>
              <span className="flex gap-2 items-center w-full">
                <span className="text-xl opacity-50">{item.icon}</span>
                {/* <span>{item.label}</span> */}
              </span>
            </Link>
          </Dropdown.Item>
        ))}

        {/* <Dropdown.Item
          onClick={() => openDialog()}
          eventKey="Sign Out"
          className="gap-2"
        >
          <span className="text-xl opacity-50">
            <BsChatText />
          </span>
          <span>Chat</span>
        </Dropdown.Item> */}
        <Dropdown.Item onClick={() => setIsPwdDialogOpen(true)} className="gap-2">
          <span className="text-xl opacity-50"><TbPasswordUser /></span>
          <span>Change Password</span>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSignOut} eventKey="Sign Out" className="gap-2">
          <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span>
          <span>Sign Out</span>
        </Dropdown.Item>
        <span className="gap-3" style={{ marginLeft: '15px' }}>
          Version: {appConfig.version}
        </span>
      </Dropdown>

      <Dialog
        isOpen={dialogIsOpen}
        style={{
          content: {
            marginTop: 250,
          },
        }}
        contentClassName="pb-0 px-0"
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <div className="px-6 pb-6">
          <h5 className="mb-4">Send Message To User</h5>
          <Select options={colourOptions} />
          <p>
            <Input placeholder="Send Message" textArea></Input>
          </p>
        </div>
        <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
          <Button className="ltr:mr-2 rtl:ml-2" onClick={onDialogClose}>
            Cancel
          </Button>
          <Button variant="solid" onClick={onDialogOk}>
            Ok
          </Button>
        </div>
      </Dialog>
      <ChangePasswordDialog
        isOpen={isPwdDialogOpen}
        onClose={() => setIsPwdDialogOpen(false)}
        LoginId={LoginId}
        Username={Username}
        token={tokenS}
      />
    </div>
  );
};

export default withHeaderItem(UserDropdown);
