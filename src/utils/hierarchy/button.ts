import { HierarchyType } from './type';
import { ColorValueType, colors } from '@/theme';

export const HierarchyFilledButtonColor: Record<
  HierarchyType,
  { color: ColorValueType; backgroundColor: ColorValueType }
> = {
  primary: {
    color: colors.white,
    backgroundColor: colors.primary,
  },
  secondary: {
    color: colors.white,
    backgroundColor: colors.secondary,
  },
  beige300: {
    color: colors.white,
    backgroundColor: colors.beige300,
  },
  teritiary: {
    color: colors.white,
    backgroundColor: colors.teritiary,
  },
  skyblue: {
    color: colors.white,
    backgroundColor: colors.blue300,
  },
  gray: {
    color: colors.white,
    backgroundColor: colors.gray200,
  },
} as const;

export const HierarchyOutlinedButtonColor: Record<
  HierarchyType,
  { color: ColorValueType; backgroundColor: ColorValueType; border: ColorValueType }
> = {
  primary: {
    color: colors.primary,
    border: colors.primary,
    backgroundColor: colors.white,
  },
  secondary: {
    color: colors.secondary,
    border: colors.secondary,
    backgroundColor: colors.white,
  },
  beige300: {
    color: colors.beige300,
    border: colors.beige300,
    backgroundColor: colors.white,
  },
  teritiary: {
    color: colors.teritiary,
    border: colors.teritiary,
    backgroundColor: colors.white,
  },
  skyblue: {
    color: colors.blue300,
    border: colors.blue300,
    backgroundColor: colors.white,
  },
  gray: {
    color: colors.gray200,
    border: colors.gray200,
    backgroundColor: colors.white,
  },
} as const;

export const HierarchyButtonColor = {
  filled: HierarchyFilledButtonColor,
  outlined: HierarchyOutlinedButtonColor,
} as const;
