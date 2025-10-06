// interface Note {
//   id: string;
//   title: string;
//   tag: string;
//   content: string;
// }

// export default function NotePreview({ note }: { note: Note }) {
//   return (
//     <div>
//       <h2>{note.title}</h2>
//       <p>
//         <b>Tag:</b> {note.tag}
//       </p>
//       <p>{note.content}</p>
//     </div>
//   );
// }

// import type { Note } from "@/types/note";
// import css from "./NotePreview.module.css";

// interface NotePreviewProps {
//   note: Note;
// }

// export default function NotePreview({ note }: NotePreviewProps) {
//   return (
//     <div className={css.container}>
//       <h2>{note.title}</h2>
//       <p>{note.content}</p>
//       <span>{note.tag}</span>
//       <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
//       <small>Updated: {new Date(note.updatedAt).toLocaleString()}</small>
//     </div>
//   );
// }

// "use client";

// import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
// import { useRouter } from "next/navigation";

// interface NotePreviewClientProps {
//   noteId: string;
// }

// export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
//   const router = useRouter();

//   return (
//     <div onClick={(e) => e.stopPropagation()}>
//       <button onClick={() => router.back()}>×</button>
//       <NoteDetailsClient noteId={noteId} />
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview";

interface NotePreviewModalProps {
  noteId: string;
}

export default function NotePreviewModal({ noteId }: NotePreviewModalProps) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreviewClient noteId={noteId} />
    </Modal>
  );
}
