import { ColorValueType, colors } from '@/theme';
import { HierarchyType } from './type';

export const HierarchyTagColor: Record<
  HierarchyType,
  { background: ColorValueType; color: ColorValueType }
> = {
  skyblue: { background: colors.blue300, color: colors.white },
  primary: { background: colors.primary, color: colors.white },
  gray: { background: colors.gray200, color: colors.white },
  teritiary: { background: colors.teritiary, color: colors.white },
  beige300: { background: colors.beige300, color: colors.white },
  secondary: { background: colors.secondary, color: colors.white },
  shadow: { background: colors.white, color: colors.blue500 },
};
