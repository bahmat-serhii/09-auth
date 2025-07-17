"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

type Props = {
  noteId: string;
};

export default function NotePreview({ noteId }: Props) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: Boolean(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !note) return <div>Error loading note.</div>;

  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.backBtn} onClick={closeModal}>
              Back
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Modal>
  );
}
