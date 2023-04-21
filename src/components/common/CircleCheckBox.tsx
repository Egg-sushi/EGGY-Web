import styled from '@emotion/styled';
import React from 'react';

interface Props {
  checked: boolean;
}

function CircleCheckBox({ checked }: Props) {
  return (
    <Wrapper>
      <Input type="checkbox" id="checkbox" checked={checked} readOnly />
      <Label htmlFor="checkbox" />
    </Wrapper>
  );
}

const Wrapper = styled.span`
  position: relative;
`;

const Input = styled.input`
  &[type='checkbox'] {
    visibility: hidden;
  }

  &[type='checkbox']:checked + label {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 1px;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:after {
    content: '';
    width: 10px;
    height: 5px;
    opacity: 0;
    position: absolute;
    top: 5px;
    left: 4px;
    transform: rotate(-45deg);
    border: ${({ theme }) => `2px solid ${theme.colors.white}`};
    border-top: none;
    border-right: none;
  }
`;

export default CircleCheckBox;
