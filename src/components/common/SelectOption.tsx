import styled from '@emotion/styled';
import Text from './Text';

interface Props {
  value?: string;
  label?: string;
  optionList: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectOption(props: Props) {
  const { value, label, optionList, onChange, ...restProps } = props;
  return (
    <Wrapper>
      {label && <Text variant="body5">{label}</Text>}
      <SelectList value={value} onChange={onChange} {...restProps}>
        {optionList.map((filter) => (
          <Item key={filter} value={filter}>
            {filter}
          </Item>
        ))}
      </SelectList>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const SelectList = styled.select`
  outline: none;
  cursor: pointer;
  transition: all 0.1s ease-in;
  padding: 4px 2px;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  /* and then whatever styles you want*/
  width: 180px;
  padding: 5px;
`;

const Item = styled.option``;

export default SelectOption;
