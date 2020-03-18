import {theme} from 'galio-framework'

import { Appearance } from 'react-native-appearance'

const mode = Appearance.getColorScheme();
const COLORS = {
  DEFAULT: '#DCDCDC',
  PRIMARY: '#EE0B02',
  LABEL: '#EE0B02',
  INFO: '#00BCD4',
  ERROR: '#F44336',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  MUTED: '#979797',
  INPUT: '#DCDCDC',
  ACTIVE: '#EE0B02',
  BUTTON_COLOR: '#EE0B02',
  PLACEHOLDER: '#9FA5AA',
  SWITCH_ON: '#EE0B02',
  SWITCH_OFF: '#D4D9DD',
  GRADIENT_START: '#EE0B02',
  GRADIENT_END: '#ff5555',
  PRICE_COLOR: '#EAD5FB',
  BORDER_COLOR: '#E7E7E7',
  BLOCK: '#E7E7E7',
  ICON: '#4A4A4A',
  WHITE: '#FFFFFF',
  DARK: '#202020',
  BLACK: '#000000',
};

export default {
  COLORS: {
    ...COLORS,
    TEXT: mode === 'light' ? COLORS.DARK : COLORS.WHITE,
    APP_BG: mode === 'light' ? COLORS.WHITE : COLORS.DARK,
    CARD_BG: mode === 'light' ? COLORS.BLOCK : COLORS.BLACK,
    SHADOW: mode === 'light' ? COLORS.BLACK : 'transparent',
    starsBg: mode === 'light' ? null : COLORS.DARK
  },
  SIZES: {
    BLOCK_SHADOW_RADIUS: 2,
    ...theme.SIZES
  },
  FONT_FAMILY: {
    REGULAR: 'Kanit-Regular',
    BOLD: 'Kanit-Bold',
    LIGHT: 'Kanit-Light',
    MEDIUM: 'Kanit-Medium',
  },
  STATUS_BAR: mode === 'light' ? 'dark-content' : 'light-content',
  IS_DARK: mode === 'dark'
};
