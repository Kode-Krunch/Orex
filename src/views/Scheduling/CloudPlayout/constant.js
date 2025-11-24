import { CgPlayListRemove } from 'react-icons/cg';
import { IoIosMusicalNotes, IoMdCheckmarkCircle } from 'react-icons/io';
import {
  MdFormatListBulleted,
  MdFormatListBulletedAdd,
  MdFormatListNumbered,
} from 'react-icons/md';
import { RiAdvertisementLine } from 'react-icons/ri';
import { TbLayoutBottombar } from 'react-icons/tb';

const PLAYLIST_SUMMARY_ICONS = {
  TotalBookedSpots: {
    title: 'Booked Spots',
    // description:
    //   'Total Scheduled Spots refers to the total number of advertisement slots allocated in the Playlist.',
    icon: <RiAdvertisementLine style={{ fontSize: 35, color: '#45AAF2' }} />,
    color: '#45AAF2',
    iconBorderColor: 'order4',
    id: 'bookedSpots',
  },
  Logged: {
    title: 'Logged Spots',
    // description:
    //   'Logged Spots',
    icon: <MdFormatListNumbered style={{ fontSize: 35, color: '#ffbf00' }} />,
    color: '#ffbf00',
    iconBorderColor: 'order2',
    id: 'loggedSpots',
  },
  TelecastedSpots: {
    title: 'Telecasted',
    // description:
    //   'TelecastedSpots.',
    icon: <IoMdCheckmarkCircle style={{ fontSize: 35, color: '#00ffb3ff' }} />,
    color: '#00ffb3ff',
    iconBorderColor: 'order3',
    id: 'telecasted',
  },
  ExtraSpots: {
    title: 'Extra Spots',
    // description:
    //   'ExtraSpots',
    icon: (
      <MdFormatListBulletedAdd style={{ fontSize: 35, color: '#79dfe8' }} />
    ),
    color: '#79dfe8',
    id: 'extraSpots',
  },
  DroppedSpots: {
    title: 'Missed Spots',
    // description:
    //   'Dropped Spots are advertisement slots that were removed or Not Telecasted from the Playlist.',
    icon: <CgPlayListRemove style={{ fontSize: 35, color: '#F55C52' }} />,
    color: '#F55C52',
    iconBorderColor: 'order1',
    id: 'missedSpots',
  },
  TotalSongs: {
    title: 'Total Songs',
    // description:
    //   'Total Songs refers to the complete number of songs scheduled for broadcast.',
    icon: <IoIosMusicalNotes style={{ fontSize: 35, color: '#ffbf00' }} />,
    color: '#ffbf00',
    iconBorderColor: 'order2',
    id: 'totalSongs',
  },
  TotalPromos: {
    title: 'Total Promos',
    // description:
    //   'Total Promos refers to the total number of promotional event scheduled for broadcast.',
    icon: <MdFormatListBulleted style={{ fontSize: 35, color: '#45AAF2' }} />,
    color: '#45AAF2',
    iconBorderColor: 'order4',
    id: 'totalPromos',
  },
  TotalNTC: {
    title: 'Total NTC',
    // description:
    //   'Total NTC refers to the total number of non time commercials scheduled for broadcast.',
    icon: <TbLayoutBottombar style={{ fontSize: 35, color: '#ffbf00' }} />,
    color: '#ffbf00',
    iconBorderColor: 'order2',
    id: 'totalNtc',
  },
};

const FLAG_INFO = {
  'Booked Spots': { flag: 1, title: 'Booked Spots Details' },
  'Missed Spots': { flag: 2, title: 'Missed Spots Details' },
  'Total Songs': { flag: 3, title: 'Songs Details' },
  'Total Promos': { flag: 4, title: 'Promo Details' },
  'Total NTC': { flag: 5, title: 'NTC Details' },
  'Logged Spots': { flag: 6, title: 'Logged Details' },
  Telecasted: { flag: 7, title: 'Telecasted Details' },
  'Extra Spots': { flag: 8, title: 'Extra Details' },
};

const TIMES_CAROUSEL_SETTINGS = {
  dots: false,
  infinite: false,
  speed: 200,
  draggable: true,
  swipeToSlide: true,
  slidesToScroll: 4,
  variableWidth: true,
};

export { PLAYLIST_SUMMARY_ICONS, FLAG_INFO, TIMES_CAROUSEL_SETTINGS };
