import React from 'react';
import styled from '@emotion/styled';

type FlexOptions = Pick<
  React.CSSProperties,
  | 'justifyContent'
  | 'alignContent'
  | 'alignItems'
  | 'alignSelf'
  | 'flex'
  | 'flexWrap'
  | 'flexGrow'
  | 'flexDirection'
  | 'flexShrink'
  | 'flexBasis'
  | 'gap'
  | 'width'
  | 'minWidth'
  | 'maxWidth'
  | 'height'
  | 'minHeight'
  | 'maxHeight'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'padding'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'margin'
>;

const px = (element: string | number | undefined) =>
  typeof element === 'number' ? `${element}px` : element;

export const Flex = styled.div<FlexOptions>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-content: ${({ alignContent }) => alignContent};
  align-items: ${({ alignItems }) => alignItems};
  align-self: ${({ alignSelf }) => alignSelf};
  flex: ${({ flex }) => flex};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  flex-basis: ${({ flexBasis }) => flexBasis};
  gap: ${({ gap }) => px(gap)};
  width: ${({ width }) => px(width)};
  min-width: ${({ minWidth }) => px(minWidth)};
  max-width: ${({ maxWidth }) => px(maxWidth)};
  height: ${({ height }) => px(height)};
  min-height: ${({ minHeight }) => px(minHeight)};
  max-height: ${({ maxHeight }) => px(maxHeight)};
  padding-top: ${({ paddingTop }) => px(paddingTop)};
  padding-right: ${({ paddingRight }) => px(paddingRight)};
  padding-bottom: ${({ paddingBottom }) => px(paddingBottom)};
  padding-left: ${({ paddingLeft }) => px(paddingLeft)};
  padding: ${({ padding }) => px(padding)};
  margin-top: ${({ marginTop }) => px(marginTop)};
  margin-right: ${({ marginRight }) => px(marginRight)};
  margin-bottom: ${({ marginBottom }) => px(marginBottom)};
  margin-left: ${({ marginLeft }) => px(marginLeft)};
  margin: ${({ margin }) => px(margin)};
`;
