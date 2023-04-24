import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';

import { Flex } from '../styled';
import { Text, Icon } from '@/components';

function Header() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Wrapper as={'header'} justifyContent="space-between" alignItems="center">
      <Text
        variant="h2"
        color={theme.colors.gray400}
        fontFamily="monteserrat"
        role="button"
        onClick={() => router.push('/')}
      >
        EGGY
      </Text>
      <Icon type="menu" width={26} height={26} stroke={theme.colors.gray400} role="button" />
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
  width: calc(100% - 64px);
  position: fixed;
  padding-inline: 32px;
  padding-block: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default Header;
