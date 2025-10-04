import NotesClient from "./Notes.client";

// Тип для тегов
type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;
  const tagFromUrl = resolvedParams.slug?.[0];

  const tag: Tag | "All" =
    tagFromUrl && tagFromUrl !== "All" ? (tagFromUrl as Tag) : "All";

  return <NotesClient initialTag={tag} />;
}
