import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
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
        <p className="font-bold mb-[4px]">{answer.title}</p>
        <p className="text-slate-600 text-sm mb-[8px]">回答日：{format(new Date(answer.createdAt), 'yyyy/MM/dd HH:mm')}</p>
        <p className={`mb-[4px] ${isShowMore ? '' : 'line-clamp-3'}`}>{answer.body}</p>
        <p className="cursor-pointer text-sky-400" onClick={() => setIsShowMore((prev) => !prev)}>
          {isShowMore ? '折りたたむ' : 'もっと見る'}
        </p>
      </CardBody>
    </Card>
  );
};
