import { ColorValueType, colors } from '@/theme';
import { HierarchyType } from './type';

export const HierarchyTagColor: Record<
  HierarchyType,
  { background: ColorValueType; fillColor: ColorValueType; outlineColor: ColorValueType }
> = {
  skyblue: { background: colors.blue300, fillColor: colors.white, outlineColor: colors.blue300 },
  primary: { background: colors.primary, fillColor: colors.white, outlineColor: colors.primary },
  gray: { background: colors.gray200, fillColor: colors.white, outlineColor: colors.gray200 },
  teritiary: {
    background: colors.teritiary,
    fillColor: colors.white,
    outlineColor: colors.teritiary,
  },
  beige300: { background: colors.beige300, fillColor: colors.white, outlineColor: colors.beige300 },
  secondary: {
    background: colors.secondary,
    fillColor: colors.white,
    outlineColor: colors.secondary,
  },
  shadow: { background: colors.white, fillColor: colors.blue500, outlineColor: colors.white },
  darkBlue: {
    background: colors.blue800,
    fillColor: colors.white,
    outlineColor: colors.blue800,
  },
};
