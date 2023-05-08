import styled from '@emotion/styled';

import { Flex } from '../styled';
import { Button, Text } from '../common';
import useLink from '@/hooks/useLink';
import { STATIC_NAVIGATION } from '@/constants';

function HeaderModal() {
  const link = useLink();

  return (
    <Wrapper flexDirection="column" justifyContent="space-between">
      <FlexWithLine flexDirection="column" gap={16}>
        {STATIC_NAVIGATION.map((navigation) => (
          <Text
            key={navigation.key}
            variant="h4"
            role="button"
            onClick={() => link.to(navigation.key)}
          >
            {navigation.title}
          </Text>
        ))}
      </FlexWithLine>
      <Button variant="filled" hierarchy="primary" onClick={() => link.to('login')}>
        LOGIN
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
  height: calc(100% - 120px);
  padding-inline: 32px;
`;

const FlexWithLine = styled(Flex)`
  width: 100%;

  & > div {
    cursor: pointer;
  }

  & > div:not(:first-of-type) {
    padding-top: 16px;
    border-top: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  }
`;

export default HeaderModal;
