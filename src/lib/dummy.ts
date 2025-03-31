// Define article structure
export interface Article {
  id: string
  title: string
  slug: string
  category: string
  content: string
  excerpt: string
  date: string
  readTime: string
  image: string
  author: string
  likeCount: number
  commentCount: number
  description?: string
}

// Define comment structure
export interface Comment {
  id: string
  articleId: string
  author: string
  content: string
  date: string
  avatar?: string
}

// Define user structure
export interface User {
  id: string
  name: string
  username: string
  email: string
  bio: string
  avatar: string
  coverImage: string
  joinDate: string
  location: string
  website?: string
  socialLinks: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  stats: {
    posts: number
    followers: number
    following: number
    likes: number
  }
}

// Define follower structure
export interface Follower {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  isFollowing: boolean
}

// Sample user data
export const currentUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  username: "alexjournalist",
  email: "alex.johnson@example.com",
  bio: "Senior journalist and editor with over 10 years of experience. Passionate about politics, technology, and environmental issues.",
  avatar: "/placeholder.jpg?height=200&width=200&text=AJ",
  coverImage: "/placeholder.jpg?height=400&width=1200&text=Cover+Image",
  joinDate: "January 2020",
  location: "New York, USA",
  website: "https://alexjohnson.example.com",
  socialLinks: {
    twitter: "alexjournalist",
    facebook: "alexjohnson",
    instagram: "alexj_writer",
    linkedin: "alex-johnson-writer",
  },
  stats: {
    posts: 48,
    followers: 1250,
    following: 365,
    likes: 892,
  },
}

// Sample followers data
export const followers: Follower[] = [
  {
    id: "user-2",
    name: "Emma Wilson",
    username: "emmawilson",
    avatar: "/placeholder.jpg?height=100&width=100&text=EW",
    bio: "Digital marketing specialist and avid reader",
    isFollowing: true,
  },
  {
    id: "user-3",
    name: "Michael Chen",
    username: "mikechen",
    avatar: "/placeholder.jpg?height=100&width=100&text=MC",
    bio: "Tech enthusiast and software developer",
    isFollowing: false,
  },
  {
    id: "user-4",
    name: "Sophia Rodriguez",
    username: "sophiar",
    avatar: "/placeholder.jpg?height=100&width=100&text=SR",
    bio: "Environmental scientist and nature photographer",
    isFollowing: true,
  },
  {
    id: "user-5",
    name: "James Taylor",
    username: "jamestaylor",
    avatar: "/placeholder.jpg?height=100&width=100&text=JT",
    bio: "Political analyst and podcast host",
    isFollowing: true,
  },
  {
    id: "user-6",
    name: "Olivia Parker",
    username: "oliviap",
    avatar: "/placeholder.jpg?height=100&width=100&text=OP",
    bio: "Journalist covering health and wellness",
    isFollowing: false,
  },
]

// Sample following data
export const following: Follower[] = [
  {
    id: "user-7",
    name: "Daniel Kim",
    username: "danielk",
    avatar: "/placeholder.jpg?height=100&width=100&text=DK",
    bio: "International correspondent and documentary filmmaker",
    isFollowing: true,
  },
  {
    id: "user-8",
    name: "Isabella Martinez",
    username: "isabellamart",
    avatar: "/placeholder.jpg?height=100&width=100&text=IM",
    bio: "Cultural critic and arts reporter",
    isFollowing: true,
  },
  {
    id: "user-9",
    name: "Ethan Brown",
    username: "ethanbrown",
    avatar: "/placeholder.jpg?height=100&width=100&text=EB",
    bio: "Business analyst and financial writer",
    isFollowing: true,
  },
  {
    id: "user-10",
    name: "Ava Thompson",
    username: "avat",
    avatar: "/placeholder.jpg?height=100&width=100&text=AT",
    bio: "Science journalist specializing in climate change",
    isFollowing: true,
  },
]

