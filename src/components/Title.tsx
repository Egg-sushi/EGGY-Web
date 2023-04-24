import type { ColorValueType } from '@/theme/colors';
import { Text } from './common';
import { Flex } from './styled';

interface Props {
  title: string;
  description: string;
  size: 'sm' | 'lg';
  color: ColorValueType;
}

function Title({ title, description, size, color }: Props) {
  return (
    <Flex flexDirection="column" gap={20}>
      <Text
        variant={size === 'lg' ? 'h3' : 'h7'}
        weight={size === 'lg' ? 800 : 700}
        fontColor={color}
      >
        {title}
      </Text>
      <Text variant={size === 'lg' ? 'body2' : 'body5'} fontColor={color}>
        : {description}
      </Text>
    </Flex>
  );
}

export default Title;
