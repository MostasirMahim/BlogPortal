"use server";

import prisma from "@/lib/prisma";

export async function getAdminData() {
  try {
    const totalUsers = await prisma.user.count();
    const totalPosts = await prisma.post.count();
    return { totalUsers, totalPosts };
  } catch (error) {
    console.log("Error in getUserFromDB");
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        avatar: true,
        cover: true,
        createdAt: true,
        email: true,
      },
    });
    return users;
  } catch (error) {
    console.log("Error in getUserFromDB");
    throw error;
  }
}

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.log("Error in getUserFromDB");
    throw error;
  }
}
