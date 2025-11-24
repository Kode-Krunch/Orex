import { Checkbox } from 'components/ui';
import React, { useState, useEffect } from 'react';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import {
  apiGetModulemaster,
  apiGetSubModulemaster,
} from 'services/MasterService';

const Moudle = [
  {
    ModuleCode: 18,
    ModuleName: 'SALES',
    IndexNum: 1,
    ModuleImage: '1.png',
    IsActive: 0,
    AddedBy: 4,
    AddedOn: '2024-03-15T12:18:04.013000',
  },
  {
    ModuleCode: 17,
    ModuleName: 'ORGANIZER',
    IndexNum: 45,
    ModuleImage: '1.png',
    IsActive: 0,
    AddedBy: 4,
    AddedOn: '2024-03-11T12:50:06.500000',
  },
  {
    ModuleCode: 15,
    ModuleName: 'WEB',
    IndexNum: 10,
    ModuleImage: '1.png',
    IsActive: 0,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:54.113000',
  },
  {
    ModuleCode: 14,
    ModuleName: 'ADMIN',
    IndexNum: 1,
    ModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:54.010000',
  },
  {
    ModuleCode: 13,
    ModuleName: 'SPONSOR',
    IndexNum: 10,
    ModuleImage: '1.png',
    IsActive: 0,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.910000',
  },
  {
    ModuleCode: 12,
    ModuleName: 'ACCOUNTS',
    IndexNum: 20,
    ModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.810000',
  },
  {
    ModuleCode: 11,
    ModuleName: 'REPORTS',
    IndexNum: 12,
    ModuleImage: '1.png',
    IsActive: 0,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.710000',
  },
  {
    ModuleCode: 10,
    ModuleName: 'PROGRAMMING',
    IndexNum: 2,
    ModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.613000',
  },
  {
    ModuleCode: 9,
    ModuleName: 'OTT/VOD',
    IndexNum: 13,
    ModuleImage: '1.png',
    IsActive: 0,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.510000',
  },
  {
    ModuleCode: 8,
    ModuleName: 'NTC',
    IndexNum: 9,
    ModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.410000',
  },
  {
    ModuleCode: 7,
    ModuleName: 'MORGNISER',
    IndexNum: 3,
    ModuleImage: '1.png',
    IsActive: 0,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.313000',
  },
  {
    ModuleCode: 6,
    ModuleName: 'SCHEDULING',
    IndexNum: 6,
    ModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.217000',
  },
  {
    ModuleCode: 5,
    ModuleName: 'LIBRARY',
    IndexNum: 9,
    ModuleImage: '1.png',
    IsActive: 0,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.117000',
  },
  {
    ModuleCode: 4,
    ModuleName: 'SALES ADMIN',
    IndexNum: 5,
    ModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:53.020000',
  },
  {
    ModuleCode: 3,
    ModuleName: 'BILLING',
    IndexNum: 7,
    ModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:52.920000',
  },
  {
    ModuleCode: 2,
    ModuleName: 'DEAL',
    IndexNum: 4,
    ModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:52.820000',
  },
  {
    ModuleCode: 1,
    ModuleName: 'ALTERATION',
    IndexNum: 11,
    ModuleImage: '1.png',
    IsActive: 0,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:52.723000',
  },
];

