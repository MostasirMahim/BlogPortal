"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  Clock,
  MapPin,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Heart,
  MessageSquare,
  Edit,
  Settings,
  UserPlus,
  Check,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Import dummy data
import { currentUser, userArticles, userComments, userLikedArticles, followers, following } from "@/lib/dummy"

 function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("posts")
  const [isFollowing, setIsFollowing] = useState(false)

  // Toggle follow status
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Cover Image */}
        <div className="relative h-[200px] md:h-[300px] w-full">
          <Image
            src={currentUser.coverImage || "/placeholder.svg"}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Profile Header */}
        <div className="container mx-auto px-4">
          <div className="relative my-2 md:my-5">
            <div className="flex flex-row gap-4 items-center">
              <Avatar className="w-24 h-24 md:h-32 md:w-32 border-4 border-background">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{currentUser.name}</h1>
                    <p className="text-muted-foreground">@{currentUser.username}</p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Mail className="h-4 w-4" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground mb-4">{currentUser.bio}</p>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                  {currentUser.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{currentUser.location}</span>
                    </div>
                  )}

                  {currentUser.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <a
                        href={currentUser.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {currentUser.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>Joined {currentUser.joinDate}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  {currentUser.socialLinks.twitter && (
                    <a
                      href={`https://twitter.com/${currentUser.socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </a>
                  )}

                  {currentUser.socialLinks.facebook && (
                    <a
                      href={`https://facebook.com/${currentUser.socialLinks.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Facebook className="h-4 w-4" />
                      </Button>
                    </a>
                  )}

                  {currentUser.socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${currentUser.socialLinks.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Instagram className="h-4 w-4" />
                      </Button>
                    </a>
                  )}

                  {currentUser.socialLinks.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${currentUser.socialLinks.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 justify-start md:justify-end">
                <div className="text-center">
                  <p className="text-2xl font-bold">{currentUser.stats.posts}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold">{currentUser.stats.followers}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold">{currentUser.stats.following}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold">{currentUser.stats.likes}</p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="grid grid-cols-5 w-full max-w-3xl">
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
                  {userArticles.map((article) => (
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
                          <div className="text-sm font-medium text-primary mb-2">{article.category}</div>
                          <h3 className="text-xl font-bold mb-2">
                            <Link href={`/article/${article.slug}`} className="hover:text-primary transition-colors">
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                <span>{article.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{article.likeCount}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{article.commentCount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments" className="mt-0">
                <div className="space-y-6">
                  {userComments.map((comment) => (
                    <Card key={comment.id} className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.date}</p>
                        </div>
                      </div>
                      <p className="mb-3">{comment.content}</p>
                      <div className="text-sm text-muted-foreground">
                        <Link href={`/article/${comment.articleId}`} className="text-primary hover:underline">
                          View Article
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Likes Tab */}
              <TabsContent value="likes" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userLikedArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <div className="relative h-[200px] w-full">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-primary mb-2">{article.category}</div>
                        <h3 className="font-bold mb-2">
                          <Link href={`/article/${article.slug}`} className="hover:text-primary transition-colors">
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-3 w-3" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 fill-primary text-primary" />
                              <span>{article.likeCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{article.commentCount}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Followers Tab */}
              <TabsContent value="followers" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {followers.map((follower) => (
                    <Card key={follower.id} className="p-4">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={follower.avatar} alt={follower.name} />
                          <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{follower.name}</p>
                              <p className="text-sm text-muted-foreground">@{follower.username}</p>
                            </div>
                            <Button variant={follower.isFollowing ? "outline" : "default"} size="sm" className="gap-1">
                              {follower.isFollowing ? (
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
                          <p className="text-sm mt-2 line-clamp-2">{follower.bio}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Following Tab */}
              <TabsContent value="following" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {following.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">@{user.username}</p>
                            </div>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Check className="h-3 w-3" />
                              Following
                            </Button>
                          </div>
                          <p className="text-sm mt-2 line-clamp-2">{user.bio}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage;