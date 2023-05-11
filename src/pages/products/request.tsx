import React from 'react';
import styled from '@emotion/styled';

import { theme } from '@/theme';
import useLink from '@/hooks/useLink';
import { Button, Flex, Header, SkeletonImage, Title } from '@/components';
import { RequestProductService } from '@/api/service';

export default function ProductRequest() {
  const userId = undefined;
  const link = useLink();
  const [name, setName] = React.useState<string>('');

  const handleSubmitForm = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name === '') {
        alert(`Input cosmetic name`);
        return;
      }
      await RequestProductService.submitRequestProduct({ name, userId });
      alert(`${name} requested successfully.`);
      setName('');
      link.to('home');
    },
    [link, name, userId],
  );

  return (
    <>
      <Header />
      <form onSubmit={handleSubmitForm} style={{ height: '100%' }}>
        <Wrapper as={'section'} flexDirection="column" justifyContent="space-evenly">
          <Title
            size="lg"
            title={'Product Request'}
            description={'Enter the name of the cosmetic you want'}
            color={theme.colors.primary}
          />
          <SkeletonImage
            priority
            width={140}
            height={120}
            src="/Diamond2.png"
            alt="baumman-thumbnail"
            style={{ marginInline: 'auto' }}
          />
          <LabelInput>
            <label htmlFor="name">Cosmetic Name</label>
            <StyledInput
              value={name}
              id="name"
              placeholder="Cosmetic"
              onChange={(e) => setName(e.target.value)}
            />
          </LabelInput>
          <Button type="submit" variant="filled">
            Submit
          </Button>
        </Wrapper>
      </form>
    </>
  );
}

const Wrapper = styled(Flex)`
  padding-top: 60px;
  padding-inline: 34px;
  height: calc(100% - 60px);
  background-color: ${({ theme }) => theme.colors.blue50};
`;

const LabelInput = styled.div`
  width: 100%;
  position: relative;

  label {
    font-size: 16px;
    font-weight: 700;
  }

  input {
    margin-top: 8px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 8px 12px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.blue400}`};
`;