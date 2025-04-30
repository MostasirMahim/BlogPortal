"use client";


import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  Heart,
  MessageSquare,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types";
import { formatPostDate } from "@/lib/date_modify";

const getCategoryData = (slug: string) => {
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const featuredArticle = {
    title: `Major Developments in ${categoryName} Sector Signal Changing Landscape`,
    description:
      "Recent events have led to significant shifts in how experts view the future of this industry, with new players emerging and established entities adapting to changing conditions.",
    date: "June 12, 2023",
    readTime: "5 min read",
    image: "/placeholder.jpg?height=600&width=1000",
    likeCount: 128,
    commentCount: 32,
  };

  const { data: articles, isLoading: isLoadingPosts } = useQuery<Post[] | null>(
    {
      queryKey: ["getLatest"],
      queryFn: async () => {
        try {
          const res = await fetch(`/api/article`);
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        } catch (error) {
          console.error("Error fetching user stats:", error);
          return [];
        }
      },
    }
  );

  const dummyAticle = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Key Insights from the Latest ${categoryName} Conference`,
    createdAt: new Date(),
    readTime: "5 min read",
    excerpt:
      "Recent events have led to significant shifts in how experts view the future of this industry, with new players emerging and established entities adapting to changing conditions.",
    slug: `key-insights-from-the-latest-${categoryName}-conference`,
    image: `/placeholder.jpg?height=100&width=100&text=${i + 1}`,
    _count: {
      likes: 10,
      comments: 20,
    },
  }));

  const popularArticles = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Key Insights from the Latest ${categoryName} Conference`,
    date: `June ${8 - i}, 2023`,
    image: `/placeholder.jpg?height=100&width=100&text=${i + 1}`,
    likeCount: 128,
    commentCount: 32,
  }));

  const relatedCategories = [
    { name: "Politics", count: 24 },
    { name: "Technology", count: 18 },
    { name: "Business", count: 15 },
    { name: "Health", count: 12 },
    { name: "Entertainment", count: 10 },
  ];

  return {
    categoryName,
    description: `Browse the latest news and articles from our ${categoryName} section.`,
    featuredArticle,
    articles: isLoadingPosts ? dummyAticle : articles,
    popularArticles,
    relatedCategories,
  };
};

function CategoryOverview({ params }: { params: Promise<{ catg: string }> }) {
  const { catg } = use(params);
  const {
    categoryName,
    description,
    featuredArticle,
    articles,
    popularArticles,
    relatedCategories,
  } = getCategoryData(catg);

  return (
    <div className="w-full min-h-screen  container md:mx-10">
        <div className="p-4">
          <div className="mb-8">
            <div className="mb-2">
              <Link href="/" className="text-sm text-primary hover:underline">
                Home
              </Link>{" "}
              /{" "}
              <span className="text-sm text-muted-foreground">
                {categoryName}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-8">
                {/* Featured Article */}
                <Card className="overflow-hidden border-0 shadow-sm">
                  <div className="relative h-[300px] w-full">
                    <Image
                      src={featuredArticle.image || "/placeholder.jpg"}
                      alt="Featured article"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm font-medium text-primary mb-2">
                      {categoryName}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {featuredArticle.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          <span>{featuredArticle.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{featuredArticle.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{featuredArticle.likeCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{featuredArticle.commentCount}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>

                <Separator />

                {/* Article List */}
                {articles?.map((article) => (
                  <div
                    key={article.id}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    <div className="relative h-[200px] md:h-full w-full">
                      <Image
                        src={article.image || "/placeholder.jpg"}
                        alt={`Article ${article.id}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm font-medium text-primary mb-2">
                        {categoryName}
                      </div>
                      <h2 className="text-xl font-bold mb-2">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{article._count.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{article._count.comments}</span>
                          </div>
                        </div>
                      </div>

                      <Link href={`/article/${article.slug}`}>
                        <Button variant="outline" size="sm">
                          Read Article
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center mt-4">
                  <Button variant="outline" className="gap-1">
                    Load More <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-muted/30 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-bold mb-4">
                    Popular in {categoryName}
                  </h3>
                  <div className="space-y-4">
                    {popularArticles.map((article) => (
                      <div key={article.id} className="flex gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0">
                          <Image
                            src={article.image || "/placeholder.jpg"}
                            alt={`Popular article ${article.id}`}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2">
                            {article.title}
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
                    Subscribe to {categoryName} Updates
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest {categoryName.toLowerCase()} news delivered
                    directly to your inbox.
                  </p>

                  <Button className="w-full">Subscribe</Button>
                </div>

                <div className="p-6 rounded-lg border">
                  <h3 className="text-lg font-bold mb-4">Related Categories</h3>
                  <div className="space-y-2">
                    {relatedCategories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/category/${category.name.toLowerCase()}`}
                        className="flex justify-between items-center text-sm hover:text-primary"
                      >
                        <span>{category.name}</span>
                        <span className="bg-muted px-2 py-1 rounded-full text-xs">
                          {category.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default CategoryOverview;
