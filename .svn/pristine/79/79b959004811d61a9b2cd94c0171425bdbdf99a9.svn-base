import Logo from 'components/template/Logo';
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Dialog,
  Input,
  Tooltip,
} from 'components/ui';
import { SIDE_NAV_CONTENT_GUTTER } from 'constants/theme.constant';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiSolidMessageAltDetail, BiUser } from 'react-icons/bi';
import { BsBuildings, BsDatabaseFillUp } from 'react-icons/bs';
import { CgTime } from 'react-icons/cg';
import { FaRegCheckCircle, FaRegUser, FaUsers } from 'react-icons/fa';
import { FaUserXmark } from 'react-icons/fa6';
import { GrChannel, GrDocumentMissing } from 'react-icons/gr';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { LiaAddressBookSolid, LiaMapMarkedAltSolid } from 'react-icons/lia';
import { MdOutlineAttachEmail, MdOutlinePhone } from 'react-icons/md';
import { PiShareNetworkDuotone, PiSignOutThin } from 'react-icons/pi';
import { RiPassExpiredLine } from 'react-icons/ri';
import { TbFileTime } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiMasterGet,
  apiMasterGetapprove,
  apiMasterGetreject,
  apiMasterput,
  apiMasterUserGet,
} from 'services/AuthService';
import { apiCallstoreprocedure } from 'services/CommonService';
import { onSignInSuccessAdmin } from 'store/auth/sessionSlice';
import { theme } from 'twin.macro';
import StorageStatusCard from 'views/Controls/Dashboard/StorageStatusCard';
import UsersStatusCard from 'views/Controls/Dashboard/UsersStatusCard/UsersStatusCard';
import {
  FORMATDATE_FOR_EVERY,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import FormatDate from './FormatDate';
import {
  FcApproval,
  FcDisclaimer,
  FcExpired,
  FcHighPriority,
} from 'react-icons/fc';
import TreeView from './TreeView';
import { LuDatabaseBackup } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { IoRefresh } from 'react-icons/io5';
import { Admin_COLUMNS } from './ConstantData';

const TooblbarOption = { groupBy: false, manageColumns: false };
const AdminDashBoard = ({
  setAdminOpen,
  setshowLoader,
  showLoader,
  data,
  setdata,
}) => {
  const currentDate = new Date();
  const [ip, setIP] = useState(null);
  const [clientDetailsPopup, setClientDetailsPopup] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [stepsCheck, setStepsCheck] = useState(1);
  useEffect(() => {
    // Fetch the public IP using ipify
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setIP(data.ip))
      .catch((error) => console.error('Error fetching IP:', error));
  }, []);
  const dispatch = useDispatch();
  const twColor = theme`colors`;
  const COLOR_2 = twColor.blue['500'];
  const COLOR_4 = twColor.amber['500'];
  const COLOR_5 = twColor.red['500'];
  const COLOR_yellow = twColor.yellow['500'];
  const { token } = useSelector((state) => state.auth.session);
  const mode = useSelector((state) => state.theme.mode);
  const [isEditMode, setIsEditMode] = useState(false);
  const calculateDaysBetween = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // Hours*minutes*seconds*milliseconds in a day
    const diffInTime = endDate.getTime() - startDate.getTime(); // Difference in milliseconds
    return Math.round(diffInTime / oneDay); // Convert milliseconds to days
  };

  const [checkedState, setCheckedState] = useState({});

  const [formData, setFormData] = useState({
    ClientName: '',
    ClientCode: '',
    ClientType: '',
    Address: '',
    State: '',
    Country: '',
    Ref_by: '',
    Email: '',
    ContactNumber: '',
    ContactPerson: '',
    ApprovalStatus: 0,
    PlanID: '',
    ExpiredOn: 0,
    ExpiredOnDate: '',
    IsActive: 1,
    PublicIp: ip,
    TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ChannelName: '',
    Is_db_backup: 0,
    Is_multiple_user: 0,
    Is_email_alert: 0,
    db_maxsize: 0,
    Is_multiChannel: 0,
  });

  const [storageDetails, setStorageDetails] = useState({});
  const [selectedClient, setSelectedClient] = useState({});
  const [approvalDesc, setApprovalDesc] = useState('');
  const [ACTIVE_USERS, setACTIVE_USERS] = useState([]);
  const [INACTIVE_USERS, setINACTIVE_USERS] = useState([]);
  const [ViewDataColumns] = useState(getTableColumnsWithActions());
  const [ManagedColumnInvoiceDetails, setManagedColumnInvoiceDetails] =
    useState([]);
  const [CopyData, setCopyData] = useState([]);
  const [externalGlobalFilter, setExternalGlobalFilter] = useState('');
  const [filters, setFilters] = useState('All');

  useEffect(() => {
    fetchData();
    fetchStorageDetails();
    fetchUser();
  }, [token]);
  useEffect(() => {
    const filterData = data.filter((item) => {
      // If the filter is 'All', return all data without any conditions
      if (filters === 'All') {
        return true; // No filtering condition, return everything
      } else if (filters === 'Active') {
        return item.ApprovalStatus === 1;
      } else if (filters === 'Rejected') {
        return item.ApprovalStatus == 2;
      } else if (filters === 'New') {
        return item.ApprovalStatus === 0 || item.ApprovalStatus === null;
      } else if (filters === 'In7Days') {
        const today = new Date();
        const expiredDate = new Date(item.ExpiredOn);
        const timeDifference = expiredDate - today;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        return daysDifference >= 0 && daysDifference <= 7;
      } else if (filters === 'Expired') {
        const today = new Date();
        const expiredDate = new Date(item.ExpiredOn);
        return expiredDate < today;
      }
      return true;
    });
    setCopyData(filterData);
  }, [filters]);

  const fetchUser = async () => {
    try {
      const User = await apiMasterUserGet();
      setACTIVE_USERS(User.data);
      setINACTIVE_USERS(User.data);
    } catch (error) {
      console.error('Error fetching Company details:', error);
    }
  };
  const fetchStorageDetails = async () => {
    try {
      const CurrentDBSize = await apiCallstoreprocedure('GetCurrentDBSize', {
        flag: 'coludmaster',
      });
      const data = {
        storageDetails: {
          totalStorage: 1,
          storageUnit: 'TB',
          usedStorage: CurrentDBSize.data[0].CurrentDBSize,
          usedPercent: (CurrentDBSize.data[0].CurrentDBSize / 10000) * 100, // Assuming 2TB total storage
        },
      };
      setStorageDetails(data);
    } catch (error) {
      console.error('Error fetching storage details:', error);
    }
  };
  const fetchData = async () => {
    setshowLoader(true);
    if (token) {
      try {
        const response = await apiMasterGet();
        if (response.status == 204) {
          setshowLoader(false);
        } else if (response.status == 200) {
          setshowLoader(false);

          setCopyData(response.data);
          setdata(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setshowLoader(false);
      }
    } else {

    }
  };
  function getTableColumnsWithActions() {
    try {
      return [
        {
          header: 'Action',
          accessorKey: 'action',
          actions: [
            {
              action: (rowIndex, rowData) => {
                return (
                  <div className="text-xs font-medium !w-max">
                    <div className="flex gap-2 justify-center">
                      {rowData.ApprovalStatus == 0 ||
                        rowData.ApprovalStatus == null ? (
                        <Tooltip title={'Approve Client'}>
                          <Button
                            size="xs"
                            variant="solid"
                            icon={<FaRegCheckCircle />}
                            onClick={() => {
                              setClientDetailsPopup(true);
                              setStepsCheck(1);
                              setIsEditMode(false);
                              setSelectedClient(rowData);
                            }}
                          />
                        </Tooltip>
                      ) : rowData.ApprovalStatus == 2 ? (
                        <Tooltip title={'Rejected Client'}>
                          <Button
                            color="red-500"
                            size="xs"
                            variant="solid"
                            icon={<RxCross2 />}
                            onClick={() => {
                              setClientDetailsPopup(true);
                              setStepsCheck(1);
                              setSelectedClient(rowData);
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title={'Edit Date'}>
                          <Button
                            size="xs"
                            variant="twoTone"
                            icon={<AiOutlineEdit />}
                            onClick={() => {
                              setIsEditMode(true);
                              setClientDetailsPopup(true);
                              setStepsCheck(2);
                              setSelectedClient(rowData);
                              setFormData({
                                ...rowData,
                                ExpiredOnDate: rowData.ExpiredOn,
                              });
                            }}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                );
              },
            },
          ],
        },
        {
          header: 'Status',
          accessorKey: 'ApprovalStatus',
          cell: (props) => {
            const row = props.row.original;
            const expiredDate = new Date(row.ExpiredOn);
            // Check if the expiration date is before today

            return (
              <div className="flex items-center">
                <span className="ml-2 rtl:mr-2 ">
                  {expiredDate < currentDate ? (
                    <div>
                      {' '}
                      <div className="flex items-center border-dashed border border-teal-600 py-1 rounded-lg px-5">
                        <FcExpired className="text-2xl mr-2" />
                        Expired Client
                      </div>
                    </div>
                  ) : (
                    <>
                      {row.ApprovalStatus == 1 ? (
                        <div className="flex items-center border-dashed border border-teal-600 py-1 rounded-lg px-5">
                          <FcApproval className="text-2xl mr-2" />
                          Approved
                        </div>
                      ) : row.ApprovalStatus == 2 ? (
                        <div className="flex items-center border-dashed border border-emerald-600  py-1 rounded-lg px-5">
                          <FcDisclaimer className="text-2xl mr-2" />
                          Rejected
                        </div>
                      ) : (
                        <div className="flex items-center border-dashed border border-emerald-600  py-1 rounded-lg px-5">
                          <FcHighPriority className="text-2xl mr-2" />
                          New Client
                        </div>
                      )}
                    </>
                  )}
                </span>
              </div>
            );
          },
        },
        {
          header: 'ExpiredOn',
          accessorKey: 'ExpiredOn',
          cell: (props) => {
            const row = props.row.original;
            return (
              <div className="flex items-center">
                <span className="ml-2 rtl:mr-2 ">
                  {FORMATDATE_FOR_EVERY(new Date(row.ExpiredOn))}
                </span>
              </div>
            );
          },
        },

        ...Admin_COLUMNS,
      ];
    } catch (error) {
      console.error(error);
    }
  }

  const handleFormDataChange = (values) => {
    setFormData({ ...formData, ...values });
  };
  const UpdateDBUser = async (data) => {
    setshowLoader(true);
    const daysBetween =
      data.ExpiredOn == selectedClient.ExpiredOn
        ? calculateDaysBetween(currentDate, new Date(data.ExpiredOnDate))
        : data.ExpiredOn;

    const res = await apiMasterput({ ...data, ExpiredOn: daysBetween });
    setshowLoader(false);
    setFormData({
      ClientName: '',
      ClientCode: 'PMSL',
      ClientType: '',
      Address: '',
      State: '',
      Country: '',
      Ref_by: '',
      Email: '',
      ContactNumber: '',
      ContactPerson: '',
      ApprovalStatus: 0,
      PlanID: '',
      ExpiredOn: 365,
      IsActive: 1,
      PublicIp: ip,
      ChannelName: '',
      TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    fetchData();
    setshowLoader(true);
    setClientDetailsPopup(false);
    setIsEditMode(false);
  };

  return (
    <Card bodyClass="dark:bg-slate-800 bg-slate-100">
      <Dialog
        isOpen={rejectPopup}
        style={{
          content: {
            marginTop: 250,
          },
        }}
        contentClassName="pb-0 px-0"
        onClose={() => setRejectPopup(false)}
      >
        <div className="px-6 pb-6">
          <h5 className="mb-4">Reject Client</h5>

          <div className="flex">
            <h5>Remark </h5>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <Input
            textArea
            onChange={(e) => setApprovalDesc(e.target.value)}
            placeholder="Kindly provide a clear and detailed reason with more than 15 words for better understanding."
          />
        </div>

        <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            onClick={() => {
              setRejectPopup(false);
              setIsEditMode(false);
              setClientDetailsPopup(true);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="solid"
            onClick={async () => {
              if (approvalDesc.length > 20) {
                setApprovalDesc();
                setshowLoader(true);
                const res = await apiMasterGetreject(selectedClient.ClientID, {
                  ApprovalDesc: approvalDesc,
                });
                if (res.status == 204) {
                  setshowLoader(false);
                  setClientDetailsPopup(false);
                  setIsEditMode(false);
                  setRejectPopup(false);
                  setApprovalDesc('');
                } else if (res.status == 200) {
                  setshowLoader(false);
                  openNotification(
                    'success',
                    'The email has been successfully sent to the client.',
                  );
                  setClientDetailsPopup(false);
                  setIsEditMode(false);
                  setRejectPopup(false);
                  setApprovalDesc('');
                  fetchData();
                }
              } else {
                openNotification(
                  'info',
                  'Kindly provide a clear and detailed reason with more than 15 words for better understanding.',
                );
              }
            }}
          >
            Reject
          </Button>
        </div>
      </Dialog>
      <Dialog
        style={{
          content: {
            marginTop: 40,
          },
        }}
        isOpen={clientDetailsPopup}
        width={1000}
        height={selectedClient.ApprovalStatus == 2 ? 650 : 600}
        onClose={() => {
          setClientDetailsPopup(false);
          setIsEditMode(false);
        }}
      >
        <div
          className={
            !isEditMode
              ? 'grid-cols-6 grid gap-4 flex flex-col h-full'
              : 'grid-cols-4grid gap-4 flex flex-col h-full'
          }
        >
          {!isEditMode && (
            <div className="grow h-full py-2  col-span-2 px-5 flex items-center justify-center">
              <div>
                <div className="flex items-center justify-center">
                  <Logo
                    mode={mode}
                    type="streamline"
                    gutter={SIDE_NAV_CONTENT_GUTTER}
                  />
                </div>
                <p className="text-center px-7 py-2">
                  Lorem Ipsum is simply dummy text of the printing and typesett
                  industry
                </p>
                <div className="px-7 py-2 mt-5">
                  <Button
                    className="w-full"
                    variant="solid"
                    onClick={async () => {
                      setshowLoader(true);
                      const result = Object.values(checkedState).flatMap(
                        (module) =>
                          Object.values(module.submodules)
                            .filter((submodule) => submodule.checked)
                            .map((submodule) => ({
                              submodules: `${submodule.subcode}`,
                            })),
                      );
                      const res = await apiMasterGetapprove(
                        selectedClient.ClientID,
                        {
                          request: formData,
                          access: result,
                        },
                      );
                      if (res.status == 204) {
                        setshowLoader(false);
                        setClientDetailsPopup(false);
                      } else if (res.status == 200) {
                        setshowLoader(false);
                        setClientDetailsPopup(false);
                        fetchData();
                      }
                    }}
                    disabled={stepsCheck === 1}
                  >
                    Approve
                    {/* User Setting */}
                  </Button>
                </div>
                <div className="px-7 py-2">
                  <Button
                    className="w-full"
                    onClick={async () => {
                      setRejectPopup(true);
                      setClientDetailsPopup(false);
                      setIsEditMode(false);
                    }}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          )}
          {stepsCheck === 1 ? (
            <div className="bg-slate-900 rounded p-2 h-full grow col-span-4">
              <div className=" px-1 py-1 ">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="mb-2">Company Details</h4>
                  <div>
                    <p className="ml-1 text-base font-semibold">Expired On</p>
                    <h6>
                      {<FormatDate dateString={selectedClient.ExpiredOn} />}
                    </h6>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className=" px-2 py-1 rounded flex items-center">
                    <BiUser className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">User</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.ContactPerson}
                      </p>
                    </div>
                  </div>
                  <div className=" px-2 py-1 rounded flex items-center">
                    <MdOutlinePhone className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">Number</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.ContactNumber}
                      </p>
                    </div>
                  </div>
                  <div className=" px-2 py-1 rounded flex items-center">
                    <MdOutlineAttachEmail className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">Email</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.Email}
                      </p>
                    </div>
                  </div>
                  <div className=" px-2 py-1 rounded flex items-center">
                    <HiOutlineMapPin className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">State</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.State}
                      </p>
                    </div>
                  </div>
                  <div className=" px-2 py-1 rounded flex items-center">
                    <LiaAddressBookSolid className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">Address</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.Address}
                      </p>
                    </div>
                  </div>
                  <div className=" px-2 py-1 rounded flex items-center">
                    <LiaMapMarkedAltSolid className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">Country</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.Country}
                      </p>
                    </div>
                  </div>
                  <div className=" px-2 py-1 rounded flex items-center">
                    <BsBuildings className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">Company</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.ClientName}
                      </p>
                    </div>
                  </div>
                  <div className=" px-2 py-1 rounded flex items-center">
                    <GrChannel className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">Channel</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.ChannelName}
                      </p>
                    </div>
                  </div>
                  <div className=" px-2 py-1 rounded flex items-center">
                    <TbFileTime className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">Time Zone</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.TimeZone}
                      </p>
                    </div>
                  </div>
                  <div className=" px-2 py-1 rounded flex items-center">
                    <PiShareNetworkDuotone className="text-[2.125rem]" />
                    <div className="">
                      <p className="ml-1 text-base font-semibold">IP</p>
                      <p className=" text-sm ml-1 text-white">
                        {selectedClient.PublicIp}
                      </p>
                    </div>
                  </div>
                  {selectedClient.ApprovalStatus == 2 && (
                    <div className=" px-2 py-1 rounded flex items-center col-span-2">
                      <BiSolidMessageAltDetail className="text-[2.125rem]" />
                      <div className="">
                        <p className="ml-1 text-base font-semibold">
                          Reject Remark
                        </p>
                        <p className=" text-sm ml-1 text-white">
                          {selectedClient.ApprovalDesc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end mt-5">
                  <Button variant="solid" onClick={() => setStepsCheck(2)}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 rounded p-2 h-full grow col-span-4 flex flex-col">
              <div className="px-1 py-1">
                <div className="flex justify-between items-center">
                  <h4 className="mb-2">Company Access</h4>
                  <h4 className="mb-2" style={{ color: 'rgb(245 158 11)' }}>
                    {formData.ClientName}
                  </h4>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  {/* Channel/User Items */}
                  <div
                    className="px-1 py-1 rounded flex items-center col-span-2 justify-between"
                    style={{ border: '1px solid #535353' }}
                  >
                    <div className="flex items-center">
                      <LuDatabaseBackup className="text-[15px]" />
                      <p className="ml-1 text-base font-sm">Auto Backup</p>
                    </div>
                    <Checkbox
                      className="ml-2"
                      checked={formData.Is_db_backup}
                      onChange={(e) => {
                        handleFormDataChange({ Is_db_backup: e ? 1 : 0 });

                      }}
                    />
                  </div>{' '}
                  <div
                    className="px-1 py-1 rounded flex items-center col-span-2  justify-between"
                    style={{ border: '1px solid #535353' }}
                  >
                    <div className="flex items-center">
                      <FaRegUser className="text-[15px]" />
                      <p className="ml-1 text-base font-sm">Multiple User</p>
                    </div>
                    <Checkbox
                      className="ml-2"
                      checked={formData.Is_multiple_user}
                      onChange={(e) => {
                        handleFormDataChange({ Is_multiple_user: e ? 1 : 0 });

                      }}
                    />
                  </div>
                  <div
                    className="px-1 py-1 rounded flex items-center col-span-2  justify-between"
                    style={{ border: '1px solid #535353' }}
                  >
                    <div className="flex items-center">
                      <MdOutlineAttachEmail className="text-[15px]" />
                      <p className="ml-1 text-base font-sm">Email Alert</p>
                    </div>
                    <Checkbox
                      className="ml-2"
                      checked={formData.Is_email_alert}
                      onChange={(e) => {
                        handleFormDataChange({ Is_email_alert: e ? 1 : 0 });

                      }}
                    />
                  </div>{' '}
                  <div
                    // className="px-1 py-1 rounded flex items-center col-span-2 justify-between"
                    className={
                      !isEditMode
                        ? 'px-1 py-1 rounded flex items-center col-span-3 justify-between'
                        : 'px-1 py-1 rounded flex items-center col-span-2 justify-between'
                    }
                    style={{ border: '1px solid #535353' }}
                  >
                    <div className="flex items-center">
                      <BsDatabaseFillUp className="text-[15px]" />
                      <p className="ml-1 text-base font-sm">
                        Db Max Size 100MB
                      </p>
                    </div>
                    <Checkbox
                      className="ml-2"
                      checked={formData.db_maxsize}
                      onChange={(e) => {
                        handleFormDataChange({ db_maxsize: e ? 1 : 0 });

                      }}
                    />
                  </div>
                  <div
                    className={
                      !isEditMode
                        ? 'px-1 py-1 rounded flex items-center col-span-3 justify-between'
                        : 'px-1 py-1 rounded flex items-center col-span-2 justify-between'
                    }
                    style={{ border: '1px solid #535353' }}
                  >
                    <div className="flex items-center">
                      <GrChannel className="text-[15px]" />
                      <p className="ml-1 text-base font-sm">Multiple Channel</p>
                    </div>
                    <Checkbox
                      className="ml-1"
                      checked={formData.Is_multiChannel}
                      onChange={(e) => {
                        handleFormDataChange({ Is_multiChannel: e ? 1 : 0 });
                      }}
                    />
                  </div>
                  {isEditMode && (
                    <div className={'col-span-2'}>
                      <p className="ml-1 text-base font-sm">
                        Update Expired Date
                      </p>
                      <DatePicker
                        name="ExpiredOnDate"
                        value={new Date(formData.ExpiredOnDate)}
                        placeholder="Expired Date"
                        size="sm"
                        minDate={dayjs(new Date())
                          .subtract(0, 'day')
                          .startOf('day')
                          .toDate()}
                        onChange={(Date) => {
                          const daysBetween = calculateDaysBetween(
                            currentDate,
                            Date,
                          );
                          handleFormDataChange({
                            ExpiredOn: daysBetween,
                            ExpiredOnDate: Date,
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <h5 className="px-4">Select Module Access</h5>
              <div
                className="overflow-scroll flex-grow"
                style={{
                  maxHeight: '300px', // Adjust to fit available height minus padding
                }}
              >
                <TreeView
                  checkedState={checkedState}
                  setCheckedState={setCheckedState}
                />
              </div>
              <div className="flex items-center justify-end mt-5">
                <Button
                  variant="solid"
                  onClick={() => {
                    !isEditMode ? setStepsCheck(1) : UpdateDBUser(formData);
                  }}
                >
                  {!isEditMode ? 'Previous' : 'Update'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Dialog>

      <Loader showLoader={showLoader} />
      <div className="flex justify-between items-center">
        <h4>Admin DashBoard</h4>
        <Button
          size="sm"
          variant="twoTone"
          icon={<PiSignOutThin />}
          onClick={() => {
            dispatch(onSignInSuccessAdmin(''));
            setAdminOpen(false);
          }}
        >
          Sign Out
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-12 p-2">
          <div className={`grid grid-cols-1 gap-2 lg:grid-cols-5 `}>
            <div
              className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
              style={{ height: 200 }}
              onClick={() => setFilters('Active')}
            >
              <div className="card-bodyR">
                <div className="flex justify-between">
                  <div className="flex ">
                    {mode === 'dark' ? (
                      <div
                        className={` animate__animated onlythis2 order order2`}
                        style={{}}
                      >
                        <span>
                          <GrDocumentMissing
                            style={{ fontSize: 32, color: COLOR_4 }}
                          />
                        </span>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        icon={
                          <GrDocumentMissing
                            style={{ fontSize: 32, color: COLOR_4 }}
                          />
                        }
                        className={`!bg-amber-500 !bg-opacity-25 !border-transparent`}
                      />
                    )}
                  </div>
                  <div></div>
                </div>
                <div className="flex-grow-1 mt-1">
                  <span className="text-lg font-extrabold dark:!text-white text-black">
                    Active Clients
                  </span>
                  <h3 className="text-2xl">
                    {data.filter((item) => item.ApprovalStatus == 1).length}
                  </h3>
                </div>
                <div>
                  <p className="text-xs dark:!text-white text-black">
                    Missing Segments are portions of a program or broadcast that
                    were not aired or were incomplete
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
              style={{ height: 200 }}
              onClick={() => setFilters('New')}
            >
              <div className="card-bodyR">
                <div className="flex justify-between">
                  <div className="flex ">
                    {mode === 'dark' ? (
                      <div
                        className={` animate__animated onlythis2 order order1`}
                        style={{}}
                      >
                        <span>
                          <FaUserXmark
                            style={{ fontSize: 32, color: COLOR_5 }}
                          />
                        </span>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        icon={
                          <FaUserXmark
                            style={{ fontSize: 32, color: COLOR_5 }}
                          />
                        }
                        className={`!bg-red-500 !bg-opacity-25 !border-transparent`}
                      />
                    )}
                  </div>
                  <div></div>
                </div>
                <div className="flex-grow-1 mt-1">
                  <span className="text-lg font-extrabold dark:!text-white text-black">
                    New Clients
                  </span>
                  <h3 className="text-2xl">
                    {
                      data.filter(
                        (item) =>
                          item.ApprovalStatus == 0 ||
                          item.ApprovalStatus == null,
                      ).length
                    }
                  </h3>
                </div>
                <div>
                  <p className="text-xs dark:!text-white text-black">
                    Missing Segments are portions of a program or broadcast that
                    were not aired or were incomplete
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
              style={{ height: 200 }}
              onClick={() => setFilters('In7Days')}
            >
              <div className="card-bodyR">
                <div className="flex justify-between">
                  <div className="flex ">
                    {mode === 'dark' ? (
                      <div
                        className={` animate__animated onlythis2 order order4`}
                        style={{}}
                      >
                        <span>
                          <CgTime style={{ fontSize: 32, color: COLOR_2 }} />
                        </span>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        icon={
                          <CgTime style={{ fontSize: 32, color: COLOR_2 }} />
                        }
                        className={`!bg-blue-500 !bg-opacity-25 !border-transparent`}
                      />
                    )}
                  </div>
                  <div></div>
                </div>
                <div className="flex-grow-1 mt-1">
                  <span className="text-lg font-extrabold dark:!text-white text-black">
                    Expiring in 7 days
                  </span>
                  <h3 className="text-2xl">
                    {
                      data.filter((item) => {
                        const today = new Date();
                        const expiredDate = new Date(item.ExpiredOn);

                        // Calculate the difference in days between the dates
                        const timeDifference = expiredDate - today;
                        const daysDifference =
                          timeDifference / (1000 * 60 * 60 * 24);

                        // Check if the expiry date is within the next 7 days
                        return daysDifference >= 0 && daysDifference <= 7;
                      }).length
                    }
                  </h3>
                </div>
                <div>
                  <p className="text-xs dark:!text-white text-black">
                    Missing Segments are portions of a program or broadcast that
                    were not aired or were incomplete
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
              style={{ height: 200 }}
              onClick={() => setFilters('Rejected')}
            >
              <div className="card-bodyR">
                <div className="flex justify-between">
                  <div className="flex ">
                    {mode === 'dark' ? (
                      <div
                        className={` animate__animated onlythis2 order order2`}
                        style={{}}
                      >
                        <span>
                          <FaUsers
                            style={{ fontSize: 32, color: COLOR_yellow }}
                          />
                        </span>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        icon={
                          <FaUsers
                            style={{ fontSize: 32, color: COLOR_yellow }}
                          />
                        }
                        className={`!bg-yellow-500 !bg-opacity-25 !border-transparent`}
                      />
                    )}
                  </div>
                  <div></div>
                </div>
                <div className="flex-grow-1 mt-1">
                  <span className="text-lg font-extrabold dark:!text-white text-black">
                    Rejected Client
                  </span>
                  <h3 className="text-2xl">
                    {' '}
                    {data.filter((item) => item.ApprovalStatus == 2).length}
                  </h3>
                </div>
                <div>
                  <p className="text-xs dark:!text-white text-black">
                    Missing Segments are portions of a program or broadcast that
                    were not aired or were incomplete
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
              style={{ height: 200 }}
              onClick={() => setFilters('Expired')}
            >
              <div className="card-bodyR">
                <div className="flex justify-between">
                  <div className="flex ">
                    {mode === 'dark' ? (
                      <div
                        className={` animate__animated onlythis2 order order1`}
                        style={{}}
                      >
                        <span>
                          <RiPassExpiredLine
                            style={{ fontSize: 32, color: COLOR_5 }}
                          />
                        </span>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        icon={
                          <RiPassExpiredLine
                            style={{ fontSize: 32, color: COLOR_5 }}
                          />
                        }
                        className={`!bg-red-500 !bg-opacity-25 !border-transparent`}
                      />
                    )}
                  </div>
                  <div></div>
                </div>
                <div className="flex-grow-1 mt-1">
                  <span className="text-lg font-extrabold dark:!text-white text-black">
                    Expired Client
                  </span>
                  <h3 className="text-2xl">
                    {
                      data.filter((item) => {
                        const today = new Date();
                        const expiredDate = new Date(item.ExpiredOn);
                        // Check if the expiration date is before today
                        return expiredDate < today;
                      }).length
                    }
                  </h3>
                </div>
                <div>
                  <p className="text-xs dark:!text-white text-black">
                    Missing Segments are portions of a program or broadcast that
                    were not aired or were incomplete
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            <Card className="col-span-3">
              <div className="flex items-center justify-end">
                <Input
                  className="w-96"
                  placeholder="Search All Columns"
                  onChange={(e) => setExternalGlobalFilter(e.target.value)}
                  size="sm"
                />
                <Button
                  icon={<IoRefresh />}
                  variant="solid"
                  size="sm"
                  className="ml-2"
                  onClick={() => setFilters('All')}
                />
              </div>
              <ReportsTable
                tableData={CopyData}
                originalColumns={ViewDataColumns}
                toolbarOptions={TooblbarOption}
                managedColumns={ManagedColumnInvoiceDetails}
                setManagedColumns={setManagedColumnInvoiceDetails}
                exportFileName="AdminDashBoard"
                columnsToFormatInINR={[]}
                tableName="AdminDashBoard"
                externalGlobalFilter={externalGlobalFilter}
              />
            </Card>
            <div className="col-span-1">
              <div
                className={`web-card col-span-4 dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border`}
              >
                <StorageStatusCard
                  lastBackupTimestamp={storageDetails.lastBackupTimestamp}
                  storageDetails={storageDetails.storageDetails}
                  tabContentMaxHeight="35vh"
                  isDisplayBackup={false}
                />
              </div>
              <div
                className={`web-card col-span-4 dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border`}
              >
                <UsersStatusCard
                  activeUsers={ACTIVE_USERS}
                  inactiveUsers={INACTIVE_USERS}
                  tabContentMaxHeight="200px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminDashBoard;
