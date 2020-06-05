import {Platform, StatusBar} from 'react-native';
import {theme} from 'galio-framework';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 3.5 + (StatusHeight || 0);
export const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812);
export const checkEmail = email => {
  const regExp = /.+@.+\..+/i;
  return regExp.test(email);
};

export const months = [
  {
    label: '01',
    key: 1,
    value: 1,
  },
  {
    label: '02',
    key: 2,
    value: 2,
  },
  {
    label: '03',
    key: 3,
    value: 3,
  },
  {
    label: '04',
    key: 4,
    value: 4,
  },
  {
    label: '05',
    key: 5,
    value: 5,
  },
  {
    label: '06',
    key: 6,
    value: 6,
  },
  {
    label: '07',
    key: 7,
    value: 7,
  },
  {
    label: '08',
    key: 8,
    value: 8,
  },
  {
    label: '09',
    key: 9,
    value: 9,
  },
  {
    label: '10',
    key: 10,
    value: 10,
  },
  {
    label: '11',
    key: 11,
    value: 11,
  },
  {
    label: '12',
    key: 12,
    value: 12,
  },
];
export const years = [
  {
    label: '2020',
    key: 2020,
    value: 20,
  },
  {
    label: '2021',
    key: 2021,
    value: 21,
  },
  {
    label: '2022',
    key: 22,
    value: 22,
  },
  {
    label: '2023',
    key: 23,
    value: 23,
  },
  {
    label: '2024',
    key: 24,
    value: 24,
  },
  {
    label: '2025',
    key: 25,
    value: 25,
  },
  {
    label: '2026',
    key: 26,
    value: 26,
  },
];
