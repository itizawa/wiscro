import { Metadata } from 'next';
import { PostPageForm } from './_components/PostPageForm/PostPageForm';
import { PageList } from './_components/PageList/PageList';
import { fetchNote, fetchNotePages } from '~/app/actions/noteActions';
import { Page } from '~/domains/Page';
import { NoteCard } from '~/components/domains/Note/NoteCard';
import { apiGet } from '~/app/restClient';
import { User } from '~/domains/User';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { note } = await fetchNote(params.id);
  return { title: note.title, description: note.description };
}

export default async function Page(props: { params: { id: string } }) {
  const { note } = await fetchNote(props.params.id);
  const { pages } = await fetchNotePages(props.params.id);
  const { currentUser } = await apiGet<{ currentUser: User }>('/api/me');

  return (
    <div className="grid grid-cols-2 justify-center gap-[24px] pt-[24px] px-3 pb-[100px] max-w-[848px] mx-auto">
      <div className="col-span-2 md:col-span-1">
        <NoteCard note={note} currentUser={currentUser} />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-[12px]">
        <PostPageForm note={note} currentUser={currentUser} />
        <PageList noteId={note._id} pages={pages} />
      </div>
    </div>
  );
}
