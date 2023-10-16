import { Card, CardBody, CardHeader, Image, Skeleton, Tab, Tabs } from '@nextui-org/react';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import styles from './PageCard.module.css';
import { IMAGE } from '~/constants/images';
import { Page } from '~/domains/Page';

type Props = {
  page: Page;
};
export const PageCard: FC<Props> = ({ page }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <Card className="p-0">
      <CardHeader className="p-0">
        <a href={page.url} target="blank" rel="noopener noreferrer" className={styles.imageWrapper}>
          <Image
            className="aspect-[40/21] rounded-none"
            alt={`${page.title}のOGP画像`}
            width="400px"
            height="auto"
            src={page.image || IMAGE.NO_IMAGE}
            fallbackSrc={IMAGE.NO_IMAGE}
          />
        </a>
      </CardHeader>
      <CardBody>
        <p className="font-bold mb-[4px]">{page.isFetching ? '読み込み中です...' : page.title}</p>
        <p className="text-slate-600 text-xs mb-[8px]">回答日：{format(new Date(page.createdAt), 'yyyy/MM/dd HH:mm')}</p>
        {page.isFetching ? (
          <>
            <Skeleton className="rounded-lg mb-[4px]">
              <div className="h-4 rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="rounded-lg mb-[4px]">
              <div className="h-4 rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="rounded-lg mb-[4px]">
              <div className="h-4 rounded-lg bg-secondary"></div>
            </Skeleton>
          </>
        ) : (
          <>
            {page.body && page.summary ? (
              <Tabs color="primary" variant="bordered" size="md">
                <Tab key="body" title="本文">
                  <p className={`mb-[4px] text-sm ${isShowMore ? '' : 'line-clamp-3'}`}>{page.body}</p>
                  <span className="cursor-pointer text-sky-400 w-fit" onClick={() => setIsShowMore((prev) => !prev)}>
                    {isShowMore ? '折りたたむ' : 'もっと見る'}
                  </span>
                </Tab>
                <Tab key="summary" title="サマリー">
                  <p className={`mb-[4px] text-sm ${isShowMore ? '' : 'line-clamp-3'}`}>{page.summary}</p>
                  <span className="cursor-pointer text-sky-400 w-fit" onClick={() => setIsShowMore((prev) => !prev)}>
                    {isShowMore ? '折りたたむ' : 'もっと見る'}
                  </span>
                </Tab>
              </Tabs>
            ) : (
              <>
                {page.body && (
                  <>
                    <p className={`mb-[4px] text-sm ${isShowMore ? '' : 'line-clamp-3'}`}>{page.body}</p>
                    <span className="cursor-pointer text-sky-400 w-fit" onClick={() => setIsShowMore((prev) => !prev)}>
                      {isShowMore ? '折りたたむ' : 'もっと見る'}
                    </span>
                  </>
                )}
              </>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};