// Sample user's articles
export const userArticles: Article[] = [
  {
    id: "user-article-1",
    title: "The Impact of Artificial Intelligence on Modern Journalism",
    slug: "ai-impact-modern-journalism",
    category: "Technology",
    content: `<p>Artificial Intelligence is revolutionizing the way news is gathered, produced, and distributed. This article explores the various ways AI is transforming journalism.</p>
    
    <p>From automated content generation to sophisticated analytics that predict reader preferences, AI tools are becoming indispensable in newsrooms around the world. However, these advancements also raise important questions about the future of human journalists and the quality of news content.</p>
    
    <h2>Content Generation</h2>
    
    <p>AI systems can now write basic news stories, particularly those based on structured data like financial reports, sports scores, or election results. These systems can produce articles with remarkable speed and accuracy, freeing human journalists to focus on more complex, investigative work.</p>
    
    <p>However, AI-generated content often lacks the nuance, context, and ethical judgment that human journalists bring to their reporting. The challenge for news organizations is finding the right balance between automation and human expertise.</p>
    
    <h2>Content Curation and Personalization</h2>
    
    <p>AI algorithms are increasingly determining what news readers see online. These systems analyze user behavior to deliver personalized content recommendations, potentially increasing engagement but also raising concerns about filter bubbles and echo chambers.</p>
    
    <p>As news consumption becomes more personalized, there's a risk that readers will be exposed only to content that reinforces their existing beliefs, potentially undermining the role of journalism in fostering informed public discourse.</p>
    
    <h2>Verification and Fact-Checking</h2>
    
    <p>In an era of misinformation, AI tools are being developed to help journalists verify information and identify fake news. These systems can analyze patterns in text and images to flag potentially misleading content, though they still require human oversight.</p>
    
    <p>The development of sophisticated deepfakes presents a particular challenge, as AI is being used both to create increasingly convincing fake media and to detect such manipulations.</p>
    
    <h2>The Future of Journalism</h2>
    
    <p>As AI continues to evolve, journalists will need to adapt their skills and workflows. The most successful news organizations will likely be those that effectively combine AI capabilities with human creativity, critical thinking, and ethical judgment.</p>
    
    <p>Rather than replacing journalists, AI may ultimately transform their role, emphasizing uniquely human qualities like empathy, moral reasoning, and the ability to build relationships with sources and communities.</p>`,
    excerpt:
      "An exploration of how artificial intelligence technologies are transforming news gathering, production, and distribution, and what this means for the future of journalism.",
    date: "May 15, 2023",
    readTime: "8 min read",
    image: "/placeholder.jpg?height=600&width=900&text=AI+in+Journalism",
    author: "Alex Johnson",
    likeCount: 142,
    commentCount: 37,
  },
  {
    id: "user-article-2",
    title: "Climate Change Reporting: Challenges and Best Practices",
    slug: "climate-change-reporting-challenges",
    category: "Environment",
    content: `<p>Reporting on climate change presents unique challenges for journalists. This article examines these challenges and offers best practices for effective climate journalism.</p>
    
    <p>Climate change is a complex, long-term phenomenon that can be difficult to convey in traditional news formats. It involves scientific uncertainty, political controversy, and psychological barriers that can make audiences resistant to the information being presented.</p>
    
    <h2>Scientific Complexity</h2>
    
    <p>Climate science draws from multiple disciplines and involves complex systems with numerous variables. Journalists must find ways to accurately represent this complexity while making the information accessible to general audiences.</p>
    
    <p>This often requires translating scientific jargon, explaining confidence levels and margins of error, and placing new findings in the context of the broader scientific consensus.</p>
    
    <h2>Political Polarization</h2>
    
    <p>In many countries, climate change has become a politically divisive issue. Journalists must navigate this polarized landscape while maintaining their commitment to accuracy and truth-telling.</p>
    
    <p>This may involve distinguishing between scientific facts and political opinions, giving appropriate weight to different perspectives, and avoiding false balance that equates fringe views with mainstream scientific consensus.</p>
    
    <h2>Psychological Barriers</h2>
    
    <p>Climate change can trigger psychological responses like anxiety, guilt, or denial. Effective climate journalism acknowledges these responses and finds ways to engage audiences without overwhelming them.</p>
    
    <p>Solutions journalism, which focuses on responses to problems rather than just the problems themselves, can help overcome these barriers by empowering audiences and offering hope alongside concerning information.</p>
    
    <h2>Best Practices</h2>
    
    <p>Based on these challenges, several best practices emerge for climate journalists:</p>
    
    <ul>
      <li>Focus on local impacts and solutions to make the issue more relevant and immediate</li>
      <li>Use visual storytelling to make abstract concepts more concrete</li>
      <li>Incorporate human stories to create emotional connection</li>
      <li>Provide context for new findings within the broader scientific understanding</li>
      <li>Be transparent about sources and methods</li>
      <li>Include diverse perspectives, particularly from communities most affected by climate impacts</li>
      <li>Balance urgency with hope by including information about potential solutions</li>
    </ul>
    
    <p>By adopting these practices, journalists can play a vital role in fostering public understanding of climate change and informing constructive responses to this global challenge.</p>`,
    excerpt:
      "An examination of the unique challenges journalists face when reporting on climate change and strategies for effective communication on this critical issue.",
    date: "April 22, 2023",
    readTime: "7 min read",
    image: "/placeholder.jpg?height=600&width=900&text=Climate+Reporting",
    author: "Alex Johnson",
    likeCount: 118,
    commentCount: 29,
  },
  {
    id: "user-article-3",
    title: "The Evolution of Political Polling in the Digital Age",
    slug: "political-polling-digital-age",
    category: "Politics",
    content: `<p>Political polling has undergone significant transformations in the digital era. This article traces these changes and examines their implications for election coverage and democratic processes.</p>
    
    <p>From traditional telephone surveys to sophisticated online panels and social media analytics, polling methodologies have evolved rapidly in response to changing communication technologies and voter behaviors.</p>
    
    <h2>Methodological Challenges</h2>
    
    <p>Traditional polling methods face growing challenges in the digital age. Declining response rates to telephone surveys, the shift away from landlines, and self-selection biases in online polls all complicate the task of obtaining representative samples.</p>
    
    <p>Pollsters have responded with various innovations, including mixed-mode surveys, sophisticated weighting techniques, and integration of big data. However, these approaches bring their own methodological questions and potential biases.</p>
    
    <h2>The Role of Social Media</h2>
    
    <p>Social media platforms offer new ways to gauge public opinion, from formal polls to sentiment analysis of user-generated content. These methods can provide real-time insights and reach populations that might not participate in traditional polls.</p>
    
    <p>However, social media users are not representative of the general population, and algorithms that determine content visibility can create distorted views of public sentiment. Journalists must be cautious when interpreting social media data as indicators of broader public opinion.</p>
    
    <h2>Polling and Media Coverage</h2>
    
    <p>How media organizations report on polls significantly influences their impact on public perception and political processes. Horse-race coverage that focuses on who's ahead rather than substantive issues can distort democratic discourse.</p>
    
    <p>Responsible coverage requires transparency about methodology, margins of error, and limitations. It also means placing polling data in context and using it as just one element in broader political reporting.</p>
    
    <h2>The Future of Political Polling</h2>
    
    <p>Despite recent high-profile polling misses, polling remains an essential tool for understanding public opinion. The future likely involves hybrid approaches that combine traditional methods with new data sources and analytical techniques.</p>
    
    <p>Artificial intelligence and machine learning may help identify patterns and correlations that improve predictive accuracy. However, these technologies also raise new questions about transparency, privacy, and the role of human judgment in interpreting results.</p>
    
    <p>As polling continues to evolve, media literacy becomes increasingly important. Journalists and citizens alike need the skills to critically evaluate polling data and understand its proper place in democratic decision-making.</p>`,
    excerpt:
      "A look at how political polling has transformed in the digital age, the challenges facing modern pollsters, and implications for election coverage and democratic processes.",
    date: "March 10, 2023",
    readTime: "6 min read",
    image: "/placeholder.jpg?height=600&width=900&text=Political+Polling",
    author: "Alex Johnson",
    likeCount: 95,
    commentCount: 42,
  },
]

