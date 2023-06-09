export const colors = {
  // gray scale
  black: '#000000',
  white: '#ffffff',
  gray50: '#fcfcfc',
  gray100: '#edf0f3',
  gray150: '#b6babf',
  gray200: '#aaaeb2',
  gray300: '#9da0a3',
  gray400: '#75787b',
  gray500: '#4d5053',
  gray600: '#25282b',

  // blue scale
  blue50: '#f7faff',
  blue100: '#ebf1ff',
  blue200: '#cfdefc',
  blue300: '#acc2f1',
  blue400: '#81a2e9',
  blue500: '#538bff',
  blue600: '#2b63da',
  blue700: '#1f4eb2',
  blue800: '#173b87',
  blue900: '#10285b',

  // green scale
  green100: '#c8dfb9',
  green200: '#adcf96',
  green300: '#91bf73',
  green400: '#76b04f',
  green500: '#5e8c40',
  green600: '#476a30',
  green700: '#385426',
  green800: '#273d18',

  /* beige scale */
  beige100: '#fffdf7',
  beige200: '#fff5de',
  beige300: '#faf0d9',
  beige400: '#f5ead0',
  beige500: '#eddebd',
  beige600: '#e0cc9e',

  /* primary: blue500 */
  primary: '#2b63da',
  /* secondary: green600 */
  secondary: '#476a30',
  /* teritiary: beige100 */
  teritiary: '#f9f3ec',
} as const;

export type ColorKeyType = keyof typeof colors;
export type ColorValueType = (typeof colors)[keyof typeof colors];
