import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { Flex } from '../styled';
import useLink from '@/hooks/useLink';
import type { Product } from '@/types/product';
import { ProductPriceHierarchy } from '@/utils';
import { Icon, SkeletonImage, Tag, Text } from '../common';

interface Props {
  product: Product;
  like: boolean;
  onClickLike: React.MouseEventHandler<SVGSVGElement>;
}

function ProductItem({ product, like = false, onClickLike }: Props) {
  const theme = useTheme();
  const link = useLink();

  if (typeof product === 'undefined') {
    return null;
  }

  return (
    <Flex flexDirection="column" justifyContent="space-around" gap={32}>
      <Flex flexDirection="column" gap={4}>
        <Text
          variant="body3"
          fontColor={theme.colors.gray200}
          role="button"
          onClick={() => link.back()}
        >
          {'<'} PREV
        </Text>
        <SkeletonImage
          src={product.imageUrl}
          alt="product-thumbnail"
          fill
          height={324}
          unoptimized
          style={{
            borderRadius: 4,
            border: `1px solid ${theme.colors.gray300}`,
          }}
        />
      </Flex>
      <Flex flexDirection="column" gap={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="h6" fontColor={theme.colors.gray300}>
            {product.brand}
          </Text>
          <Icon
            type="heart"
            width={16}
            height={16}
            stroke={like ? theme.colors.blue800 : theme.colors.gray300}
            fill={like ? theme.colors.blue800 : 'none'}
            onClick={onClickLike}
          />
        </Flex>
        <Text variant="h4">{product.title}</Text>
        <Flex gap={8}>
          <Tag size="sm" hierarchy="skyblue" text={product.category} />
          <Tag
            size="sm"
            hierarchy={ProductPriceHierarchy[product.priceRangeName]}
            text={product.priceRangeName}
          />
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap={16}>
        {product.goods.length > 0 && (
          <Flex flexDirection="column" gap={8}>
            <Text variant="h5" fontColor={theme.colors.blue800}>
              GOOD FOR SKINTYPE
            </Text>
            <Grid4>
              {product.goods.map((good) => (
                <Tag key={good} text={good} hierarchy="skyblue" size="md" />
              ))}
            </Grid4>
          </Flex>
        )}
        {product.bads.length > 0 && (
          <Flex flexDirection="column" gap={8}>
            <Text variant="h5" fontColor={theme.colors.green800}>
              BAD FOR SKINTYPE
            </Text>
            <Grid4>
              {product.bads.map((bad) => (
                <Tag key={bad} text={bad} hierarchy="secondary" size="md" />
              ))}
            </Grid4>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

const Grid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  & > span {
    width: auto;
  }
`;

export default ProductItem;
