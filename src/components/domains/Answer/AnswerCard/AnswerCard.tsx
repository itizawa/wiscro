import { Card, CardBody, Image } from '@nextui-org/react';
import { FC } from 'react';
import { IMAGE } from '~/constants/images';
import { Answer } from '~/domains/Answer';

type Props = {
  answer: Answer;
};
export const AnswerCard: FC<Props> = ({ answer }) => {
  return (
    <Card className="p-0">
      <CardBody>
        <a href={answer.url} target="blank" rel="noopener noreferrer">
          <Image width="100%" height="auto" src={answer.image || IMAGE.NO_IMAGE} fallbackSrc={IMAGE.NO_IMAGE} />
        </a>
      </CardBody>
    </Card>
  );
};