const SubModule = [
  {
    SubModuleCode: 74,
    SubModuleName: 'NTC Spot Management',
    ModuleCode: 8,
    module: {
      ModuleCode: 8,
      ModuleName: 'NTC',
    },
    IndexNum: 3,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 62,
    AddedOn: '2024-08-28T13:54:27.560000',
  },
  {
    SubModuleCode: 73,
    SubModuleName: 'Event Management',
    ModuleCode: 10,
    module: {
      ModuleCode: 10,
      ModuleName: 'PROGRAMMING',
    },
    IndexNum: 98,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-08-05T12:30:50.447000',
  },
  {
    SubModuleCode: 72,
    SubModuleName: 'Spot Management',
    ModuleCode: 4,
    module: {
      ModuleCode: 4,
      ModuleName: 'SALES ADMIN',
    },
    IndexNum: 9,
    SubModuleImage: 'string',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-07-30T12:38:55.940000',
  },
  {
    SubModuleCode: 71,
    SubModuleName: 'NTC Bill Setting',
    ModuleCode: 8,
    module: {
      ModuleCode: 8,
      ModuleName: 'NTC',
    },
    IndexNum: 9,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-07-17T22:26:11.253000',
  },
  {
    SubModuleCode: 70,
    SubModuleName: 'NTC Bill Printing',
    ModuleCode: 8,
    module: {
      ModuleCode: 8,
      ModuleName: 'NTC',
    },
    IndexNum: 5,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-07-17T22:25:52.717000',
  },
  {
    SubModuleCode: 69,
    SubModuleName: 'NTC Bill Generation',
    ModuleCode: 8,
    module: {
      ModuleCode: 8,
      ModuleName: 'NTC',
    },
    IndexNum: 4,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-07-17T22:25:22.103000',
  },
  {
    SubModuleCode: 67,
    SubModuleName: 'Billing Setting',
    ModuleCode: 17,
    module: {
      ModuleCode: 17,
      ModuleName: 'ORGANIZER',
    },
    IndexNum: 1234,
    SubModuleImage: 'string',
    IsActive: 1,
    AddedBy: 4,
    AddedOn: '2024-07-12T17:02:27.390000',
  },
  {
    SubModuleCode: 66,
    SubModuleName: 'Bill Settings',
    ModuleCode: 3,
    module: {
      ModuleCode: 3,
      ModuleName: 'BILLING',
    },
    IndexNum: 8,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-07-11T08:06:10.430000',
  },
  {
    SubModuleCode: 64,
    SubModuleName: 'Payments',
    ModuleCode: 17,
    module: {
      ModuleCode: 17,
      ModuleName: 'ORGANIZER',
    },
    IndexNum: 80,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-06-17T16:17:53.487000',
  },
  {
    SubModuleCode: 63,
    SubModuleName: 'ThirdParty Integration',
    ModuleCode: 15,
    module: {
      ModuleCode: 15,
      ModuleName: 'WEB',
    },
    IndexNum: 4,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-06-12T18:14:42.447000',
  },
  {
    SubModuleCode: 62,
    SubModuleName: 'Metadata',
    ModuleCode: 10,
    module: {
      ModuleCode: 10,
      ModuleName: 'PROGRAMMING',
    },
    IndexNum: 53,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-06-11T23:14:30.630000',
  },
  {
    SubModuleCode: 60,
    SubModuleName: 'Common Master',
    ModuleCode: 2,
    module: {
      ModuleCode: 2,
      ModuleName: 'DEAL',
    },
    IndexNum: 2,
    SubModuleImage: 'string',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-03-15T16:14:31.047000',
  },
  {
    SubModuleCode: 58,
    SubModuleName: 'Song Organizer',
    ModuleCode: 6,
    module: {
      ModuleCode: 6,
      ModuleName: 'SCHEDULING',
    },
    IndexNum: 3,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 3,
    AddedOn: '2024-02-09T16:51:35.730000',
  },
  {
    SubModuleCode: 57,
    SubModuleName: 'Promo Organizer',
    ModuleCode: 6,
    module: {
      ModuleCode: 6,
      ModuleName: 'SCHEDULING',
    },
    IndexNum: 2,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 3,
    AddedOn: '2024-02-09T16:51:19.140000',
  },
  {
    SubModuleCode: 56,
    SubModuleName: 'Common Master',
    ModuleCode: 10,
    module: {
      ModuleCode: 10,
      ModuleName: 'PROGRAMMING',
    },
    IndexNum: 52,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-08T11:04:30.803000',
  },
  {
    SubModuleCode: 55,
    SubModuleName: 'Searching',
    ModuleCode: 1,
    module: {
      ModuleCode: 1,
      ModuleName: 'ALTERATION',
    },
    IndexNum: 166,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:06:00.610000',
  },
  {
    SubModuleCode: 54,
    SubModuleName: 'WEB',
    ModuleCode: 15,
    module: {
      ModuleCode: 15,
      ModuleName: 'WEB',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:06:00.497000',
  },
  {
    SubModuleCode: 53,
    SubModuleName: 'VOD',
    ModuleCode: 9,
    module: {
      ModuleCode: 9,
      ModuleName: 'OTT/VOD',
    },
    IndexNum: 2,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:06:00.377000',
  },
  {
    SubModuleCode: 52,
    SubModuleName: 'User Management',
    ModuleCode: 14,
    module: {
      ModuleCode: 14,
      ModuleName: 'ADMIN',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:06:00.260000',
  },
  {
    SubModuleCode: 51,
    SubModuleName: 'Tape Serach',
    ModuleCode: 10,
    module: {
      ModuleCode: 10,
      ModuleName: 'PROGRAMMING',
    },
    IndexNum: 3,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:06:00.147000',
  },
  {
    SubModuleCode: 50,
    SubModuleName: 'Transaction',
    ModuleCode: 1,
    module: {
      ModuleCode: 1,
      ModuleName: 'ALTERATION',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:06:00.030000',
  },
  {
    SubModuleCode: 49,
    SubModuleName: 'Third Party Integration',
    ModuleCode: 3,
    module: {
      ModuleCode: 3,
      ModuleName: 'BILLING',
    },
    IndexNum: 5,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:59.910000',
  },
  {
    SubModuleCode: 48,
    SubModuleName: 'Third-Party Integration',
    ModuleCode: 6,
    module: {
      ModuleCode: 6,
      ModuleName: 'SCHEDULING',
    },
    IndexNum: 4,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:59.790000',
  },
  {
    SubModuleCode: 47,
    SubModuleName: 'Rate Management',
    ModuleCode: 2,
    module: {
      ModuleCode: 2,
      ModuleName: 'DEAL',
    },
    IndexNum: 3,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:59.677000',
  },
  {
    SubModuleCode: 46,
    SubModuleName: 'Third-Party Integration',
    ModuleCode: 4,
    module: {
      ModuleCode: 4,
      ModuleName: 'SALES ADMIN',
    },
    IndexNum: 5,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:59.560000',
  },
  {
    SubModuleCode: 45,
    SubModuleName: 'Tape BarCode',
    ModuleCode: 5,
    module: {
      ModuleCode: 5,
      ModuleName: 'LIBRARY',
    },
    IndexNum: 4,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:59.440000',
  },
  {
    SubModuleCode: 44,
    SubModuleName: 'System Settings',
    ModuleCode: 14,
    module: {
      ModuleCode: 14,
      ModuleName: 'ADMIN',
    },
    IndexNum: 4,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:59.320000',
  },
  {
    SubModuleCode: 43,
    SubModuleName: 'Report',
    ModuleCode: 13,
    module: {
      ModuleCode: 13,
      ModuleName: 'SPONSOR',
    },
    IndexNum: 5,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:59.207000',
  },
  {
    SubModuleCode: 42,
    SubModuleName: 'Reports',
    ModuleCode: 3,
    module: {
      ModuleCode: 3,
      ModuleName: 'BILLING',
    },
    IndexNum: 99,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:59.090000',
  },
  {
    SubModuleCode: 41,
    SubModuleName: 'Reports',
    ModuleCode: 5,
    module: {
      ModuleCode: 5,
      ModuleName: 'LIBRARY',
    },
    IndexNum: 5,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:58.973000',
  },
  {
    SubModuleCode: 40,
    SubModuleName: 'Reports',
    ModuleCode: 6,
    module: {
      ModuleCode: 6,
      ModuleName: 'SCHEDULING',
    },
    IndexNum: 99,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:58.857000',
  },
  {
    SubModuleCode: 39,
    SubModuleName: 'Reports',
    ModuleCode: 2,
    module: {
      ModuleCode: 2,
      ModuleName: 'DEAL',
    },
    IndexNum: 99,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:58.743000',
  },
  {
    SubModuleCode: 38,
    SubModuleName: 'Reports',
    ModuleCode: 4,
    module: {
      ModuleCode: 4,
      ModuleName: 'SALES ADMIN',
    },
    IndexNum: 99,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:58.630000',
  },
  {
    SubModuleCode: 37,
    SubModuleName: 'Reports',
    ModuleCode: 10,
    module: {
      ModuleCode: 10,
      ModuleName: 'PROGRAMMING',
    },
    IndexNum: 110,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:58.513000',
  },
  {
    SubModuleCode: 36,
    SubModuleName: 'Reports',
    ModuleCode: 14,
    module: {
      ModuleCode: 14,
      ModuleName: 'ADMIN',
    },
    IndexNum: 5,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:58.393000',
  },
  {
    SubModuleCode: 35,
    SubModuleName: 'OTT',
    ModuleCode: 9,
    module: {
      ModuleCode: 9,
      ModuleName: 'OTT/VOD',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:58.277000',
  },
  {
    SubModuleCode: 34,
    SubModuleName: 'NTC',
    ModuleCode: 8,
    module: {
      ModuleCode: 8,
      ModuleName: 'NTC',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:58.160000',
  },
  {
    SubModuleCode: 33,
    SubModuleName: 'NTC Sponsorship',
    ModuleCode: 13,
    module: {
      ModuleCode: 13,
      ModuleName: 'SPONSOR',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:58.047000',
  },
  {
    SubModuleCode: 32,
    SubModuleName: 'NTC Management',
    ModuleCode: 6,
    module: {
      ModuleCode: 6,
      ModuleName: 'SCHEDULING',
    },
    IndexNum: 2,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:57.923000',
  },
  {
    SubModuleCode: 31,
    SubModuleName: 'Non Linear Management',
    ModuleCode: 6,
    module: {
      ModuleCode: 6,
      ModuleName: 'SCHEDULING',
    },
    IndexNum: 3,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:57.810000',
  },
  {
    SubModuleCode: 30,
    SubModuleName: 'Music Store',
    ModuleCode: 7,
    module: {
      ModuleCode: 7,
      ModuleName: 'MORGNISER',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:57.690000',
  },
  {
    SubModuleCode: 29,
    SubModuleName: 'Music Policy',
    ModuleCode: 7,
    module: {
      ModuleCode: 7,
      ModuleName: 'MORGNISER',
    },
    IndexNum: 4,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:57.577000',
  },
  {
    SubModuleCode: 28,
    SubModuleName: 'MIS Reports',
    ModuleCode: 11,
    module: {
      ModuleCode: 11,
      ModuleName: 'REPORTS',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:57.457000',
  },
  {
    SubModuleCode: 27,
    SubModuleName: 'Master Data',
    ModuleCode: 5,
    module: {
      ModuleCode: 5,
      ModuleName: 'LIBRARY',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:57.340000',
  },
  {
    SubModuleCode: 26,
    SubModuleName: 'Master Data',
    ModuleCode: 2,
    module: {
      ModuleCode: 2,
      ModuleName: 'DEAL',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:57.227000',
  },
  {
    SubModuleCode: 25,
    SubModuleName: 'Master Data',
    ModuleCode: 4,
    module: {
      ModuleCode: 4,
      ModuleName: 'SALES ADMIN',
    },
    IndexNum: 1,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:57.113000',
  },
  {
    SubModuleCode: 24,
    SubModuleName: 'Linear Management',
    ModuleCode: 6,
    module: {
      ModuleCode: 6,
      ModuleName: 'SCHEDULING',
    },
    IndexNum: 4,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:56.993000',
  },
  {
    SubModuleCode: 23,
    SubModuleName: 'FPC Management',
    ModuleCode: 10,
    module: {
      ModuleCode: 10,
      ModuleName: 'PROGRAMMING',
    },
    IndexNum: 3,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:56.877000',
  },
  {
    SubModuleCode: 22,
    SubModuleName: 'Daily Transactions',
    ModuleCode: 8,
    module: {
      ModuleCode: 8,
      ModuleName: 'NTC',
    },
    IndexNum: 2,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:56.760000',
  },
  {
    SubModuleCode: 21,
    SubModuleName: 'Daily Transaction',
    ModuleCode: 5,
    module: {
      ModuleCode: 5,
      ModuleName: 'LIBRARY',
    },
    IndexNum: 2,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:56.647000',
  },
  {
    SubModuleCode: 20,
    SubModuleName: 'Daily Transaction',
    ModuleCode: 2,
    module: {
      ModuleCode: 2,
      ModuleName: 'DEAL',
    },
    IndexNum: 2,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:56.530000',
  },
  {
    SubModuleCode: 19,
    SubModuleName: 'Daily Transaction',
    ModuleCode: 4,
    module: {
      ModuleCode: 4,
      ModuleName: 'SALES ADMIN',
    },
    IndexNum: 2,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:56.410000',
  },
  {
    SubModuleCode: 18,
    SubModuleName: 'Channel Settings',
    ModuleCode: 14,
    module: {
      ModuleCode: 14,
      ModuleName: 'ADMIN',
    },
    IndexNum: 2,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:56.300000',
  },
  {
    SubModuleCode: 17,
    SubModuleName: 'Clock Management',
    ModuleCode: 7,
    module: {
      ModuleCode: 7,
      ModuleName: 'MORGNISER',
    },
    IndexNum: 2,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:56.183000',
  },
  {
    SubModuleCode: 16,
    SubModuleName: 'Content Management',
    ModuleCode: 10,
    module: {
      ModuleCode: 10,
      ModuleName: 'PROGRAMMING',
    },
    IndexNum: 1,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:56.070000',
  },
  {
    SubModuleCode: 15,
    SubModuleName: 'Content License',
    ModuleCode: 10,
    module: {
      ModuleCode: 10,
      ModuleName: 'PROGRAMMING',
    },
    IndexNum: 2,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:55.950000',
  },
  {
    SubModuleCode: 14,
    SubModuleName: 'Master Data',
    ModuleCode: 3,
    module: {
      ModuleCode: 3,
      ModuleName: 'BILLING',
    },
    IndexNum: 1,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:55.837000',
  },
  {
    SubModuleCode: 13,
    SubModuleName: 'Bill Printing',
    ModuleCode: 3,
    module: {
      ModuleCode: 3,
      ModuleName: 'BILLING',
    },
    IndexNum: 4,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:55.720000',
  },
  {
    SubModuleCode: 12,
    SubModuleName: 'Bill Generation',
    ModuleCode: 3,
    module: {
      ModuleCode: 3,
      ModuleName: 'BILLING',
    },
    IndexNum: 2,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:55.607000',
  },
  {
    SubModuleCode: 11,
    SubModuleName: 'Reports',
    ModuleCode: 12,
    module: {
      ModuleCode: 12,
      ModuleName: 'ACCOUNTS',
    },
    IndexNum: 99,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:55.483000',
  },
  {
    SubModuleCode: 10,
    SubModuleName: 'Accounts Intergartion',
    ModuleCode: 12,
    module: {
      ModuleCode: 12,
      ModuleName: 'ACCOUNTS',
    },
    IndexNum: 4,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:55.370000',
  },
  {
    SubModuleCode: 9,
    SubModuleName: 'Approval Management',
    ModuleCode: 12,
    module: {
      ModuleCode: 12,
      ModuleName: 'ACCOUNTS',
    },
    IndexNum: 3,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:55.257000',
  },
  {
    SubModuleCode: 8,
    SubModuleName: 'Daily Transaction',
    ModuleCode: 12,
    module: {
      ModuleCode: 12,
      ModuleName: 'ACCOUNTS',
    },
    IndexNum: 2,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:55.143000',
  },
  {
    SubModuleCode: 7,
    SubModuleName: 'Master Data',
    ModuleCode: 12,
    module: {
      ModuleCode: 12,
      ModuleName: 'ACCOUNTS',
    },
    IndexNum: 1,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:55.023000',
  },
  {
    SubModuleCode: 6,
    SubModuleName: 'Auto Scheduling',
    ModuleCode: 7,
    module: {
      ModuleCode: 7,
      ModuleName: 'MORGNISER',
    },
    IndexNum: 3,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:54.907000',
  },
  {
    SubModuleCode: 5,
    SubModuleName: 'Audit Reports',
    ModuleCode: 1,
    module: {
      ModuleCode: 1,
      ModuleName: 'ALTERATION',
    },
    IndexNum: 2,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:54.790000',
  },
  {
    SubModuleCode: 4,
    SubModuleName: 'Approval Management',
    ModuleCode: 2,
    module: {
      ModuleCode: 2,
      ModuleName: 'DEAL',
    },
    IndexNum: 3,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:54.677000',
  },
  {
    SubModuleCode: 3,
    SubModuleName: 'Approval Management',
    ModuleCode: 4,
    module: {
      ModuleCode: 4,
      ModuleName: 'SALES ADMIN',
    },
    IndexNum: 4,
    SubModuleImage: null,
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:54.560000',
  },
  {
    SubModuleCode: 2,
    SubModuleName: 'Approval Management',
    ModuleCode: 10,
    module: {
      ModuleCode: 10,
      ModuleName: 'PROGRAMMING',
    },
    IndexNum: 4,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:54.440000',
  },
  {
    SubModuleCode: 1,
    SubModuleName: 'Common Master',
    ModuleCode: 14,
    module: {
      ModuleCode: 14,
      ModuleName: 'ADMIN',
    },
    IndexNum: 3,
    SubModuleImage: '1.png',
    IsActive: 1,
    AddedBy: 1,
    AddedOn: '2024-02-02T16:05:54.323000',
  },
];

const TreeView = ({ checkedState, setCheckedState }) => {
  const [isSubModuleOpen, setIsSubModuleOpen] = useState(null);
  useEffect(() => {
    const initialState = Moudle.reduce((acc, module) => {
      const submodules = SubModule.filter(
        (sub) => sub.ModuleCode === module.ModuleCode,
      );
      const submoduleData = submodules.reduce((subAcc, sub) => {
        subAcc[sub.SubModuleName] = {
          checked: false,
          subcode: sub.SubModuleCode,
        };
        return subAcc;
      }, {});

      acc[module.ModuleName] = { checked: false, submodules: submoduleData };
      return acc;
    }, {});

    setCheckedState(initialState); // Initialize the state with modules and submodules
  }, []);

  // Handle module checkbox change
  const handleModuleChange = (moduleName) => {
    setCheckedState((prevState) => {
      const updatedState = { ...prevState };
      if (updatedState[moduleName]) {
        updatedState[moduleName].checked = !updatedState[moduleName].checked;
        // Toggle all submodules under this module
        Object.keys(updatedState[moduleName].submodules).forEach(
          (submodule) => {
            updatedState[moduleName].submodules[submodule].checked =
              updatedState[moduleName].checked;
          },
        );
      }
      return updatedState;
    });
  };

  // Handle submodule checkbox change
  const handleSubmoduleChange = (moduleName, submoduleName) => {
    setCheckedState((prevState) => {
      const updatedState = { ...prevState };
      if (
        updatedState[moduleName] &&
        updatedState[moduleName].submodules[submoduleName]
      ) {
        updatedState[moduleName].submodules[submoduleName].checked =
          !updatedState[moduleName].submodules[submoduleName].checked;

        // Update the module's checked state based on the submodules' state
        updatedState[moduleName].checked = Object.values(
          updatedState[moduleName].submodules,
        ).every((sub) => sub.checked);
      }
      return updatedState;
    });
  };

  // Handle opening/closing submodule accordion
  const toggleSubModule = (moduleName) => {
    setIsSubModuleOpen((prevOpen) =>
      prevOpen === moduleName ? null : moduleName,
    );
  };

  // Render the tree view
  const renderTree = () => {
    return Object.keys(checkedState).map((moduleName) => {
      const module = checkedState[moduleName];
      const hasSubmodules = Object.keys(module.submodules).length > 0; // Check if the module has submodules
      const isOpen = isSubModuleOpen === moduleName; // Check if this module is open

      return (
        <div key={moduleName} className="w-full">
          <div className="flex justify-between items-center border-t border-l border-r border-slate-600 py-1 px-6 bg-slate-900 hover:bg-slate-700 transition-all duration-300">
            <div className="flex items-center">
              <Checkbox
                className="hover:scale-110 transition-transform duration-300"
                checked={module.checked}
                onChange={() => handleModuleChange(moduleName)}
              />
              <span className="ml-2">{moduleName}</span>
            </div>
            {isOpen && (
              <BiUpArrow
                onClick={() => toggleSubModule(moduleName)}
                className="ml-2 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
            )}
            {!isOpen && hasSubmodules && (
              <BiDownArrow
                onClick={() => toggleSubModule(moduleName)}
                className="ml-2 cursor-pointer transform transition-transform duration-300 hover:scale-125"
              />
            )}
          </div>
          {isOpen && hasSubmodules && (
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: isOpen ? '500px' : '0',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {Object.keys(module.submodules).map((submoduleName) => (
                <div
                  key={submoduleName}
                  className="flex items-center border-t border-l border-r border-slate-600 py-1 pl-12 bg-slate-800 hover:bg-slate-700 transition-all duration-300"
                >
                  <Checkbox
                    className="hover:scale-110 transition-transform duration-300"
                    checked={module.submodules[submoduleName].checked}
                    onChange={() =>
                      handleSubmoduleChange(moduleName, submoduleName)
                    }
                  />
                  <span className="ml-2">{submoduleName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  return <div className="p-2 bg-gray-900 text-white">{renderTree()}</div>;
};

export default TreeView;
