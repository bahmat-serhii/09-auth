import { nextServer } from "./api";

interface AuthPayload {
  email: string;
  password: string;
}

export async function registerUser(data: AuthPayload) {
  const res = await nextServer.post("/auth/register", data);
  return res.data;
}

export async function loginUser(data: AuthPayload) {
  const res = await nextServer.post("/auth/login", data);
  return res.data;
}