// Sample user's comments
export const userComments: Comment[] = [
  {
    id: "user-comment-1",
    articleId: "global-summit-climate-change",
    author: "Alex Johnson",
    content:
      "This summit represents a significant step forward, but implementation will be the real test. Previous agreements have fallen short due to lack of accountability mechanisms.",
    date: "June 13, 2023",
    avatar: "/placeholder.jpg?height=40&width=40&text=AJ",
  },
  {
    id: "user-comment-2",
    articleId: "ai-breakthrough-healthcare",
    author: "Alex Johnson",
    content:
      "The potential for AI in healthcare is enormous, but we need to ensure these systems are developed with robust ethical frameworks and rigorous testing. The explanation capability mentioned is particularly important for building trust with healthcare providers.",
    date: "June 12, 2023",
    avatar: "/placeholder.jpg?height=40&width=40&text=AJ",
  },
  {
    id: "user-comment-3",
    articleId: "stock-markets-record-highs",
    author: "Alex Johnson",
    content:
      "It's worth noting that these market gains aren't being felt equally across all economic sectors. Small businesses and certain industries are still struggling with supply chain issues and labor shortages.",
    date: "June 11, 2023",
    avatar: "/placeholder.jpg?height=40&width=40&text=AJ",
  },
  {
    id: "user-comment-4",
    articleId: "legislation-housing-crisis",
    author: "Alex Johnson",
    content:
      "Having covered housing policy for several years, I can say this bill addresses many key issues, but the question of local zoning reform remains contentious. Without meaningful changes to restrictive zoning, other measures may have limited impact.",
    date: "June 10, 2023",
    avatar: "/placeholder.jpg?height=40&width=40&text=AJ",
  },
]

