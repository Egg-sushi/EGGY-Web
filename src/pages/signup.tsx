import { useSignUp } from '@/api/query/userQuery';
import { Button, GenderInputBox, Header, SelectOption, Text } from '@/components';
import { GENDER } from '@/constants';
import { Country } from '@/types/country';
import { dateString } from '@/utils/time';
import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';

type Birthday = {
  yyyy: string;
  mm: string;
  dd: string;
};
interface Props {
  countries: Country[];
}
export default function SignUpPage({ countries }: Props) {
  const [name, setName] = React.useState<string>('');
  const [birthday, setBirthday] = React.useState<Birthday>({ yyyy: '', mm: '', dd: '' });
  const [gender, setGender] = React.useState<string>(GENDER.MALE);
  const [country, setCountry] = React.useState<Country>({ id: 0, code: '', title: '' });

  const signUp = useSignUp(
    name,
    gender,
    dateString(birthday.yyyy, birthday.mm, birthday.dd),
    country.id,
  );

  const handleChangeCountry = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCountry((prev) => countries.find((country) => country.title === e.target.value) ?? prev);
    },
    [countries],
  );

  const handleClickSignUp = () => {
    signUp.mutate();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Content>
        <Text variant="h3">Hi, There!</Text>
        <LabelInput>
          <label htmlFor="name">Name</label>
          <StyledInput
            value={name}
            id="name"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </LabelInput>
        <LabelInput>
          <label htmlFor="gender">Gender</label>
          <GenderInputBox value={gender} setValue={setGender} />
        </LabelInput>
        <LabelInput>
          <label htmlFor="birthday">Birthday</label>
          <BirthdayInputWrapper>
            <StyledInput
              value={birthday.yyyy}
              id="yyyy"
              placeholder="YYYY"
              onChange={(e) => setBirthday((prev) => ({ ...prev, yyyy: e.target.value }))}
            />
            <StyledInput
              value={birthday.mm}
              id="mm"
              placeholder="MM"
              onChange={(e) => setBirthday((prev) => ({ ...prev, mm: e.target.value }))}
            />
            <StyledInput
              value={birthday.dd}
              id="dd"
              placeholder="DD"
              onChange={(e) => setBirthday((prev) => ({ ...prev, dd: e.target.value }))}
            />
          </BirthdayInputWrapper>
        </LabelInput>
        <LabelInput>
          <label htmlFor="country">Country</label>
          <StyledSelection
            value={country.title}
            onChange={handleChangeCountry}
            optionList={countries.map((country) => country.title)}
          />
        </LabelInput>
        <BottomPosition>
          <Button variant="filled" onClick={handleClickSignUp}>
            Sign Up
          </Button>
        </BottomPosition>
      </Content>
    </>
  );
}

const Content = styled.main`
  height: 100%;
  padding-inline: 34px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 2rem;
`;

const LabelInput = styled.div`
  width: 100%;
  position: relative;

  label {
    font-size: 16px;
    font-weight: 700;
  }

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 8px 12px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.blue400}`};
`;

const BirthdayInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const BottomPosition = styled.div`
  position: absolute;

  width: calc(100% - 68px);
  bottom: 50px;
`;

const StyledSelection = styled(SelectOption)`
  width: 100%;
  padding: 12px 8px 12px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.blue400}`};
`;
