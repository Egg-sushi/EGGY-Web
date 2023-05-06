import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { Flex } from '../styled';
import { Icon, Text } from '../common';
import ProductSearchFilter from './ProductSearchFilter';
import HeaderModal from './HeaderModal';

interface Props extends ReactModal.Props {
  type: 'filter' | 'header';
  data?: any;
  onClose: Function;
  onSaveClose?: Function;
}

const ModalContentByType: Record<Props['type'], React.ReactElement> = {
  filter: (
    <ProductSearchFilter
      onSaveClose={() => {
        alert('No Props');
      }}
    />
  ),
  header: <HeaderModal />,
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
          {type.toUpperCase()}
        </Text>
        <Icon
          type="x"
          width={26}
          height={26}
          stroke={theme.colors.gray400}
          role="button"
          onClick={() => modalProps.onClose()}
          style={{ cursor: 'pointer' }}
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
  z-index: 9995;
  overflow: scroll;
  overscroll-behavior-y: none;
`;

export default Modal;
