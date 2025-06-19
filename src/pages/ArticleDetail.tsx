import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  Calendar,
  Share,
  Bookmark,
  BookmarkCheck,
  MessageSquare,
  ThumbsUp,
  User,
  Heart,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  ArrowRight,
  Tag,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

// Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import PageTransition from "@/components/layout/PageTransition";
import NewsletterSubscription from "@/components/news/NewsletterSubscription";
import ArticleCard from "@/components/news/ArticleCard";

// Data
import { articleData } from "@/data/articles";
import type { Article } from "@/components/news/ArticleCard";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  
  // States
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Fetch article data
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      if (!articleId) {
        navigate("/404");
        return;
      }

      // Find article by ID
      const found = articleData.find(a => a.id === articleId);
      
      if (!found) {
        navigate("/404");
        return;
      }

      setArticle(found);
      
      // Random related articles
      const filtered = articleData
        .filter(a => a.id !== articleId && a.category === found.category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      setRelatedArticles(filtered);
      setLoading(false);
      
      // Random initial values
      setLikesCount(Math.floor(Math.random() * 100) + 20);
      setCommentCount(Math.floor(Math.random() * 20) + 5);
      
      // Check if article is bookmarked (using localStorage in real app)
      const isBookmarked = Math.random() > 0.7;
      setBookmarked(isBookmarked);
      
      // Update view count
      // In a real app, this would be an API call
      console.log(`Incremented view count for article: ${articleId}`);
      
    }, 800);
    
    return () => clearTimeout(timer);
  }, [articleId, navigate]);
  
  // Format date
  const formatDate = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'MMMM d, yyyy');
    } catch (error) {
      return format(new Date(), 'MMMM d, yyyy');
    }
  };
  
  // Calculate reading time
  const getReadingTime = (content: string | undefined): number => {
    if (!content) return 3;
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };
  
  // Handle bookmark click
  const handleBookmarkClick = () => {
    setBookmarked(prev => !prev);
    
    toast(bookmarked ? "Removed from bookmarks" : "Added to bookmarks", {
      description: bookmarked 
        ? "Article has been removed from your bookmarks" 
        : "Article has been saved to your bookmarks",
      action: {
        label: "View",
        onClick: () => console.log("View bookmarks"),
      },
    });
  };
  
  // Handle like click
  const handleLikeClick = () => {
    setLikesCount(prev => prev + 1);
  };
  
  // Handle sharing
  const handleShareClick = () => {
    setShowShareOptions(prev => !prev);
  };
  
  // Share to platform
  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || "Great article";
    
    let shareUrl = "";
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast("Link copied to clipboard", {
          description: "You can now paste the link wherever you want",
        });
        setShowShareOptions(false);
        return;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
      setShowShareOptions(false);
    }
  };

  // Render loading state
  if (loading) {
    return <ArticleSkeleton />;
  }

  return (
    <PageTransition>
      <article className="min-h-screen bg-background">
        {/* Back button */}
        <div className="container mx-auto px-4 pt-4 mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="group flex items-center space-x-1" 
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to articles</span>
          </Button>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content */}
            <div className="lg:col-span-8">
              {/* Article category and bookmarking */}
              <div className="flex items-center justify-between mb-4">
                <Link to={`/category/${article?.category.toLowerCase()}`}>
                  <Badge variant="outline" className="py-0.5 px-3 hover:bg-secondary/30 transition-colors">
                    {article?.category}
                  </Badge>
                </Link>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-foreground"
                      onClick={handleShareClick}
                    >
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    
                    {/* Share options popup */}
                    <AnimatePresence>
                      {showShareOptions && (
                        <motion.div 
                          className="absolute right-0 top-full mt-1 bg-popover p-2 rounded-lg shadow-lg z-10 border border-border"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="flex flex-col space-y-1">
                            <Button variant="ghost" className="justify-start px-2 py-1 h-8" onClick={() => shareToSocial('twitter')}>
                              <Twitter className="h-4 w-4 mr-2" />
                              Twitter
                            </Button>
                            <Button variant="ghost" className="justify-start px-2 py-1 h-8" onClick={() => shareToSocial('facebook')}>
                              <Facebook className="h-4 w-4 mr-2" />
                              Facebook
                            </Button>
                            <Button variant="ghost" className="justify-start px-2 py-1 h-8" onClick={() => shareToSocial('linkedin')}>
                              <Linkedin className="h-4 w-4 mr-2" />
                              LinkedIn
                            </Button>
                            <Separator className="my-1" />
                            <Button variant="ghost" className="justify-start px-2 py-1 h-8" onClick={() => shareToSocial('copy')}>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy link
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`text-muted-foreground hover:text-foreground ${bookmarked ? 'text-primary' : ''}`} 
                    onClick={handleBookmarkClick}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="h-4 w-4 mr-1" />
                    ) : (
                      <Bookmark className="h-4 w-4 mr-1" />
                    )}
                    {bookmarked ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>
              
              {/* Article title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {article?.title}
              </h1>
              
              {/* Meta information */}
              <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{getReadingTime(article?.content)} min read</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(article?.date || '')}</span>
                </div>
                
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{article?.views || 128} views</span>
                </div>
              </div>
              
              {/* Feature image */}
              {article?.imageUrl && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-auto object-cover aspect-[16/9]" 
                  />
                </div>
              )}
              
              {/* Article preview/excerpt */}
              <div className="mb-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {article?.excerpt}
                </p>
              </div>
              
              {/* Dummy article content - in a real app this would be rich content */}
              <div className="prose prose-invert prose-headings:font-semibold prose-p:text-foreground/90 prose-strong:text-foreground prose-strong:font-semibold prose-a:text-primary max-w-none mb-8">
                <h2>The Growing Popularity of E-Sports</h2>
                <p>
                  Over the past decade, e-sports has transformed from a niche hobby into a global phenomenon 
                  with millions of fans and players worldwide. Major tournaments now fill stadiums, and top 
                  players have become international celebrities, commanding salaries and sponsorships that 
                  rival traditional sports stars.
                </p>
                <p>
                  The rise of streaming platforms like Twitch and YouTube Gaming has played a crucial role in 
                  this growth, allowing fans to watch their favorite players and teams compete in real-time 
                  from anywhere in the world.
                </p>
                
                <h3>Tournament Prize Pools</h3>
                <p>
                  Prize pools for major tournaments have reached unprecedented levels. The International, 
                  Dota 2's premier tournament, consistently offers prizes exceeding $30 million, with the 
                  winning team taking home millions.
                </p>
                <p>
                  Other games like League of Legends, Counter-Strike: Global Offensive, and Fortnite have 
                  also established lucrative competitive scenes with substantial rewards for top performers.
                </p>
                
                <h3>Corporate Investment</h3>
                <p>
                  Major brands and traditional sports organizations have taken notice of e-sports' growing 
                  popularity. Companies like Red Bull, Intel, and Mercedes-Benz have become prominent sponsors, 
                  while NBA teams like the Golden State Warriors and Philadelphia 76ers have invested in 
                  e-sports organizations.
                </p>
                
                <h2>The Future of Competitive Gaming</h2>
                <p>
                  As e-sports continues to grow, questions about its long-term sustainability and evolution 
                  remain. Will it eventually achieve mainstream status comparable to traditional sports? Can 
                  it establish more stable career paths for players beyond the current short-lived careers?
                </p>
                <p>
                  One thing is certain: e-sports has permanently altered the landscape of entertainment and 
                  competition, creating new opportunities for skilled players and engaging millions of fans 
                  worldwide.
                </p>
                
                <h3>Challenges Ahead</h3>
                <p>
                  Despite its rapid growth, e-sports faces challenges related to standardization, player 
                  welfare, and establishing sustainable business models. As the industry matures, addressing 
                  these issues will be crucial for its continued success.
                </p>
                
                <p>
                  The coming years will likely see further integration between e-sports and traditional media, 
                  with more television coverage, celebrity involvement, and mainstream recognition, solidifying 
                  competitive gaming's place in global entertainment culture.
                </p>
              </div>
              
              {/* Tags */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {article?.tags?.map((tag, i) => (
                    <Link key={i} to={`/tag/${tag.toLowerCase()}`}>
                      <Badge variant="secondary" className="py-0.5 px-2">
                        <Tag className="h-3 w-3 mr-1" /> {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Engagement */}
              <div className="flex items-center justify-between py-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="space-x-1" onClick={handleLikeClick}>
                    <Heart className="h-4 w-4" />
                    <span>{likesCount}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{commentCount}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" onClick={handleBookmarkClick}>
                  {bookmarked ? (
                    <BookmarkCheck className="h-4 w-4 mr-1" />
                  ) : (
                    <Bookmark className="h-4 w-4 mr-1" />
                  )}
                  {bookmarked ? 'Saved' : 'Save for later'}
                </Button>
              </div>
              
              {/* Author */}
              <div className="my-8 p-6 bg-muted rounded-lg">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-border">
                    <AvatarImage src={`https://i.pravatar.cc/100?u=${article?.author}`} />
                    <AvatarFallback>{article?.author?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{article?.author}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Gaming Correspondent</p>
                    <p className="text-sm">
                      {article?.author} is a gaming industry correspondent with over 10 years of experience covering 
                      esports, gaming culture, and industry trends.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Comments section placeholder */}
              <div className="mt-10 mb-16">
                <h3 className="text-xl font-semibold mb-4">Comments ({commentCount})</h3>
                <div className="bg-muted/50 border border-border rounded-lg p-8 text-center">
                  <MessageSquare className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <h4 className="text-lg font-medium">Join the conversation</h4>
                  <p className="text-muted-foreground mb-4">
                    Sign in to comment on this article and connect with others
                  </p>
                  <div className="flex justify-center gap-2">
                    <Button variant="outline">Sign In</Button>
                    <Button>Create Account</Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <aside className="lg:col-span-4">
              {/* Newsletter subscription */}
              <div className="mb-8 sticky top-24">
                <Card className="overflow-hidden border-border bg-muted/30">
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get the latest gaming news, tournament updates, and exclusive content delivered to your inbox.
                    </p>
                    <NewsletterSubscription />
                  </CardContent>
                </Card>
                
                {/* Related articles */}
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article, index) => (
                      <Link key={index} to={`/news/article/${article.id}`}>
                        <Card className="bg-background hover:bg-muted/40 transition-colors group">
                          <div className="flex">
                            <div className="w-1/3">
                              <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="h-full w-full object-cover aspect-[4/3]"
                              />
                            </div>
                            <div className="w-2/3 p-3">
                              <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                                {article.title}
                              </h4>
                              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{getReadingTime(article.content)} min read</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                  
                  <Button variant="ghost" className="mt-4 w-full justify-between">
                    View all articles <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PageTransition>
  );
};

const ArticleSkeleton = () => {
  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container mx-auto px-4">
        <Skeleton className="h-8 w-32 mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex justify-between mb-4">
              <Skeleton className="h-6 w-24" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            
            <Skeleton className="h-12 w-full mb-4" />
            
            <div className="flex flex-wrap mb-6 gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-28" />
            </div>
            
            <Skeleton className="w-full h-[300px] rounded-lg mb-6" />
            
            <Skeleton className="h-28 w-full mb-6" />
            
            <div className="space-y-4 mb-8">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-2/3 mt-6 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <Skeleton className="h-64 w-full rounded-lg mb-8" />
            <Skeleton className="h-8 w-40 mb-4" />
            
            <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
