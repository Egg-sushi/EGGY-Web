import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '../styled';
import { FilterHierarchy, inArray } from '@/utils';
import { Button, Tag, Text } from '../common';
import type { UserFilterList, ProductFilter } from '@/types/product';

interface Props {
  data: {
    filters: ProductFilter;
    list: UserFilterList;
  };
  onSaveClose: (data: ProductFilter) => void;
}

function toTypeFilterList(list: Props['data']['list']) {
  return [
    {
      type: 'categories',
      title: 'Category',
      items: list.categories,
    },
    {
      type: 'skinTypes',
      title: 'SkinType',
      items: list.skinTypes,
    },
    {
      type: 'priceRanges',
      title: 'Price',
      items: list.priceRanges,
    },
  ] as const;
}

function CosmeticSearchFilter({ data: { filters, list }, onSaveClose }: Props) {
  const [selectedFilters, setSelectedFilters] = React.useState<ProductFilter>(filters);
  const typeList = toTypeFilterList(list);
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
      {typeList.map((list) => (
        <Flex flexDirection="column" gap={8} key={list.type}>
          <Text variant="h5" fontColor={theme.colors.blue800}>
            {list.title}
          </Text>
          <Flex gap={4} flexWrap="wrap">
            {list.items.map((item) => (
              <TransitionTag
                size="md"
                key={item.id}
                text={item.title}
                hierarchy={
                  inArray(selectedFilters[list.type], item.title)
                    ? FilterHierarchy[list.type]
                    : 'gray'
                }
                onClick={() => handleClickFilterItem(list.type, item)}
              />
            ))}
          </Flex>
        </Flex>
      ))}
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
