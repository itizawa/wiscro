import { PageList } from './_components/PageList';
import { NoteCard } from '~/components/domains/Note/NoteCard';
import { Page } from '~/domains/Page';
import { Note } from '~/domains/Note';
import { restClient } from '~/libs/restClient';

export async function generateStaticParams() {
  // TODO: 新着のノートは予め静的サイト生成しておく
  return [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const { note } = await restClient.apiGet<{ note: Note }>(`/api/notes/${params.id}`);
  const { pages } = await restClient.apiGet<{ pages: Page[] }>(`/api/notes/${params.id}/pages`);

  return (
    <div className="flex justify-center items-center flex-col gap-[24px] pt-[24px] px-3 pb-[100px]">
      <NoteCard note={note} />
      <PageList noteId={note._id} pages={pages} />
    </div>
  );
}