// Sample user's liked articles
export const userLikedArticles: Article[] = [
  {
    id: "article-1",
    title: "Global Summit Addresses Climate Change with New Initiatives",
    slug: "global-summit-climate-change",
    category: "Politics",
    content: "Full content here...",
    excerpt:
      "World leaders gathered this week at the Global Climate Summit to address the urgent challenges posed by climate change, resulting in several groundbreaking initiatives...",
    date: "June 12, 2023",
    readTime: "5 min read",
    image: "/placeholder.jpg?height=800&width=1200",
    author: "John Doe",
    likeCount: 128,
    commentCount: 32,
  },
  {
    id: "article-2",
    title: "New AI Breakthrough Promises to Transform Healthcare",
    slug: "ai-breakthrough-healthcare",
    category: "Technology",
    content: "Full content here...",
    excerpt:
      "A groundbreaking advancement in artificial intelligence has the potential to revolutionize healthcare diagnostics and treatment planning...",
    date: "June 11, 2023",
    readTime: "4 min read",
    image: "/placeholder.jpg?height=400&width=600",
    author: "Emily Zhang",
    likeCount: 76,
    commentCount: 18,
  },
  {
    id: "article-5",
    title: "Scientists Discover Potential New Treatment for Alzheimer's Disease",
    slug: "alzheimers-treatment-discovery",
    category: "Health",
    content: "Full content here...",
    excerpt:
      "The breakthrough research shows promising results in early clinical trials, offering hope to millions affected by the condition.",
    date: "June 9, 2023",
    readTime: "4 min read",
    image: "/placeholder.jpg?height=400&width=600&text=News 2",
    author: "Dr. Thomas Wilson",
    likeCount: 62,
    commentCount: 15,
    description:
      "The breakthrough research shows promising results in early clinical trials, offering hope to millions affected by the condition.",
  },
]

