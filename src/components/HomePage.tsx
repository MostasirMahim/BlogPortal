"use client";

import Image from "next/image";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  Heart,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { formatJoinedDate } from "@/lib/date_modify";
import { useRouter } from "next/navigation";
import { Post } from "@/types";
import { LoadingPage } from "./ui/loading";
import { useToast } from "@/hooks/use-toast";

const getHomePageData = () => {
  const featuredNews = {
    title: "Global Summit Addresses Climate Change with New Initiatives",
    category: "Breaking News",
    date: "June 12, 2023",
    readTime: "5 min read",
    image:
      "https://www.carbonbrief.org/wp-content/uploads/2023/12/53395277155_1f62b0c011_k-1550x804.jpg",
    slug: "global-summit-climate-change",
    likeCount: 42,
    commentCount: 17,
    id: "featured-1",
  };
  const secondaryNews = [
    {
      id: "secondary-1",
      title: "New AI Breakthrough Promises to Transform Healthcare",
      category: "Technology",
      image: "/placeholder.jpg",
      slug: "ai-breakthrough-healthcare",
      date: "June 11, 2023",
      likeCount: 76,
      commentCount: 18,
    },
    {
      id: "secondary-2",
      title: "Stock Markets Reach Record Highs Amid Economic Recovery",
      category: "Business",
      image:
        "https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a",
      slug: "stock-markets-record-highs",
      date: "June 10, 2023",
      likeCount: 54,
      commentCount: 12,
    },
  ];

  const latestNews = [
    {
      id: "latest-1",
      title: "New Legislation Aims to Address Housing Crisis in Major Cities",
      category: "Politics",
      description:
        "The proposed bill would allocate funds for affordable housing development and provide tax incentives for builders.",
      date: "June 10, 2023",
      readTime: "3 min read",
      image: "/placeholder.jpg?height=400&width=600&text=News 1",
      slug: "legislation-housing-crisis",
      likeCount: 45,
      commentCount: 9,
    },
    {
      id: "latest-2",
      title:
        "Scientists Discover Potential New Treatment for Alzheimer's Disease",
      category: "Health",
      description:
        "The breakthrough research shows promising results in early clinical trials, offering hope to millions affected by the condition.",
      date: "June 9, 2023",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      slug: "alzheimers-treatment-discovery",
      likeCount: 62,
      commentCount: 15,
    },
    {
      id: "latest-3",
      title: "Major Tech Company Announces Revolutionary New Product Line",
      category: "Technology",
      description:
        "The new devices feature cutting-edge technology that could reshape how consumers interact with digital content.",
      date: "June 8, 2023",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9",
      slug: "tech-company-product-line",
      likeCount: 78,
      commentCount: 23,
    },
    {
      id: "latest-4",
      title: "International Sports Tournament Opens with Spectacular Ceremony",
      category: "Sports",
      description:
        "Athletes from over 100 countries participated in the opening event, which featured elaborate performances and cultural displays.",
      date: "June 7, 2023",
      readTime: "2 min read",
      image: "/placeholder.jpg?height=400&width=600&text=News 4",
      slug: "sports-tournament-opening",
      likeCount: 36,
      commentCount: 8,
    },
  ];

  const categoryTabs = {
    trending: [
      {
        id: 1,
        title:
          "Global Tech Conference Unveils Next Generation of Smart Devices",
        date: "June 8, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=1",
        slug: "tech-conference-smart-devices",
        likeCount: 87,
        commentCount: 24,
      },
      {
        id: 2,
        title:
          "Environmental Report Warns of Critical Biodiversity Loss in Rainforests",
        date: "June 7, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=2",
        slug: "environmental-report-biodiversity",
        likeCount: 65,
        commentCount: 18,
      },
      {
        id: 3,
        title: "New Economic Policy Aims to Boost Small Business Growth",
        date: "June 6, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=3",
        slug: "economic-policy-small-business",
        likeCount: 54,
        commentCount: 15,
      },
      {
        id: 4,
        title: "Healthcare Reform Bill Passes with Bipartisan Support",
        date: "June 5, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=4",
        slug: "healthcare-reform-bill",
        likeCount: 48,
        commentCount: 10,
      },
      {
        id: 5,
        title: "Cultural Festival Celebrates Diversity with Record Attendance",
        date: "June 4, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=5",
        slug: "cultural-festival-diversity",
        likeCount: 39,
        commentCount: 7,
      },
      {
        id: 6,
        title: "Space Agency Announces Plans for New Lunar Mission",
        date: "June 3, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=6",
        slug: "space-agency-lunar-mission",
        likeCount: 72,
        commentCount: 19,
      },
    ],
    politics: [
      {
        id: 1,
        title:
          "Senate Passes Landmark Infrastructure Bill After Months of Negotiation",
        date: "June 7, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=1",
        slug: "senate-infrastructure-bill",
        likeCount: 58,
        commentCount: 32,
      },
      {
        id: 2,
        title:
          "International Summit on Democracy Concludes with Joint Declaration",
        date: "June 6, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=2",
        slug: "democracy-summit-declaration",
        likeCount: 45,
        commentCount: 14,
      },
      {
        id: 3,
        title:
          "Local Elections Show Shifting Voter Preferences in Key Districts",
        date: "June 5, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=3",
        slug: "local-elections-voter-preferences",
        likeCount: 36,
        commentCount: 21,
      },
      {
        id: 4,
        title: "New Legislation Proposed to Address Digital Privacy Concerns",
        date: "June 4, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=4",
        slug: "legislation-digital-privacy",
        likeCount: 42,
        commentCount: 17,
      },
      {
        id: 5,
        title: "Government Announces Major Investment in Renewable Energy",
        date: "June 3, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=5",
        slug: "government-renewable-energy",
        likeCount: 63,
        commentCount: 28,
      },
      {
        id: 6,
        title:
          "Diplomatic Relations Restored Between Previously Conflicting Nations",
        date: "June 2, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=6",
        slug: "diplomatic-relations-restored",
        likeCount: 51,
        commentCount: 23,
      },
    ],
    technology: [
      {
        id: 1,
        title:
          "Revolutionary Battery Technology Could Double Electric Vehicle Range",
        date: "June 5, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=1",
        slug: "battery-technology-electric-vehicles",
        likeCount: 87,
        commentCount: 34,
      },
      {
        id: 2,
        title:
          "Artificial Intelligence System Achieves Breakthrough in Medical Diagnostics",
        date: "June 4, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=2",
        slug: "ai-medical-diagnostics",
        likeCount: 76,
        commentCount: 29,
      },
      {
        id: 3,
        title:
          "Tech Giants Collaborate on New Industry Standards for Data Security",
        date: "June 3, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=3",
        slug: "tech-giants-data-security",
        likeCount: 64,
        commentCount: 18,
      },
      {
        id: 4,
        title: "Quantum Computing Milestone Achieved by Research Team",
        date: "June 2, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=4",
        slug: "quantum-computing-milestone",
        likeCount: 59,
        commentCount: 22,
      },
      {
        id: 5,
        title:
          "New Smartphone Features Focus on Mental Health and Digital Wellbeing",
        date: "June 1, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=5",
        slug: "smartphone-mental-health",
        likeCount: 48,
        commentCount: 15,
      },
      {
        id: 6,
        title:
          "Robotics Innovation Makes Significant Advances in Assistive Technology",
        date: "May 31, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=6",
        slug: "robotics-assistive-technology",
        likeCount: 53,
        commentCount: 19,
      },
    ],
    business: [
      {
        id: 1,
        title: "Major Merger Between Tech Giants Reshapes Industry Landscape",
        date: "June 3, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=1",
        slug: "merger-tech-giants",
        likeCount: 72,
        commentCount: 31,
      },
      {
        id: 2,
        title:
          "Global Supply Chain Innovations Help Companies Overcome Challenges",
        date: "June 2, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=2",
        slug: "supply-chain-innovations",
        likeCount: 58,
        commentCount: 24,
      },
      {
        id: 3,
        title:
          "Startup Secures Record Funding for Sustainable Manufacturing Solution",
        date: "June 1, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=3",
        slug: "startup-sustainable-manufacturing",
        likeCount: 65,
        commentCount: 27,
      },
      {
        id: 4,
        title:
          "Retail Industry Transformation Accelerates with New Digital Strategies",
        date: "May 31, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=4",
        slug: "retail-digital-strategies",
        likeCount: 49,
        commentCount: 18,
      },
      {
        id: 5,
        title: "Financial Markets Respond Positively to New Economic Data",
        date: "May 30, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=5",
        slug: "financial-markets-economic-data",
        likeCount: 54,
        commentCount: 21,
      },
      {
        id: 6,
        title:
          "Corporate Sustainability Initiatives Show Measurable Business Benefits",
        date: "May 29, 2023",
        image: "/placeholder.jpg?height=200&width=200&text=6",
        slug: "corporate-sustainability-benefits",
        likeCount: 61,
        commentCount: 25,
      },
    ],
  };

  const featuredVideos = [
    {
      id: 1,
      title: "Inside the Latest Technological Innovations Changing Our World",
      description:
        "An in-depth look at how new technologies are transforming industries and daily life.",
      duration: "12:45",
      image: "/placeholder.jpg?height=400&width=600&text=Video 1",
      slug: "technological-innovations-changing-world",
      likeCount: 128,
      commentCount: 45,
    },
    {
      id: 2,
      title: "Exclusive Interview with Leading Climate Scientist",
      description:
        "Discussing the latest research findings and what they mean for global climate policy.",
      duration: "18:30",
      image: "/placeholder.jpg?height=400&width=600&text=Video 2",
      slug: "interview-climate-scientist",
      likeCount: 96,
      commentCount: 37,
    },
    {
      id: 3,
      title: "Behind the Scenes: Major International Diplomatic Summit",
      description:
        "A rare look at the preparations and negotiations that shape international relations.",
      duration: "15:20",
      image: "/placeholder.jpg?height=400&width=600&text=Video 3",
      slug: "behind-scenes-diplomatic-summit",
      likeCount: 84,
      commentCount: 29,
    },
  ];

  const trendingNow = [
    {
      id: 1,
      title:
        "International Space Station Celebrates 25 Years in Orbit with Special Event",
      date: "June 2, 2023",
      slug: "space-station-anniversary",
      likeCount: 112,
      commentCount: 43,
    },
    {
      id: 2,
      title:
        "Groundbreaking Medical Research Could Lead to Treatment for Previously Incurable Disease",
      date: "June 1, 2023",
      slug: "medical-research-incurable-disease",
      likeCount: 98,
      commentCount: 36,
    },
    {
      id: 3,
      title: "Cultural Heritage Site Receives International Protection Status",
      date: "May 31, 2023",
      slug: "cultural-heritage-protection",
      likeCount: 76,
      commentCount: 28,
    },
    {
      id: 4,
      title:
        "Innovative Education Program Shows Promising Results in Underserved Communities",
      date: "May 30, 2023",
      slug: "education-program-underserved-communities",
      likeCount: 85,
      commentCount: 32,
    },
  ];

  return {
    featuredNews,
    secondaryNews,
    latestNews,
    categoryTabs,
    featuredVideos,
    trendingNow,
  };
};

