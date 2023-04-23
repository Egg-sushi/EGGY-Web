import styled from '@emotion/styled';
import { Text } from './common';

interface Props {
  title: string;
  description: string;
}

function Title({ title, description }: Props) {
  return (
    <Wrapper>
      <Text variant="h3" weight={800}>
        {title}
      </Text>
      <Text variant="body2">: {description}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Title;
