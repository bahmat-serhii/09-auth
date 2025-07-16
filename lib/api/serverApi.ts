// lib/api/serverApi.ts
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { Note, TagWithAll, Tag } from "@/types/note";
import { User } from "@/types/user";

interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: TagWithAll;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const ALLOWED_TAGS: TagWithAll[] = ["All", ...(Object.values(Tag) as Tag[])];

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const params: Record<string, string | number> = { page };
  if (search?.trim()) params.search = search;

  if (tag && ALLOWED_TAGS.includes(tag) && tag !== "All") {
    params.tag = tag;
  }

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies(); // Отримуємо куки з запиту
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(), // Передаємо куки у заголовках
    },
  });
  return data;
};
