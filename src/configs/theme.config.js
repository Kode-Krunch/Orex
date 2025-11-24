import { THEME_ENUM } from 'constants/theme.constant';

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */

export const themeConfig = {
  themeColor: 'teal',
  direction: THEME_ENUM.DIR_LTR,
  mode: THEME_ENUM.MODE_DARK,
  // mode: THEME_ENUM.MODE_LIGHT,
  primaryColorLevel: 500,
  cardBordered: true,
  panelExpand: false,
  controlSize: 'md',
  primaryFontLevel: 0,
  navMode: THEME_ENUM.NAV_MODE_DARK,
  // navMode: THEME_ENUM.NAV_MODE_LIGHT,
  layout: {
    type: THEME_ENUM.LAYOUT_TYPE_STACKED_SIDE,
    sideNavCollapse: false,
  },
};