// Sample articles data
export const articles: Article[] = [
  {
    id: "article-1",
    title: "Global Summit Addresses Climate Change with New Initiatives",
    slug: "global-summit-climate-change",
    category: "Politics",
    content: `<p>World leaders gathered this week at the Global Climate Summit to address the urgent challenges posed by climate change, resulting in several groundbreaking initiatives aimed at reducing carbon emissions and promoting sustainable development.</p>
    
    <p>The summit, attended by representatives from over 190 countries, focused on accelerating the transition to renewable energy sources and implementing more stringent regulations on carbon emissions. The discussions were marked by a sense of urgency, as recent scientific reports indicate that the effects of climate change are occurring more rapidly than previously anticipated.</p>
    
    <h2>Key Initiatives Announced</h2>
    
    <p>One of the most significant outcomes of the summit was the establishment of the Global Climate Fund, which will allocate $100 billion annually to support developing nations in their efforts to adapt to climate change and transition to cleaner energy sources. This fund represents a substantial increase from previous commitments and reflects a growing recognition of the disproportionate impact of climate change on vulnerable communities.</p>
    
    <p>Additionally, major industrialized nations pledged to reduce their carbon emissions by 50% by 2030, a more ambitious target than the 30% reduction previously agreed upon. This commitment was accompanied by detailed implementation plans, including investments in renewable energy infrastructure, electric vehicle adoption, and forest conservation.</p>
    
    <h2>Corporate Involvement</h2>
    
    <p>The summit also saw unprecedented participation from the private sector, with over 500 multinational corporations committing to achieve carbon neutrality by 2040. These companies, representing sectors ranging from technology to manufacturing, outlined comprehensive strategies for reducing their environmental footprint, including supply chain reforms and investments in carbon capture technologies.</p>
    
    <blockquote>"This summit marks a turning point in our collective response to the climate crisis. The commitments made here today demonstrate that we are finally moving from awareness to action, from planning to implementation." - UN Secretary-General</blockquote>
    
    <p>Environmental activists have cautiously welcomed these developments, while emphasizing the need for robust monitoring mechanisms to ensure that commitments are translated into concrete actions. They have also called for more attention to be paid to biodiversity conservation and ocean protection, areas that received comparatively less focus during the summit discussions.</p>
    
    <h2>Looking Ahead</h2>
    
    <p>The agreements reached at the Global Climate Summit will be formalized in the coming months, with a follow-up conference scheduled for next year to assess progress and address any implementation challenges. In the meantime, participating nations will begin the process of incorporating these commitments into their domestic legislation and policy frameworks.</p>
    
    <p>As the world grapples with increasingly severe weather events, rising sea levels, and other manifestations of climate change, the outcomes of this summit offer a glimmer of hope that coordinated international action is still possible in the face of this existential threat.</p>`,
    excerpt:
      "World leaders gathered this week at the Global Climate Summit to address the urgent challenges posed by climate change, resulting in several groundbreaking initiatives...",
    date: "June 12, 2023",
    readTime: "5 min read",
    image: "/placeholder.jpg?height=800&width=1200",
    author: "John Doe",
    likeCount: 128,
    commentCount: 32,
  },
  {
    id: "article-2",
    title: "New AI Breakthrough Promises to Transform Healthcare",
    slug: "ai-breakthrough-healthcare",
    category: "Technology",
    content: `<p>A groundbreaking advancement in artificial intelligence has the potential to revolutionize healthcare diagnostics and treatment planning, according to research published this week in a leading scientific journal.</p>
    
    <p>The new AI system, developed by a team of researchers from multiple universities, can analyze medical images with unprecedented accuracy, detecting subtle patterns that often escape even experienced clinicians. In trials, the system demonstrated a 97% accuracy rate in identifying early-stage cancers, compared to an 86% rate for human specialists.</p>
    
    <h2>How It Works</h2>
    
    <p>Unlike previous medical AI systems that were trained on specific conditions, this new approach uses a technique called "transfer learning" that allows it to apply knowledge across different medical domains. The system first builds a comprehensive understanding of human anatomy and physiology before specializing in particular diagnostic tasks.</p>
    
    <p>Dr. Sarah Chen, the lead researcher, explained: "What makes this system unique is its ability to explain its reasoning. It doesn't just provide a diagnosis; it highlights the specific features that led to its conclusion, making it a collaborative tool for healthcare professionals rather than a black box."</p>
    
    <h2>Potential Applications</h2>
    
    <p>The technology has already been tested in several clinical settings, with promising results in radiology, pathology, and dermatology. Hospitals participating in the pilot program reported significant reductions in diagnostic time and improvements in early detection rates.</p>
    
    <p>Beyond diagnostics, the system shows potential for treatment planning, drug development, and personalized medicine. By analyzing vast datasets of patient outcomes, it can help predict how individuals might respond to different therapeutic approaches.</p>
    
    <h2>Addressing Concerns</h2>
    
    <p>Despite the excitement surrounding this breakthrough, experts emphasize that the technology is designed to augment rather than replace human healthcare providers. "This is about giving doctors better tools to make informed decisions," said Dr. Chen. "The human element of healthcare remains irreplaceable."</p>
    
    <p>Regulatory bodies are currently reviewing the system, with preliminary approvals expected within the next six months. Meanwhile, the research team is working on making the technology more accessible to healthcare facilities in underserved areas, where specialist expertise is often limited.</p>`,
    excerpt:
      "A groundbreaking advancement in artificial intelligence has the potential to revolutionize healthcare diagnostics and treatment planning...",
    date: "June 11, 2023",
    readTime: "4 min read",
    image: "/placeholder.jpg?height=400&width=600",
    author: "Emily Zhang",
    likeCount: 76,
    commentCount: 18,
  },
  {
    id: "article-3",
    title: "Stock Markets Reach Record Highs Amid Economic Recovery",
    slug: "stock-markets-record-highs",
    category: "Business",
    content: `<p>Global stock markets soared to unprecedented heights this week, reflecting growing investor confidence in the economic recovery following the pandemic-induced downturn. Major indices across North America, Europe, and Asia posted significant gains, with several breaking historical records.</p>
    
    <p>The S&P 500 closed above 5,000 points for the first time in history, while the Dow Jones Industrial Average surpassed 36,000. Similar patterns were observed in the London FTSE, Tokyo's Nikkei, and other key markets, signaling a synchronized global upswing.</p>
    
    <h2>Driving Factors</h2>
    
    <p>Analysts attribute this remarkable performance to several factors, including robust corporate earnings, successful vaccination campaigns, and the gradual normalization of supply chains that were severely disrupted during the pandemic.</p>
    
    <p>"What we're seeing is the culmination of multiple positive trends," explained Marcus Johnson, chief economist at Global Financial Insights. "Companies have adapted impressively to the challenges of the past two years, and many are now reporting profits that exceed pre-pandemic levels."</p>
    
    <p>The technology and healthcare sectors have been particularly strong performers, though the rally has broadened to include traditional industries such as manufacturing, energy, and consumer goods.</p>
    
    <h2>Central Bank Policies</h2>
    
    <p>The market surge comes despite indications that central banks may begin tightening monetary policies in response to rising inflation concerns. The Federal Reserve has signaled potential interest rate increases in the coming months, while the European Central Bank is gradually scaling back its asset purchase programs.</p>
    
    <p>Surprisingly, these hawkish signals have not dampened investor enthusiasm. "The market appears to be interpreting these moves as a vote of confidence in the strength of the recovery," noted financial analyst Rebecca Torres. "There's a sense that economies can now withstand a gradual normalization of monetary conditions."</p>
    
    <h2>Sustainability Questions</h2>
    
    <p>Despite the optimistic mood, some experts caution that the current valuations may be difficult to sustain. Price-to-earnings ratios in many sectors are well above historical averages, raising concerns about potential market corrections.</p>
    
    <p>"We're advising clients to maintain diversified portfolios and not to chase performance at these levels," said investment strategist David Park. "While the economic fundamentals are strong, markets rarely move in a straight line, and volatility should be expected."</p>
    
    <p>For now, however, the bull market continues to defy skeptics, providing welcome relief for investors and pension funds that weathered significant turbulence during the pandemic's early phases.</p>`,
    excerpt:
      "Global stock markets soared to unprecedented heights this week, reflecting growing investor confidence in the economic recovery...",
    date: "June 10, 2023",
    readTime: "4 min read",
    image: "/placeholder.jpg?height=400&width=600",
    author: "Michael Rodriguez",
    likeCount: 54,
    commentCount: 12,
  },
  {
    id: "article-4",
    title: "New Legislation Aims to Address Housing Crisis in Major Cities",
    slug: "legislation-housing-crisis",
    category: "Politics",
    content: `<p>A comprehensive housing bill introduced in Congress this week aims to tackle the growing affordability crisis affecting major urban centers across the country. The Urban Housing Accessibility Act proposes a multi-faceted approach to increase housing supply, protect tenants, and promote sustainable urban development.</p>
    
    <p>The legislation, which has garnered bipartisan support, includes provisions for $50 billion in federal funding for affordable housing construction, tax incentives for developers who include affordable units in new projects, and grants to cities that reform zoning laws to allow higher-density housing.</p>
    
    <h2>Addressing Multiple Challenges</h2>
    
    <p>Housing costs have risen dramatically in recent years, with average rents increasing by over 30% in many metropolitan areas since 2019. Meanwhile, home ownership has become increasingly unattainable for middle-income families, with median home prices now exceeding seven times the median annual household income in the most expensive markets.</p>
    
    <p>"This is not just an economic issue, but a social one," said Representative Maria Gonzalez, one of the bill's primary sponsors. "When essential workers can't afford to live in the communities they serve, when families spend over half their income on housing, and when young people delay major life decisions due to housing costs, we need to act decisively."</p>
    
    <h2>Local Control with Federal Support</h2>
    
    <p>The bill strikes a balance between federal intervention and local autonomy. While it provides significant funding and incentives, it allows cities and states flexibility in implementation based on their specific needs and conditions.</p>
    
    <p>One innovative aspect is the creation of a "Housing Innovation Fund" that will support pilot programs for alternative housing models, including community land trusts, cooperative housing, and modular construction techniques that can reduce building costs.</p>
    
    <h2>Mixed Reactions</h2>
    
    <p>Housing advocates have generally welcomed the legislation, though some argue it doesn't go far enough in addressing the root causes of the crisis. "This is a good start, but we also need to address speculation in the housing market and strengthen tenant protections nationwide," said Jordan Williams of the National Housing Justice Coalition.</p>
    
    <p>The real estate industry has expressed cautious support, particularly for provisions that streamline permitting processes for new construction. However, some developers have raised concerns about potential requirements for affordable units, arguing they could make some projects financially unviable.</p>
    
    <p>The bill is expected to move through committee hearings in the coming weeks, with a floor vote possible before the end of the current session.</p>`,
    excerpt:
      "The proposed bill would allocate funds for affordable housing development and provide tax incentives for builders.",
    date: "June 10, 2023",
    readTime: "3 min read",
    image: "/placeholder.jpg?height=400&width=600&text=News 1",
    author: "Alexandra Rivera",
    likeCount: 45,
    commentCount: 9,
    description:
      "The proposed bill would allocate funds for affordable housing development and provide tax incentives for builders.",
  },
  {
    id: "article-5",
    title: "Scientists Discover Potential New Treatment for Alzheimer's Disease",
    slug: "alzheimers-treatment-discovery",
    category: "Health",
    content: `<p>A team of neuroscientists has identified a promising new approach to treating Alzheimer's disease that could potentially slow or even reverse cognitive decline in patients with early to moderate stages of the condition. The research, published in the journal Neuroscience Today, represents a significant departure from previous treatment strategies.</p>
    
    <p>Unlike most existing therapies that target amyloid plaques in the brain, this new approach focuses on protecting and restoring the function of synapses—the connections between neurons that are critical for memory and learning. The treatment combines a novel drug compound with a non-invasive brain stimulation technique.</p>
    
    <h2>Promising Clinical Results</h2>
    
    <p>In a Phase II clinical trial involving 120 patients with early-stage Alzheimer's, those receiving the combination therapy showed a 47% reduction in cognitive decline compared to the control group over an 18-month period. More remarkably, approximately 30% of treated patients demonstrated modest improvements in memory function and daily living activities.</p>
    
    <p>"What makes these results particularly exciting is that we're seeing effects in patients who already have symptoms, not just in prevention," explained Dr. Robert Chen, the study's principal investigator. "This suggests we may be able to not only halt progression but potentially recover some lost function."</p>
    
    <h2>How It Works</h2>
    
    <p>The treatment works through a dual mechanism. The drug component, known as SynaptaGen, helps stabilize existing synaptic connections by modulating a newly identified protein that regulates synaptic maintenance. Meanwhile, the targeted brain stimulation enhances neuroplasticity—the brain's ability to form new connections.</p>
    
    <p>Brain imaging conducted during the trial showed increased activity in the hippocampus and prefrontal cortex—regions critical for memory and executive function—in patients receiving the treatment.</p>
    
    <h2>Cautious Optimism</h2>
    
    <p>While the results have generated excitement in the medical community, researchers emphasize that larger studies are needed to confirm the findings and assess long-term effects. A Phase III trial involving 500 patients across multiple countries is scheduled to begin later this year.</p>
    
    <p>"We need to be cautiously optimistic," said Dr. Elena Vasquez, a neurologist not involved in the study. "Alzheimer's is a complex disease, and we've seen promising treatments fail in larger trials before. That said, this approach targeting synaptic function represents a novel direction that could complement existing therapies."</p>
    
    <p>If confirmed in larger studies, the treatment could become available to patients within three to five years, offering new hope to millions affected by a disease that has proven exceptionally difficult to treat effectively.</p>`,
    excerpt:
      "The breakthrough research shows promising results in early clinical trials, offering hope to millions affected by the condition.",
    date: "June 9, 2023",
    readTime: "4 min read",
    image: "/placeholder.jpg?height=400&width=600&text=News 2",
    author: "Dr. Thomas Wilson",
    likeCount: 62,
    commentCount: 15,
    description:
      "The breakthrough research shows promising results in early clinical trials, offering hope to millions affected by the condition.",
  },
]

