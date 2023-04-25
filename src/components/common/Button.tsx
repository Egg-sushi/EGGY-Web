import type { ColorValueType } from '@/theme';
import { colors } from '@/theme';
import styled from '@emotion/styled';
import React from 'react';

type HierarchyType = 'primary' | 'secondary' | 'teritiary';
interface Props extends React.ComponentPropsWithoutRef<'button'> {
  variant: 'filled' | 'outlined';
  hierarchy?: HierarchyType;
  width?: React.CSSProperties['width'];
  disabled?: boolean;
  Icon?: React.ReactElement;
  iconPosition?: 'start' | 'end';
  borderRadius?: React.CSSProperties['borderRadius'];
}

function Button(props: React.PropsWithChildren<Props>) {
  const {
    children,
    variant = 'filled',
    hierarchy = 'primary',
    width = '100%',
    disabled = false,
    borderRadius = 10,
    Icon,
    iconPosition = 'start',
    ...restProps
  } = props;

  return (
    <Wrapper
      type="button"
      width={width}
      variant={variant}
      hierarchy={hierarchy}
      borderRadius={borderRadius}
      disabled={disabled}
      aria-disabled={disabled}
      iconPosition={iconPosition}
      {...restProps}
    >
      {Icon && <IconWrapper iconPosition={iconPosition}>{Icon}</IconWrapper>}
      {children}
    </Wrapper>
  );
}

const Hierarchy: Record<
  HierarchyType,
  { color: ColorValueType; backgroundColor: ColorValueType; border: ColorValueType }
> = {
  primary: {
    color: colors.primary,
    border: colors.primary,
    backgroundColor: colors.primary,
  },
  secondary: {
    color: colors.secondary,
    border: colors.secondary,
    backgroundColor: colors.secondary,
  },
  teritiary: {
    color: colors.teritiary,
    border: colors.teritiary,
    backgroundColor: colors.beige300,
  },
};

type StyleProps = Pick<
  Props,
  'width' | 'borderRadius' | 'hierarchy' | 'variant' | 'disabled' | 'iconPosition'
>;
const Wrapper = styled.button<StyleProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  padding-block: 10px;
  box-sizing: border-box;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  outline: none;
  color: ${({ variant, theme, hierarchy }) =>
    variant === 'outlined' && typeof hierarchy !== 'undefined'
      ? Hierarchy[hierarchy].color
      : theme.colors.white};
  border: ${({ variant, hierarchy }) => {
    if (variant === 'outlined' && typeof hierarchy !== 'undefined') {
      return `1px solid ${Hierarchy[hierarchy].border}`;
    }
    return 'none';
  }};
  border-radius: ${({ borderRadius }) =>
    typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius};
  background-color: ${({ variant, theme, hierarchy }) => {
    if (variant === 'filled' && typeof hierarchy !== 'undefined') {
      return Hierarchy[hierarchy].backgroundColor;
    }
    return theme.colors.white;
  }};
  cursor: pointer;
`;

type IconStyleProps = Pick<Props, 'iconPosition'>;
const IconWrapper = styled.span<IconStyleProps>`
  position: absolute;
  top: 52%;
  left: ${({ iconPosition }) => (iconPosition === 'start' ? '24px' : 'auto')};
  right: ${({ iconPosition }) => (iconPosition === 'end' ? '24px' : 'auto')};
  transform: translateY(-50%);
`;

export default Button;
