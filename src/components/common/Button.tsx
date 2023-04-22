import styled from '@emotion/styled';
import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  variant: 'filled' | 'outlined';
  hierarchy?: 'primary' | 'secondary';
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
  color: ${({ variant, theme, hierarchy }) =>
    variant === 'outlined'
      ? hierarchy === 'primary'
        ? theme.colors.primary
        : theme.colors.secondary
      : theme.colors.white};
  border: ${({ variant, hierarchy, theme }) => {
    if (variant === 'outlined') {
      return hierarchy === 'primary'
        ? `1px solid ${theme.colors.primary}`
        : `1px solid ${theme.colors.secondary}`;
    }
    return 'none';
  }};
  border-radius: ${({ borderRadius }) =>
    typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius};
  background-color: ${({ variant, theme, hierarchy }) => {
    if (variant === 'filled') {
      return hierarchy === 'primary' ? theme.colors.primary : theme.colors.secondary;
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