// Sample comments for articles
export const comments: Record<string, Comment[]> = {
  "global-summit-climate-change": [
    {
      id: "1",
      articleId: "global-summit-climate-change",
      author: "Sarah Johnson",
      content: "This is a really insightful article. I appreciate the detailed analysis of the climate initiatives.",
      date: "June 12, 2023",
      avatar: "/placeholder.jpg?height=40&width=40&text=SJ",
    },
    {
      id: "2",
      articleId: "global-summit-climate-change",
      author: "Michael Chen",
      content:
        "I'm skeptical about the implementation timeline. Previous summits have made similar promises with little follow-through.",
      date: "June 12, 2023",
      avatar: "/placeholder.jpg?height=40&width=40&text=MC",
    },
    {
      id: "3",
      articleId: "global-summit-climate-change",
      author: "Elena Rodriguez",
      content:
        "The corporate commitments are encouraging, but we need stronger regulatory frameworks to ensure accountability.",
      date: "June 13, 2023",
      avatar: "/placeholder.jpg?height=40&width=40&text=ER",
    },
  ],
  "ai-breakthrough-healthcare": [
    {
      id: "1",
      articleId: "ai-breakthrough-healthcare",
      author: "Dr. James Wilson",
      content:
        "As someone working in healthcare, I can see the enormous potential of this technology. The ability to explain its reasoning is particularly important for clinical adoption.",
      date: "June 11, 2023",
      avatar: "/placeholder.jpg?height=40&width=40&text=JW",
    },
    {
      id: "2",
      articleId: "ai-breakthrough-healthcare",
      author: "Sophia Lee",
      content:
        "I wonder about the privacy implications of these systems. How is patient data being protected during training and deployment?",
      date: "June 12, 2023",
      avatar: "/placeholder.jpg?height=40&width=40&text=SL",
    },
  ],
  "stock-markets-record-highs": [
    {
      id: "1",
      articleId: "stock-markets-record-highs",
      author: "Robert Thompson",
      content:
        "The market seems overvalued by historical standards. I'm concerned we're in bubble territory with these valuations.",
      date: "June 10, 2023",
      avatar: "/placeholder.jpg?height=40&width=40&text=RT",
    },
    {
      id: "2",
      articleId: "stock-markets-record-highs",
      author: "Jennifer Adams",
      content:
        "Interesting analysis. I think the key question is whether corporate earnings growth can sustain these price levels.",
      date: "June 11, 2023",
      avatar: "/placeholder.jpg?height=40&width=40&text=JA",
    },
  ],
}

