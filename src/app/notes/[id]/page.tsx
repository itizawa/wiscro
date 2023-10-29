import { Metadata } from 'next';
import { PostPageForm } from './_components/PostPageForm/PostPageForm';
import { fetchNote, fetchNotePages } from '~/app/actions/noteActions';
import { Page } from '~/domains/Page';
import { NoteCard } from '~/components/domains/Note/NoteCard';
import { PageCard } from '~/components/domains/Page/PageCard';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { note } = await fetchNote(params.id);
  return { title: note.title, description: note.description };
}

export default async function Page(props: { params: { id: string } }) {
  const { note } = await fetchNote(props.params.id);
  const { pages } = await fetchNotePages(props.params.id);

  return (
    <div className="grid grid-cols-2 justify-center gap-[24px] pt-[24px] px-3 pb-[100px] max-w-[848px] mx-auto">
      <div className="col-span-2 md:col-span-1">
        <NoteCard note={note} />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-[12px]">
        <PostPageForm note={note} />
        <div className="w-[100%] max-w-[400px] flex flex-col gap-[16px]">
          {pages.map((page) => {
            return <PageCard key={page._id} page={page} />;
          })}
        </div>
      </div>
    </div>
  );
}
