import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { Flex } from '@/components/styled';
import type { ProductInList } from '@/types/product';
import { Icon, SkeletonImage, Text } from '@/components';

interface Props {
  product: ProductInList;
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
      <ProductImage
        src={product.imageUrl}
        alt={'product-item-image'}
        width={50}
        height={50}
        unoptimized
      />
      <Box flexDirection="column" flex={1} flexShrink={0}>
        <Title variant="h7">{product.title}</Title>
        <Text variant="body5" fontColor={theme.colors.gray300}>
          {product.brand}
        </Text>
        <Text variant="body5" fontColor={theme.colors.gray300}>
          {product.category}
        </Text>
      </Box>
      <Icon type="rightArrow" fill={theme.colors.gray500} width={10} height={14} />
    </Flex>
  );
}

const ProductImage = styled(SkeletonImage)`
  flex-shrink: 0;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.blue150}`};
`;

const Box = styled(Flex)`
  overflow: hidden;
`;

const Title = styled(Text)`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ProductListItem;
