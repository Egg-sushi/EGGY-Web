import styled from '@emotion/styled';

import Text from './Text';
import { ColorValueType, colors } from '@/theme';
import { Flex } from '../styled';
import Icon from './Icon';

interface Props {
  size: 'sm';
  text: string;
  hierarchy: 'primary' | 'skyblue';
  icons?: Parameters<typeof Icon>[0] & { position: 'start' | 'end' };
}

function Tag(props: Props) {
  const { size, text, hierarchy, icons, ...restProps } = props;

  return icons ? (
    <Wrapper variant="h9" size={size} hierarchy={hierarchy} {...restProps}>
      <Flex
        as={'span'}
        flexDirection={icons.position === 'start' ? 'row' : 'row-reverse'}
        gap={6}
        alignItems="center"
      >
        <Icon {...icons} />
        {text}
      </Flex>
    </Wrapper>
  ) : (
    <Wrapper variant="h9" size={size} hierarchy={hierarchy} {...restProps}>
      {text}
    </Wrapper>
  );
}

const PaddingSize: Record<Props['size'], { y: string; x: string }> = {
  sm: {
    x: '8px',
    y: '2px',
  },
};

const HierarchyColor: Record<
  Props['hierarchy'],
  { background: ColorValueType; color: ColorValueType }
> = {
  skyblue: { background: colors.blue300, color: colors.white },
  primary: { background: colors.primary, color: colors.white },
};

type StyleProps = Pick<Props, 'size' | 'hierarchy'>;
const Wrapper = styled(Text)<StyleProps>`
  padding: ${({ size }) => `${PaddingSize[size].y} ${PaddingSize[size].x}`};
  border-radius: 4px;
  background-color: ${({ hierarchy }) => HierarchyColor[hierarchy].background};
  color: ${({ hierarchy }) => HierarchyColor[hierarchy].color};
`;

export default Tag;
