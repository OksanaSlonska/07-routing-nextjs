"use client";
import { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import {
  fetchNotes,
  createNote,
  deleteNote,
  CreateNoteDTO,
  FetchNotesResponse,
} from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import css from "./Notesclient.module.css";

interface NotesClientProps {
  initialTag: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentTag, setCurrentTag] = useState(initialTag);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const qc = useQueryClient();

  useEffect(() => {
    setCurrentTag(initialTag);
    setPage(1);
  }, [initialTag]);

  const tagParam = currentTag === "All" ? undefined : currentTag;

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch, tagParam],
    queryFn: () => fetchNotes(page, 12, debouncedSearch, tagParam),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  const createMutation = useMutation({
    mutationFn: (note: CreateNoteDTO) => createNote(note),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"], exact: false });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"], exact: false });
    },
  });

  return (
    <div>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {isLoading && <Loader />}
      {error && (
        <ErrorMessage
          message={error.message}
          onRetry={() =>
            qc.invalidateQueries({
              queryKey: ["notes", page, debouncedSearch, tagParam],
            })
          }
        />
      )}

      {notes.length > 0 ? (
        <NoteList notes={notes} onDelete={(id) => deleteMutation.mutate(id)} />
      ) : (
        !isLoading && <p className={css.empty}>No notes found.</p>
      )}
    </div>
  );
}
