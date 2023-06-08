import { SkinType } from '@/types/baumann';
import { Flex } from '../styled';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Tag } from '../common';
import { BaumannResultResponse } from '@/types/api';
import CompetitionBar from './CompetitionBar';

const BAUMANN_TEXT = [
  { firstItemText: 'Dry', secondItemText: 'Oily', firstType: 'D', secondType: 'O' },
  {
    firstItemText: 'Sensitive',
    secondItemText: 'Resistant',
    firstType: 'S',
    secondType: 'R',
  },
  {
    firstItemText: 'Pigmented',
    secondItemText: 'Non-pigmented',
    firstType: 'P',
    secondType: 'N',
  },
  {
    firstItemText: 'Wrinkle',
    secondItemText: 'Tight',
    firstType: 'W',
    secondType: 'T',
  },
] as const;

interface Props {
  skinType: SkinType;
  characterName: string;
  tags: string[];
  isFrontShow: boolean;
  percents: BaumannResultResponse['percents'];
  onClick: VoidFunction;
}

function CharacterCard({ skinType, characterName, tags, isFrontShow, percents, onClick }: Props) {
  return (
    <CardWrapper>
      <Wrapper isFrontShow={isFrontShow} onClick={onClick} role="button">
        <FrontWrapper flexDirection="column" isFrontShow={isFrontShow}>
          <CharacterHead flexDirection="column" gap={16}>
            <strong>{skinType}</strong>
            <span>{characterName}</span>
          </CharacterHead>
          <CharacterImage>
            <Image
              src={`/${skinType}.png`}
              alt={`skinType-character-image(${characterName})`}
              width={220}
              height={224}
            />
          </CharacterImage>
          <TagsWrapper gap={10} flexWrap="wrap">
            {tags.map((tag) => (
              <Tag key={tag} type="outline" size="sm" hierarchy="primary" text={tag} />
            ))}
          </TagsWrapper>
        </FrontWrapper>
        <BackWrapper isFrontShow={isFrontShow} flexDirection="column">
          <strong>{skinType}</strong>
          <Flex flexDirection="column" gap={54} marginTop={36}>
            {BAUMANN_TEXT.map((skinType) => (
              <CompetitionBar
                key={skinType.firstItemText}
                firstItemText={skinType.firstItemText}
                firstItemValue={percents[skinType.firstType]}
                secondItemText={skinType.secondItemText}
                secondItemValue={percents[skinType.secondType]}
              />
            ))}
          </Flex>
        </BackWrapper>
      </Wrapper>
    </CardWrapper>
  );
}

type StyleProps = Pick<Props, 'isFrontShow'>;
const Wrapper = styled.div<StyleProps>`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 1s;
  transform-style: preserve-3d;
  transform: ${({ isFrontShow }) => (isFrontShow ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardWrapper = styled.div`
  perspective: 600px;
`;

const FrontWrapper = styled(Flex)<StyleProps>`
  position: absolute;
  padding: 36px 24px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  text-align: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const CharacterHead = styled(Flex)`
  & > strong {
    font-size: 30px;
    font-weight: 600;
    line-height: 35.8px;
  }

  & > span {
    font-size: 20px;
    line-height: 23.87px;
  }
`;

const CharacterImage = styled.div`
  position: relative;
`;

const TagsWrapper = styled(Flex)`
  margin-top: 44px;
`;

const BackWrapper = styled(Flex)<StyleProps>`
  position: absolute;
  padding-inline: 24px;
  padding-top: 44px;
  padding-bottom: 90px;
  text-align: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  transform: rotateY(180deg);
  width: 300px;

  & > strong {
    font-size: 30px;
    font-weight: 700;
  }
`;

export default CharacterCard;
