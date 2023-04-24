import { Text } from './common';
import { Flex } from './styled';

interface Props {
  title: string;
  description: string;
}

function Title({ title, description }: Props) {
  return (
    <Flex flexDirection="column" gap={20}>
      <Text variant="h3" weight={800}>
        {title}
      </Text>
      <Text variant="body2">: {description}</Text>
    </Flex>
  );
}

export default Title;
