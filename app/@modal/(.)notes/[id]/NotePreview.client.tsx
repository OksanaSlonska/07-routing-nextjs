"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import type { Note } from "@/types/note";

interface NotePreviewModalProps {
  noteId: string;
}

export default function NotePreviewModal({ noteId }: NotePreviewModalProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    staleTime: 1000 * 60,
    retry: 1,
  });

  if (isLoading) return null;
  if (error || !note) return <p>Error loading note</p>;

  return (
    <Modal onClose={() => router.back()}>
      <NoteDetailsClient noteId={note.id} />
    </Modal>
  );
}
