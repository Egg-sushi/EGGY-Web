import React from 'react';
import styled from '@emotion/styled';

import { HierarchyButtonColor, HierarchyType } from '@/utils';

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
  color: ${({ variant, theme, hierarchy }) => {
    if (variant === 'outlined' && typeof hierarchy !== 'undefined') {
      return HierarchyButtonColor.outlined[hierarchy].color;
    }
    if (variant === 'filled' && typeof hierarchy !== 'undefined') {
      return HierarchyButtonColor.filled[hierarchy].color;
    }
    return theme.colors.black;
  }};
  border: ${({ variant, hierarchy }) => {
    if (variant === 'outlined' && typeof hierarchy !== 'undefined') {
      return `1px solid ${HierarchyButtonColor.outlined[hierarchy].border}`;
    }
    return 'none';
  }};
  border-radius: ${({ borderRadius }) =>
    typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius};
  background-color: ${({ variant, theme, hierarchy }) => {
    if (variant === 'outlined' && typeof hierarchy !== 'undefined') {
      return HierarchyButtonColor.outlined[hierarchy].backgroundColor;
    }
    if (variant === 'filled' && typeof hierarchy !== 'undefined') {
      return HierarchyButtonColor.filled[hierarchy].backgroundColor;
    }
    return theme.colors.white;
  }};
  box-shadow: ${({ hierarchy }) =>
    hierarchy === 'shadow' ? '0px 4px 4px rgba(0, 0, 0, 0.15)' : 'none'};
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