// Popular articles data
export const popularArticles = [
  {
    id: 1,
    title: "Tech Giants Announce Joint Initiative to Combat Online Misinformation",
    date: "June 8, 2023",
    image: "/placeholder.jpg?height=100&width=100&text=1",
    slug: "tech-giants-misinformation",
    likeCount: 87,
    commentCount: 24,
  },
  {
    id: 2,
    title: "Global Economy Shows Signs of Recovery After Pandemic Downturn",
    date: "June 7, 2023",
    image: "/placeholder.jpg?height=100&width=100&text=2",
    slug: "economy-recovery-signs",
    likeCount: 65,
    commentCount: 18,
  },
  {
    id: 3,
    title: "Breakthrough in Renewable Energy Storage Could Accelerate Adoption",
    date: "June 6, 2023",
    image: "/placeholder.jpg?height=100&width=100&text=3",
    slug: "renewable-energy-breakthrough",
    likeCount: 54,
    commentCount: 15,
  },
  {
    id: 4,
    title: "International Space Station Celebrates 25 Years in Orbit",
    date: "June 5, 2023",
    image: "/placeholder.jpg?height=100&width=100&text=4",
    slug: "space-station-anniversary",
    likeCount: 48,
    commentCount: 10,
  },
  {
    id: 5,
    title: "New Health Study Reveals Benefits of Mediterranean Diet",
    date: "June 4, 2023",
    image: "/placeholder.jpg?height=100&width=100&text=5",
    slug: "mediterranean-diet-benefits",
    likeCount: 39,
    commentCount: 7,
  },
]

