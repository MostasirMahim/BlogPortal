"use client";

import { useState } from "react";
import {
  Bell,
  Heart,
  MessageSquare,
  UserPlus,
  MoreVertical,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/actions/user.action";
import { LoadingPage } from "@/components/ui/loading";
import { useRouter } from "next/navigation";

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return "just now";
  }

  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  // Less than a week
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  // Less than a month
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  }

  // Format as date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

type NotificationType = "LIKE" | "COMMENT" | "FOLLOW";

interface Notification {
  id: string;
  type: NotificationType;
  createdAt: Date;
  read: boolean;
  creator: {
    id: string;
    username: string;
    avatar: string | null;
  };
  postId?: string | null;
  post?: {
    slug: string;
  };
  commentId?: string;
  comment?: {
    content: string;
  };
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "LIKE":
      return <Heart className="h-4 w-4 text-rose-500" />;
    case "COMMENT":
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case "FOLLOW":
      return <UserPlus className="h-4 w-4 text-green-500" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [timeSort, setTimeSort] = useState<string>("newest");
  const router = useRouter();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: () => getNotifications(),
  });

  const unreadCount = notifications?.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications =
    notifications?.filter((notification) => {
      if (filter === "all") return true;
      if (filter === "unread") return !notification.read;
      return notification.type === filter;
    }) || [];

  const sortedNotifications =
    [...filteredNotifications]?.sort((a, b) => {
      if (timeSort === "newest") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
    }) || [];

  const groupNotificationsByDate = (notifications: any) => {
    const groups: { [key: string]: Notification[] } = {}; // {key} = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    for (const notification of notifications) {
      let groupKey = "";

      if (notification.createdAt.toDateString() === today.toDateString()) {
        groupKey = "Today";
      } else if (
        notification.createdAt.toDateString() === yesterday.toDateString()
      ) {
        groupKey = "Yesterday";
      } else {
        groupKey = "Earlier";
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }

      groups[groupKey].push(notification);
    }

    return groups;
  };

  const groupedNotifications = groupNotificationsByDate(sortedNotifications);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="container mx-auto  max-w-3xl rounded-t-md md:min-h-screen px-4 py-6 md:py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with your latest activities
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Tabs
            defaultValue="all"
            className="w-full sm:w-auto"
            onValueChange={setFilter}
          >
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full sm:w-auto flex-wrap">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="LIKE" className="text-xs sm:text-sm">
                Likes
              </TabsTrigger>
              <TabsTrigger value="COMMENT" className="text-xs sm:text-sm">
                Comments
              </TabsTrigger>
              <TabsTrigger value="FOLLOW" className="text-xs sm:text-sm hidden sm:block">
                Follows
              </TabsTrigger>

            </TabsList>
          </Tabs>

          <div className="hidden sm:flex items-center gap-2">
            <Select defaultValue="newest" onValueChange={setTimeSort}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {Object.keys(groupedNotifications).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground mt-1">
                You don't have any notifications at the moment
              </p>
            </div>
          ) : (
            Object.entries(groupedNotifications).map(
              ([date, notifications]) => (
                <div key={date} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground sticky top-0 bg-background py-1">
                    {date}
                  </h3>
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start p-3 rounded-lg gap-3 transition-colors ${
                          notification.read
                            ? "bg-card hover:bg-accent/50"
                            : "bg-accent/20 hover:bg-accent/30 border-l-4 border-primary"
                        }`}
                      >
                        {notification.creator ? (
                          <Avatar className="h-10 w-10 border">
                            <img
                              src={
                                notification.creator.avatar ||
                                "/placeholder.svg"
                              }
                              alt={notification.creator.username}
                              className="object-cover"
                            />
                          </Avatar>
                        ) : (
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                            <div>
                              <div className="text-md font-medium line-clamp-2">
                                {notification.creator && (
                                  <span className="font-semibold flex justify-start items-center gap-2">
                                    <p
                                      onClick={() =>
                                        router.push(
                                          `/profile/${notification.creator.username}`
                                        )
                                      }
                                      className="font-bold text-sky-400 hover:cursor-pointer"
                                    >
                                      @{notification.creator.username}
                                    </p>
                                    <p>
                                      {notification.type === "FOLLOW"
                                        ? "followed you."
                                        : notification.type === "COMMENT"
                                        ? "commented on your post."
                                        : "liked your post."}
                                    </p>
                                    {(notification.type === "COMMENT" ||
                                      "POST") && (
                                      <p
                                        className="cursor-pointer  text-blue-400 mt-1 flex items-center gap-1.5"
                                        onClick={() =>
                                          router.push(
                                            `/article/${notification.post?.slug}`
                                          )
                                        }
                                      >
                                        View
                                      </p>
                                    )}
                                  </span>
                                )}
                              </div>
                              {notification.comment && (
                                <p className="text-xs  my-2 line-clamp-2 pl-5">
                                  "{notification.comment?.content}"
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                                {getNotificationIcon(notification.type)}
                                <span>
                                  {formatTimeAgo(notification.createdAt)}
                                </span>
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  <span className="sr-only">Mark as read</span>
                                </Button>
                              )}

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                  >
                                    <MoreVertical className="h-3.5 w-3.5" />
                                    <span className="sr-only">
                                      More options
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-[180px]"
                                >
                                  {notification.read ? (
                                    <DropdownMenuItem>
                                      Mark as unread
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem>
                                      Mark as read
                                    </DropdownMenuItem>
                                  )}
                                  {notification.postId && (
                                    <DropdownMenuItem>
                                      View article
                                    </DropdownMenuItem>
                                  )}
                                  {notification.creator && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        router.push(
                                          `/profile/${notification.creator.username}`
                                        )
                                      }
                                    >
                                      View profile
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    Delete notification
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
