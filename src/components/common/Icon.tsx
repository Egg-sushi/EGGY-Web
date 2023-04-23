import React from 'react';

import { LeftArrow, Menu, RightArrow } from '../icons';
import styled from '@emotion/styled';

const ICONS = {
  leftArrow: <LeftArrow />,
  rightArrow: <RightArrow />,
  menu: <Menu />,
};

interface Props extends React.ComponentPropsWithoutRef<'svg'> {
  type: keyof typeof ICONS;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  fill?: React.CSSProperties['fill'];
  stroke?: React.CSSProperties['stroke'];
}

function Icon(props: Props) {
  const { type, width = 20, height = 20, fill, stroke, ...restProps } = props;

  return React.cloneElement(
    <Wrapper width={width} height={height} fill={fill} stroke={stroke}>
      {ICONS[type]}
    </Wrapper>,
    restProps,
  );
}

type StyleProps = Pick<Props, 'width' | 'height' | 'fill' | 'stroke'>;
const Wrapper = styled.span<StyleProps>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  line-height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};

  &,
  & svg {
    width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
    height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
    line-height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  }

  & svg path {
    fill: ${({ fill }) => (fill ? fill : fill)};
    stroke: ${({ stroke }) => (stroke ? stroke : 'none')};
  }
`;

export default Icon;
