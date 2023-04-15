import React from 'react';
import styled from '@emotion/styled';
import { Bodoni_Moda, Montserrat, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';

import { theme } from '@/theme';

const pretendard = localFont({
  src: [
    {
      path: '../../../public/fonts/Pretendard-ExtraBold.woff2',
      weight: '800',
      style: 'bold',
    },
    {
      path: '../../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

const monteserrat = Montserrat({
  weight: ['500', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const playFair = Playfair_Display({
  weight: ['500', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const bodoniModar = Bodoni_Moda({
  weight: ['500', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const fontFamilys = {
  pretendard,
  monteserrat,
  playFair,
  bodoniModar,
} as const;

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  variant: keyof typeof theme.fonts;
  color?: typeof theme.colors[keyof typeof theme.colors];
  align?: React.CSSProperties['textAlign'];
  weight?: React.CSSProperties['fontWeight'];
  fontFamily?: 'pretendard' | 'monteserrat' | 'playFair' | 'bodoniModar';
}

function Text(props: React.PropsWithChildren<Props>) {
  const {
    variant,
    color = theme.colors.gray600,
    align = 'start',
    weight = 500,
    fontFamily = 'pretendard',
    children,
    ...restProps
  } = props;
  const fontClassName = fontFamilys[fontFamily].className;

  return (
    <Wrapper
      variant={variant}
      color={color}
      align={align}
      weight={weight}
      className={fontClassName}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'variant' | 'color' | 'align' | 'weight'>;
const Wrapper = styled.div<StyleProps>`
  ${({ variant }) => theme.fonts[variant]}

  font-weight: ${({ weight }) => weight};
  text-align: ${({ align }) => align};
  color: ${({ color }) => color};
`;

export default Text;
