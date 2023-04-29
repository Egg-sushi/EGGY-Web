import React from 'react';

import { Filter, LeftArrow, Menu, RightArrow, Search } from '../icons';
import styled from '@emotion/styled';

const ICONS = {
  leftArrow: <LeftArrow />,
  rightArrow: <RightArrow />,
  menu: <Menu />,
  search: <Search />,
  filter: <Filter />,
};

interface Props extends React.ComponentPropsWithoutRef<'svg'> {
  type: keyof typeof ICONS;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  fill?: React.CSSProperties['fill'];
  stroke?: React.CSSProperties['stroke'];
}

function IconBase(props: Props) {
  const { type, ...restProps } = props;

  return React.cloneElement(ICONS[type], restProps);
}

type StyleProps = Pick<Props, 'width' | 'height' | 'fill' | 'stroke'>;
const Icon = styled(IconBase)<StyleProps>`
  & {
    width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
    height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
    line-height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  }

  & path {
    fill: ${({ fill }) => (fill ? fill : 'none')};
    stroke: ${({ stroke }) => (stroke ? stroke : 'none')};
  }
`;

const Wrapper = styled.span<StyleProps>``;

export default Icon;
