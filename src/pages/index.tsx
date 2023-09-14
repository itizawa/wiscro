import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
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
    <main>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
        </div>
      </nav>
      <div>{JSON.stringify(pages)}</div>
    </main>
  );
};

export default NextPage;
