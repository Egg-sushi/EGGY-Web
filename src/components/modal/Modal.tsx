import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { Icon, Text } from '../common';
import HeaderModal from './HeaderModal';
import ProductSearchFilter from './ProductSearchFilter';

interface Props extends ReactModal.Props {
  type: 'filter' | 'header';
  data?: any;
  onClose: Function;
  onSaveClose?: Function;
}

const ModalContentByType: Record<Props['type'], React.ReactElement> = {
  filter: (
    <ProductSearchFilter
      data={{
        filters: { search: '', categories: [], skinTypes: [], priceRanges: [], size: 20 },
        list: { categories: [], skinTypes: [], priceRanges: [] },
      }}
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
      <ModalHeader>
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
        />
      </ModalHeader>
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

const ModalHeader = styled.header`
  width: calc(100% - 64px);
  padding-inline: 32px;
  padding-block: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > svg {
    cursor: pointer;
  }
`;

export default Modal;
