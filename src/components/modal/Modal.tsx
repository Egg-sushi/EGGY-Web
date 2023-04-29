import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { Flex } from '../styled';
import { Icon, Text } from '../common';
import CosmeticSearchFilter from './CosmeticSearchFilter';

interface Props extends ReactModal.Props {
  type: 'filter';
  data?: any;
  onClose: Function;
  onSaveClose?: Function;
}

const ModalContentByType: Record<Props['type'], React.ReactElement> = {
  filter: (
    <CosmeticSearchFilter
      onSaveClose={() => {
        alert('No Props');
      }}
    />
  ),
};

function Modal({ type, ...modalProps }: Props) {
  const theme = useTheme();

  return (
    <Wrapper {...modalProps}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        style={{
          width: 'calc(100% - 64px)',
          paddingInline: '32px',
          paddingBlock: '16px',
        }}
      >
        <Text variant="h2" fontColor={theme.colors.gray400} fontFamily="monteserrat">
          {type}
        </Text>
        <Icon
          type="x"
          width={26}
          height={26}
          stroke={theme.colors.gray400}
          role="button"
          onClick={() => modalProps.onClose()}
        />
      </Flex>
      {React.cloneElement(ModalContentByType[type], modalProps)}
    </Wrapper>
  );
}

const Wrapper = styled(ReactModal)`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export default Modal;
