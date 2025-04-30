"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

interface User {
  id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  cover: string | null;
  website: string | null;
  location: string | null;
  isFollowed?: boolean;
  _count: {
    followers: number;
    following: number;
    posts: number;
    likes: number;
  };
  social: Prisma.JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function regUserToDB() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return null;
    const exgistingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (exgistingUser) return exgistingUser;

    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        avatar: user.imageUrl,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
      },
    });

    return newUser;
  } catch (error) {
    console.log("Error in regUserToDB");
    throw error;
  }
}

export async function getUserFromDB() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    const USER = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });
    return USER;
  } catch (error) {
    console.log("Error in getUserFromDB");
    throw error;
  }
}
export async function getProfile(username: string): Promise<User | null> {
  try {
    const { userId } = await auth();
    const USER = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
            likes: true,
          },
        },
      },
    });

    const me = await prisma.user.findUnique({
      where: {
        clerkId: userId || undefined,
      },
    });
    let isfollowed = false;

    if (me && USER?.id !== me?.id) {
      const isfollow = await prisma.follows.findFirst({
        where: {
          followerId: me?.id || undefined,
          followingId: USER?.id,
        },
      });
      isfollowed = !!isfollow;
    }

    const user = {
      ...USER,
      isfollowed,
    };

    return user as User;
  } catch (error) {
    console.log("Error in getUserByID");
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { userId } = await auth();
    if (!userId) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          name: true,
          bio: true,
          role: true,
          avatar: true,
          cover: true,
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true,
            },
          },
        },
      });
      return users;
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    const USERS = await prisma.user.findMany({
      where: {
        NOT: [
          { id: user?.id },
          {
            followers: {
              some: {
                followerId: user?.id,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        avatar: true,
        cover: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    });
    return USERS;
  } catch (error) {
    console.log("Error in getAllUsers");
    throw error;
  }
}
export async function getUsersFollowing() {
  try {
    const { userId } = await auth();
    if (!userId) return null;
    const USERS = await prisma.user.findMany({
      where: {
        clerkId: userId,
      },
      select: {
        following: {
          select: {
            following: {
              select: {
                id: true,
                username: true,
                name: true,
                bio: true,
                role: true,
                avatar: true,
                cover: true,
                _count: {
                  select: {
                    posts: true,
                    followers: true,
                    following: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const FOLLOWING = USERS[0]?.following.map((user) => ({
      ...user.following,
      isFollowed: true,
    }));
    return FOLLOWING;
  } catch (error) {
    console.log("Error in getAllUsers");
    throw error;
  }
}

export async function getUserOwnPosts(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: id,
      },
      select: {
        id: true,
      },
    });
    const POSTS = await prisma.post.findMany({
      where: {
        authorId: user?.id,
      },
    });

    const Likes = await prisma.like.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        post: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const comments = await prisma.comment.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        post: {
          select: {
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const usersFollow = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        following: {
          select: {
            following: {
              select: {
                id: true,
                username: true,
                name: true,
                bio: true,
                role: true,
                avatar: true,
                cover: true,
                _count: {
                  select: {
                    posts: true,
                    followers: true,
                    following: true,
                  },
                },
              },
            },
          },
        },
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                username: true,
                name: true,
                bio: true,
                role: true,
                avatar: true,
                cover: true,
                _count: {
                  select: {
                    posts: true,
                    followers: true,
                    following: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const followingUsers = usersFollow?.following.map((user) => user.following);
    const followerUsers = usersFollow?.followers.map((user) => user.follower);

    const Data = {
      POSTS,
      Likes,
      comments,
      followingUsers,
      followerUsers,
    };
    return Data;
  } catch (error) {
    console.log("Error in getUserOwnPosts");
    throw error;
  }
}

export async function getNotifications() {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
      },
    });
    const notifications = await prisma.notification.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        post: {
          select: {
            slug: true,
          },
        },
        creator: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        comment: {
          select: {
            post: {
              select: {
                slug: true,
              },
            },
            content: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return notifications;
  } catch (error) {
    console.log("Error in getNotifications");
    throw error;
  }
}
