import { colors } from './colors';
import { fonts } from './fonts';

export const theme = {
  colors,
  fonts,
} as const;

export type ThemeType = typeof theme;

export * from './globalStyles';
