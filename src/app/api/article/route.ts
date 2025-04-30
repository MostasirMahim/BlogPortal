import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch article", { status: 500 });
  }
}
