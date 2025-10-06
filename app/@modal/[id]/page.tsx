"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

interface NotePreviewProps {
  params: { id: string };
}

export default function NotePreview({ params }: NotePreviewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tag = searchParams?.get("tag") || "All";

  const closeModal = () => {
    router.push(`/notes/filter/${tag}`);
  };

  return (
    <Modal onClose={closeModal}>
      <NoteDetailsClient noteId={params.id} />
    </Modal>
  );
}
