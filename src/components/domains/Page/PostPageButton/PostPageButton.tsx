import { Button } from '@nextui-org/button';
import { FC } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { PostPageModal } from '../PostPageModal';
import { Note } from '~/domains/Note';

export const PostPageButton: FC<{ note: Note }> = ({ note }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onClick={onOpen}>
        回答する
      </Button>
      <PostPageModal isOpen={isOpen} onOpenChange={onOpenChange} note={note} />
    </>
  );
};
