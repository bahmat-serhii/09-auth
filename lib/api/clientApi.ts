import { CreateNoteData, Note, TagWithAll } from "@/types/note";
import { nextServer } from "./api";
import { QueryClient } from "@tanstack/react-query";
import { CheckSessionResponse } from "@/types/services";
import { User } from "@/types/user";

interface RegisterUserData {
  email: string;
  password: string;
}

interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: TagWithAll;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };

  if (search && search.trim() !== "") {
    params.search = search;
  }

  if (tag && tag !== "All") {
    params.tag = tag;
  }

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  console.log("📤 fetchNotes params:", params);

  return response.data;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

let queryClient: QueryClient | null = null;

export function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  return queryClient;
}

export async function registerUser(data: RegisterUserData) {
  const res = await nextServer.post("/auth/register", data);
  return res.data;
}

export async function loginUser(data: RegisterUserData) {
  const res = await nextServer.post("/auth/login", data);
  return res.data;
}

interface UpdateUserPayload {
  username: string;
}

export async function updateUserProfile(data: UpdateUserPayload) {
  const res = await nextServer.patch("/users/me", data);
  return res.data;
}

export const logoutUser = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionResponse>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};
