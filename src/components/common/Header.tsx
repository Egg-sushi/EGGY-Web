import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';

import { Flex } from '../styled';
import { Text, Icon, Modal } from '@/components';

function Header() {
  const theme = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isOpen || typeof window === 'undefined') {
      return undefined;
    }
    window.document.body.style.overflow = 'hidden';

    return () => {
      window.document.body.style.removeProperty('overflow');
    };
  }, [isOpen]);

  return (
    <Wrapper as={'header'} justifyContent="space-between" alignItems="center">
      <Text
        variant="h2"
        fontColor={theme.colors.gray400}
        fontFamily="monteserrat"
        role="button"
        onClick={() => router.push('/')}
      >
        EGGY
      </Text>
      <Icon
        type="menu"
        width={26}
        height={26}
        stroke={theme.colors.gray400}
        role="button"
        onClick={() => setIsOpen(true)}
      />
      <Modal type="header" isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
  width: calc(100% - 64px);
  position: fixed;
  padding-inline: 32px;
  padding-block: 16px;
  z-index: 995;
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  backdrop-filter: blur(4px);

  & > div,
  svg {
    cursor: pointer;
  }
`;

export default Header;
