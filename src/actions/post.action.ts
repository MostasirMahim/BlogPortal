"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface Article {
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  readTime: string;
  image: string;
}

export async function createPosts(data: Article) {
  try {
    if (!data) {
      return { message: "No data provided", status: 400 };
    }
    const { userId } = await auth();
    const autherId = await prisma.user.findUnique({
      where: {
        clerkId: userId || undefined,
      },
      select: {
        id: true,
      },
    });
    if (!autherId) {
      return { message: "User not found", status: 404 };
    }

    const isSlugExist = await prisma.post.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (isSlugExist) {
      return {
        message: "Slug already exist",
        status: 400,
      };
    }

    const newpost = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        content: data.content,
        excerpt: data.excerpt,
        readTime: data.readTime,
        image: data.image,
        authorId: autherId.id,
      },
    });

    return newpost;
  } catch (error) {
    console.log("Error in createPosts");
    throw error;
  }
}

export async function likePost(postId: string) {
  try {
    const { userId } = await auth();
    if (!userId) return { message: "User not found", status: 404 };
    const autherId = await prisma.user.findUnique({
      where: {
        clerkId: userId || undefined,
      },
      select: {
        id: true,
      },
    });
    if (!autherId) {
      return { message: "User not found", status: 404 };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return { message: "Post not found", status: 404 };
    }

    const isLiked = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: autherId.id,
          postId: post.id,
        },
      },
    });
    if (isLiked) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: autherId.id,
            postId: post.id,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: autherId.id,
          postId: post.id,
        },
      });

      await prisma.notification.create({
        data: {
          type: "LIKE",
          postId: post.id,
          creatorId: autherId.id,
          userId: post.authorId as string,
        },
      });
    }

    return { message: "Success", status: 200 };
  } catch (error) {
    console.log("Error in likePost");
    throw error;
  }
}

export async function createComment(postId: string, comment: string) {
  try {
    const { userId } = await auth();

    const userID = await prisma.user.findUnique({
      where: {
        clerkId: userId || undefined,
      },
      select: {
        id: true,
      },
    });
    if (!userID) {
      return { message: "User not found", status: 404 };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return { message: "Post not found", status: 404 };
    }

    const newComment = await prisma.comment.create({
      data: {
        content: comment,
        postId: post.id,
        userId: userID.id,
      },
    });

    if (newComment) {
      await prisma.notification.create({
        data: {
          type: "COMMENT",
          commentId: newComment.id,
          postId: post.id,
          creatorId: userID.id,
          userId: post.authorId as string,
        },
      });
    }

    return newComment;
  } catch (error) {
    console.log("Error in createComment");
    throw error;
  }
}

export async function deletePost(postId: string) {
  try {
    const { userId } = await auth();
    const autherId = await prisma.user.findUnique({
      where: {
        clerkId: userId || undefined,
      },
      select: {
        id: true,
      },
    });
    if (!autherId) {
      return { message: "User not found", status: 404 };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return { message: "Post not found", status: 404 };
    }
    if (post.authorId !== autherId.id) {
      return {
        message: "You are not authorized to delete this post",
        status: 401,
      };
    }
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return { message: "Post deleted successfully", status: 200 };
  } catch (error) {
    console.log("Error in deletePost");
    throw error;
  }
}
