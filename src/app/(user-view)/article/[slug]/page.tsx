"use client";

import { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  Facebook,
  Linkedin,
  Twitter,
  Heart,
  MessageSquare,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { popularArticles } from "@/lib/dummy";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatPostDate } from "@/lib/date_modify";
import { createComment, likePost } from "@/actions/post.action";
import { LoadingPage } from "@/components/ui/loading";

interface commenetShape {
  content: string;
  createdAt: Date;
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}

function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const commentInputRef = useRef<HTMLTextAreaElement>(null); //todo:check this
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { slug } = use(params); //todo:check this

  const { data: article, isLoading } = useQuery<Record<string, any> | null>({
    queryKey: ["getPOST", slug],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/article/${slug}`);
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      } catch (error) {
        console.error("Error fetching user stats:", error);
        return null;
      }
    },
  });

  useEffect(() => {
    const makeImagesResponsive = () => {
      const articleImages = document.querySelectorAll(".prose img");
      articleImages.forEach((img) => {
        (img as HTMLElement).style.maxWidth = "100%";
        (img as HTMLElement).style.height = "auto";
      });
    };

    makeImagesResponsive();
  }, [article]);

  const { mutate: likesPost, isPending: likesLoading } = useMutation({
    mutationFn: async (postId: string) => {
      const res = await likePost(postId);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPOST"] });
    },
  });
  const { mutate: commentsPost, isPending: commentsLoading } = useMutation({
    mutationFn: async () => {
      if (!newComment.trim() && !article?.id) return;
      const res = await createComment(article?.id, newComment);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPOST"] });
      setNewComment("");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <LoadingPage />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-2">
                <Link href="/" className="text-sm text-primary hover:underline">
                  Home
                </Link>{" "}
                /{" "}
                <Link
                  href={`/category/${article?.category.toLowerCase()}`}
                  className="text-sm text-primary hover:underline"
                >
                  {article.category.charAt(0).toUpperCase() +
                    article.category.slice(1)}
                </Link>{" "}
                / <span className="text-sm text-muted-foreground">Article</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatPostDate(article.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="text-sm">
                  By <span className="font-medium">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{article._count.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{article._count.comments}</span>
                </div>
              </div>

              <div className="relative h-[400px] w-full mb-6">
                <Image
                  src={article.image || "/placeholder.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>

              <div className="prose max-w-full overflow-x-auto mb-8">
                <div
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  className="max-w-full"
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => likesPost(article.id)}
                    className={`gap-2 ${
                      article.isLiked ? "text-pink-600" : "text-primary"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        article.isLiked ? "fill-pink-600" : ""
                      }`}
                    />
                    {!likesLoading && article.isLiked ? "Liked" : "Like"} (
                    {article._count.likes}){likesLoading && "..."}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => commentInputRef.current?.focus()}
                    className="gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Comment ({article._count.comments})
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Share:</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <Button key={index} variant="outline" size="sm">
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              

              {/* Comments Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">
                  Comments ({article?._count.comments})
                </h2>

                {/* Add Comment Form */}
                <div className="mb-8">
                  <Textarea
                    ref={commentInputRef}
                    placeholder="Add your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2"
                    rows={3}
                  />
                  <Button
                    onClick={() => {
                      if (newComment.trim()) {
                        commentsPost();
                      } else {
                        alert("Please enter a comment.");
                      }
                    }}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {commentsLoading ? "Posting..." : "Post Comment"}
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {article?._count.comments > 0 ? (
                    article?.comments.map((comment: commenetShape) => (
                      <div key={comment.id} className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={comment.user.avatar}
                            alt={comment.user.id}
                          />
                          <AvatarFallback>{"Unknown User"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                {comment.user.name}
                              </h4>
                              <h4 className="font-light">
                                @{comment.user.username}
                              </h4>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatPostDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="mt-1 font-medium text-md px-5">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </div>

              <Separator className="my-8" />

              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((article: any) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden border-0 shadow-sm"
                  >
                    <div className="relative h-[200px] w-full">
                      <Image
                        src={article.image || "/placeholder.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">
                        <Link
                          href={`/article/${article.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.description || article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            <span>{article.likeCount}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            <span>{article.commentCount}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-muted/30 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-bold mb-4">Popular Articles</h3>
                  <div className="space-y-4">
                    {popularArticles.map((article: any) => (
                      <div key={article.id} className="flex gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0">
                          <Image
                            src={article.image || "/placeholder.jpg"}
                            alt={article.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2">
                            <Link
                              href={`/article/${article.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {article.title}
                            </Link>
                          </h4>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarDays className="h-3 w-3 mr-1" />
                              <span>{article.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              <span>{article.likeCount}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              <span>{article.commentCount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-bold mb-4">
                    Subscribe to Newsletter
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Stay updated with our latest news and articles delivered
                    directly to your inbox.
                  </p>
                  <form className="space-y-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 border border-input rounded-md text-sm"
                    />
                    <Button className="w-full">Subscribe</Button>
                  </form>
                </div>

                <div className="p-6 rounded-lg border">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    <Link
                      href="/category/politics"
                      className="flex justify-between items-center text-sm hover:text-primary"
                    >
                      <span>Politics</span>
                      <span className="bg-muted px-2 py-1 rounded-full text-xs">
                        24
                      </span>
                    </Link>
                    <Link
                      href="/category/technology"
                      className="flex justify-between items-center text-sm hover:text-primary"
                    >
                      <span>Technology</span>
                      <span className="bg-muted px-2 py-1 rounded-full text-xs">
                        18
                      </span>
                    </Link>
                    <Link
                      href="/category/business"
                      className="flex justify-between items-center text-sm hover:text-primary"
                    >
                      <span>Business</span>
                      <span className="bg-muted px-2 py-1 rounded-full text-xs">
                        15
                      </span>
                    </Link>
                    <Link
                      href="/category/health"
                      className="flex justify-between items-center text-sm hover:text-primary"
                    >
                      <span>Health</span>
                      <span className="bg-muted px-2 py-1 rounded-full text-xs">
                        12
                      </span>
                    </Link>
                    <Link
                      href="/category/entertainment"
                      className="flex justify-between items-center text-sm hover:text-primary"
                    >
                      <span>Entertainment</span>
                      <span className="bg-muted px-2 py-1 rounded-full text-xs">
                        10
                      </span>
                    </Link>
                    <Link
                      href="/category/sports"
                      className="flex justify-between items-center text-sm hover:text-primary"
                    >
                      <span>Sports</span>
                      <span className="bg-muted px-2 py-1 rounded-full text-xs">
                        8
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ArticlePage;
