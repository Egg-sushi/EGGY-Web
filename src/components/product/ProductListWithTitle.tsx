import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';

import { Flex } from '@/components/styled';
import type { Product } from '@/types/product';
import { ProductListItem, Text } from '@/components';

interface Props {
  title: string;
  products: Product[];
}

function ProductListWithTitle({ title, products }: Props) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Flex flexDirection="column" gap={16} justifyContent="space-between" alignItems="center">
      <Flex justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
        <Text variant="h6" fontColor={theme.colors.blue800}>
          {title}
        </Text>
        <Link href={`/products?categories=${title}`}>
          <Text
            variant="body5"
            fontColor={theme.colors.blue500}
            style={{ textDecoration: 'underline' }}
          >
            More
          </Text>
        </Link>
      </Flex>
      <Flex flexDirection="column" gap={16} style={{ width: '100%' }}>
        {products.map((product, idx) => (
          <ProductListItem
            product={product}
            key={idx}
            onClick={() => router.push(`/products/${product.id}`)}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default ProductListWithTitle;
