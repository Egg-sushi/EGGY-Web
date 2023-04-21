import React from 'react';
import styled from '@emotion/styled';

export const Flex = styled.div<React.CSSProperties>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-content: ${({ alignContent }) => alignContent};
  align-items: ${({ alignItems }) => alignItems};
  align-self: ${({ alignSelf }) => alignSelf};
  flex: ${({ flex }) => flex};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-direction: ${({ direction }) => direction};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  flex-basis: ${({ flexBasis }) => flexBasis};
  gap: ${({ gap }) => gap};
`;
