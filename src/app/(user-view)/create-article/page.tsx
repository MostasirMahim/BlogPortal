"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Type,
  Save,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define article structure
interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

function CreateArticlePage() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("politics");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [author, setAuthor] = useState("");
  // Font options
  const fonts = [
    { name: "Default", value: "inherit" },
    { name: "Arial", value: "Arial, sans-serif" },
    { name: "Times New Roman", value: "Times New Roman, serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Verdana", value: "Verdana, sans-serif" },
    { name: "Courier New", value: "Courier New, monospace" },
  ];

  // Color options
  const colors = [
    { name: "Default", value: "inherit" },
    { name: "Black", value: "#000000" },
    { name: "Dark Gray", value: "#333333" },
    { name: "Red", value: "#e53e3e" },
    { name: "Blue", value: "#3182ce" },
    { name: "Green", value: "#38a169" },
    { name: "Purple", value: "#805ad5" },
  ];



  // Format functions
  const formatText = (command: string, value = "") => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Insert image at cursor position
          const imgHtml = `<img src="${event.target.result}" alt="Uploaded image" style="max-width: 100%; margin: 10px 0;" />`;
          document.execCommand("insertHTML", false, imgHtml);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle featured image upload
  const handleFeaturedImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFeaturedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Calculate read time (rough estimate)
  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    return `${readingTimeMinutes} min read`;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !editorRef.current?.innerHTML) {
      alert("Please add a title and content for your article");
      return;
    }

    // Create article object
    const slug = generateSlug(title);
    const content = editorRef.current.innerHTML;
    const readTime = calculateReadTime(editorRef.current.textContent || "");
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newArticle: Article = {
      id: Date.now().toString(),
      title,
      slug,
      category,
      content,
      excerpt:
        excerpt || content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
      date,
      readTime,
      image: featuredImage || "/placeholder.svg?height=800&width=1200",
      author: author || "Anonymous",
    };
    console.log(newArticle);
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">Create New Article</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <Label htmlFor="title" className="text-base">
                  Article Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title"
                  className="text-lg mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-base">
                  Excerpt (optional)
                </Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of your article"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-base mb-1 block">Content</Label>
                <Tabs
                  className="w-full"
                  defaultValue="edit"
                >
                  <div className="border rounded-lg">
                    <div className="bg-muted/40 p-2 flex items-center gap-1 flex-wrap border-b">
           
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => formatText("bold")}
                            className="h-8 w-8 p-0"
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => formatText("italic")}
                            className="h-8 w-8 p-0"
                          >
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => formatText("justifyLeft")}
                            className="h-8 w-8 p-0"
                          >
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => formatText("justifyCenter")}
                            className="h-8 w-8 p-0"
                          >
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => formatText("justifyRight")}
                            className="h-8 w-8 p-0"
                          >
                            <AlignRight className="h-4 w-4" />
                          </Button>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <Type className="h-4 w-4 mr-1" /> Font
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2">
                              <div className="space-y-2">
                                <div>
                                  <Label className="text-xs">Font Family</Label>
                                  <Select
                                    onValueChange={(value) =>
                                      formatText("fontName", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {fonts.map((font) => (
                                        <SelectItem
                                          key={font.value}
                                          value={font.value}
                                        >
                                          <span
                                            style={{ fontFamily: font.value }}
                                          >
                                            {font.name}
                                          </span>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs">Text Color</Label>
                                  <Select
                                    onValueChange={(value) =>
                                      formatText("foreColor", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {colors.map((color) => (
                                        <SelectItem
                                          key={color.value}
                                          value={color.value}
                                        >
                                          <div className="flex items-center">
                                            <div
                                              className="h-4 w-4 rounded-full mr-2 border"
                                              style={{
                                                backgroundColor: color.value,
                                              }}
                                            />
                                            <span>{color.name}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>

                          <div className="relative">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() =>
                                document.getElementById("image-upload")?.click()
                              }
                            >
                              <ImageIcon className="h-4 w-4 mr-1" /> Add Image
                            </Button>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </div>
                      
                    </div>

                    <TabsContent value="edit" className="mt-0">
                      <div
                        ref={editorRef}
                        contentEditable
                        className="min-h-[300px] p-4 focus:outline-none prose max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:block"
                        data-placeholder="Start writing your article here..."
                      />
                    </TabsContent>

                  </div>
                </Tabs>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="category" className="text-base">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="author" className="text-base">
                  Author Name
                </Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-base">Featured Image</Label>
                <div className="mt-1 border-2 border-dashed rounded-lg p-4 text-center">
                  {featuredImage ? (
                    <div className="relative h-[200px] w-full">
                      <Image
                        src={featuredImage || "/placeholder.svg"}
                        alt="Featured image preview"
                        fill
                        className="object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setFeaturedImage("")}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Click to upload a featured image
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          document.getElementById("featured-image")?.click()
                        }
                      >
                        Select Image
                      </Button>
                    </>
                  )}
                  <input
                    id="featured-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button type="submit" className="flex-1 gap-1">
                  <Save className="h-4 w-4" /> Publish Article
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateArticlePage;
