import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '../styled';
import { Button, Tag, Text } from '../common';
import type { UserFilterList, ProductFilter } from '@/types/product';

interface Props {
  data: {
    filters: ProductFilter;
    list: UserFilterList;
  };
  onSaveClose: (data: ProductFilter) => void;
}

function CosmeticSearchFilter({ data: { filters, list }, onSaveClose }: Props) {
  const [selectedFilters, setSelectedFilters] = React.useState<ProductFilter>(filters);
  const theme = useTheme();

  const handleClickFilterItem = React.useCallback(
    <K extends keyof UserFilterList, T extends UserFilterList[K][number]>(type: K, value: T) => {
      const nextSelectedFilterList = { ...selectedFilters };
      if (nextSelectedFilterList[type].find((item) => item === value.title)) {
        setSelectedFilters((prev) => ({
          ...prev,
          [type]: nextSelectedFilterList[type].filter((item) => item !== value.title),
        }));
      } else {
        setSelectedFilters((prev) => ({
          ...prev,
          [type]: [...nextSelectedFilterList[type], value.title],
        }));
      }
    },
    [selectedFilters],
  );

  return (
    <Wrapper flexDirection="column" gap={24}>
      <Flex flexDirection="column" gap={8}>
        <Text variant="h5" color={theme.colors.blue800}>
          Category
        </Text>
        <Flex gap={4} flexWrap="wrap">
          {list.categories.map((category) => (
            <TransitionTag
              size="md"
              key={category.id}
              text={category.title}
              hierarchy={selectedFilters.categories.includes(category.title) ? 'skyblue' : 'gray'}
              onClick={() => handleClickFilterItem('categories', category)}
            />
          ))}
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap={8}>
        <Text variant="h5" color={theme.colors.blue800}>
          SkinTypes
        </Text>
        <Flex gap={4} flexWrap="wrap">
          {list.skinTypes.map((skinType) => (
            <TransitionTag
              size="md"
              key={skinType.id}
              text={skinType.title}
              hierarchy={selectedFilters.skinTypes.includes(skinType.title) ? 'skyblue' : 'gray'}
              onClick={() => handleClickFilterItem('skinTypes', skinType)}
            />
          ))}
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap={8}>
        <Text variant="h5" color={theme.colors.blue800}>
          PriceRanges
        </Text>
        <Flex gap={4} flexWrap="wrap">
          {list.priceRanges.map((priceRange) => (
            <TransitionTag
              size="md"
              key={priceRange.id}
              text={priceRange.title}
              hierarchy={
                selectedFilters.priceRanges.includes(priceRange.title) ? 'skyblue' : 'gray'
              }
              onClick={() => handleClickFilterItem('priceRanges', priceRange)}
            />
          ))}
        </Flex>
      </Flex>
      <Button
        variant="filled"
        hierarchy="primary"
        onClick={() => onSaveClose({ ...filters, ...selectedFilters })}
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
