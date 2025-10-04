import axios from "axios";
import type { Note } from "@/types/note";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;
export const BASE_URL = "https://notehub-public.goit.study/api/notes";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteDTO {
  title: string;
  content: string;
  tag: string;
}

export interface CreateNoteResponse {
  note: Note;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, any> = { page, perPage };
  if (search) params.search = search;
  if (tag && tag !== "All") params.tag = tag;

  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params,
  });

  return {
    notes: response.data.notes ?? [],
    totalPages: response.data.totalPages ?? 1,
  };
};

export const createNote = async (
  note: CreateNoteDTO
): Promise<CreateNoteResponse> => {
  const response = await axios.post<CreateNoteResponse>(BASE_URL, note, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  if (!id) {
    throw new Error("Note ID is required");
  }

  const response = await axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  const noteFromAPI = response.data;

  return {
    ...noteFromAPI,
    updatedAt: noteFromAPI.updatedAt ?? noteFromAPI.createdAt,
  };
};
