import NotePreviewModal from "@/components/NotePreview/NotePreview";

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;

  return <NotePreviewModal noteId={id} />;
}
