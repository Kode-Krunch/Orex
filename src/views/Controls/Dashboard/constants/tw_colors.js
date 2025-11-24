import { theme } from 'twin.macro';

const getRGBA = (hexColor, opacity) => {
  const rgb = hexColor.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity / 100})`;
};
const Month = [
  { id: '01', name: 'Jan' },
  { id: '02', name: 'Feb' },
  { id: '03', name: 'Mar' },
  { id: '04', name: 'Apr' },
  { id: '05', name: 'May' },
  { id: '06', name: 'Jun' },
  { id: '07', name: 'Jul' },
  { id: '08', name: 'Aug' },
  { id: '09', name: 'Sep' },
  { id: '10', name: 'Oct' },
  { id: '11', name: 'Nov' },
  { id: '12', name: 'Dec' },
];
const TW_COLORS = theme`colors`;
const EMERALD_300 = TW_COLORS.emerald['300'];
const EMERALD_500 = TW_COLORS.emerald['500'];
const BLUE_500 = TW_COLORS.blue['500'];
const AMBER_500 = TW_COLORS.amber['500'];
const RED_500 = TW_COLORS.red['500'];
const ORANGE_500 = TW_COLORS.orange['500'];
const GREEN_500 = TW_COLORS.green['500'];
const GRAY_300 = TW_COLORS.gray['300'];
const GRAY_500 = TW_COLORS.gray['500'];
const EMERALD_500_50 = getRGBA(TW_COLORS.emerald['500'], 50);
const ROSE_700_40 = getRGBA(TW_COLORS.rose['700'], 40);
const RED_700 = TW_COLORS.red['700'];
const RED_900 = TW_COLORS.red['900'];
const GREEN_700 = TW_COLORS.green['700'];
export {
  TW_COLORS,
  EMERALD_300,
  EMERALD_500,
  BLUE_500,
  AMBER_500,
  RED_500,
  ORANGE_500,
  GREEN_500,
  GRAY_300,
  GRAY_500,
  EMERALD_500_50,
  ROSE_700_40,
  Month,
  RED_700,
  GREEN_700,
  RED_900
};
