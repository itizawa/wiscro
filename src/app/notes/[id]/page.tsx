import { Metadata } from 'next';
import { PageList } from './_components/PageList';
import { PostPageForm } from './_components/PostPageForm/PostPageForm';
import { fetchNote } from './actions';
import { Page } from '~/domains/Page';
import { Note } from '~/domains/Note';
import { restClient } from '~/libs/restClient';
import { NoteCard } from '~/components/domains/Note/NoteCard';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { note } = await restClient.apiGet<{ note: Note }>(`/api/notes/${params.id}`);
  return { title: note.title, description: note.description };
}

export async function generateStaticParams() {
  // TODO: 新着のノートは予め静的サイト生成しておく
  return [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const { note } = await fetchNote(params.id);
  const { pages } = await restClient.apiGet<{ pages: Page[] }>(`/api/notes/${params.id}/pages`);

  return (
    <div className="grid grid-cols-2 justify-center gap-[24px] pt-[24px] px-3 pb-[100px] max-w-[848px] mx-auto">
      <div className="col-span-2 md:col-span-1">
        <NoteCard note={note} />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-[12px]">
        <PostPageForm note={note} />
        <PageList noteId={note._id} pages={pages} />
      </div>
    </div>
  );
}
