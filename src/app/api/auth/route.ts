import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return new Response("User not found", { status: 404 });

    const USER = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });
    return new Response(JSON.stringify({ USER }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user", { status: 500 });
  }
}
