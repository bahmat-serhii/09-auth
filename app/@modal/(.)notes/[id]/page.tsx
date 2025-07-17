// app/@modal/(.)notes/[id]/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById, getQueryClient } from "@/lib/api/api";
import NotePreview from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewModal({ params }: Props) {
  const awaitedParams = await params;
  const noteId = String(awaitedParams.id);

  if (isNaN(Number(noteId))) return null;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreview noteId={noteId} />
    </HydrationBoundary>
  );
}
