"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  FileText,
  Clock,
  FolderOpen,
  Eye,
  ThumbsUp,
  MessageSquare,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import dummy data
import { articles, userArticles } from "@/lib/dummy";

 function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week");

  // Combine all articles for the dashboard
  const allArticles = [...articles, ...userArticles];

  // Dashboard stats
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      change: "+12.5%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Total Posts",
      value: "843",
      change: "+8.2%",
      trend: "up",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Pending Posts",
      value: "5",
      change: "-2.1%",
      trend: "down",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: "Categories",
      value: "12",
      change: "+0%",
      trend: "neutral",
      icon: <FolderOpen className="h-5 w-5" />,
    },
  ];

  // Activity data
  const recentActivity = [
    {
      id: 1,
      type: "new_user",
      user: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40&text=EW",
      },
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "new_post",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40&text=MC",
      },
      post: "The Future of Renewable Energy in Urban Environments",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "comment",
      user: {
        name: "Sophia Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40&text=SR",
      },
      post: "Global Summit Addresses Climate Change with New Initiatives",
      time: "6 hours ago",
    },
    {
      id: 4,
      type: "pending_post",
      user: {
        name: "James Taylor",
        avatar: "/placeholder.svg?height=40&width=40&text=JT",
      },
      post: "Analysis: The Economic Impact of Recent Policy Changes",
      time: "8 hours ago",
    },
    {
      id: 5,
      type: "approved_post",
      user: {
        name: "Olivia Parker",
        avatar: "/placeholder.svg?height=40&width=40&text=OP",
      },
      post: "Healthcare Innovations Transforming Patient Care",
      time: "10 hours ago",
    },
  ];

  // Popular posts data
  const popularPosts = allArticles
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin! Here's what's happening with your news portal.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Download Report
          </Button>
          <Button size="sm">Add New Post</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-md">{stat.icon}</div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                      ? "text-red-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {stat.trend === "up" && <ArrowUpRight className="h-3 w-3" />}
                  {stat.trend === "down" && (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity and Pending Posts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>
                  View your site traffic and engagement metrics
                </CardDescription>
              </div>
              <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
                <TabsList className="grid grid-cols-3 h-8">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-[240px] flex items-center justify-center bg-muted/40 rounded-md">
                <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                <span className="ml-2 text-muted-foreground">
                  Analytics Chart Placeholder
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-muted/40 p-3 rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs">Page Views</span>
                  </div>
                  <p className="text-2xl font-bold">24.8K</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +12.4%
                  </p>
                </div>

                <div className="bg-muted/40 p-3 rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-xs">Likes</span>
                  </div>
                  <p className="text-2xl font-bold">8.6K</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +8.2%
                  </p>
                </div>

                <div className="bg-muted/40 p-3 rounded-md">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs">Comments</span>
                  </div>
                  <p className="text-2xl font-bold">3.2K</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +5.7%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions and updates on your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={activity.user.avatar}
                        alt={activity.user.name}
                      />
                      <AvatarFallback>
                        {activity.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {activity.user.name}
                        </span>{" "}
                        {activity.type === "new_user" && "joined the platform"}
                        {activity.type === "new_post" &&
                          "published a new article"}
                        {activity.type === "comment" &&
                          "commented on an article"}
                        {activity.type === "pending_post" &&
                          "submitted a post for review"}
                        {activity.type === "approved_post" &&
                          "had their post approved"}
                      </p>

                      {activity.post && (
                        <p className="text-sm text-muted-foreground">
                          "{activity.post}"
                        </p>
                      )}

                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>

                    {activity.type === "pending_post" && (
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Popular Posts and Pending Approval */}
        <div className="space-y-6">
          {/* Pending Approval */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
              <CardDescription>Posts waiting for your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col gap-2 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">
                        The Impact of Artificial Intelligence on Modern
                        Journalism
                      </h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                          <DropdownMenuItem>Reject</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Avatar className="h-5 w-5">
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&text=U${item}`}
                        />
                        <AvatarFallback>U{item}</AvatarFallback>
                      </Avatar>
                      <span>User Name</span>
                      <span>•</span>
                      <span>Technology</span>
                      <span>•</span>
                      <span>2 hours ago</span>
                    </div>

                    <div className="flex gap-2 mt-1">
                      <Button variant="outline" size="sm" className="h-7 gap-1">
                        <Check className="h-3 w-3" /> Approve
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 gap-1">
                        <X className="h-3 w-3" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                <Link
                  href="/admin/pending-posts"
                  className="flex w-full justify-center"
                >
                  View All Pending Posts
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Popular Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Posts</CardTitle>
              <CardDescription>Your most engaged content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <div key={post.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{(post.likeCount * 12).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{post.likeCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.commentCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                <Link
                  href="/admin/posts"
                  className="flex w-full justify-center"
                >
                  View All Posts
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;