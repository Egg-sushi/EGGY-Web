import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { Flex } from './styled';
import { Icon, Tag } from './common';

interface Props {
  value: string;
  filters: string[];
  onSearch: VoidFunction;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFilter: VoidFunction;
}

function SearchBar({ value, filters, onSearch, onChange, onClickFilter }: Props) {
  const theme = useTheme();

  return (
    <Flex flexDirection="column" gap={8}>
      <LabelInput flexDirection="column" gap={4}>
        <label htmlFor="search">Search</label>
        <Flex style={{ position: 'relative' }}>
          <StyledInput
            value={value}
            id="search"
            placeholder="Cosmetic"
            onChange={onChange}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
          />
          <StyledIcon
            type="search"
            width={14}
            height={14}
            stroke={theme.colors.gray400}
            onClick={onSearch}
          />
        </Flex>
      </LabelInput>
      <Flex justifyContent="space-between" alignItems="start">
        <Flex gap={4} flexWrap="wrap">
          {filters.map((filter) => (
            <Tag text={filter} hierarchy="skyblue" size="sm" key={filter} />
          ))}
        </Flex>
        <Tag
          text={'Filter'}
          hierarchy="primary"
          size="sm"
          icons={{
            type: 'filter',
            width: 10,
            height: 10,
            stroke: theme.colors.white,
            position: 'start',
          }}
          onClick={onClickFilter}
        />
      </Flex>
    </Flex>
  );
}

const LabelInput = styled(Flex)`
  label {
    font-size: 16px;
    font-weight: 700;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 8px 12px 10px;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.blue400}`};
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

export default SearchBar;
