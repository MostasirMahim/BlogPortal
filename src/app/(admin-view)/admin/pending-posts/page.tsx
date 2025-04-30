"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  ArrowUpDown,
  Check,
  X,
  Eye,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const pendingPosts = Array.from({ length: 10 }, (_, i) => ({
  id: `pending-${i + 1}`,
  title: [
    "The Future of Renewable Energy in Urban Environments",
    "Understanding the Economic Impact of Artificial Intelligence",
    "Climate Change: New Research Reveals Accelerating Trends",
    "Healthcare Innovation: Breakthroughs in Treatment Methods",
    "The Changing Landscape of Global Politics",
    "Digital Privacy in the Age of Big Data",
    "Sustainable Agriculture: Feeding the Future",
    "Space Exploration: New Frontiers and Discoveries",
    "The Psychology of Social Media Consumption",
    "Financial Markets: Analyzing Recent Volatility",
  ][i],
  excerpt:
    "This article explores the latest developments and future implications in this important field...",
  author: {
    name: `Author ${i + 1}`,
    avatar: `/placeholder.svg?height=40&width=40&text=A${i + 1}`,
  },
  category: ["Technology", "Business", "Environment", "Health", "Politics"][
    i % 5
  ],
  submittedDate: `June ${10 - i}, 2023`,
  image: `/placeholder.svg?height=200&width=300&text=Post+${i + 1}`,
}));

export default function PendingPostsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewPost, setViewPost] = useState<(typeof pendingPosts)[0] | null>(
    null
  );
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [currentAction, setCurrentAction] = useState<
    "approve" | "reject" | null
  >(null); //todo: check this types

  const categories = Array.from(
    new Set(pendingPosts.map((post) => post.category))
  ); //todo: practice this

  const filteredPosts = pendingPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handlePostAction = (
    post: (typeof pendingPosts)[0], //todo:check this type
    action: "approve" | "reject"
  ) => {
    setViewPost(post);
    setCurrentAction(action);
    setFeedbackDialogOpen(true);
  };

  const submitFeedback = () => {
    console.log(
      `Post ${currentAction === "approve" ? "approved" : "rejected"}:`,
      viewPost?.id
    );
    setFeedbackDialogOpen(false);
    setFeedback("");
    setCurrentAction(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pending Posts</h1>
          <p className="text-muted-foreground">
            Review and approve submitted content
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search pending posts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter Posts</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="p-2">
                <label htmlFor="category-filter" className="text-xs">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category-filter">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedCategory("all")}>
                Reset Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <div className="flex items-center gap-1">
                  Title
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No pending posts found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 flex-shrink-0">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={post.author.avatar}
                          alt={post.author.name}
                        />
                        <AvatarFallback>
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{post.author.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell>
                  <TableCell>{post.submittedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setViewPost(post)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handlePostAction(post, "approve")}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handlePostAction(post, "reject")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>{filteredPosts.length}</strong>{" "}
          of <strong>{filteredPosts.length}</strong> pending posts
        </p>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      {/* View Post Dialog */}
      {viewPost && (
        <Dialog
          open={!!viewPost}
          onOpenChange={(open) => !open && setViewPost(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{viewPost.title}</DialogTitle>
              <DialogDescription>
                Submitted by {viewPost.author.name} on {viewPost.submittedDate}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="preview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-4">
                <div className="relative h-[200px] w-full mb-4">
                  <Image
                    src={viewPost.image || "/placeholder.svg"}
                    alt={viewPost.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <h2 className="text-2xl font-bold mb-2">{viewPost.title}</h2>
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <span>{viewPost.category}</span>
                  <span>•</span>
                  <span>{viewPost.submittedDate}</span>
                </div>

                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <p className="mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>

                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
              </TabsContent>

              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Author</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar>
                        <AvatarImage
                          src={viewPost.author.avatar}
                          alt={viewPost.author.name}
                        />
                        <AvatarFallback>
                          {viewPost.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{viewPost.author.name}</p>
                        <p className="text-xs text-muted-foreground">
                          author@example.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Category</h3>
                    <p className="mt-1">{viewPost.category}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Submission Date</h3>
                    <p className="mt-1">{viewPost.submittedDate}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Word Count</h3>
                    <p className="mt-1">~1,200 words</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Tags</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary">Research</Badge>
                      <Badge variant="secondary">Analysis</Badge>
                      <Badge variant="secondary">{viewPost.category}</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => setViewPost(null)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => handlePostAction(viewPost, "reject")}
                  className="gap-1"
                >
                  <X className="h-4 w-4" /> Reject
                </Button>
                <Button
                  onClick={() => handlePostAction(viewPost, "approve")}
                  className="gap-1"
                >
                  <Check className="h-4 w-4" /> Approve
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentAction === "approve" ? "Approve Post" : "Reject Post"}
            </DialogTitle>
            <DialogDescription>
              {currentAction === "approve"
                ? "Add any feedback or notes before approving this post."
                : "Please provide a reason for rejecting this post."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder={
                currentAction === "approve"
                  ? "Great job! Your post has been approved..."
                  : "We're unable to publish this post because..."
              }
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
            />

            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                This message will be sent to the author.
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFeedbackDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={submitFeedback}
              variant={currentAction === "approve" ? "default" : "destructive"}
            >
              {currentAction === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
