import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";

// ✳️ Дозволені теги згідно бекенду
const allowedTags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const search = request.nextUrl.searchParams.get("search") ?? "";
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
    const rawTag = request.nextUrl.searchParams.get("tag") ?? "";

    const params: Record<string, string | number> = { page };

    if (search.trim()) {
      params.search = search;
    }

    if (allowedTags.includes(rawTag)) {
      params.tag = rawTag;
    }

    const { data } = await api.get("/notes", {
      params,
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ GET /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const { data } = await api.post("/notes", body, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
