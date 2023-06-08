import styled from '@emotion/styled';
import type { ElementType } from 'react';

import Text from './Text';
import Icon from './Icon';
import { Flex } from '../styled';
import { fonts } from '@/theme/fonts';
import { HierarchyTagColor, HierarchyType } from '@/utils';

interface Props extends React.ComponentPropsWithoutRef<ElementType> {
  size: 'sm' | 'md';
  text: string;
  hierarchy: HierarchyType;
  type?: 'fill' | 'outline';
  icons?: Parameters<typeof Icon>[0] & { position: 'start' | 'end' };
}

const SizeVariable: Record<
  Props['size'],
  { y: string; x: string; fontSize: keyof typeof fonts; borderRadius: number }
> = {
  sm: {
    x: '16px',
    y: '3px',
    fontSize: 'body3',
    borderRadius: 67,
  },
  md: {
    x: '16px',
    y: '4px',
    fontSize: 'h7',
    borderRadius: 67,
  },
};

function Tag(props: Props) {
  const { size, text, hierarchy, icons, type = 'fill', onClick, ...restProps } = props;

  return icons ? (
    <Wrapper
      as={'span'}
      variant={SizeVariable[size].fontSize}
      size={size}
      hierarchy={hierarchy}
      type={type}
      role={onClick ? 'button' : 'none'}
      onClick={onClick}
      {...restProps}
    >
      <Flex
        flexDirection={icons.position === 'start' ? 'row' : 'row-reverse'}
        gap={6}
        alignItems="center"
      >
        <Icon {...icons} />
        {text}
      </Flex>
    </Wrapper>
  ) : (
    <Wrapper
      as={'span'}
      variant={SizeVariable[size].fontSize}
      size={size}
      hierarchy={hierarchy}
      onClick={onClick}
      {...restProps}
    >
      {text}
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'size' | 'hierarchy' | 'onClick' | 'type'>;
const Wrapper = styled(Text)<StyleProps>`
  padding: ${({ size }) => `${SizeVariable[size].y} ${SizeVariable[size].x}`};
  background-color: ${({ type, hierarchy }) =>
    type === 'fill' ? HierarchyTagColor[hierarchy].background : 'transparent'};
  color: ${({ type, hierarchy }) =>
    type === 'fill'
      ? HierarchyTagColor[hierarchy].fillColor
      : HierarchyTagColor[hierarchy].outlineColor};
  border: ${({ type, hierarchy }) =>
    type === 'fill' ? 'none' : `1px solid ${HierarchyTagColor[hierarchy].outlineColor}`};
  border-radius: ${({ size }) => SizeVariable[size].borderRadius}px;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')}};
`;

export default Tag;
