"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  FolderPlus,
  List,
  LayoutGrid,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export const categories = [
  {
    id: "cat-1",
    name: "Politics",
    slug: "politics",
    description:
      "News and analysis on political developments and government policies.",
    postCount: 42,
    featured: true,
    color: "#FF5A5F",
    featuredPost: {
      title: "Global Summit Addresses Climate Change with New Initiatives",
      image: "/placeholder.svg?height=200&width=300&text=Politics",
    },
  },
  {
    id: "cat-2",
    name: "Technology",
    slug: "technology",
    description: "Latest news on technological innovations and digital trends.",
    postCount: 38,
    featured: true,
    color: "#00A699",
    featuredPost: {
      title: "New AI Breakthrough Promises to Transform Healthcare",
      image: "/placeholder.svg?height=200&width=300&text=Technology",
    },
  },
  {
    id: "cat-3",
    name: "Business",
    slug: "business",
    description: "Business news, market analysis, and economic developments.",
    postCount: 35,
    featured: true,
    color: "#FC642D",
    featuredPost: {
      title: "Stock Markets Reach Record Highs Amid Economic Recovery",
      image: "/placeholder.svg?height=200&width=300&text=Business",
    },
  },
  {
    id: "cat-4",
    name: "Health",
    slug: "health",
    description: "Health news, medical research, and wellness information.",
    postCount: 29,
    featured: false,
    color: "#7A5195",
    featuredPost: null,
  },
  {
    id: "cat-5",
    name: "Entertainment",
    slug: "entertainment",
    description: "News from the world of entertainment, film, music, and arts.",
    postCount: 27,
    featured: false,
    color: "#003F5C",
    featuredPost: null,
  },
  {
    id: "cat-6",
    name: "Sports",
    slug: "sports",
    description: "Sports news, results, and analysis from around the world.",
    postCount: 24,
    featured: false,
    color: "#FFA600",
    featuredPost: null,
  },
  {
    id: "cat-7",
    name: "Science",
    slug: "science",
    description: "Scientific discoveries, research, and innovations.",
    postCount: 18,
    featured: false,
    color: "#665191",
    featuredPost: null,
  },
  {
    id: "cat-8",
    name: "Environment",
    slug: "environment",
    description: "Environmental news, climate change, and sustainability.",
    postCount: 15,
    featured: false,
    color: "#2F4B7C",
    featuredPost: null,
  },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "posts">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (showFeaturedOnly) {
      return matchesSearch && category.featured;
    }

    return matchesSearch;
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === "asc"
        ? a.postCount - b.postCount
        : b.postCount - a.postCount;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-6 my-5 mx-12 animate-in fade-in duration-500">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Button variant="outline" size={"lg"}>
            <p>All Categories</p>
          </Button>

          <div className="flex flex-wrap items-center justify-between w-full gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-8 w-full sm:w-[200px] h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={toggleSortOrder}
              >
                {sortOrder === "asc" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`h-9 w-9 ${viewMode === "grid" ? "bg-muted" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`h-9 w-9 ${viewMode === "list" ? "bg-muted" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedCategories.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <FolderPlus className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No categories found</h3>
                </div>
              ) : (
                sortedCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => router.push(`/site/${category.slug}`)}
                  >
                    <div
                      className="h-2"
                      style={{ backgroundColor: category.color }}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">
                              {category.name}
                            </h3>
                            {category.featured && (
                              <Badge
                                variant="secondary"
                                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {category.slug}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-2">
                        {category.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="rounded-full">
                          {category.postCount} posts
                        </Badge>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              {sortedCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FolderPlus className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No categories found</h3>
                </div>
              ) : (
                <div className="divide-y">
                  {sortedCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex flex-col hover:cursor-pointer  sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                      onClick={() => router.push(`/site/${category.slug}`)}
                    >
                      <div className="flex items-start gap-3 mb-3 sm:mb-0">
                        <div
                          className="w-1.5 h-12 rounded-full flex-shrink-0 mt-1"
                          style={{ backgroundColor: category.color }}
                        />
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <h3 className="font-semibold">{category.name}</h3>
                            {category.featured && (
                              <Badge
                                variant="secondary"
                                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              >
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline" className="rounded-full">
                              {category.postCount} posts
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories
              .filter((category) => category.featured)
              .map((category) => (
                <Card
                  key={category.id}
                  className="overflow-hidden group hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{category.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {category.postCount} posts
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          Change Post
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
