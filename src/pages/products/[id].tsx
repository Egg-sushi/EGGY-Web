import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { ProductService } from '@/api/service';
import { Header, ProductItem } from '@/components';
import type { Product } from '@/types/product';
import { useIsUserLikeProduct, useToggleUserLike } from '@/api/query';
import React from 'react';
import { DUMMY_PRODUCT } from '@/dummy/cosmetic';

interface Props {
  product: Product;
}

// TODO: user 연결에 따라 아래 기능 추가
// 1. 상품 조회 api
// 2. 찜하기 기능 api
const ProductDetailPage: NextPage<Props> = ({ product }) => {
  const isUserLike = useIsUserLikeProduct({ productId: product?.id });
  const toggleLike = useToggleUserLike({ productId: product?.id });

  const handleClickToggleLike = React.useCallback(() => {
    toggleLike.mutate();
  }, [toggleLike]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main style={{ paddingInline: 34, paddingBlock: 80 }}>
        <ProductItem
          product={product}
          like={isUserLike.data ?? false}
          onClickLike={handleClickToggleLike}
        />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const productIds = await ProductService.getAllIds();

    return {
      paths: productIds.map((id) => ({ params: { id: String(id) } })),
      fallback: true,
    };
  } catch (err) {
    console.error(err);
  }
  return {
    paths: [{ params: { id: '1' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ params }) => {
  try {
    const product = await ProductService.getProduct(params?.id ?? '1');

    return {
      props: {
        product: product,
      },
    };
  } catch (err) {
    console.error(err);
  }
  return {
    props: {
      product: DUMMY_PRODUCT,
    },
  };
};

export default ProductDetailPage;
