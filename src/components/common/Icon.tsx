import React from 'react';

import { LeftArrow, RightArrow } from '../icons';

const ICONS = {
  leftArrow: <LeftArrow />,
  rightArrow: <RightArrow />,
};

interface Props extends React.ComponentPropsWithoutRef<'svg'> {
  type: keyof typeof ICONS;
  color?: string;
}

function Icon({ type, ...restProps }: Props) {
  return React.cloneElement(ICONS[type], restProps);
}

export default Icon;
