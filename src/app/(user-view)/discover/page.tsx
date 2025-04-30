"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, UserPlus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, getUsersFollowing } from "@/actions/user.action";
import { LoadingPage } from "@/components/ui/loading";
import { SignInButton, useAuth } from "@clerk/nextjs";

export type User = {
  id: string;
  name: string;
  username: string;
  bio: string | null;
  role: string | null;
  avatar: string | null;
  cover: string | null;
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
};

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [users, setUsers] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const { isSignedIn } = useAuth();

  const handleFollowToggle = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const { data: suggestedUsers, isLoading: isLoadingSuggestedUsers } = useQuery<
    User[] | null
  >({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      try {
        const res = await getAllUsers();
        if (!res) return null;
        return res;
      } catch (error) {
        console.error("Error fetching user stats:", error);
        return null;
      }
    },
  });

  const { data: followingUsers, isLoading } = useQuery({
    queryKey: ["getFollowingUsers"],
    queryFn: async () => {
      try {
        const res = await getUsersFollowing();
        if (!res) return null;
        return res;
      } catch (error) {
        console.error("Error fetching user stats:", error);
        return null;
      }
    },
  });

  const allUsers = [...(followingUsers || []), ...(suggestedUsers || [])];

  const { mutate: followUnfollow, isPending: isFollowPending } = useMutation({
    mutationFn: async (username: string) => {
      const res = await fetch(`/api/profile/${username}`, {
        method: "POST",
      });
      return res;
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["getAllUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["getFollowingUsers"] }),
      ]);
    },
    onError: (error) => {
      console.error("Error following/unfollowing user:", error);
    },
  });

  useEffect(() => {
    if (activeTab === "all") {
      setUsers(allUsers || []);
    } else if (activeTab === "following") {
      setUsers(followingUsers || []);
    } else if (activeTab === "suggested") {
      setUsers(suggestedUsers || []);
    }
  }, [activeTab, suggestedUsers, followingUsers]);

  if (isLoadingSuggestedUsers || isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingPage />
      </div>
    );
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Discover People</h1>
            <p className="text-muted-foreground">
              Find and connect with other users on the platform
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-3 w-full md:w-[300px]">
              <TabsTrigger value="all">All</TabsTrigger>
              {isSignedIn && (
                <TabsTrigger value="suggested">Suggested</TabsTrigger>
              )}
              {isSignedIn && (
                <TabsTrigger value="following">Following</TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>

        {/* User Grid - Desktop view / List - Mobile view */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-24 bg-muted animate-pulse" />
                  <div className="p-4 pt-0 -mt-12">
                    <div className="h-24 w-24 rounded-full bg-muted animate-pulse mx-auto mb-4" />
                    <div className="h-6 bg-muted animate-pulse mb-2" />
                    <div className="h-4 bg-muted animate-pulse mb-4 w-3/4 mx-auto" />
                    <div className="h-8 bg-muted animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <X className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No users found</h3>
          </div>
        ) : (
          <>
            {/* Desktop Grid View */}
            <div className=" grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 hidden sm:grid">
              {users?.map((user) => (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      style={
                        user?.cover
                          ? { backgroundImage: `url(${user.cover})` }
                          : {}
                      }
                      className={`h-24 bg-cover ${
                        user?.cover
                          ? ""
                          : "bg-gradient-to-r from-primary to-secondary"
                      }`}
                    />
                    <div className="p-4 pt-0 -mt-12">
                      <Avatar className="h-24 w-24 border-4 border-background mx-auto">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="text-center mt-4">
                        <Link href={`/profile/${user.username}`}>
                          <h3 className="font-bold text-lg hover:text-primary transition-colors">
                            {user.name}
                          </h3>
                        </Link>
                        <Link href={`/profile/${user.username}`}>
                          <p className="text-sm text-muted-foreground">
                            @{user.username}
                          </p>
                        </Link>

                        {user.role && (
                          <Badge variant="outline" className="mt-2">
                            {user.role}
                          </Badge>
                        )}
                      </div>

                      <div className="flex justify-center gap-4 mt-4 text-xs text-center">
                        {user._count && (
                          <>
                            <div>
                              <p className="font-bold">{user._count.posts}</p>
                              <p className="text-muted-foreground">Posts</p>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div>
                              <p className="font-bold">
                                {user._count.followers}
                              </p>
                              <p className="text-muted-foreground">Followers</p>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div>
                              <p className="font-bold">
                                {user._count.following}
                              </p>
                              <p className="text-muted-foreground">Following</p>
                            </div>
                          </>
                        )}
                      </div>

                      {isSignedIn ? (
                        <Button
                          className="w-full mt-4 gap-1"
                          variant={"default"}
                          onClick={() => followUnfollow(user.username)}
                          disabled={isFollowPending}
                        >
                          {user.isFollowed ? (
                            <>
                              <Check className="h-3 w-3 mr-1" /> Following
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-3 w-3 mr-1" /> Follow
                            </>
                          )}
                        </Button>
                      ) : (
                        <SignInButton>
                          <Button
                            variant={"default"}
                            className="w-full mt-4 gap-1"
                          >
                            Sign In
                          </Button>
                        </SignInButton>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mobile List View - Instagram Style */}
            <div className="sm:hidden space-y-2">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-2 border rounded-lg"
                >
                  <Avatar className="h-14 w-14 mr-3">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link href={`/profile/${user.username}`}>
                          <h3 className="font-medium text-sm hover:text-primary transition-colors">
                            {user.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground truncate">
                          @{user.username}
                        </p>

                        {user.bio && (
                          <p className="text-xs line-clamp-1 mt-0.5">
                            {user.bio}
                          </p>
                        )}
                      </div>

                      <Button
                        size="sm"
                        className="h-8 ml-2 flex-shrink-0"
                        variant={true ? "outline" : "default"}
                        onClick={() => handleFollowToggle(user.id)}
                      >
                        {true ? (
                          <>
                            <Check className="h-3 w-3 mr-1" /> Following
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-3 w-3 mr-1" /> Follow
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Mobile Loading Skeleton */}
        {isLoading && (
          <div className="sm:hidden space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center p-2 border rounded-lg">
                <Skeleton className="h-14 w-14 rounded-full mr-3" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-8 w-20 ml-2" />
              </div>
            ))}
          </div>
        )}
      </main>
      {!isLoading && users.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mx-2">
            Previous
          </Button>
          <Button variant="outline" className="mx-2">
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
