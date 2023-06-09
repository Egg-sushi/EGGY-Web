import { SkinType } from '@/types/baumann';
import { Flex } from '../styled';
import styled from '@emotion/styled';
import Image from 'next/image';
import { FlipCard, Tag } from '../common';
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
  tags: string[];
  skinType: SkinType;
  isFrontShow: boolean;
  characterName: string;
  percents: BaumannResultResponse['percents'];
  onClick: VoidFunction;
}

function CharacterCard({ skinType, characterName, tags, isFrontShow, percents, onClick }: Props) {
  return (
    <FlipCard
      height={476}
      isFrontShow={isFrontShow}
      front={
        <FrontWrapper flexDirection="column">
          <CharacterHead flexDirection="column" gap={16}>
            <strong>{skinType}</strong>
            <span>{characterName}</span>
          </CharacterHead>
          <CharacterImage>
            <Image
              // src={`/${skinType}.png`}
              src={'/DRPT.png'}
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
      }
      back={
        <BackWrapper flexDirection="column">
          <strong>{skinType}</strong>
          <Flex flexDirection="column" gap={54} marginTop={36} style={{ paddingInline: 24 }}>
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
      }
      onClick={onClick}
    />
  );
}

const FrontWrapper = styled(Flex)`
  padding: 36px 24px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  text-align: center;
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

const BackWrapper = styled(Flex)`
  padding-top: 44px;
  padding-bottom: 90px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 20px;

  & > strong {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
  }
`;

export default CharacterCard;
