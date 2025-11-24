import { AiFillSchedule } from 'react-icons/ai';
import { FaHandHoldingUsd, FaPhotoVideo, FaUserCheck } from 'react-icons/fa';
import { GrSchedulePlay } from 'react-icons/gr';
import {
  MdEvent,
  MdEventAvailable,
  MdGroups2,
  MdOutlineCalendarMonth,
  MdOutlineDisplaySettings,
  MdOutlineEmojiEvents,
  MdOutlineVideoSettings,
} from 'react-icons/md';
import { TbCalendarCheck, TbCalendarTime, TbLicense } from 'react-icons/tb';
import { GrDocumentDownload } from 'react-icons/gr';
import { IoPrintOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import {
  BsBuildingsFill,
  BsCollectionPlay,
  BsPersonSquare,
} from 'react-icons/bs';
import { BsCalendar4Range } from 'react-icons/bs';
import { BsCalendar2Week } from 'react-icons/bs';
import { TbMusicCog } from 'react-icons/tb';
import { TbSpeakerphone } from 'react-icons/tb';
import { IoLayersOutline } from 'react-icons/io5';
import { LuCalendarClock } from 'react-icons/lu';
import { PiSwapFill } from 'react-icons/pi';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { IoCalendarOutline } from 'react-icons/io5';
import { VscLayersActive } from 'react-icons/vsc';
import { GrSchedules } from 'react-icons/gr';
import { RiFileSettingsLine } from 'react-icons/ri';
import { HiDocumentSearch } from 'react-icons/hi';
import appConfig from 'configs/app.config';
const { clientName } = appConfig;

const {
  BLUE_500,
  EMERALD_300,
  AMBER_500,
  RED_500,
  EMERALD_500,
} = require('./tw_colors');

const PROGRAMMING_DASHBOARD_SHORTCUTS = [
  {
    key: 'order',
    name: 'Content Master',
    nav: 'blue-500',
    link: 'contentmaster',
    icon: <FaPhotoVideo style={{ fontSize: 35, color: BLUE_500 }} />,
    details:
      'Content Creation with metadata information. Kindly check the content',
  },
  {
    key: 'order3',
    name: 'Content Segment',
    nav: 'emerald-500',
    link: 'contentsegment',
    icon: (
      <MdOutlineVideoSettings style={{ fontSize: 35, color: EMERALD_500 }} />
    ),
    details:
      'Content Segment defines breaks and the segmentation of the content',
  },
  {
    key: 'order2',
    name: 'Content Rights',
    nav: 'amber-500',
    link: 'ContentContractMaster',
    icon: <TbLicense style={{ fontSize: 35, color: AMBER_500 }} />,
    details:
      'Acquisition defines contract start date and end date with number of runs restriction',
  },
  {
    key: 'order2',
    name: 'Event Team Planer',
    nav: 'amber-500',
    link: 'EventTeamPlaner',
    icon: <TbLicense style={{ fontSize: 35, color: AMBER_500 }} />,
    details:
      'Content License defines contract start date and end date with number of runs restriction',
  },
  {
    key: 'order1',
    name: 'FPC Master',
    nav: 'red-500',
    link: 'FPCMasterNew',
    icon: <GrSchedulePlay style={{ fontSize: 35, color: RED_500 }} />,
    details:
      'Fixed Program Chart is used to create list of program for telecast',
  },
  {
    key: 'order2',
    name: 'Fpc Approval',
    nav: 'amber-500',
    link: 'DailyFpcApproval',
    icon: <AiFillSchedule style={{ fontSize: 35, color: AMBER_500 }} />,
    details:
      'Verify the FPC content segmentation is missing and content is ready for broadcast',
  },
];

const DEAL_DASHBOARD_SHORTCUTS = [
  {
    key: 'order',
    name: 'Deal Master',
    nav: 'blue-500',
    link: 'dealmaster',
    icon: <FaHandHoldingUsd style={{ fontSize: 35, color: BLUE_500 }} />,
    details: 'Central repository for managing advertising deals.',
  },
  {
    key: 'order3',
    name: 'Agency Master',
    nav: 'emerald-500',
    link: 'AgencyMaster',
    icon: <BsBuildingsFill style={{ fontSize: 35, color: EMERALD_500 }} />,
    details: 'Database for managing advertising agencies.',
  },
  {
    key: 'order2',
    name: 'Client Master',
    nav: 'amber-500',
    link: 'ClientMaster',
    icon: <BsPersonSquare style={{ fontSize: 35, color: AMBER_500 }} />,
    details: 'Central database for managing advertiser clients.',
  },
  {
    key: 'order1',
    name: 'Deal Summary',
    nav: 'red-500',
    link: 'DealSummary',
    icon: <HiDocumentSearch style={{ fontSize: 35, color: RED_500 }} />,
    details: 'Overview of all advertising deals and their statuses.',
  },
  {
    key: 'order2',
    name: 'Rate Card Master',
    nav: 'amber-500',
    link: 'RateCardMaster',
    icon: <AiFillSchedule style={{ fontSize: 35, color: AMBER_500 }} />,
    details: 'Repository for advertising rates and pricing.',
  },
];

const SCHEDULING_DASHBOARD_SHORTCUTS = [
  clientName == 'masti'
    ? {
      key: 'order',
      name: 'Promo & Gags Master',
      nav: 'blue-500',
      link: 'promomaster',
      icon: <IoLayersOutline style={{ fontSize: 27, color: BLUE_500 }} />,
      details: 'Central repository for managing all promotional content',
    }
    : {
      key: 'order',
      name: 'Promo Master',
      nav: 'blue-500',
      link: 'promomaster',
      icon: <IoLayersOutline style={{ fontSize: 30, color: BLUE_500 }} />,
      details: 'Central repository for managing all promotional content',
    },
  {
    key: 'order3',
    name: 'Promo Scheduling',
    nav: 'emerald-500',
    link: 'promoscheduling',
    icon: <BsCalendar2Week style={{ fontSize: 27, color: EMERALD_500 }} />,
    details: 'Timetable for airing promotional content during broadcasts',
  },
  // {
  //   key: 'order2',
  //   name: 'Song Scheduling',
  //   nav: 'amber-500',
  //   link: 'songscheduling',
  //   icon: <TbMusicCog style={{ fontSize: 28, color: AMBER_500 }} />,
  //   details: 'Plan for playing songs throughout the broadcast day',
  // },
  {
    key: 'order1',
    name: 'Ad Scheduling',
    nav: 'red-500',
    link: 'CommercialScheduling',
    icon: <TbSpeakerphone style={{ fontSize: 30, color: RED_500 }} />,
    details: 'Schedule for airing commercial advertisements',
  },
  {
    key: 'order2',
    name: 'Final Log',
    nav: 'amber-500',
    link: 'FinalLog',
    icon: <BsCollectionPlay style={{ fontSize: 28, color: AMBER_500 }} />,
    details: 'Comprehensive record of all broadcasted content and timings',
  },
];

const SALES_ADMIN_DASHBOARD_SHORTCUTS = [
  {
    key: 'order',
    name: 'Commercial',
    nav: 'blue-500',
    link: 'commercialmaster',
    icon: <IoLayersOutline style={{ fontSize: 32, color: BLUE_500 }} />,
    details: 'Central database for managing all commercial advertisements',
  },
  {
    key: 'order3',
    name: 'Spot Booking',
    nav: 'emerald-500',
    link: 'SpotBooking',
    icon: <LuCalendarClock style={{ fontSize: 30, color: EMERALD_500 }} />,
    details: 'Reserve time slots for commercial ads',
  },
  {
    key: 'order2',
    name: 'RO Import',
    nav: 'amber-500',
    link: 'RoImport',
    icon: <GrDocumentDownload style={{ fontSize: 28, color: AMBER_500 }} />,
    details: 'Import Excel orders and schedules for commercial ads',
  },
  {
    key: 'order3',
    name: 'NTC RO Import',
    nav: 'amber-500',
    link: 'RoImport',
    icon: <GrDocumentDownload style={{ fontSize: 28, color: AMBER_500 }} />,
    details: 'Import Excel orders and schedules for commercial ads',
  },
  {
    key: 'order1',
    name: 'Spots Replace',
    nav: 'red-500',
    link: 'SpotReplacement',
    icon: <PiSwapFill style={{ fontSize: 35, color: RED_500 }} />,
    details: 'Swap out scheduled commercial spots with new ads',
  },
  {
    key: 'order2',
    name: 'Spot Rescheduling',
    nav: 'amber-500',
    link: 'SpotRescheduling',
    icon: <MdOutlineEditCalendar style={{ fontSize: 30, color: AMBER_500 }} />,
    details: 'Adjust and reassign commercial ad',
  },
];
const ADMIN_DASHBOARD_SHORTCUTS = [
  {
    key: 'order',
    name: 'User Master',
    nav: 'blue-500',
    link: 'UserMaster',
    icon: <FaUserCheck style={{ fontSize: 32, color: BLUE_500 }} />,
    details:
      'User master typically refers to managing user accounts and permissions.',
  },
  {
    key: 'order3',
    name: 'User Activity',
    nav: 'emerald-500',
    link: 'UserActivity',
    icon: <RiFileSettingsLine style={{ fontSize: 30, color: EMERALD_500 }} />,
    details: 'User Activity is actions a user performs in a system.',
  },

  {
    key: 'order2',
    name: 'Event Color',
    nav: 'amber-500',
    link: 'LoginEventColorMaster',
    icon: <MdEvent style={{ fontSize: 28, color: AMBER_500 }} />,
    details:
      'Assign and manage colors for categorizing different events in the schedule.',
  },
  {
    key: 'order1',
    name: 'Channel Setting',
    nav: 'red-500',
    link: 'ChannelSettingMaster',
    icon: <MdOutlineDisplaySettings style={{ fontSize: 35, color: RED_500 }} />,
    details:
      'Configure and manage channel-specific parameters and preferences for broadcasting.',
  },
  {
    key: 'order2',
    name: 'User Approval',
    nav: 'amber-500',
    link: 'UserApproval',
    icon: (
      <IoShieldCheckmarkOutline style={{ fontSize: 30, color: AMBER_500 }} />
    ),
    details:
      'Process for reviewing and authorizing user access or changes in the system.',
  },
];

const BILLING_DASHBOARD_SHORTCUTS = [
  {
    key: 'order',
    name: 'Asrun Matching',
    nav: 'blue-500',
    link: 'AsrunMatching',
    icon: <VscLayersActive style={{ fontSize: 30, color: BLUE_500 }} />,
    details:
      'Align commercial logs with actual broadcast schedules for accuracy',
  },
  {
    key: 'order3',
    name: 'Traffic Day',
    nav: 'emerald-500',
    link: 'TrafficDay',
    icon: <IoCalendarOutline style={{ fontSize: 28, color: EMERALD_500 }} />,
    details: 'Manage the broadcast date of daily broadcast activities',
  },
  {
    key: 'order2',
    name: 'Bill Generation',
    nav: 'amber-500',
    link: 'BillGeneration',
    icon: <LiaFileInvoiceSolid style={{ fontSize: 33, color: AMBER_500 }} />,
    details: 'Create and issue invoices based on ad bookings and schedules',
  },
  {
    key: 'order1',
    name: 'Bill Printing',
    nav: 'red-500',
    link: 'billprinting',
    icon: <IoPrintOutline style={{ fontSize: 32, color: RED_500 }} />,
    details: 'Print invoices for commercial advertising services',
  },
  {
    key: 'order2',
    name: 'Billing Series',
    nav: 'amber-500',
    link: 'InvoiceSeries',
    icon: <BsCalendar4Range style={{ fontSize: 25, color: AMBER_500 }} />,
    details: 'Sequence of billing cycles or periods for advertisements',
  },
];

const NTC_DASHBOARD_SHORTCUTS = [
  {
    key: 'order',
    name: 'NTC Master',
    nav: 'blue-500',
    link: 'NTCMaster',
    icon: <IoLayersOutline style={{ fontSize: 30, color: BLUE_500 }} />,
    details: 'Central repository for managing non-time-consuming content',
  },
  {
    key: 'order3',
    name: 'NTC Spot Booking',
    nav: 'emerald-500',
    link: 'NtcSpotBooking',
    icon: <LuCalendarClock style={{ fontSize: 28, color: EMERALD_500 }} />,
    details: 'Reserve slots for non-time-consuming content',
  },
  {
    key: 'order2',
    name: 'NTC Scheduling',
    nav: 'amber-500',
    link: 'ntcscheduling',
    icon: <GrSchedules style={{ fontSize: 27, color: AMBER_500 }} />,
    details:
      'Plan and organize non-time-consuming content within the broadcast',
  },
  {
    key: 'order1',
    name: 'NTC Bill Generation',
    nav: 'red-500',
    link: 'NTCBillGeneration',
    icon: <LiaFileInvoiceSolid style={{ fontSize: 33, color: RED_500 }} />,
    details: 'Create invoices for non-time-consuming content services',
  },
  {
    key: 'order2',
    name: 'NTC Bill Printing',
    nav: 'amber-500',
    link: 'ntcbillprinting',
    icon: <IoPrintOutline style={{ fontSize: 32, color: AMBER_500 }} />,
    details: 'Print invoices for non-time-consuming content bookings',
  },
];
const ACCOUNTS_DASHBOARD_SHORTCUTS = [
  {
    key: 'order',
    name: 'Agency Payment',
    nav: 'blue-500',
    link: 'AgencyPayment',
    icon: <FaPhotoVideo style={{ fontSize: 35, color: BLUE_500 }} />,
    details:
      'Agency payment is the process of paying an agency for services rendered.',
  },
  {
    key: 'order3',
    name: 'Credit Note',
    nav: 'emerald-500',
    link: 'CreditNote',
    icon: (
      <MdOutlineVideoSettings style={{ fontSize: 35, color: EMERALD_500 }} />
    ),
    details: 'Credit notes are documents used to adjust invoices.',
  },
  {
    key: 'order1',
    name: 'Debit Note',
    nav: 'red-500',
    link: 'CreditNote',
    icon: <GrSchedulePlay style={{ fontSize: 35, color: RED_500 }} />,
    details: 'Debit notes are documents used to adjust invoices.',
  },
  {
    key: 'order2',
    name: 'Adjustment',
    nav: 'amber-500',
    link: 'InvoiceAdjustment',
    icon: <TbLicense style={{ fontSize: 35, color: AMBER_500 }} />,
    details:
      'Invoice adjustment is the process of modifying an invoice amount due to errors, changes, or credits.',
  },

  {
    key: 'order2',
    name: 'Payment Due',
    nav: 'amber-500',
    link: 'agencyoutstanding',
    icon: <AiFillSchedule style={{ fontSize: 35, color: AMBER_500 }} />,
    details:
      'Agency outstanding refers to the unpaid balance owed to an agency for services rendered.',
  },
];
const PaymentDue_DASHBOARD_SHORTCUTS = [
  {
    key: 'order',
    name: 'Previous Month OutStanding',
    nav: 'blue-500',
    icon: <TbCalendarTime style={{ fontSize: 35, color: BLUE_500 }} />,
    details:
      'Click here to view the outstanding payments from the previous month.',
  },
  {
    key: 'order3',
    name: 'Current Month OutStanding',
    nav: 'emerald-500',
    icon: (
      <MdOutlineCalendarMonth style={{ fontSize: 35, color: EMERALD_500 }} />
    ),
    details:
      'Click here to view the outstanding payments from the Current month.',
  },
  {
    key: 'order1',
    name: 'Next Month OutStanding',
    nav: 'red-500',
    icon: <TbCalendarCheck style={{ fontSize: 35, color: RED_500 }} />,
    details: 'Click here to view the outstanding payments from the Next month.',
  },
];

const SPORTS_DASHBOARD_SHORTCUTS = [
  {
    key: 'order',
    name: 'Events',
    nav: 'blue-500',
    link: 'EventMaster',
    icon: <MdOutlineEmojiEvents style={{ fontSize: 32, color: BLUE_500 }} />,
    details: 'Central database for managing all commercial advertisements',
  },
  {
    key: 'order3',
    name: 'Teams',
    nav: 'emerald-500',
    link: 'TeamMaster',
    icon: <MdGroups2 style={{ fontSize: 30, color: EMERALD_500 }} />,
    details: 'Reserve time slots for commercial ads',
  },
  {
    key: 'order2',
    name: 'Scheduling',
    nav: 'amber-500',
    link: 'eventplanner',
    icon: <LuCalendarClock style={{ fontSize: 28, color: AMBER_500 }} />,
    details: 'Import Excel orders and schedules for commercial ads',
  },
  {
    key: 'order1',
    name: 'Upcoming Matches',
    nav: 'red-500',
    link: 'ManageEvents',
    icon: <MdEventAvailable style={{ fontSize: 35, color: RED_500 }} />,
    details: 'Swap out scheduled commercial spots with new ads',
  },
];

export {
  ACCOUNTS_DASHBOARD_SHORTCUTS,
  PROGRAMMING_DASHBOARD_SHORTCUTS,
  DEAL_DASHBOARD_SHORTCUTS,
  SCHEDULING_DASHBOARD_SHORTCUTS,
  SALES_ADMIN_DASHBOARD_SHORTCUTS,
  BILLING_DASHBOARD_SHORTCUTS,
  NTC_DASHBOARD_SHORTCUTS,
  ADMIN_DASHBOARD_SHORTCUTS,
  PaymentDue_DASHBOARD_SHORTCUTS,
  SPORTS_DASHBOARD_SHORTCUTS,
};
