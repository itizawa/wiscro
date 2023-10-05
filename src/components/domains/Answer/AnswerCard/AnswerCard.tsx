import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { format } from 'date-fns';
import { FC } from 'react';
import { IMAGE } from '~/constants/images';
import { Answer } from '~/domains/Answer';

type Props = {
  answer: Answer;
};
export const AnswerCard: FC<Props> = ({ answer }) => {
  return (
    <Card className="p-0">
      <CardHeader className="p-0">
        <a href={answer.url} target="blank" rel="noopener noreferrer">
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
        <p className="text-slate-600 text-sm">回答日：{format(new Date(answer.createdAt), 'yyyy/MM/dd HH:mm')}</p>
      </CardBody>
    </Card>
  );
};
