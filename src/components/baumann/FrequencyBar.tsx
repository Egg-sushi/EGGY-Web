import { BaumannQNA } from '@/types/baumann';
import styled from '@emotion/styled';
import { Text } from '../common';
import { useTheme } from '@emotion/react';

interface Props {
  answers: BaumannQNA['Baumann_Answer'];
  activeAnswer: BaumannQNA['Baumann_Answer'][0] | null;
  onClickItem: (
    userAnswer: BaumannQNA['Baumann_Answer'][0],
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => void;
}

function FrequencyBar({ answers, activeAnswer, onClickItem }: Props) {
  const theme = useTheme();

  return (
    <Wrapper>
      <GrayBar />
      <CircleList>
        {answers.map((answer) => {
          const isActive = answer.id === activeAnswer?.id;
          return (
            <Item key={answer.id} onClick={(e) => onClickItem(answer, e)}>
              <Circle key={answer.id} isActive={isActive} />
              <CircleLabel
                variant="body2"
                color={isActive ? theme.colors.primary : theme.colors.gray500}
                weight={isActive ? 800 : 400}
              >
                {answer.answer}
              </CircleLabel>
            </Item>
          );
        })}
      </CircleList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 30px);
  padding-left: 15px;
  position: relative;
`;

const GrayBar = styled.span`
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.gray300};
`;

const CircleList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Item = styled.li`
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
  border: 1px solid;
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.gray300};
  box-shadow: ${({ isActive, theme }) => isActive && `inset 0 0 0 8px ${theme.colors.primary}`};
  transition: all 0.1s ease-in;
`;

const CircleLabel = styled(Text)`
  position: absolute;
  top: 20px;
  transform: translateX(-50%);
  transition: all 0.1s ease-in;
`;

export default FrequencyBar;