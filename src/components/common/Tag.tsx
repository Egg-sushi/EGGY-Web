import styled from '@emotion/styled';
import type { ElementType } from 'react';

import Text from './Text';
import Icon from './Icon';
import { Flex } from '../styled';
import { ColorValueType, colors } from '@/theme';
import { fonts } from '@/theme/fonts';

const SizeVariable: Record<Props['size'], { y: string; x: string; fontSize: keyof typeof fonts }> =
  {
    sm: {
      x: '8px',
      y: '2px',
      fontSize: 'h9',
    },
    md: {
      x: '16px',
      y: '4px',
      fontSize: 'h7',
    },
  };

const HierarchyColor: Record<
  Props['hierarchy'],
  { background: ColorValueType; color: ColorValueType }
> = {
  skyblue: { background: colors.blue300, color: colors.white },
  primary: { background: colors.primary, color: colors.white },
  gray: { background: colors.gray200, color: colors.white },
  secondary: { background: colors.secondary, color: colors.white },
};

interface Props extends React.ComponentPropsWithoutRef<ElementType> {
  size: 'sm' | 'md';
  text: string;
  hierarchy: 'primary' | 'skyblue' | 'gray' | 'secondary';
  icons?: Parameters<typeof Icon>[0] & { position: 'start' | 'end' };
}

function Tag(props: Props) {
  const { size, text, hierarchy, icons, onClick, ...restProps } = props;

  return icons ? (
    <Wrapper
      as={'span'}
      variant={SizeVariable[size].fontSize}
      size={size}
      hierarchy={hierarchy}
      onClick={onClick}
      role={onClick ? 'button' : 'none'}
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

type StyleProps = Pick<Props, 'size' | 'hierarchy' | 'onClick'>;
const Wrapper = styled(Text)<StyleProps>`
  width: fit-content;
  text-align: center;
  padding: ${({ size }) => `${SizeVariable[size].y} ${SizeVariable[size].x}`};
  border-radius: 4px;
  background-color: ${({ hierarchy }) => HierarchyColor[hierarchy].background};
  color: ${({ hierarchy }) => HierarchyColor[hierarchy].color};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')}};
`;

export default Tag;
