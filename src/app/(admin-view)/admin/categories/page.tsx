"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Star,
  StarOff,
  FolderPlus,
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "cat-1",
    name: "Politics",
    slug: "politics",
    description:
      "News and analysis on political developments and government policies.",
    postCount: 42,
    featured: true,
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
    featuredPost: null,
  },
  {
    id: "cat-5",
    name: "Entertainment",
    slug: "entertainment",
    description: "News from the world of entertainment, film, music, and arts.",
    postCount: 27,
    featured: false,
    featuredPost: null,
  },
  {
    id: "cat-6",
    name: "Sports",
    slug: "sports",
    description: "Sports news, results, and analysis from around the world.",
    postCount: 24,
    featured: false,
    featuredPost: null,
  },
  {
    id: "cat-7",
    name: "Science",
    slug: "science",
    description: "Scientific discoveries, research, and innovations.",
    postCount: 18,
    featured: false,
    featuredPost: null,
  },
  {
    id: "cat-8",
    name: "Environment",
    slug: "environment",
    description: "Environmental news, climate change, and sustainability.",
    postCount: 15,
    featured: false,
    featuredPost: null,
  },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<
    (typeof categories)[0] | null
  >(null); //todo: Check types
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    setIsAddCategoryOpen(false);
    setNewCategory({ name: "", slug: "", description: "" });
  };

  const handleEditCategory = () => {
    setEditCategory(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage content categories and featured posts
          </p>
        </div>

        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <FolderPlus className="h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category for organizing content.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newCategory.name}
                  onChange={(e) => {
                    setNewCategory({
                      ...newCategory,
                      name: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slug" className="text-right">
                  Slug
                </Label>
                <Input
                  id="slug"
                  className="col-span-3"
                  value={newCategory.slug}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, slug: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="col-span-3"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddCategoryOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Create Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No categories found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{category.postCount}</Badge>
                  </TableCell>
                  <TableCell>
                    {category.featured ? (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        Featured
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => setEditCategory(category)}
                        >
                          <Pencil className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          {category.featured ? (
                            <>
                              <StarOff className="h-4 w-4" /> Unfeature
                            </>
                          ) : (
                            <>
                              <Star className="h-4 w-4" /> Feature
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive gap-2">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Featured Categories Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories
            .filter((category) => category.featured)
            .map((category) => (
              <Card key={category.id}>
                <CardContent className="p-0">
                  <div className="relative h-[150px] w-full">
                    <Image
                      src={category.featuredPost?.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <Badge className="bg-primary text-primary-foreground mb-2">
                        {category.name}
                      </Badge>
                      <h3 className="font-medium text-sm line-clamp-2">
                        {category.featuredPost?.title ||
                          "No featured post selected"}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {category.postCount} posts
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

          {categories.filter((category) => category.featured).length < 3 && (
            <Card className="border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center h-[230px]">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center mb-4">
                  Add another featured category
                </p>
                <Button variant="outline">Select Category</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Edit Category Dialog */}
      <Dialog
        open={!!editCategory}
        onOpenChange={(open) => !open && setEditCategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update category details and settings.
            </DialogDescription>
          </DialogHeader>

          {editCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={editCategory.name}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-slug" className="text-right">
                  Slug
                </Label>
                <Input
                  id="edit-slug"
                  className="col-span-3"
                  value={editCategory.slug}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      slug: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  className="col-span-3"
                  value={editCategory.description}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCategory(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
