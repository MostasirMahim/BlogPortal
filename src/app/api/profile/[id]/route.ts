"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params}: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { username: id },
      include: {
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const userId = user.id;
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      include: {
        comments: true,
        likes: true,
      },
    });

    const RES = {
      stat: user._count,
      posts: posts,
    };

    return new Response(JSON.stringify(RES), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; //TODO: check if this is correct
    const body = await request.json();
    const { name, bio, website, location, social, avatar, cover } = body;
    const user = await prisma.user.update({
      where: { username: id },
      data: {
        //todo: practice this
        ...(name && { name }),
        ...(bio && { bio }),
        ...(website && { website }),
        ...(location && { location }),
        ...(social && { social }),
        ...(avatar && { avatar }),
        ...(cover && { cover }),
      },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const updatedUser = await prisma.user.findUnique({
      where: { username: id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        avatar: true,
        cover: true,
        website: true,
        location: true,
        social: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in PATCH request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    const followerId = await prisma.user.findUnique({
      where: {
        clerkId: userId || undefined,
      },
      select: {
        id: true,
      },
    });
    if (!followerId) {
      return new Response("User not found", { status: 404 });
    }
    if (followerId.id === id) {
      return new Response("You cannot follow yourself", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username: id },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: followerId.id,
          followingId: user.id,
        },
      },
    });

    if (existingFollow) {
      const follow = await prisma.follows.delete({
        where: {
          followerId_followingId: {
            //TODO: check How  WOrking?
            followerId: followerId.id,
            followingId: user.id,
          },
        },
      });
      return NextResponse.json(follow, { status: 200 });
    } else {
      const follow = await prisma.follows.create({
        data: {
          followerId: followerId.id,
          followingId: user.id,
        },
      });

      await prisma.notification.create({
        data: {
          type: "FOLLOW",
          creatorId: followerId.id,
          userId: user.id,
        },
      });
      return NextResponse.json(follow, { status: 200 });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
