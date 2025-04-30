"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Edit,
  Settings,
  UserPlus,
  Check,
  Mail,
  UserCheck,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, getUserOwnPosts } from "@/actions/user.action";
import { User } from "@/types";
import { formatJoinedDate, formatPostDate } from "@/lib/date_modify";
import { useAuth } from "@clerk/nextjs";
import { deletePost } from "@/actions/post.action";
import { LoadingPage } from "@/components/ui/loading";

function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("posts");
  const { id } = use(params);
  const { userId } = useAuth();

  const { data: USER, isLoading } = useQuery<User | null>({
    queryKey: ["userData", id],
    queryFn: () => getProfile(id),
    enabled: !!id,
  });
  const { data: userOtherData, isLoading: isLoadingOther } = useQuery({
    queryKey: ["userOtherData", id],
    queryFn: () => getUserOwnPosts(id),
    enabled: !!id,
  });

  const isItsMe = USER?.clerkId === userId;

  const { mutate: deletepost, isPending: isDeletePending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await deletePost(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userOtherData", id] });
    },
    onError: (error) => {
      console.error("Error following/unfollowing user:", error);
    },
  });

  const { mutate: followUnfollow, isPending: isFollowPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/profile/${USER?.username || id}`, {
        method: "POST",
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData", id] });
    },
    onError: (error) => {
      console.error("Error following/unfollowing user:", error);
    },
  });

  if (isLoading || isLoadingOther)
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingPage />
      </div>
    );
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Cover Image */}
        <div className="relative h-[100px] md:h-[150px] w-full">
          <Image
            src={USER?.cover || "/placeholder.jpg"}
            alt="Cover"
            fill
            className="object-cover rounded-t-xl"
            priority
          />
        </div>

        {/* Profile Header */}
        <div className="container mx-auto px-4">
          <div className="relative my-1 flex flex-col items-center md:items-start w-full">
            <div className="flex flex-col md:flex-row  gap-4 items-center justify-center w-full ">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage
                  src={USER?.avatar || "/placeholder.jpg"}
                  alt={USER?.name}
                />
                <AvatarFallback>{"Unknown"}</AvatarFallback>
              </Avatar>

              <div className="flex-1 ">
                <div className="flex flex-row md:flex-row items-center justify-between gap-4 ">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                      {USER?.name}
                    </h1>
                    <p className="text-muted-foreground">@{USER?.username}</p>
                  </div>

                  {isItsMe ? (
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={() =>
                          router.push(`/profile/update/${USER?.username}`)
                        }
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        <p className="hidden md:block">Edit Profile</p>
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={() => followUnfollow()}
                        variant={USER?.isfollowed ? "outline" : "default"}
                        size="sm"
                        className="gap-1 text-md"
                      >
                        {USER?.isfollowed ? (
                          <>
                            <UserCheck className="h-10 w-10 mr-1 text-green-500" />
                            <p className="hidden md:block">
                              {isFollowPending ? "Following..." : "Following"}
                            </p>
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-5 w-5 mr-1" />
                            <p className="hidden md:block">
                              {isFollowPending ? "Following..." : "Follow"}
                            </p>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className=" flex flex-col md:flex-row items-center w-full justify-between gap-6">
              <div>
                <p className="text-muted-foreground px-4">
                  {USER?.bio || "No bio..."}
                </p>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{USER?.location || "Earth"}</span>
                  </div>

                  {USER?.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <a
                        href={USER?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {USER?.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      Joined {formatJoinedDate(USER?.createdAt || new Date())}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 justify-start md:justify-end">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {USER?._count.posts || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {USER?._count.followers || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {USER?._count.following || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {USER?._count.likes || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-8 "
          >
            <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {/* Posts Tab */}
              <TabsContent value="posts" className="mt-0">
                <div className="grid grid-cols-1 gap-6">
                  {userOtherData?.POSTS.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative h-[200px] md:h-full w-full">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 md:col-span-2">
                          <div className="text-sm font-medium text-primary mb-2 flex justify-between">
                            <p>{article.category}</p>
                            <div className="flex ">
                              <p>
                                {isItsMe ? (
                                  <Trash2
                                    className="h-4 w-4 cursor-pointer hover:scale-105 hover:text-red-600"
                                    onClick={() => deletepost(article.id)}
                                  />
                                ) : (
                                  ""
                                )}
                              </p>{" "}
                              <p>{isDeletePending ? "..." : ""}</p>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            <Link
                              href={`/article/${article.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                <span>{formatPostDate(article.createdAt)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {userOtherData?.POSTS.length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <X className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No posts</h3>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments" className="mt-0">
                <div className="space-y-6">
                  {userOtherData?.comments.map((comment) => (
                    <Card key={comment.id} className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={USER?.avatar || "/user.png"}
                            alt={comment.id}
                          />
                          <AvatarFallback>
                            {comment.id.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{USER?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatPostDate(comment.createdAt)}
                          </p>
                        </div>
                      </div>
                      <p className="mb-3">{comment.content}</p>
                      <div className="text-sm text-muted-foreground">
                        <Link
                          href={`/article/${comment.post.slug}`}
                          className="text-primary hover:underline"
                        >
                          View Article
                        </Link>
                      </div>
                    </Card>
                  ))}
                  {userOtherData?.comments.length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <X className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No comments</h3>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Likes Tab */}
              <TabsContent value="likes" className="mt-0">
                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
                  {userOtherData?.Likes.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <div className="relative h-[200px] w-full">
                        <Image
                          src={article.post.image || "/placeholder.svg"}
                          alt={article.post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-primary mb-2">
                          {article.post.category}
                        </div>
                        <h3 className="font-bold mb-2">
                          <Link
                            href={`/article/${article.post.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {article.post.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {article.post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-3 w-3" />
                            <span>
                              {formatPostDate(article.post.createdAt)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {userOtherData?.Likes.length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <X className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Likes</h3>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Followers Tab */}
              <TabsContent value="followers" className="mt-0">
                <div className="flex flex-col md:flex-row flex-wrap justify-start gap-4">
                  {userOtherData?.followerUsers?.map((follower) => (
                    <Card key={follower.id} className="p-4">
                      <div
                        className="flex gap-4 cursor-pointer"
                        onClick={() =>
                          router.push(`/profile/${follower.username}`)
                        }
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={follower.avatar || "/user.png"}
                            alt={follower.name}
                          />
                          <AvatarFallback>
                            {follower.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{follower.name}</p>
                              <p className="text-sm text-muted-foreground">
                                @{follower.username}
                              </p>
                            </div>
                            <Button
                              variant={true ? "outline" : "default"}
                              size="sm"
                              className="gap-1"
                            >
                              {true ? (
                                <>
                                  <Check className="h-3 w-3" />
                                  Following
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-3 w-3" />
                                  Follow
                                </>
                              )}
                            </Button>
                          </div>
                          <p className="text-sm mt-2 line-clamp-2">
                            {follower.bio}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {userOtherData?.followerUsers?.length === 0 && (
                    <div className="text-center py-12 w-full">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <X className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        User has no followers
                      </h3>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Following Tab */}
              <TabsContent value="following" className="mt-0">
                <div className="flex flex-col md:flex-row flex-wrap justify-start gap-4">
                  {userOtherData?.followingUsers?.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div
                        onClick={() => router.push(`/profile/${user.username}`)}
                        className="flex gap-4 cursor-pointer"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={user.avatar || "/user.png"}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                @{user.username}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Check className="h-3 w-3" />
                              Following
                            </Button>
                          </div>
                          <p className="text-sm mt-2 line-clamp-2">
                            {user.bio}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {userOtherData?.followingUsers?.length === 0 && (
                    <div className="text-center py-12 w-full ">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <X className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        User is not following anyone
                      </h3>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
