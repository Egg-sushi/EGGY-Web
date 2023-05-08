import React from 'react';
import styled from '@emotion/styled';
import { Bodoni_Moda, Montserrat, Playfair_Display } from 'next/font/google';

import { ColorValueType, theme } from '@/theme';

const monteserrat = Montserrat({
  style: ['normal'],
  subsets: ['latin'],
});

const playFair = Playfair_Display({
  style: ['normal'],
  subsets: ['latin'],
});

const bodoniModar = Bodoni_Moda({
  style: ['normal'],
  subsets: ['latin'],
});

const fontFamilys = {
  monteserrat,
  playFair,
  bodoniModar,
} as const;

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  as?: React.ElementType;
  variant: keyof typeof theme.fonts;
  align?: React.CSSProperties['textAlign'];
  weight?: React.CSSProperties['fontWeight'];
  fontColor?: ColorValueType;
  fontFamily?: keyof typeof fontFamilys | 'pretendard';
}

function Text(props: React.PropsWithChildren<Props>) {
  const {
    as,
    variant,
    fontColor = theme.colors.gray600,
    align = 'start',
    weight = variant.includes('h') ? 700 : 400,
    fontFamily = 'pretendard',
    children,
    ...restProps
  } = props;
  const fontClassName = fontFamily === 'pretendard' ? '' : fontFamilys[fontFamily].className;

  return (
    <Wrapper
      as={as}
      variant={variant}
      fontColor={fontColor}
      align={align}
      weight={weight}
      className={fontClassName}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'variant' | 'fontColor' | 'align' | 'weight'>;
const Wrapper = styled.div<StyleProps>`
  ${({ variant }) => theme.fonts[variant]}

  font-weight: ${({ weight }) => weight};
  text-align: ${({ align }) => align};
  color: ${({ fontColor }) => fontColor};
`;

export default Text;