function HomePage() {
  const {
    featuredNews,
    secondaryNews,
    categoryTabs,
    featuredVideos,
    trendingNow,
  } = getHomePageData();

  const router = useRouter();
  const { toast } = useToast();
  const { data: POSTS, isLoading: isLoadingPosts } = useQuery<Post[] | null>({
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
  });

  if (isLoadingPosts)
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingPage />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 overflow-hidden border-0 shadow-sm">
              <div className="relative h-[300px] md:h-[350px] w-full">
                <Image
                  src={featuredNews.image || "/placeholder.jpg"}
                  alt="Featured news"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded mb-3 inline-block">
                    {featuredNews.category}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    <p
                      className="hover:underline"
                      onClick={() => {
                        toast({
                          title: "Its a Dummy Article",
                          description: "Currently It's Use For Showcase",
                        })
                       }}
                    >
                      {featuredNews.title}
                    </p>
                  </h1>
                  <div className="flex items-center text-sm gap-4">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredNews.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{featuredNews.likeCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{featuredNews.commentCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="col-span-1 space-y-4 my-auto">
              {secondaryNews.map((news) => (
                <Card
                  key={news.id}
                  className="overflow-hidden border-0 shadow-sm"
                >
                  <div className="relative h-[150px] w-full">
                    <Image
                      src={news.image || "/placeholder.jpg"}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded mb-2 inline-block">
                        {news.category}
                      </div>
                      <h2 className="text-lg font-bold">
                        <p
                          onClick={() => {
                            toast({
                              title: "Its a Dummy Article",
                              description: "Currently It's Use For Showcase",
                            })
                           }}
                          className="hover:underline"
                        >
                          {news.title}
                        </p>
                      </h2>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{news.likeCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{news.commentCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Latest News</h2>
            <Button variant="outline" size="sm" className="gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POSTS?.map((news) => (
              <Card
                key={news.id}
                className="overflow-hidden border-0 shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
                onClick={() => router.push(`/article/${news.slug}`)}
              >
                <div className="relative h-[150px] w-full">
                  <Image
                    src={news.image || "/placeholder.jpg"}
                    alt={news.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="text-xs font-medium text-primary mb-2">
                    {news.category}
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">
                    <p className="hover:text-primary transition-colors">
                      {news.title}
                    </p>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {news.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      <span>{formatJoinedDate(news.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{news._count.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{news._count.comments}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Category Tabs Section */}
        <section className="container mx-auto px-4 py-8 bg-muted/30">
          <Tabs defaultValue="trending">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="politics">Politics</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="gap-1">
                More Categories <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {Object.entries(categoryTabs).map(([category, articles]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <div key={article.id} className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={article.image || "/placeholder.jpg"}
                          alt={article.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium line-clamp-2 text-sm">
                          <p className="hover:text-primary transition-colors">
                            {article.title}
                          </p>
                        </h3>
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
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Featured Videos Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Videos</h2>
            <Button variant="outline" size="sm" className="gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <Card
                key={video.id}
                className="overflow-hidden border-0 shadow-sm"
              >
                <div className="relative h-[200px] w-full group">
                  <Image
                    src={video.image || "/placeholder.jpg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-white ml-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">
                    <p className="hover:text-primary transition-colors">
                      {video.title}
                    </p>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {video.description}
                  </p>
                </CardContent>
                <CardFooter className="px-4 pb-4 pt-0 flex items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{video.duration}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="container mx-auto px-4 py-8 bg-muted/30">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingNow.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="text-4xl font-bold text-primary/70">
                  0{index + 1}
                </div>
                <h3 className="font-bold">
                  <p className="hover:text-primary transition-colors">
                    {item.title}
                  </p>
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    <span>{item.likeCount}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span>{item.commentCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
