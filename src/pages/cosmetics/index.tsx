import { Header } from '@/components';
import Head from 'next/head';

export default function CosmeticList() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main style={{ paddingInline: 34, paddingTop: 80 }}>Cosmetic List</main>
    </>
  );
}
