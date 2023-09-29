import { Card, CardBody, Image } from '@nextui-org/react';
import { FC } from 'react';
import { Answer } from '~/domains/Answer';

type Props = {
  answer: Answer;
};
export const AnswerCard: FC<Props> = ({ answer }) => {
  return (
    <Card>
      <CardBody>
        <a href={answer.url} target="blank" rel="noopener noreferrer">
          <Image src={answer.image || ''} />
        </a>
      </CardBody>
    </Card>
  );
};
