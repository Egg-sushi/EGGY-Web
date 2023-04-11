import { colors } from './colors';

export const theme = {
  colors,
} as const;

export type ThemeType = typeof theme;
