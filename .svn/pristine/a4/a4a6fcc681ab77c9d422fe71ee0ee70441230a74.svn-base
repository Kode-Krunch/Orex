import React, { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import withHeaderItem from 'utils/hoc/withHeaderItem';
import { Notification as NotificationToast } from 'components/ui';
import {
  Avatar,
  Dropdown,
  ScrollBar,
  Spinner,
  Badge,
  Button,
  Tooltip,
  toast,
} from 'components/ui';
import {
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineClipboardCheck,
  HiOutlineMailOpen,
  HiOutlineGift,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import isLastChild from 'utils/isLastChild';
import useTwColorByName from 'utils/hooks/useTwColorByName';
import { useDispatch, useSelector } from 'react-redux';
import useResponsive from 'utils/hooks/useResponsive';
import acronym from 'utils/acronym';
import { setNotificationList } from 'store/locale/localeSlice';
import {
  apiMarkNotificationsAsRead,
  apiFetchNotifications,
} from 'services/ProgrammingService';
import appConfig from 'configs/app.config';
import { FaCalendarCheck, FaFileInvoiceDollar } from 'react-icons/fa';
import { CLIENT } from 'views/Controls/clientListEnum';
const { apiPrefixNotification } = appConfig;
const notificationHeight = 'h-72';

// Component to generate an avatar based on the target name
const AvatarGenerator = ({ target }) => {
  const colorClass = useTwColorByName();
  return (
    <Avatar shape="circle" className={`${colorClass(target)}`}>
      {acronym(target)}
    </Avatar>
  );
};

// Function to determine the avatar type based on notification data
const getNotificationAvatar = (notification) => {
  const { type, target, image } = notification;
  switch (type) {
    case '0':
      return (
        <Avatar
          shape="circle"
          className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
          icon={<FaFileInvoiceDollar />}
        />
      );
    case 'Bill':
      return (
        <Avatar
          shape="circle"
          className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
          icon={<FaFileInvoiceDollar />}
        />
      );
    case 'Booking':
      return (
        <Avatar
          shape="circle"
          className="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-100"
          icon={<FaCalendarCheck />}
        />
      );
    case 'Info':
      return (
        <Avatar
          shape="circle"
          className=" bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100 "
          icon={<HiOutlineBell />}
        />
      );
    case 'string':
      return (
        <Avatar
          shape="circle"
          className="bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-100"
          icon={<HiOutlineCalendar />}
        />
      );
    case '1':
      return (
        <Avatar
          shape="circle"
          className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
          icon={<HiOutlineClipboardCheck />}
        />
      );
    default:
      return <Avatar />;
  }
};

// Component for the notification toggle button
const NotificationToggleButton = ({ className, badgeCount }) => {
  return (
    <div className={classNames('text-2xl', className)}>
      <Badge badgeStyle={{ top: '3px', right: '6px' }} content={badgeCount}>
        <HiOutlineBell />
      </Badge>
    </div>
  );
};

export const Notification = ({ className, userId = 1 }) => {
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const notificationList = useSelector(
    (state) => state.locale.NotificationList,
  );
  const channel = useSelector((state) => state.locale.selectedChannel);
  const dispatch = useDispatch();

  const [noResults, setNoResults] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { larger } = useResponsive();
  const direction = useSelector((state) => state.theme.direction);
  const [websocket, setWebSocket] = useState(null);

  // Function to establish WebSocket connection for notifications
  const establishNotificationWebSocket = () => {
    setLoading(true);
    const ws = new WebSocket(
      `${apiPrefixNotification}/ws/${LoginId}`,
    );


    setWebSocket(ws);
    setLoading(false);

    ws.onmessage = (event) => {
      const notificationData = JSON.parse(event.data);
      dispatch(setNotificationList([notificationData, ...notificationList]));

      const unreadNotifications = [
        notificationData,
        ...notificationList,
      ].filter((item) => item.readed === 0).length;

      setNotificationCount(unreadNotifications);
    };

    return () => {
      ws.close();
    };
  };

  // Effect to open a toast notification when a new notification arrives
  useEffect(() => {
    if (channel.label !== CLIENT.FOOD_INDIA && channel.label !== CLIENT.FOOD_USA) {
      if (notificationList && notificationList[0]?.location && notificationList[0]?.readed == 0) {
        const newNotificationToast = (
          <NotificationToast
            customIcon={<HiOutlineGift className="text-2xl text-indigo-600" />}
          >
            {notificationList[0]?.message}
          </NotificationToast>
        );
        toast.push(newNotificationToast);
      }
    }
  }, [notificationList]);

  // Function to mark notifications as read
  const markNotificationsAsRead = async () => {
    const response = await apiMarkNotificationsAsRead(LoginId);
    if (response.status === 200) {
      setNotificationCount(0);
    }
  };

  // Function to fetch notifications
  const fetchNotifications = async () => {
    const response = await apiFetchNotifications(LoginId);
    const unreadCount = response.data.data.filter(
      (item) => item.readed === 0,
    ).length;
    setNotificationCount(unreadCount);
  };

  const fetchNotificationsAndDispatch = async () => {
    const response = await apiFetchNotifications(LoginId);
    const unreadCount = response.data.data.filter(
      (item) => item.readed === 0,
    ).length;
    setNotificationCount(unreadCount);
    dispatch(setNotificationList(response.data.data));
  };

  const handleNotificationOpen = useCallback(async () => {
    markNotificationsAsRead();
    fetchNotifications();
  }, [notificationList]);

  useEffect(() => {

    establishNotificationWebSocket();

  }, [LoginId]);

  useEffect(() => {
    fetchNotificationsAndDispatch();
    return () => dispatch(setNotificationList([]));
  }, []);

  return (
    <>
      {channel.label !== CLIENT.FOOD_INDIA && channel.label !== CLIENT.FOOD_USA && (
        <Dropdown
          renderTitle={
            <NotificationToggleButton
              badgeCount={notificationCount}
              className={className}
            />
          }
          menuClass="p-0 min-w-[280px] md:min-w-[340px]"
          placement={larger.md ? 'bottom-end' : 'bottom-center'}
          onOpen={handleNotificationOpen}
        >
          <Dropdown.Item variant="header">
            <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
              <h6>Notifications</h6>
              <Tooltip title="Mark all as read">
                <Button
                  variant="plain"
                  shape="circle"
                  size="sm"
                  icon={<HiOutlineMailOpen className="text-xl" />}
                // onClick={onMarkAllAsRead}
                />
              </Tooltip>
            </div>
          </Dropdown.Item>
          <div className={classNames('overflow-y-auto', notificationHeight)}>
            <ScrollBar direction={direction}>
              {notificationList && notificationList.length > 0
                ? notificationList.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20 ${!isLastChild(notificationList, index)
                      ? 'border-b border-gray-200 dark:border-gray-600'
                      : ''
                      }`}
                  >
                    <div>{getNotificationAvatar(notification)}</div>
                    <div className="ltr:ml-2 rtl:mr-2">
                      {/* <div>
                      {notification.location && (
                        <span className="font-semibold heading-text">
                          {notification.location},
                        </span>
                      )}
                      <span>{notification.locationLabel}</span>
                    </div> */}
                      <div>
                        <span>{notification.message}</span>
                      </div>
                      <span className="text-xs">{notification.date}</span>
                    </div>
                    <Badge
                      className="absolute top-1 ltr:right-2 mt-1"
                      innerClass={`${notification.readed === 1 ? 'bg-red-300' : 'bg-green-300'
                        } `}
                    />
                  </div>
                ))
                : loading && (
                  <div
                    className={classNames(
                      'flex items-center justify-center',
                      notificationHeight,
                    )}
                  >
                    <Spinner size={40} />
                  </div>
                )}
              {noResults && (
                <div
                  className={classNames(
                    'flex items-center justify-center',
                    notificationHeight,
                  )}
                >
                  <div className="text-center">
                    <img
                      className="mx-auto mb-2 max-w-[150px]"
                      src="/img/others/no-notification.png"
                      alt="No notifications"
                    />
                    <h6 className="font-semibold">No notifications!</h6>
                    <p className="mt-1">Please try again later</p>
                  </div>
                </div>
              )}
            </ScrollBar>
          </div>
          <Dropdown.Item variant="header">
            <div className="flex justify-center border-t border-gray-200 dark:border-gray-600 px-4 py-2">
              <Link
                to="/ActiveLog"
                className="font-semibold cursor-pointer p-2 px-3 text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              >
                View All Activity
              </Link>
            </div>
          </Dropdown.Item>
        </Dropdown>)}</>
  );
};

export default withHeaderItem(Notification);