// Related articles data
export const relatedArticles = {
  "global-summit-climate-change": [
    {
      id: 1,
      title: "Environmental Activists Launch Global Campaign for Climate Justice",
      description: "The campaign aims to raise awareness about climate change impacts.",
      date: "June 10, 2023",
      image: "/placeholder.jpg?height=400&width=600&text=Related 1",
      slug: "environmental-activists-campaign",
      likeCount: 42,
      commentCount: 8,
    },
    {
      id: 2,
      title: "New Research Shows Accelerating Rate of Polar Ice Melt",
      description: "Scientists warn that sea levels could rise faster than predicted.",
      date: "June 8, 2023",
      image: "/placeholder.jpg?height=400&width=600&text=Related 2",
      slug: "polar-ice-melt-research",
      likeCount: 35,
      commentCount: 12,
    },
  ],
  "ai-breakthrough-healthcare": [
    {
      id: 1,
      title: "Medical Researchers Develop New Diagnostic Tool Using Machine Learning",
      description: "The tool can detect early signs of several chronic conditions with high accuracy.",
      date: "June 9, 2023",
      image: "/placeholder.jpg?height=400&width=600&text=Related 1",
      slug: "medical-diagnostic-tool",
      likeCount: 38,
      commentCount: 9,
    },
    {
      id: 2,
      title: "Ethics Committee Releases Guidelines for AI in Healthcare",
      description: "The guidelines address privacy concerns and clinical validation requirements.",
      date: "June 7, 2023",
      image: "/placeholder.jpg?height=400&width=600&text=Related 2",
      slug: "ai-healthcare-ethics",
      likeCount: 31,
      commentCount: 14,
    },
  ],
}

// Function to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

// Function to get comments for an article
export function getCommentsBySlug(slug: string): Comment[] {
  return comments[slug] || []
}

// Function to get related articles for an article
export function getRelatedArticlesBySlug(slug: string): any[] {
  return relatedArticles[slug] || relatedArticles["global-summit-climate-change"] // Fallback to default
}

