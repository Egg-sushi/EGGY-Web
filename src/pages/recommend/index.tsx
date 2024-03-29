import React, { Suspense } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';

import { theme } from '@/theme';
import { useLink } from '@/hooks';
import { SkinType } from '@/types/baumann';
import { ProductService } from '@/api/service';
import { atLeastPromiseTime } from '@/utils/time';
import { SKINTYPE_LIST, isSkinType } from '@/utils';
import { useUserSkinType } from '@/api/query/userQuery';
import {
  Button,
  CircleCheckBox,
  Flex,
  FullCoverSpinner,
  Header,
  SelectOption,
  Text,
  Title,
} from '@/components';

const Recommend = ['Find your cosmetic', 'Is good for your skin?'];

export default function RecommendPage() {
  const link = useLink();
  const { data: userSkinTypeData } = useUserSkinType();
  const [skinType, setSkinType] = React.useState<SkinType>(userSkinTypeData?.skinType ?? 'DRNT');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChangeOptionChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isSkinType(e.target.value)) {
      setSkinType(e.target.value);
    }
  }, []);

  const handleClickRecommendButton = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await atLeastPromiseTime(
        () => ProductService.getRecommendCosmeticBySkinType(skinType),
        4000,
      );
      if (res.id) {
        setIsLoading(false);
        link.to('productItem', String(res.id));
      }
    } catch (err) {
      alert('WE CAN`T FIND COSMETIC FOR YOU');
    }
  }, [link, skinType]);

  return (
    <>
      <Head>
        <title>EGGY: Recommend Cosmetic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {isLoading && <FullCoverSpinner />}
      <Wrapper as={'section'} flexDirection="column" justifyContent="space-evenly">
        <Title
          size="lg"
          title={'Recommend'}
          description={'Do you want to find your cosmetics?'}
          color={theme.colors.black}
        />
        <Flex flexDirection="column" gap={16}>
          <Text variant="h4" fontColor={theme.colors.blue800}>
            Recommend Cosmetic
          </Text>
          <Flex gap={12}>
            <Text variant="h5" fontColor={theme.colors.blue800}>
              Select your skinType
            </Text>
            <SelectOption
              width={'auto'}
              value={skinType}
              optionList={SKINTYPE_LIST}
              onChange={handleChangeOptionChange}
            />
          </Flex>
          <UploadImageWrapper
            flexDirection="column"
            gap={32}
            justifyContent="center"
            alignContent="center"
            style={{ position: 'relative' }}
          >
            <Image
              src={`/${skinType}.png`}
              alt="skinType-image"
              width={160}
              height={160}
              style={{ marginInline: 'auto' }}
            />
            <Text variant="h4" fontColor={theme.colors.blue800} align="center">
              {skinType}
            </Text>
            <Button
              hierarchy="primary"
              variant="outlined"
              width={240}
              style={{ margin: 'auto' }}
              onClick={handleClickRecommendButton}
            >
              FIND NOW!
            </Button>
          </UploadImageWrapper>
        </Flex>
        <Flex as={'ul'} flexDirection="column" gap={24}>
          {Recommend.map((feature) => (
            <FeatureItem key={feature}>
              <CircleCheckBox checked={true} />
              <Text variant="body2">{feature}</Text>
            </FeatureItem>
          ))}
        </Flex>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(Flex)`
  padding-top: 60px;
  padding-inline: 34px;
  height: calc(100% - 60px);
  background-color: #fafcfe;
`;

const UploadImageWrapper = styled(Flex)`
  border: ${({ theme }) => `2px dashed ${theme.colors.blue400}`};
  padding-block: 56px;
  box-sizing: border-box;
`;

const FeatureItem = styled.li`
  display: flex;
  border-radius: 10px;
  padding-block: 12px;
  padding-inline: 20px;
  background-color: ${({ theme }) => theme.colors.blue100};
  cursor: pointer;
  position: relative;

  &,
  & > div {
    transition: all 0.2s ease-in;
  }

  & > div {
    padding-left: 20px;
    color: ${({ theme }) => theme.colors.blue500};
  }
`;
