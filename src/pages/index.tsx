import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { Page } from '../domains/Page';
import { usePages } from '../hooks/Page';
import { restClient } from '../libs/restClient';

export const getServerSideProps: GetServerSideProps<{ pages: Page[] }> = async () => {
  try {
    const pages = await restClient.apiGet<{ pages: Page[] }>('/api/pages').then((result) => result.data.pages);

    return {
      props: { pages },
    };
  } catch (error) {
    return {
      props: { pages: [] },
    };
  }
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const NextPage: NextPage<Props> = ({ pages: pagesFromServer }) => {
  const { data: pages } = usePages(pagesFromServer);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ maxWidth: '500px', margin: '0 auto', padding: '0px 16px' }}>
        <div style={{ rowGap: '16px', display: 'flex', flexDirection: 'column' }}>{JSON.stringify(pages)}</div>
      </main>
    </>
  );
};

export default NextPage;
