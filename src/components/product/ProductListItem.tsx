import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { Flex } from '@/components/styled';
import type { Product } from '@/types/product';
import { Icon, SkeletonImage, Text } from '@/components';

interface Props {
  product: Product;
  onClick: VoidFunction;
}

function ProductListItem({ product, onClick }: Props) {
  const theme = useTheme();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap={20}
      style={{ width: '100%' }}
      onClick={onClick}
    >
      <ProductImage src={product.imageUrl} alt={'product-item-image'} width={50} height={50} />
      <Flex flexDirection="column" gap={8} flex={1} flexShrink={0}>
        <Text variant="h7">{product.title}</Text>
        <Text variant="body4" color={theme.colors.gray300}>
          {product.Brand.title}
        </Text>
      </Flex>
      <Icon type="rightArrow" fill={theme.colors.gray500} width={10} height={14} />
    </Flex>
  );
}

const ProductImage = styled(SkeletonImage)`
  flex-shrink: 0;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.blue150}`};
`;

export default ProductListItem;
