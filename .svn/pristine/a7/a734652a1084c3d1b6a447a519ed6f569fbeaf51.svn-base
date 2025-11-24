import React from 'react';
import authRoute from './authRoute';
import { ADMIN, USER } from 'constants/roles.constant';
// import LocalEvent from 'views/Sports/LocalEvent/LocalEvent';
// import appConfig from 'configs/app.config';

export const publicRoutes = [...authRoute];
export const billPrintingRouteTitle = 'Bill Printing';
export const ntcBillPrintingRouteTitle = 'NTC Bill Printing';
export const telecastCertificateRouteTitle = 'Telecast Certificate';
export const ntcTelecastCertificateRouteTitle = 'NTC Telecast Certificate';
export const billingSeriesRouteTitle = 'Billing Series';

export const ntcBillingSeriesRouteTitle = 'NTC Billing Series';
export const asunMatchingRouteTitle = 'Asrun Matching';
export const ntcAsunMatchingRouteTitle = 'NTC Asrun Matching';
export const contentContractMasterEditPath = '/ContentContractEdit';
export const localeventRouteTitle = 'Local Event';
const SCHEDULER_FOLDER = 'Scheduler';

export const protectedRoutes = [
  // {
  //   key: 'home',
  //   path: '/home',
  //   title: 'home',
  //   component: React.lazy(() => import('views/Home')),
  //   authority: [ADMIN, USER],
  // },
  {
    key: 'Sports',
    path: '/Sports',
    title: 'Event Planner',
    component: React.lazy(() => import('views/Sports/SportsDashboard')),
    authority: [ADMIN, USER],
  },
  {
    key: 'EventMaster',
    path: '/EventMaster',
    title: 'Event Master',
    component: React.lazy(() => import('views/Sports/EventMaster/EventMaster')),
    authority: [ADMIN, USER],
  },

  {
    key: 'EventPlanner',
    path: '/EventPlanner',
    title: 'Event Planner',
    component: React.lazy(() =>
      import('views/Sports/EventPlanner/EventPlaner'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'EventMaster',
    path: '/EventAddEdit',
    title: 'Event Master ',
    component: React.lazy(() =>
      import('views/Sports/EventMaster/EventAddEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'UserMaster',
    path: '/UserMaster',
    title: 'User Master',
    component: React.lazy(() =>
      import('views/Master/EmployeeMaster/Employeemaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'UserMaster',
    path: '/editUser',
    title: 'User Master',
    component: React.lazy(() =>
      import('views/Master/EmployeeMaster/EmployeeEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'UserMaster',
    path: '/quickEditUser',
    title: 'User Master',
    component: React.lazy(() =>
      import('views/Master/EmployeeMaster/QuickEmpAddEdit/QuickEmpAddEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'UserMaster',
    path: '/emp/EmplyeeView/:id',
    title: 'User Master',
    component: React.lazy(() =>
      import('views/Master/EmployeeMaster/EmployeeView'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'UserMaster',
    path: '/addUser',
    title: 'User Master',
    component: React.lazy(() =>
      import('views/Master/EmployeeMaster/EmployeeEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'UserMaster',
    path: '/quickAddUser',
    title: 'User Master',
    component: React.lazy(() =>
      import('views/Master/EmployeeMaster/QuickEmpAddEdit/QuickEmpAddEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'UserApproval',
    path: '/UserApproval',
    title: 'User Approval',
    component: React.lazy(() =>
      import('views/Master/EmployeeMaster/Employeemaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'UserRejected',
    path: '/UserRejected',
    title: 'User Rejected',
    component: React.lazy(() =>
      import('views/Master/EmployeeMaster/Employeemaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'DealMasterNew',
    path: '/DealMasterNew',
    title: 'Deal Master',
    component: React.lazy(() => import('views/Deal/DealMaster/DealMaster')),
    authority: [ADMIN, USER],
  },
  {
    key: 'SponsoredDeal',
    path: '/SponsoredDeal',
    title: 'Sponsored Deal',
    component: React.lazy(() => import('views/Deal/DealMaster/DealMaster')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealApproval',
    path: '/DealApproval',
    title: 'Deal Approval',
    component: React.lazy(() =>
      import('views/Deal/DealApproval/DealApprovalMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ClientMaster',
    path: '/AddClient',
    title: 'Client Master',
    // component: React.lazy(() => import('views/Master/ClientMaster/AddClient')),
    component: React.lazy(() =>
      import('views/Master/ClientMaster/AddEditClient'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'DealMaster',
    path: '/DealMaster/:id',
    title: 'Deal Master',
    component: React.lazy(() =>
      import('views/Deal/DealMaster/DealMasterEditBYAPI'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ClientMaster',
    path: '/EditClient',
    title: 'Client Master',
    // component: React.lazy(() => import('views/Master/ClientMaster/EditClient')),
    component: React.lazy(() =>
      import('views/Master/ClientMaster/AddEditClient'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'DailyFPCApproval',
    path: '/DailyFPCApproval',
    title: 'Daily FPC Approval',
    component: React.lazy(() =>
      import('views/Programming/DailyFPCApproval/DailyFPCApproval'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'DailyFPCApproval',
    path: '/DailyFPCApp',
    title: 'Daily FPC Approval',
    component: React.lazy(() =>
      import('views/Programming/DailyFPCApproval/DailyFPCApp'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ClientMaster',
    path: '/ClientMaster',
    title: 'Client Master',
    component: React.lazy(() =>
      import('views/Master/ClientMaster/ClientMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'AgencyMaster',
    path: '/AddAgency',
    title: 'Agency Master',
    component: React.lazy(
      // () => import('views/Creditcontrol/AgencyMaster/AddAgencyOld'),
      () => import('views/Creditcontrol/AgencyMaster/AddEditAgency'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'AgencyMaster',
    path: '/AgencyMaster',
    title: 'Agency Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/AgencyMaster/AgencyMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'EntityMaster',
    path: '/EntityMaster',
    title: 'Entity Master',
    component: React.lazy(() =>
      import('views/Master/EntityMaster/Entitymaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'EntityDeatilsMaster',
    path: '/EntityDeatilsMaster',
    title: 'Entity Deatils Master',
    component: React.lazy(() =>
      import('views/Master/EntityDeatilsMaster/EntityDeatilsMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'agencygroupmaster',
    path: '/agencygroupmaster',
    title: 'Agency Group Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/AgencyGroupMaster/Agencygroupmaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'GroupMaster',
    path: '/GroupMaster',
    title: 'Group Master',
    component: React.lazy(() => import('views/Sports/GroupMaster/Groupmaster')),
    authority: [ADMIN, USER],
  },
  {
    key: 'clientgroupmaster',
    path: '/clientgroupmaster',
    title: 'Client Group Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/ClientGroupMaster/Clientgroupmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'LocationMaster',
    path: '/LocationMaster',
    title: 'Location Master',
    component: React.lazy(() =>
      import('views/Master/LocationMaster/Locationmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'creditrate',
    path: '/creditrate',
    title: 'Credit Rate Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/CreditrateMaster/Creditratemaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'DepartmentMaster',
    path: '/DepartmentMaster',
    title: 'Department Master',
    component: React.lazy(() =>
      import('views/Master/DepartmentMaster/Departmentmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'TeamMaster',
    path: '/TeamMaster',
    title: 'Team Management',
    component: React.lazy(() =>
      import('views/Sports/TeamMaster/TeamMasterNew'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'PayRouteMaster',
    path: '/PayRouteMaster',
    title: 'Pay Route Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/PayrouteMaster/Payroutemaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ExchangeMaster',
    path: '/ExchangeMaster',
    title: 'Exchange Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/ExchangeMaster/ExchangeMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'RateCardMaster',
    path: '/RateCardMaster',
    title: 'Rate Card Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/RateCardMaster/RateCardmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ZoneMaster',
    path: '/ZoneMaster',
    title: 'Zone Master',
    component: React.lazy(() => import('views/Master/ZoneMaster/Zonemaster')),
    authority: [ADMIN, USER],
  },

  {
    key: 'LanguageMaster',
    path: '/LanguageMaster',
    title: 'Language Master',
    component: React.lazy(() =>
      import('views/Master/LanguageMaster/Languagemaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ModuleMaster',
    path: '/ModuleMaster',
    title: 'Module Master',
    component: React.lazy(() =>
      import('views/Master/ModuleMaster/Modulemaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SubModuleMaster',
    path: '/SubModuleMaster',
    title: 'Sub Module Master',
    component: React.lazy(() =>
      import('views/Master/SubModuleMaster/SubModulemaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'CurrencyMaster',
    path: '/CurrencyMaster',
    title: 'Currency Master',
    component: React.lazy(() =>
      import('views/Master/CurrencyMaster/Currencymaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'DesignationMaster',
    path: '/DesignationMaster',
    title: 'Designation Master',
    component: React.lazy(() =>
      import('views/Master/DesignationMaster/Designationmaster'),
    ),
    authority: [ADMIN, USER],
  },

  // {
  //     key: 'FormMaster',
  //     path: '/FormMaster',
  //     component: React.lazy(() =>
  //         import('views/Master/FormMaster/FormMaster')
  //     ),
  //     authority: [ADMIN, USER],
  // },
  {
    key: 'ScreenMaster',
    path: '/screenmaster',
    title: 'Screen Master',
    component: React.lazy(() => import('views/Master/FormMaster/FormMaster')),
    authority: [ADMIN, USER],
  },

  {
    key: 'ChannelMaster',
    path: '/channelmaster',
    title: 'Channel Master',
    component: React.lazy(() =>
      import('views/Master/ChannelMaster/Channelmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'PlaceMaster',
    path: '/PlaceMaster',
    title: 'Place Master',
    component: React.lazy(() => import('views/Master/PlaceMaster/Placemaster')),
    authority: [ADMIN, USER],
  },
  {
    key: 'StarCastTypeMaster',
    path: '/StarCastTypeMaster',
    title: 'Star Cast Type Master',
    component: React.lazy(() =>
      import('views/Programming/StarCastTypeMaster/StarCastTypemaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'StarCastMaster',
    path: '/StarCastMaster',
    title: 'Star Cast Master',
    component: React.lazy(() =>
      import('views/Programming/StarCastMaster/StarCastmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'GenreMaster',
    path: '/GenreMaster',
    title: 'Genre Master',
    component: React.lazy(() =>
      import('views/Programming/GenreMaster/Genremaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'subgenremaster',
    path: '/SubGenreMaster',
    title: 'Sub Genre Master',
    component: React.lazy(() =>
      import('views/Programming/SubGenreMaster/SubGenremaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'contenttypemaster',
    path: '/contenttypemaster',
    title: 'Content Type Master',
    component: React.lazy(() =>
      import('views/Programming/ContentTypeMaster/ContentTypemaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'CensorshipRatingMaster',
    path: '/censorshipratingmaster',
    title: 'Censorship Rating Master',
    component: React.lazy(() =>
      import('views/Programming/CensorshipMaster/Censorshipmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'TelecastVersionMaster',
    path: '/TelecastVersionMaster',
    title: 'Telecast Version Master',
    component: React.lazy(() =>
      import('views/Programming/TXVersionMaster/TXVersionmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SupplierMaster',
    path: '/SupplierMaster',
    title: 'Supplier Master',
    component: React.lazy(() =>
      import('views/Programming/SupplierMaster/Suppliermaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'MovieShow',
    path: '/MovieShow',
    title: 'Movie Show',
    component: React.lazy(() => import('views/MovieShowPage/Index')),
    authority: [ADMIN, USER],
  },
  {
    key: 'contentmaster',
    path: '/ContentMaster',
    title: 'Content Master',
    component: React.lazy(() =>
      import('views/Programming/ContentMaster/Contentmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'contentmaster',
    path: '/addcontent',
    title: 'Content Master',
    component: React.lazy(() =>
      import('views/Programming/ContentMaster/ContentEdit'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'templatemaster',
    path: '/templatemaster',
    title: 'Template Master',
    component: React.lazy(() =>
      import('views/Programming/ContentMaster/Contentmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'templatemaster',
    path: '/addtemplate',
    title: 'Template master',
    component: React.lazy(() =>
      import('views/Programming/ContentMaster/ContentEdit'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'contentsegment',
    path: '/addcontentseg',
    title: 'Content Segment',
    component: React.lazy(() =>
      import('views/Programming/ContentsegMaster/ContentsegEdit'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'SceneTypeMaster',
    path: '/SceneTypeMaster',
    title: 'SceneType Master',
    component: React.lazy(() =>
      import('views/Programming/SceneTypeMaster/SceneTypeMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'AmortisationTypeMaster',
    path: '/AmortisationTypeMaster',
    title: 'AmortisationType Master',
    component: React.lazy(() =>
      import('views/Programming/AmortisationMaster/AmortisationMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ContentContractMaster',
    path: '/ContentContractMaster',
    title: 'Content Contract Master',
    component: React.lazy(() =>
      import('views/Programming/ContentContract/ContentContractMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ContentContractMaster',
    path: '/ContentContractAdd',
    title: 'Content Contract Master',
    // component: React.lazy(() =>
    //   import('views/Programming/ContentContract/ContentContractAdd'),
    // ),
    component: React.lazy(() =>
      import(
        'views/Programming/ContentContract/ContentContractDetails/ContentContractDetails'
      ),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ContentContractMaster',
    path: contentContractMasterEditPath,
    title: 'Content Contract Master',
    // component: React.lazy(() =>
    //   import('views/Programming/ContentContract/ContentContractEdit'),
    // ),
    component: React.lazy(() =>
      import(
        'views/Programming/ContentContract/ContentContractDetails/ContentContractDetails'
      ),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'AspectRatioMaster',
    path: '/AspectRatioMaster',
    title: 'Aspect Ratio Master',
    component: React.lazy(() =>
      import('views/Programming/AspectRatioMaster/AspectRatioMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'CategoryMaster',
    path: '/CategoryMaster',
    title: 'Category Master',
    component: React.lazy(() =>
      import('views/Sports/CategoryMaster/CategoryMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'StateMaster',
    path: '/StateMaster',
    title: 'State Master',
    component: React.lazy(() => import('views/Master/StateMaster/StateMaster')),
    authority: [ADMIN, USER],
  },
  {
    key: 'BussinessType',
    path: '/BussinessType',
    title: 'Bussiness Type Master',
    component: React.lazy(() =>
      import('views/Deal/BussinessTypeMaster/BussinessType'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'FpcOrgRep',
    path: '/FpcOrgRep',
    title: 'FPC Org Rep Master',
    component: React.lazy(() =>
      import('views/Programming/OriginalRepeat/OriginalRepeatmaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'AwardMaster',
    path: '/AwardMaster',
    title: 'Award Master',
    component: React.lazy(() =>
      import('views/Programming/AwardMaster/Awardmaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'PromoTypeMaster',
    path: '/PromoTypeMaster',
    title: 'Promo Type Master',
    component: React.lazy(() =>
      import('views/Programming/PromoTypeMaster/PromoTypeMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'contentsegment',
    path: '/contentsegment',
    title: 'Content Segment',
    component: React.lazy(() =>
      import('views/Programming/ContentsegMaster/Contentsegmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'AudienceViewMaster',
    path: '/AudienceViewMaster',
    title: 'Audience View Master',
    component: React.lazy(() =>
      import('views/Programming/ViewMaster/Viewmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'BreakPatternMaster',
    path: '/BreakPatternMaster',
    title: 'Break Pattern Master',
    component: React.lazy(() =>
      import('views/Programming/PatternMaster/Patternmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'BreakPatternMaster',
    path: '/PatternEdit',
    title: 'Break Pattern Master',
    component: React.lazy(() =>
      import('views/Programming/PatternMaster/PatternEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'PromoSchedulingOld',
    path: '/PromoSchedulingOld',
    title: 'Promo Scheduling',
    component: React.lazy(() =>
      import('views/Scheduling/PromoScheduling/PromoScheduling'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'promoscheduling',
    path: '/promoscheduling',
    title: 'Promo Scheduling',
    component: React.lazy(() =>
      import(`views/Scheduling/${SCHEDULER_FOLDER}/Scheduler`),
    ),
    authority: [ADMIN, USER],
  },
  // {
  //   key: 'SongScheduling',
  //   path: '/SongScheduling',
  //   title: 'Song Scheduling',
  //   component: React.lazy(() =>
  //     import('views/Scheduling/SongScheduling/SongScheduling'),
  //   ),
  //   authority: [ADMIN, USER],
  // },
  {
    key: 'SongScheduling',
    path: '/SongScheduling',
    title: 'Song Scheduling',
    component: React.lazy(() =>
      import(`views/Scheduling/${SCHEDULER_FOLDER}/Scheduler`),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'WeekdaysWeekends',
    path: '/WeekdaysWeekends',
    title: 'Weekdays Weekends',
    component: React.lazy(() =>
      import('views/Programming/Weekdays_Weekends/Weekdays_Weekends'),
    ),
    authority: [ADMIN, USER],
  },

  /** Example purpose only, please remove */

  {
    key: 'FTPSetting',
    path: '/FTPSetting',
    title: 'FTP Setting',
    component: React.lazy(() => import('views/Master/FtpSetting/Ftpsetting')),
    authority: [ADMIN, USER],
  },

  {
    key: 'FPCMaster',
    path: '/fpcmaster',
    title: 'FPC Master',
    component: React.lazy(() =>
      import('views/Programming/FPCMaster/FPCmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'fpcmasterNew',
    path: '/fpcmasterNew',
    title: 'Playlist Template',
    component: React.lazy(() =>
      import('views/Programming/FPCMaster/FPCMasterNew'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'fpcmasterNew',
    path: '/addfpcNew',
    title: 'Playlist Template',
    component: React.lazy(() =>
      import('views/Programming/FPCMaster/FPC_Edit/FPCEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'FPCMaster',
    path: '/addfpc',
    title: 'FPC Master',
    component: React.lazy(() => import('views/Programming/FPCMaster/FPCEdit')),
    authority: [ADMIN, USER],
  },

  {
    key: 'ActiveLog',
    path: '/ActiveLog',
    title: 'ActiveLog',
    component: React.lazy(() => import('views/Controls/ActivityLog')),
    authority: [ADMIN, USER],
  },

  {
    key: 'WeeklyFPC',
    path: '/WeeklyFPC',
    title: 'Weekly FPC',
    component: React.lazy(() =>
      import('views/Programming/WeeklyFPC/WeeklyFPC'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'EPGMaster',
    path: '/EPGMaster',
    title: 'EPG Master',
    component: React.lazy(() =>
      import('views/Programming/EPGMaster/EPGMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'OrganisationMaster',
    path: '/OrganisationMaster',
    title: 'Organisation Master',
    component: React.lazy(() =>
      import('views/Master/OrganisationMaster/Organisationmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'BrandMaster',
    path: '/BrandMaster',
    title: 'Brand Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/BrandMaster/BrandMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SponsorTypeMaster',
    path: '/SponsorTypeMaster',
    title: 'Sponsor Type Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/SponsorTypeMaster/SponsorTypeMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ProductMaster',
    path: '/ProductMaster',
    title: 'Product Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/ProductMaster/ProductMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ProductCategoryMaster',
    path: '/ProductCategoryMaster',
    title: 'Product Category Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/SubProductMaster/SubProductMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ChannelSettingMaster',
    path: '/ChannelSettingEdit',
    title: 'Channel Setting Master',
    component: React.lazy(() =>
      import('views/Master/ChannelSettingMaster/ChannelsettingEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ChannelSettingMaster',
    path: '/ChannelSettingMaster',
    title: 'Channel Setting Master',
    component: React.lazy(() =>
      import('views/Master/ChannelSettingMaster/ChannelsettingMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'houseidconfiguration',
    path: '/houseidconfiguration',
    title: 'House ID Configuration',
    component: React.lazy(() =>
      import('views/Master/HouseIdConfiguration/HouseIdConfiguration'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'CommercialTypeMaster',
    path: '/CommercialTypeMaster',
    title: 'Commercial Type Master',
    component: React.lazy(() =>
      import('views/Salesadmin/CommercialTypeMaster/CommercialTypeMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'CommercialMaster',
    path: '/CommercialMaster',
    title: 'Commercial Master',
    component: React.lazy(() =>
      import('views/Salesadmin/CommercialMaster/CommercialMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCCommercialMaster',
    path: '/NTCCommercialMaster',
    title: 'NTC Commercial Master',
    component: React.lazy(() =>
      import('views/Salesadmin/CommercialMaster/CommercialMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCCommercialMaster',
    path: '/NTCCommercialMasterEdit',
    title: 'NTC Commercial Master',
    component: React.lazy(() =>
      import('views/Salesadmin/CommercialMaster/CommercialMasterEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'CommercialMaster',
    path: '/commercialMasterEdit',
    title: 'Commercial Master',
    component: React.lazy(() =>
      import('views/Salesadmin/CommercialMaster/CommercialMasterEdit'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'promomaster',
    path: '/promomaster',
    title: 'Promo Master',
    component: React.lazy(() =>
      import('views/Scheduling/PromoMaster/PromoMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'promomaster',
    path: '/promoMasterEdit',
    title: 'Promo Master',
    component: React.lazy(() =>
      import('views/Scheduling/PromoMaster/PromoMasterEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'Contentmasters',
    path: '/Contentmasters',
    title: 'Content Master',
    component: React.lazy(() =>
      import('views/Scheduling/PromoMaster/PromoMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'Contentmaster',
    path: '/Contentmaster',
    title: 'Content Master',
    component: React.lazy(() =>
      import('views/Scheduling/PromoMaster/PromoMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'Contentmasters',
    path: '/ContentMasterEdit',
    title: 'Content Master',
    component: React.lazy(() =>
      import('views/Scheduling/PromoMaster/PromoMasterEdit'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'SongGenre',
    path: '/SongGenre',
    title: 'Song Genre Master',
    component: React.lazy(() =>
      import('views/Scheduling/SongGenreMaster/SongGenreMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'VideoTypeMaster',
    path: '/VideoTypeMaster',
    title: 'Video Type Master',
    component: React.lazy(() =>
      import('views/Programming/VideoTypeMaster/VideoTypeMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'CancelRemarkMaster',
    path: '/CancelRemarkMaster',
    title: 'Cancel Remark Master',
    component: React.lazy(() =>
      import('views/Salesadmin/CancelRemarkMaster/CancelRemarkMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'YearMaster',
    path: '/YearMaster',
    title: 'Year Master',
    component: React.lazy(() =>
      import('views/Salesadmin/YearMaster/YearMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'TaxMaster',
    path: '/TaxMaster',
    title: 'Tax Master',
    component: React.lazy(() => import('views/Billing/TaxMaster/TaxMaster')),
    authority: [ADMIN, USER],
  },
  {
    key: 'AgencyPayment',
    path: '/AgencyPayment',
    title: 'AgencyPayment',
    component: React.lazy(() =>
      import('views/Creditcontrol/AgencyPayment/AgencyPaymentMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'AgencyPayment',
    path: '/AgencyPaymentEdit',
    title: 'AgencyPayment',
    component: React.lazy(() =>
      import('views/Creditcontrol/AgencyPayment/AgencyPaymentEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'VideoFormatMaster',
    path: '/VideoFormatMaster',
    title: 'Video Format Master',
    component: React.lazy(() =>
      import('views/Programming/VideoFormatMaster/VideoFormatMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'TapeTypeMaster',
    path: '/TapeTypeMaster',
    title: 'Tape Type Master',
    component: React.lazy(() =>
      import('views/Programming/TapeTypeMaster/TapeTypeMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'PlayoutMaster',
    path: '/playoutmaster',
    title: 'Playout Master',
    component: React.lazy(() =>
      import('views/Master/PlayoutMaster/PlayoutMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'MAMMaster',
    path: '/mammaster',
    title: 'MAM Master',
    component: React.lazy(() => import('views/Master/MamMaster/MamMaster')),
    authority: [ADMIN, USER],
  },

  {
    key: 'ProviderMaster',
    path: '/providermaster',
    title: 'Provider Master',
    component: React.lazy(() =>
      import('views/Master/ProviderMaster/ProviderMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'NTCMaster',
    path: '/NTCMaster',
    title: 'NTC Master',
    component: React.lazy(() => import('views/NTC/NTCMaster/NTCMaster')),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCMaster',
    path: '/NTCMasterEdit',
    title: 'NTC Master',
    component: React.lazy(() => import('views/NTC/NTCMaster/NTCMasterEdit')),
    authority: [ADMIN, USER],
  },

  {
    key: 'CPRPUpdate',
    path: '/CPRPUpdate',
    title: 'CPRP Update',
    component: React.lazy(() =>
      import('views/Salesadmin/CPRPUpdate/CPRPUpdate'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SpotsCancellation',
    path: '/SpotsCancellation',
    title: 'Spots Cancellation',
    component: React.lazy(() =>
      import('views/Salesadmin/SpotCancel/SpotCancel'),
    ),
    authority: [ADMIN, USER],
  },

  {
    // First instance of the form
    key: 'SpotCancellationNTC',
    path: '/SpotCancellationNTC',
    title: 'Spots Cancellation NTC',
    component: React.lazy(() =>
      import('views/Salesadmin/SpotCancel/SpotCancel'),
    ),
    authority: [ADMIN, USER],
  },
  {
    // First instance of the form
    key: 'SpotMakeGood',
    path: '/SpotMakeGood',
    title: 'Spot MakeGood',
    component: React.lazy(() => import('views/Salesadmin/MakeGood/MakeGood')),
    authority: [ADMIN, USER],
  },
  {
    // First instance of the form
    key: 'NTCMakeGood',
    path: '/NTCMakeGood',
    title: 'NTC MakeGood',
    component: React.lazy(() => import('views/Salesadmin/MakeGood/MakeGood')),
    authority: [ADMIN, USER],
  },
  {
    // Second instance of the form with a different key and path
    key: 'MakeGoodReschedule',
    title: 'MakeGood Reschedule',
    path: '/MakeGoodReschedule', // Change the path as needed
    component: React.lazy(() =>
      import('views/Salesadmin/MakeGoodReschedule/MakeGoodReschedule'),
    ),
    authority: [ADMIN, USER],
  },
  {
    // Second instance of the form with a different key and path
    key: 'makegoodreschedulentc',
    title: 'NTC MakeGood Reschedule',
    path: '/makegoodreschedulentc', // Change the path as needed
    component: React.lazy(() =>
      import('views/Salesadmin/MakeGoodReschedule/MakeGoodReschedule'),
    ),
    authority: [ADMIN, USER],
  },
  {
    // Second instance of the form with a different key and path
    key: 'SpotReplacementNTC',
    path: '/SpotReplacementNTC',
    title: 'Spot Replacement NTC', // Change the path as needed
    component: React.lazy(() =>
      import('views/Salesadmin/CaptionReplace/CaptionReplace'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'SpotReplacement',
    path: '/SpotReplacement',
    title: 'Spot Replacement',
    component: React.lazy(() =>
      import('views/Salesadmin/CaptionReplace/CaptionReplace'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'BookingMerge',
    path: '/BookingMerge',
    title: 'Booking Merge',
    component: React.lazy(() =>
      import('views/Salesadmin/BookingMerge/BookingMerge'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SpotsCancellation',
    path: '/SpotCancellation',
    component: React.lazy(() =>
      import('views/Salesadmin/SpotCancel/SpotCancel'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'SpotsCancellationUndo',
    path: '/SpotCancelFormUndo',
    component: React.lazy(() =>
      import('views/Salesadmin/SpotCancelUndo/SpotCancelFormUndo'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'SongMaster',
    path: '/SongMaster',
    title: 'Song Master',
    component: React.lazy(() =>
      import('views/Scheduling/SongMaster/SongMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SongMaster',
    path: '/SongMasterEdit',
    title: 'Song Master',
    component: React.lazy(() =>
      import('views/Scheduling/SongMaster/SongMasterEdit'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCTypeMaster',
    path: '/NTCTypeMaster',
    title: 'NTC Type Master',
    component: React.lazy(() =>
      import('views/NTC/NTCTypeMaster/NTCTypeMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'promoshuffletemplates',
    path: '/PromoShuffleTemplates',
    title: 'Promo Shuffle Templates',
    component: React.lazy(() =>
      import('views/Scheduling/PromoShuffleTemplates/PromoShuffleTemplates'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'MusicAgencyMaster',
    path: '/MusicAgencyMaster',
    title: 'Music Agency Master',
    component: React.lazy(() =>
      import('views/Scheduling/MusicAgencyMaster/MusicAgencyMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SongCategory',
    path: '/songcategory',
    title: 'Song Category Master',
    component: React.lazy(() =>
      import('views/Scheduling/SongCategory/SongCategoryMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'LoginEventColorMaster',
    path: '/LoginEventColorMaster',
    title: 'Login Event Color Master',
    component: React.lazy(() =>
      import('views/Master/EventColorMasterByLogin/EventColorMasterByLogin'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'EventColorMaster',
    path: '/EventColorMaster',
    title: 'Event Color Master',
    component: React.lazy(() =>
      import('views/Master/EventColorMaster/EventColorMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'MovieAlbumMaster',
    path: '/MovieAlbumMaster',
    title: 'Movie Album Master',
    component: React.lazy(() =>
      import('views/Scheduling/MovieAulbmMaster/MovieAulbmMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'Library',
    path: '/Library',
    title: 'Library',
    component: React.lazy(() => import('views/Library/Library')),
    authority: [ADMIN, USER],
  },
  {
    key: 'Scheduling',
    path: '/Scheduling',
    title: 'Scheduling',
    component: React.lazy(() =>
      import('views/Scheduling/SchedulingDashBoard/Scheduling'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'Billing',
    path: '/Billing',
    title: 'Billing',
    component: React.lazy(() => import('views/Billing/Billing')),
    authority: [ADMIN, USER],
  },
  {
    key: 'Salesadmin',
    path: '/Salesadmin',
    title: 'Sales Admin',
    component: React.lazy(() =>
      import('views/Salesadmin/SalesDashboard/Salesadmin'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'Deal',
    path: '/Deal',
    title: 'Deal',
    component: React.lazy(() => import('views/Deal/DealDashBoard/Deal')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealUpdate',
    path: '/DealUpdate',
    title: 'Deal Update',
    component: React.lazy(() => import('views/Deal/DealUpdate/DealUpdate')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealTypeMaster',
    path: '/DealTypeMaster',
    title: 'Deal Type Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/DealTypeMaster/DealTypeMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SpotPreference',
    path: '/SpotPreference',
    title: 'Spot Preference',
    component: React.lazy(() =>
      import('views/Creditcontrol/SpotPreference/SpotPreferenceMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'BusinessType',
    path: '/BusinessType',
    title: 'Business Type',
    component: React.lazy(() =>
      import('views/Deal/BussinessTypeMaster/BussinessType'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'TimeBandMaster',
    path: '/TimeBandMaster',
    title: 'Timeband Master',
    component: React.lazy(() =>
      import('views/Creditcontrol/TimebandMaster/Timebandmaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'Programming',
    path: '/Programming',
    title: 'Programming',
    component: React.lazy(() => import('views/Programming/Programming')),
    authority: [ADMIN, USER],
  },
  {
    key: 'Scheduler',
    path: '/Scheduler',
    title: 'Scheduler',
    component: React.lazy(() => import('views/Programming/Programming')),
    authority: [ADMIN, USER],
  },
  {
    key: 'Admin',
    path: '/Admin',
    title: 'Admin',
    component: React.lazy(() => import('views/Master/Admin')),
    authority: [ADMIN, USER],
  },

  {
    key: 'NTC',
    path: '/Ntc',
    title: 'NTC',
    component: React.lazy(() => import('views/NTC/Ntc')),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCScheduling',
    path: '/NTCScheduling',
    title: 'NTC Scheduling',
    // component: React.lazy(() =>
    //   import('views/NTC/NTCScheduling/NTCScheduling'),
    // ),
    component: React.lazy(() =>
      import(`views/Scheduling/${SCHEDULER_FOLDER}/Scheduler`),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'TermConditions',
    path: `/TermConditions`,
    title: 'Term Conditions',
    component: React.lazy(() => import('views/auth/Term')),
    authority: [],
  },
  {
    key: 'PrivacyPolicy',
    path: `/PrivacyPolicy`,
    title: 'Privacy Policy',
    component: React.lazy(() => import('views/auth/PrivacyPolicy')),
    authority: [],
  },
  {
    key: 'FinalLogOld',
    path: '/FinalLogOld',
    title: 'Final Log',
    component: React.lazy(() => import('views/Scheduling/FinalLog/FinalLog')),
    authority: [ADMIN, USER],
  },
  {
    key: 'FinalLog',
    path: '/FinalLog',
    title: 'Final Log',
    component: React.lazy(() =>
      import(`views/Scheduling/${SCHEDULER_FOLDER}/Scheduler`),
    ),
    authority: [ADMIN, USER],
  },
  // {
  //   key: 'FinalLog',
  //   path: '/FinalLogPage',
  //   title: 'Final Log',
  //   component: React.lazy(() =>
  //     import('views/Scheduling/FinalLog/FinalLogPage'),
  //   ),
  //   authority: [ADMIN, USER],
  // },
  {
    key: 'CommercialSchedulingOld',
    path: '/CommercialSchedulingOld',
    title: 'Commercial Scheduling',
    component: React.lazy(() =>
      import('views/Scheduling/CommercialScheduling/CommercialScheduling'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'CommercialScheduling',
    path: '/CommercialScheduling',
    title: 'Commercial Scheduling',
    component: React.lazy(() =>
      import(`views/Scheduling/${SCHEDULER_FOLDER}/Scheduler`),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'dealmaster',
    path: '/DealMaster',
    title: 'Deal Master',
    component: React.lazy(() => import('views/Deal/DealMaster/DealMaster')),
    authority: [ADMIN, USER],
  },
  {
    key: 'UnitMaster',
    path: '/UnitMaster',
    title: 'Unit Master',
    component: React.lazy(() => import('views/Deal/UnitMaster/UnitMaster')),
    authority: [ADMIN, USER],
  },
  {
    key: 'dealmaster',
    path: '/DealMasterAdd',
    title: 'Deal Master',
    component: React.lazy(() => import('views/Deal/DealMaster/DealMasterAdd')),
    authority: [ADMIN, USER],
  },
  {
    path: '/SponsoredDealAdd',
    key: 'SponsoredDeal',
    title: 'Sponsored Deal',
    component: React.lazy(() => import('views/Deal/DealMaster/DealMasterAdd')),
    authority: [ADMIN, USER],
  },
  {
    key: 'RoImport',
    path: '/RoImport',
    title: 'Ro Import',
    component: React.lazy(() =>
      import('views/Salesadmin/BookingMaster/BookingDetails'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCRoImport',
    path: '/NTCRoImport',
    title: 'NTC RO Import',
    component: React.lazy(() =>
      import('views/Salesadmin/BookingMaster/BookingDetails'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'agencyoutstanding',
    path: '/agencyoutstanding',
    title: 'Agency Outstanding',
    component: React.lazy(() => import('views/Accounts/PaymentDue/PaymentDue')),
    authority: [ADMIN, USER],
  },

  {
    key: 'RoImport',
    path: '/RoImportDetails',
    title: 'Ro Import',
    component: React.lazy(() =>
      import('views/Salesadmin/BookingMaster/BookingMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'NTCRoImport',
    path: '/NTCRoImportDetails',
    title: 'NTC RO Import',
    component: React.lazy(() =>
      import('views/Salesadmin/BookingMaster/BookingMaster'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'SpotBooking',
    path: '/BookingDetails',
    title: 'Spot Booking',
    component: React.lazy(() =>
      import('views/Salesadmin/BookingMaster/BookingMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NtcSpotBooking',
    path: '/NTCBookingDetails',
    title: 'NTC Spot Booking',
    component: React.lazy(() =>
      import('views/Salesadmin/BookingMaster/BookingMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SpotBooking',
    path: '/SpotBooking',
    title: 'Spot Booking',
    component: React.lazy(() =>
      import('views/Salesadmin/BookingMaster/BookingDetails'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NtcSpotBooking',
    path: '/NtcSpotBooking',
    title: 'NTC Booking Details',
    component: React.lazy(() =>
      import('views/Salesadmin/BookingMaster/BookingDetails'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'MinutetoMinute',
    path: '/MinutetoMinute',
    title: 'Minute to Minute',
    component: React.lazy(() => import('views/ReportLog/Report')),
    authority: [ADMIN, USER],
  },
  {
    key: 'SpotRescheduling',
    path: '/SpotRescheduling',
    title: 'Spot Rescheduling',
    component: React.lazy(() =>
      import('views/Salesadmin/SpotRescheduling/SpotRescheduling'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'DropSpotReschedule',
    path: '/DropSpotReschedule',
    title: 'DropSpot Reschedule',
    component: React.lazy(() =>
      import('views/Salesadmin/SpotRescheduling/SpotRescheduling'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCDropSpotReschedule',
    path: '/NTCDropSpotReschedule',
    title: 'NTC Drop Spot Reschedule',
    component: React.lazy(() =>
      import('views/Salesadmin/SpotRescheduling/SpotRescheduling'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'NTCRescheduling',
    path: '/NTCRescheduling',
    title: 'NTC Rescheduling',
    component: React.lazy(() =>
      import('views/Salesadmin/SpotRescheduling/SpotRescheduling'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'BarcImport',
    path: '/BarcImport',
    title: 'Barc Import',
    component: React.lazy(() =>
      import('views/Salesadmin/BarcImport/BarcImport'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'BarcAnalysis',
    path: '/BarcAnalysis',
    title: 'Barc Analysis',
    component: React.lazy(() =>
      import('views/Salesadmin/BarcAnalysis/BarcAnalysis'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'BarcDataReport',
    path: '/BarcDataReport',
    title: 'BARC Data Analysis Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'BarcComparisonReport',
    path: '/BarcComparisonReport',
    title: 'BARC Comparison Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'AsrunMatching',
    path: '/AsrunMatching',
    title: asunMatchingRouteTitle,
    component: React.lazy(() =>
      import('views/Billing/AsrunMatching/AsrunMatching'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'BillGeneration',
    title: 'Bill Generation',
    path: '/BillGeneration',
    component: React.lazy(() =>
      import('views/Billing/BillGeneration/BillGeneration'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCBillGeneration',
    title: 'NTC Bill Generation',
    path: '/NTCBillGeneration',
    component: React.lazy(() =>
      import('views/Billing/BillGeneration/BillGeneration'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'BillPrinting',
    path: '/BillPrinting',
    title: billPrintingRouteTitle,
    component: React.lazy(() =>
      import('views/Billing/BillPrinting/BillPrinting'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'billdelete',
    path: '/billdelete',
    title: billPrintingRouteTitle,
    component: React.lazy(() => import('views/Billing/BillDelete/BillDelete')),
    authority: [ADMIN, USER],
  },
  {
    key: 'TelecastCertificate',
    path: '/TelecastCertificate',
    title: telecastCertificateRouteTitle,
    component: React.lazy(() =>
      import('views/Billing/TelecastCertificate/TelecastCertificate'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'TrafficDay',
    path: '/TrafficDay',
    title: 'Traffic Day',
    component: React.lazy(() =>
      import('views/Salesadmin/TrafficDay/TrafficDay'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'InvoiceSeries',
    path: '/InvoiceSeries',
    title: billingSeriesRouteTitle,
    component: React.lazy(() =>
      import('views/Billing/InvoiceSeries/InvoiceSeries'),
    ),
    authority: [ADMIN, USER],
  },

  {
    key: 'LocalEvent',
    path: '/LocalEvent',
    title: 'LocalEvent',
    component: React.lazy(() => import('views/Sports/LocalEvent/LocalEvent')),
    authority: [ADMIN, USER],
  },
  {
    key: 'CreditNote',
    path: '/CreditNote',
    title: 'Credit / Debit Note',
    component: React.lazy(() => import('views/Accounts/CreditNote/CreditNote')),
    authority: [ADMIN, USER],
  },
  {
    key: 'BulkDropping',
    path: '/BulkDropping',
    title: 'Bulk Dropping',
    component: React.lazy(() =>
      import('views/Salesadmin/BulkDropping/BulkDropping'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'YearTaxDetails',
    path: '/YearTaxDetails',
    title: 'Year Tax Details',
    component: React.lazy(() =>
      import('views/Billing/YearTaxDetails/YearTaxDetails'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NtcBillPrinting',
    path: '/NtcBillPrinting',
    title: ntcBillPrintingRouteTitle,
    component: React.lazy(() =>
      import('views/Billing/BillPrinting/BillPrinting'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NtcBillingSeries',
    path: '/NtcBillingSeries',
    title: ntcBillingSeriesRouteTitle,
    component: React.lazy(() =>
      import('views/Billing/InvoiceSeries/InvoiceSeries'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'Home',
    path: '/Home',
    title: 'Home Dashboard',
    component: React.lazy(() => import('views/HomeDashBoard/Dashboard/Home')),
    authority: [ADMIN, USER],
  },
  {
    key: 'Epg',
    path: '/Epg',
    title: 'Epg',
    component: React.lazy(() => import('views/Programming/Reports/Epg/Epg')),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCAsrunMatching',
    path: '/NTCAsrunMatching',
    title: ntcAsunMatchingRouteTitle,
    component: React.lazy(() =>
      import('views/Billing/AsrunMatching/AsrunMatching'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ManageEvents',
    path: '/ManageEvents',
    title: 'Manage Events',
    component: React.lazy(() =>
      import('views/Programming/ManageEvents/ManageEvents'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'Accounts',
    path: '/Accounts',
    title: 'Accounts',
    component: React.lazy(() => import('views/Accounts/Accounts')),
    authority: [ADMIN, USER],
  },
  {
    key: 'access-denied',
    path: '/access-denied',
    title: 'access-denied',
    component: React.lazy(() => import('views/access-denied')),
    authority: [ADMIN, USER],
  },
  {
    key: 'PromoRotation',
    path: '/PromoRotation',
    title: 'Promo Rotation',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'LogReport',
    path: '/LogReport',
    title: 'Log Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'BookingReport',
    path: '/BookingReport',
    title: 'Booking Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'InvoiceAdjustment',
    path: '/InvoiceAdjustment',
    title: 'Invoice Adjustment',
    component: React.lazy(() =>
      import('views/Accounts/InvoiceAdjustment/InvoiceAdjustment'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'ActivityLog',
    path: '/ActivityLog',
    title: 'Activity Log',
    component: React.lazy(() =>
      import('views/Salesadmin/ActivityLog/ActivityLog'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealUtilizationReport',
    path: '/DealUtilizationReport',
    title: 'Deal Utilization Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealApprovalLog',
    path: '/DealApprovalLog',
    title: 'Deal Approval Log',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealSummary',
    path: '/DealSummary',
    title: 'Deal Summary',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'ContractReport',
    path: '/ContractReport',
    title: 'Contract Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealWiseBookingReport',
    path: '/dealWiseBookingReport',
    title: 'DealWise Booking Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealAuditReport',
    path: '/dealAuditReport',
    title: 'Deal Summary Audit Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealFCTAuditReport',
    path: '/dealFCTAuditReport',
    title: 'Deal FCT Audit Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealBookingAuditReport',
    path: '/dealBookingAuditReport',
    title: 'Deal Booking Audit Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'ProgramReport',
    path: '/ProgramReport',
    title: 'Program Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'WeeklyFPCReport',
    path: '/WeeklyFPCReport',
    title: 'Weekly FPC Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'SpotCancellationReport',
    path: '/SpotCancellationReport',
    title: 'Spot Cancellation Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },

  {
    key: 'epgReport',
    path: '/epgReport',
    title: 'EPG Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'BookingVsDropReport',
    path: '/BookingVsDropReport',
    title: 'Booking Vs Drop Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'MinuteByMinute',
    path: '/MinuteByMinute',
    title: 'Minute By Minute Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'BillSummaryReport',
    path: '/BillSummaryReport',
    title: 'Bill Summary Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'BilledSummaryReport',
    path: '/BilledSummaryReport',
    title: 'Billed Summary Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'CollectionReport',
    path: '/CollectionReport',
    title: 'Collection Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'CreditNoteReport',
    path: '/CreditNoteReport',
    title: 'Credit Note Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'epgExportReport',
    path: '/epgExportReport',
    title: 'EPG Export',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DebitNoteReport',
    path: '/DebitNoteReport',
    title: 'Debit Note Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'OutstandingReport',
    path: '/OutstandingReport',
    title: 'Outstanding Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'SalesAuditReport',
    path: '/SalesAuditReport',
    title: 'Sales Audit Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'currenciesWiseRevenueReport',
    path: '/currenciesWiseRevenueReport',
    title: 'Currencies Wise Revenue Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'TRAIReport',
    path: '/TRAIReport',
    title: 'TRAI Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'PromoExpiredReport',
    path: '/promoexpiredreport',
    title: 'Promo Expired Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'houseIdReport',
    path: '/houseidreport',
    title: 'House ID Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'hourlyinventoryReport',
    path: '/hourlyinventoryreport',
    title: 'Hourly Inventory Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'bookingvslogReport',
    path: '/bookingvslogreport',
    title: 'Booking vs Log Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'RevenueReport',
    path: '/RevenueReport',
    title: 'Revenue Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'SalesTargetReport',
    path: '/SalesTargetReport',
    title: 'Sales Target Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'SalesAchievedTargetReport',
    path: '/SalesAchievedTargetReport',
    title: 'Sales Achieved Target Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'ContractExpiryReport',
    path: '/ContractExpiryReport',
    title: 'Contract Expiry Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DealReport',
    path: '/DealReport',
    title: 'Deal Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'CommercialRotationReport',
    path: '/CommercialRotationReport',
    title: 'Commercial Rotation Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'DateWiseBookingReport',
    path: '/DateWiseBookingReport',
    title: 'DateWise Booking Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'ClientwiseRevenueReport',
    path: '/clientwiserevenuereport',
    title: 'Clientwise Revenue Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },

  {
    key: 'logReportAgenciwise',
    path: '/logReportAgenciwise',
    title: 'Log Report Agenciwise',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },

  {
    key: 'commercialsReportAgenciwise',
    path: '/commercialsReportAgenciwise',
    title: 'Commercial Report Agenciwise',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },

  {
    key: 'bookingReportAgenciwise',
    path: '/bookingReportAgenciwise',
    title: 'Booking Report Agenciwise',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },

  {
    key: 'AgencywiseRevenueReport',
    path: '/agencywiserevenuereport',
    title: 'Agencywise Revenue Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'ClientwiseSpotDetailsReport',
    path: '/clientwisespotdetailsreport',
    title: 'Clientwise Spot Details Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'AgencywiseSpotDetailsReport',
    path: '/agencywisespotdetailsreport',
    title: 'Agencywise Spot Details Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'TestScheduling',
    path: '/TestScheduling',
    title: 'Test Scheduling',
    component: React.lazy(() => import('views/Scheduling/Scheduler/Scheduler')),
    authority: [ADMIN, USER],
  },
  {
    key: 'SaveAsFPC',
    path: '/SaveAsFPC',
    title: 'Save As FPC',
    component: React.lazy(() =>
      import('views/Programming/SaveAsFPC/SaveAsFPC'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'CommercialReport',
    path: '/CommercialReport',
    title: 'Commercial Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'cloudPlayout',
    path: '/cloudplayout',
    title: 'Cloud Playout',
    component: React.lazy(() =>
      import('views/Scheduling/CloudPlayout/CloudPlayout'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'UserActivity',
    path: '/UserActivity',
    title: 'User Activity',
    component: React.lazy(() =>
      import('views/Master/UserActivity/UserActivityMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'HourlyAllocation',
    path: '/HourlyAllocation',
    title: 'Hourly Allocation',
    component: React.lazy(() =>
      import('views/Programming/HourlyAllocation/HourlyAllocation'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'NTCGroupMaster',
    path: '/NTCGroupMaster',
    title: 'NTC Groups',
    component: React.lazy(() =>
      import('views/NTC/NTCGroupMaster/NTCGroupMaster'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'SalesTarget',
    path: '/SalesTarget',
    title: 'Sales Target',
    component: React.lazy(() => import('views/Deal/SalesTarget/SalesTarget')),
    authority: [ADMIN, USER],
  },
  {
    key: 'Payment',
    path: '/Payment',
    title: 'Payment',
    component: React.lazy(() => import('views/Billing/Payment/Payment')),
    authority: [ADMIN, USER],
  },
  {
    key: 'PromoReport',
    path: '/PromoReport',
    title: 'PromoReport',
    component: React.lazy(() =>
      import('views/Scheduling/PromoReport/PromoReport'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'epgReport2',
    path: '/epgReport2',
    title: 'EPG Report 2',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
  {
    key: 'updateSynopsis',
    path: '/updateSynopsis',
    title: 'Update synopsis',
    component: React.lazy(() =>
      import('views/Programming/UpdateSynopsis/UpdateSynopsis'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'updateSeason',
    path: '/updateSeason',
    title: 'Update Season',
    component: React.lazy(() =>
      import('views/Programming/UpdateSeason/UpdateSeason'),
    ),
    authority: [ADMIN, USER],
  },
  {
    key: 'sponsorwiseReport',
    path: '/sponsorwiseReport',
    title: 'Sponsorwise Report',
    component: React.lazy(() => import('views/Reports/Reports')),
    authority: [ADMIN, USER],
  },
];
