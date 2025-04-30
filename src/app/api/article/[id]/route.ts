import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { slug: id },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    let isLiked = false;
    let autherId;

    const { userId } = await auth();
    if (!userId) {
      isLiked = false;
    } else {
      autherId = await prisma.user.findUnique({
        where: {
          clerkId: userId || undefined,
        },
        select: {
          id: true,
        },
      });
    }

    const isLikes = await prisma.like.findFirst({
      where: {
        postId: post?.id,
        userId: autherId?.id || undefined,
      },
    });
    if (isLikes) isLiked = true;

    return NextResponse.json(
      { ...post, isLiked: isLiked ? true : false },
      { status: 200 }
    );
  } catch (error) {
    return new Response("Failed to fetch article", { status: 500 });
  }
}
