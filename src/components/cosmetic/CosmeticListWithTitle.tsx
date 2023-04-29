import { useTheme } from '@emotion/react';

import { Flex } from '@/components/styled';
import type { Cosmetic } from '@/types/cosmetic';
import { CosmeticListItem, Icon, SkeletonImage, Text } from '@/components';
import Link from 'next/link';

interface Props {
  title: string;
  cosmetics: Cosmetic[];
}

function CosmeticListWithTitle({ title, cosmetics }: Props) {
  const theme = useTheme();

  return (
    <Flex flexDirection="column" gap={16} justifyContent="space-between" alignItems="center">
      <Flex justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
        <Text variant="h6" fontColor={theme.colors.blue800}>
          {title}
        </Text>
        <Link href={`/cosmetics/${title}`}>
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
        {cosmetics.map((cosmetic, idx) => (
          <CosmeticListItem cosmetic={cosmetic} key={idx} />
        ))}
      </Flex>
    </Flex>
  );
}

export default CosmeticListWithTitle;
