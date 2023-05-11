import { GENDER } from '@/constants';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import Text from './Text';

interface Props {
  value: string;
  setValue: (value: string) => void;
}
function GenderInputBox({ value, setValue }: Props) {
  const theme = useTheme();

  return (
    <Wrapper>
      <CircleWrapper onClick={() => setValue(GENDER.MALE)}>
        <Circle isActive={value === GENDER.MALE} />
        <CircleLabel
          variant="body3"
          fontColor={value === GENDER.MALE ? theme.colors.primary : theme.colors.gray500}
          weight={value === GENDER.MALE ? 800 : 400}
        >
          Male
        </CircleLabel>
      </CircleWrapper>

      <CircleWrapper onClick={() => setValue(GENDER.FEMALE)}>
        <Circle isActive={value === GENDER.FEMALE} />
        <CircleLabel
          variant="body3"
          fontColor={value === GENDER.FEMALE ? theme.colors.primary : theme.colors.gray500}
          weight={value === GENDER.FEMALE ? 800 : 400}
        >
          Female
        </CircleLabel>
      </CircleWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 3rem;
  padding: 15px 0 35px 10px;
`;

const CircleWrapper = styled.button`
  position: relative;
  flex-shrink: 0;
  text-align: center;
`;

type IsActive = { isActive: boolean };
const Circle = styled.span<IsActive>`
  position: absolute;
  top: -15px;
  transform: translateX(-50%);
  content: '';
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ isActive }) => !isActive && '1px solid'};
  border-color: ${({ theme }) => theme.colors.gray300};
  box-shadow: ${({ isActive, theme }) => isActive && `inset 0 0 0 8px ${theme.colors.primary}`};
  transition: all 0.1s ease-in;
`;

const CircleLabel = styled(Text)`
  position: absolute;
  top: 20px;
  transform: translateX(-50%);
  transition: all 0.1s ease-in;
`;

export default GenderInputBox;
