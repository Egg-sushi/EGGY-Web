import { HierarchyType } from './type';
import { ColorValueType, colors } from '@/theme';

export const HierarchyButtonColor: Record<
  HierarchyType,
  { color: ColorValueType; backgroundColor: ColorValueType; border: ColorValueType }
> = {
  primary: {
    color: colors.white,
    border: colors.primary,
    backgroundColor: colors.primary,
  },
  secondary: {
    color: colors.white,
    border: colors.secondary,
    backgroundColor: colors.secondary,
  },
  beige300: {
    color: colors.white,
    border: colors.beige300,
    backgroundColor: colors.beige300,
  },
  teritiary: {
    color: colors.white,
    border: colors.teritiary,
    backgroundColor: colors.teritiary,
  },
  skyblue: {
    color: colors.white,
    border: colors.blue300,
    backgroundColor: colors.blue300,
  },
  gray: {
    color: colors.white,
    border: colors.gray200,
    backgroundColor: colors.gray200,
  },
};
