import { useTheme } from '@emotion/react';

import { Flex } from '@/components/styled';
import type { Cosmetic } from '@/types/cosmetic';
import { CosmeticListItem, Text } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  cosmetics: Cosmetic[];
}

function CosmeticListWithTitle({ title, cosmetics }: Props) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Flex flexDirection="column" gap={16} justifyContent="space-between" alignItems="center">
      <Flex justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
        <Text variant="h6" fontColor={theme.colors.blue800}>
          {title}
        </Text>
        <Link href={`/cosmetics?categories=${title}`}>
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
          <CosmeticListItem
            cosmetic={cosmetic}
            key={idx}
            onClick={() => router.push(`/cosmetics/${cosmetic.id}`)}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default CosmeticListWithTitle;
