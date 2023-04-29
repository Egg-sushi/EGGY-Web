import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Button, Tag, Text } from '../common';
import { Flex } from '../styled';
import type { CosmeticFilter } from '@/types/cosmetic';

interface Props {
  data?: CosmeticFilter;
  onSaveClose: (data: CosmeticFilter['categories']) => void;
}

function CosmeticSearchFilter({ data, onSaveClose }: Props) {
  const [categories, setCategories] = React.useState<string[]>(data?.categories ?? []);
  const theme = useTheme();

  const handleClickCategoryTag = React.useCallback(
    (category: string) => {
      if (categories.includes(category)) {
        setCategories((prev) => prev.filter((_category) => _category !== category));
      } else {
        setCategories((prev) => [...prev, category]);
      }
    },
    [categories],
  );

  return (
    <Wrapper flexDirection="column" gap={24}>
      <Flex flexDirection="column" gap={8}>
        <Text variant="h5" color={theme.colors.blue800}>
          Category
        </Text>
        <Flex gap={4} flexWrap="wrap">
          {['SERUM', 'SKIN', 'TONER', 'CLEANSING', 'MASK', 'LOTION'].map((category) => (
            <TransitionTag
              size="md"
              text={category}
              key={category}
              hierarchy={categories.includes(category) ? 'skyblue' : 'gray'}
              onClick={() => handleClickCategoryTag(category)}
            />
          ))}
        </Flex>
      </Flex>
      <Button
        variant="filled"
        hierarchy="primary"
        onClick={() => onSaveClose(categories)}
        width={80}
        style={{ marginLeft: 'auto' }}
      >
        Save
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
  width: calc(100% - 64px);
  padding-inline: 32px;
  padding-block: 16px;
`;

const TransitionTag = styled(Tag)`
  transition: all 0.15s ease-in;
`;

export default CosmeticSearchFilter;
