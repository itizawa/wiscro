import { Card, CardBody, CardHeader, Image, Skeleton } from '@nextui-org/react';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import styles from './AnswerCard.module.css';
import { IMAGE } from '~/constants/images';
import { Answer } from '~/domains/Answer';

type Props = {
  answer: Answer;
};
export const AnswerCard: FC<Props> = ({ answer }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <Card className="p-0">
      <CardHeader className="p-0">
        <a href={answer.url} target="blank" rel="noopener noreferrer" className={styles.imageWrapper}>
          <Image
            className="aspect-[40/21] rounded-none"
            alt={`${answer.title}のOGP画像`}
            width="400px"
            height="auto"
            src={answer.image || IMAGE.NO_IMAGE}
            fallbackSrc={IMAGE.NO_IMAGE}
          />
        </a>
      </CardHeader>
      <CardBody>
        <p className="font-bold mb-[4px]">{answer.isFetching ? '読み込み中です...' : answer.title}</p>
        <p className="text-slate-600 text-xs mb-[8px]">回答日：{format(new Date(answer.createdAt), 'yyyy/MM/dd HH:mm')}</p>
        {answer.isFetching ? (
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
            <p className={`mb-[4px] text-sm ${isShowMore ? '' : 'line-clamp-3'}`}>{answer.body}</p>
            <span className="cursor-pointer text-sky-400 w-fit" onClick={() => setIsShowMore((prev) => !prev)}>
              {isShowMore ? '折りたたむ' : 'もっと見る'}
            </span>
          </>
        )}
      </CardBody>
    </Card>
  );
};
