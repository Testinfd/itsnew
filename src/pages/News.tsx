import { useState, useEffect } from "react"; // Removed React import
import { Link } from "react-router-dom";
import { 
  Search, Filter, ChevronRight,
  Clock, Calendar, Bookmark, Tag, TrendingUp,
  Rss, Trophy, Compass, GamepadIcon, RefreshCcw, BookOpen, Users
} from "lucide-react";
import { cn, formatDate, getReadingTime } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Tabs } from "@radix-ui/themes"; // Removed TabsList, TabsTrigger

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PageTransition from "@/components/layout/PageTransition";
import { Skeleton } from "@/components/ui/skeleton";

// Data
import { articleData } from "@/data/articles";

// Types
import type { Article } from "@/components/news/ArticleCard";

const News = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // State
  const [articles, setArticles] = useState<Article[]>(articleData);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Keep for potential future pagination re-add
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("latest");
  
  // Constants
  const ARTICLES_PER_PAGE = isMobile ? 6 : 9;
  const FEATURED_COUNT = 5;
  
  // Categories
  const categories = [
    { id: "all", label: "All" },
    { id: "tournaments", label: "Tournaments" },
    { id: "esports", label: "E-Sports" },
    { id: "guides", label: "Guides" },
    { id: "updates", label: "Updates" },
    { id: "interviews", label: "Interviews" },
    { id: "community", label: "Community" },
    { id: "reviews", label: "Reviews" }
  ];
  
  // Popular tags
  const popularTags = [
    { id: "tournaments", label: "Tournaments" },
    { id: "esports", label: "E-Sports" },
    { id: "strategy", label: "Strategy" },
    { id: "news", label: "News" },
    { id: "updates", label: "Updates" },
    { id: "community", label: "Community" },
    { id: "guides", label: "Guides" }
  ];
  
  // Fetch data on mount
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Featured articles (first 5)
      setFeaturedArticles(articleData.slice(0, FEATURED_COUNT));
      
      // Trending articles (random selection from remaining)
      const remaining = [...articleData].slice(FEATURED_COUNT);
      const shuffled = remaining.sort(() => 0.5 - Math.random());
      setTrendingArticles(shuffled.slice(0, 4));
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter articles when category or search changes
  useEffect(() => {
    let filtered = [...articleData];
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => 
        article.category.toLowerCase() === selectedCategory
      );
    }
    
    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article => 
        article.tags?.some(tag => selectedTags.includes(tag.toLowerCase()))
      );
    }
    
    // Filter by tab
    if (activeTab === "trending") {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (activeTab === "featured") {
      // Check if isFeatured property exists on the article
      filtered = filtered.filter(article => 
        article.isPremium === true || article.id.length % 5 === 0
      );
    }
    
    setArticles(filtered);
    setCurrentPage(1); // Reset to first page
  }, [selectedCategory, searchQuery, selectedTags, activeTab]);
  
  // Calculate pagination
  // const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE); // Commented out totalPages
  const currentArticles = articles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );
  
  // Pagination helpers
  // const goToPage = (page: number) => {
  //   setCurrentPage(page);
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  // Toggle tag selection
  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId) 
        : [...prev, tagId]
    );
  };

  // Optimize image URL (placeholder function)
  const optimizeImageUrl = (url: string, _width?: number) => {
    // In a real app, this would resize/optimize the image
    return url;
  };

  return (
    <PageTransition>
      {/* Modern Hero with Integrated Search and Tabbed Navigation */}
      <div
        className="pb-3"
        style={{
          backgroundImage: `linear-gradient(to bottom, hsl(var(--hero-gradient-from)), hsl(var(--hero-gradient-via)), hsl(var(--background)))`
        }}
      >
        <div className="container mx-auto px-4 pt-0 md:pt-6">
          {/* Prominent Search Bar - Centered and Elevated */}
          <div className="max-w-2xl mx-auto mb-4 md:mb-8 mt-0 md:mt-2">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <Input
                type="search"
                placeholder="Search for news, tournaments, guides..."
                className="w-full pl-11 pr-4 py-4 md:py-6 h-10 md:h-14 rounded-xl bg-background/80 backdrop-blur-sm border-border/40 text-foreground placeholder:text-muted-foreground focus:border-primary/50 shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search content"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-foreground" 
                aria-label="Advanced filters"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* App-Style Category Tabs */}
          <div className="mb-2">
            <div className="flex overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1 pt-0.5 gap-1.5 snap-x snap-mandatory">
              <Button
                variant="ghost"
                className={`h-8 px-3 flex items-center gap-1 whitespace-nowrap rounded-lg transition-all snap-start flex-shrink-0 ${
                  selectedCategory === "all" 
                    ? "bg-primary text-white shadow-md" 
                    : "hover:bg-muted border border-transparent hover:border-border/30"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                <Compass className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">For You</span>
              </Button>
              <Button
                variant="ghost"
                className={`h-8 px-3 flex items-center gap-1 whitespace-nowrap rounded-lg transition-all snap-start flex-shrink-0 ${
                  selectedCategory === "tournaments" 
                    ? "bg-primary text-white shadow-md" 
                    : "hover:bg-muted border border-transparent hover:border-border/30"
                }`}
                onClick={() => setSelectedCategory("tournaments")}
              >
                <Trophy className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Tournaments</span>
              </Button>
              <Button
                variant="ghost"
                className={`h-8 px-3 flex items-center gap-1 whitespace-nowrap rounded-lg transition-all snap-start flex-shrink-0 ${
                  selectedCategory === "esports" 
                    ? "bg-primary text-white shadow-md" 
                    : "hover:bg-muted border border-transparent hover:border-border/30"
                }`}
                onClick={() => setSelectedCategory("esports")}
              >
                <GamepadIcon className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Esports</span>
              </Button>
              <Button
                variant="ghost"
                className={`h-8 px-3 flex items-center gap-1 whitespace-nowrap rounded-lg transition-all snap-start flex-shrink-0 ${
                  selectedCategory === "updates" 
                    ? "bg-primary text-white shadow-md" 
                    : "hover:bg-muted border border-transparent hover:border-border/30"
                }`}
                onClick={() => setSelectedCategory("updates")}
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Updates</span>
              </Button>
              <Button
                variant="ghost"
                className={`h-8 px-3 flex items-center gap-1 whitespace-nowrap rounded-lg transition-all snap-start flex-shrink-0 ${
                  selectedCategory === "guides" 
                    ? "bg-primary text-white shadow-md" 
                    : "hover:bg-muted border border-transparent hover:border-border/30"
                }`}
                onClick={() => setSelectedCategory("guides")}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Guides</span>
              </Button>
              <Button
                variant="ghost"
                className={`h-8 px-3 flex items-center gap-1 whitespace-nowrap rounded-lg transition-all snap-start flex-shrink-0 ${
                  selectedCategory === "community" 
                    ? "bg-primary text-white shadow-md" 
                    : "hover:bg-muted border border-transparent hover:border-border/30"
                }`}
                onClick={() => setSelectedCategory("community")}
              >
                <Users className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Community</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16">
        {/* Content Sections That Feel Like Separate Pages */}
        <div className="pt-6 pb-16">
          {/* Featured Content Section with Dual Layout */}
          <div className="mb-12">
            {loading ? (
              <FeaturedSkeleton />
            ) : (
              <div>
                {/* Section Header with Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-bold">
                    {selectedCategory === "all" ? "Featured Stories" : `${categories.find(c => c.id === selectedCategory)?.label} News`}
                  </h2>
                  
                  <div className="flex items-center">
                    <Tabs.Root
                      value={activeTab} 
                      onValueChange={setActiveTab}
                    >
                      <Tabs.List className="bg-muted/30 h-9 rounded-lg">
                        <Tabs.Trigger value="latest" className="text-xs sm:text-sm rounded-md px-3" aria-label="Latest articles"></Tabs.Trigger>
                        <Tabs.Trigger value="trending" className="text-xs sm:text-sm rounded-md px-3" aria-label="Trending articles"></Tabs.Trigger>
                        <Tabs.Trigger value="featured" className="text-xs sm:text-sm rounded-md px-3" aria-label="Featured articles"></Tabs.Trigger>
                      </Tabs.List>
                    </Tabs.Root>
                  </div>
                </div>
                
                {/* Featured Content Layout - Modern Magazine Style */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Main Featured Story */}
                  {featuredArticles.length > 0 && (
                    <div className="lg:col-span-8 group">
                      <Card className="overflow-hidden rounded-xl border-border/40 hover:border-primary/30 transition-colors shadow-sm hover:shadow-md h-full">
                        <Link to={`/news/article/${featuredArticles[0].id}`} className="block h-full">
                          <div className="relative h-[400px] overflow-hidden">
                            <img 
                              src={optimizeImageUrl(featuredArticles[0].imageUrl)}
                              alt={featuredArticles[0].title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                              <div className="flex items-center gap-3 mb-3">
                                <Badge className="bg-primary/90 text-white border-0 px-2.5 py-1">
                                  {featuredArticles[0].category}
                                </Badge>
                                
                                {featuredArticles[0].isPremium && (
                                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              
                              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight group-hover:text-primary/90 transition-colors">
                                {featuredArticles[0].title}
                              </h3>
                              
                              <p className="text-gray-300 line-clamp-2 mb-4 max-w-3xl text-sm sm:text-base">
                                {featuredArticles[0].excerpt}
                              </p>
                              
                              <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="bg-primary/20 text-primary">{featuredArticles[0].author.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-gray-200 text-sm">{featuredArticles[0].author}</span>
                                </div>
                                
                                <div className="flex items-center gap-4 text-gray-300 text-xs">
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {getReadingTime(featuredArticles[0].content)} min read
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {formatDate(featuredArticles[0].timestamp || featuredArticles[0].date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    </div>
                  )}
                  
                  {/* Secondary Stories - Vertical Stack */}
                  <div className="lg:col-span-4 grid grid-cols-1 gap-5">
                    {featuredArticles.slice(1, 3).map((article) => (
                      <Card 
                        key={article.id}
                        className="overflow-hidden group border-border/40 hover:border-primary/30 transition-colors shadow-sm hover:shadow-md"
                      >
                        <Link to={`/news/article/${article.id}`} className="block">
                          <div className="grid grid-cols-2 h-full">
                            <div className="relative h-full overflow-hidden">
                              <img 
                                src={optimizeImageUrl(article.imageUrl)}
                                alt={article.title}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                            </div>
                            
                            <div className="p-4 flex flex-col">
                              <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/30 text-xs">
                                {article.category}
                              </Badge>
                              
                              <h3 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-3 mb-2">
                                {article.title}
                              </h3>
                              
                              <div className="mt-auto flex flex-col gap-1.5">
                                <div className="flex items-center text-muted-foreground text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{getReadingTime(article.content)} min read</span>
                                </div>
                                
                                <div className="flex items-center text-muted-foreground text-xs">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{formatDate(article.timestamp || article.date)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Stories Carousel - For Small Screens */}
                <div className="lg:hidden mt-8">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-medium">More Stories</h3>
                    
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
                      <Link to="/news?featured=true" className="flex items-center gap-1">
                        View all
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar snap-x snap-mandatory">
                    {featuredArticles.slice(3, 7).map((article) => (
                      <div 
                        key={article.id}
                        className="min-w-[280px] max-w-[280px] snap-start"
                      >
                        <Card className="overflow-hidden h-full border-border/40 hover:border-primary/30 transition-colors shadow-sm">
                          <Link to={`/news/article/${article.id}`} className="block h-full">
                            <div className="relative h-40 overflow-hidden">
                              <img 
                                src={optimizeImageUrl(article.imageUrl)}
                                alt={article.title}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                              <Badge className="absolute top-3 left-3 bg-primary/90 text-white border-0 text-[10px]">
                                {article.category}
                              </Badge>
                            </div>
                            <div className="p-3">
                              <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary transition-colors">
                                {article.title}
                              </h3>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {getReadingTime(article.content)} min
                                </span>
                                <span>{formatDate(article.timestamp || article.date)}</span>
                              </div>
                            </div>
                          </Link>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Two-Column Layout with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* 'For You' Content Feed Section */}
              <div>
                <div className="mb-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <div className="h-5 w-1 bg-primary rounded-full"></div>
                      {activeTab === "latest" ? "Latest Updates" : 
                       activeTab === "trending" ? "Trending Now" : "Editor's Picks"}
                    </h2>
                    
                    {selectedTags.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Filtered by:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedTags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="flex items-center gap-1 cursor-pointer bg-primary/5"
                              onClick={() => toggleTag(tag)}
                            >
                              {popularTags.find(t => t.id === tag)?.label || tag}
                              <button 
                                className="ml-1 hover:text-primary"
                                aria-label={`Remove ${tag} filter`}
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Modern Content Feed */}
                  <div className="space-y-6">
                    {loading ? (
                      Array(4).fill(0).map((_, i) => (
                        <ArticleSkeleton key={i} />
                      ))
                    ) : currentArticles.length > 0 ? (
                      currentArticles.map((article, _index) => (
                        <Card 
                          key={article.id}
                          className="mb-5 rounded-xl overflow-hidden border-border/30 hover:border-primary/30 transition-all hover:shadow-md bg-card/80 dark:bg-card/70 backdrop-blur-sm shadow-md hover:shadow-lg"
                        >
                          <Link to={`/news/article/${article.id}`} className="block">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-2/5 h-[200px] md:h-auto relative">
                                <img 
                                  src={optimizeImageUrl(article.imageUrl)}
                                  alt={article.title}
                                  className="w-full h-full object-cover"
                                />
                                {article.isPremium && (
                                  <div className="absolute top-3 left-3">
                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                                      Premium
                                    </Badge>
                                  </div>
                                )}
                              </div>
                              
                              <div className="md:w-3/5 p-5 flex flex-col">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                  <Badge className="bg-primary/10 text-primary border-primary/20">
                                    {article.category}
                                  </Badge>
                                  
                                  {article.tags && article.tags.length > 0 && (
                                    <Badge variant="outline" className="text-xs">
                                      {article.tags[0]}
                                    </Badge>
                                  )}
                                </div>
                                
                                <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors line-clamp-2">
                                  {article.title}
                                </h3>
                                
                                <p className="text-muted-foreground line-clamp-2 mb-5 text-sm">
                                  {article.excerpt}
                                </p>
                                
                                <div className="mt-auto flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-7 w-7">
                                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                        {article.author.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-medium">{article.author}</span>
                                      <span className="text-xs text-muted-foreground">{formatDate(article.timestamp || article.date)}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <div className="text-xs text-muted-foreground flex items-center">
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      {getReadingTime(article.content)} min read
                                    </div>
                                    
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                      <Bookmark className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-muted/10 rounded-xl border border-border/20">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No articles found</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          We couldn't find any articles matching your criteria. Try adjusting your filters or search terms.
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSelectedCategory("all");
                            setSearchQuery("");
                            setSelectedTags([]);
                            setActiveTab("latest");
                          }}
                        >
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Pagination */}
                  {/* {!loading && totalPages > 1 && (
                    <Pagination className="mt-10">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => goToPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            aria-disabled={currentPage === 1}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => {
                            // Show first page, last page, current page, and pages around current
                            return page === 1 || 
                                   page === totalPages || 
                                   (page >= currentPage - 1 && page <= currentPage + 1);
                          })
                          .map((page, i, array) => {
                            // Add ellipsis where needed
                            if (i > 0 && array[i - 1] !== page - 1) {
                              return (
                                <React.Fragment key={`ellipsis-${page}`}>
                                  <PaginationItem>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink 
                                      onClick={() => goToPage(page)}
                                      isActive={page === currentPage}
                                    >
                                      {page}
                                    </PaginationLink>
                                  </PaginationItem>
                                </React.Fragment>
                              );
                            }
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink 
                                  onClick={() => goToPage(page)}
                                  isActive={page === currentPage}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            aria-disabled={currentPage === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )} */}
                </div>
              </div>
            </div>
            
            {/* Sidebar - Modern App Style */}
            <div className="lg:col-span-4 space-y-8">
              {/* Topics You Follow Card */}
              <div className="rounded-xl overflow-hidden border border-border/30 bg-background/70 backdrop-blur-sm">
                <div className="bg-muted/20 px-5 py-4 border-b border-border/30 flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-1.5">
                    <Tag className="h-4 w-4 text-primary" />
                    Topics You Might Like
                  </h3>
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">Edit</Button>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {popularTags.map(tag => (
                      <Button 
                        key={tag.id}
                        variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "h-9 rounded-lg justify-start text-xs",
                          selectedTags.includes(tag.id) 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-background hover:bg-muted"
                        )}
                        onClick={() => toggleTag(tag.id)}
                      >
                        <span className="truncate">{tag.label}</span>
                        {selectedTags.includes(tag.id) && (
                          <span className="ml-auto">✓</span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Popular Articles */}
              <div className="rounded-xl overflow-hidden border border-border/30 bg-background/70 backdrop-blur-sm">
                <div className="bg-muted/20 px-5 py-4 border-b border-border/30 flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-rose-500" />
                    Trending Now
                  </h3>
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-xs" asChild>
                    <Link to="/news?filter=popular">See All</Link>
                  </Button>
                </div>
                
                <div className="divide-y divide-border/30">
                  {loading ? (
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="p-4 flex gap-3">
                        <Skeleton className="w-12 h-12 rounded-md" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    ))
                  ) : (
                    trendingArticles.map((article, index) => (
                      <Link 
                        key={article.id} 
                        to={`/news/article/${article.id}`}
                        className="flex gap-3 p-4 hover:bg-muted/10 transition-colors group"
                      >
                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={optimizeImageUrl(article.imageUrl)}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          <div className="absolute top-0 left-0 bg-primary w-5 h-5 flex items-center justify-center text-white text-xs font-medium">
                            {index + 1}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h4>
                          
                          <div className="flex items-center mt-1">
                            <div className="text-xs text-muted-foreground">
                              {getReadingTime(article.content)} min read
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
              
              {/* Newsletter Card */}
              <div className="rounded-xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <Rss className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Newsletter</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest gaming news and updates delivered to your inbox weekly.
                  </p>
                  
                  <div className="space-y-3">
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="h-10 bg-background/80"
                    />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// Loading skeletons
const ArticleSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
    <div className="md:w-1/3 aspect-[16/9] md:aspect-auto">
      <Skeleton className="w-full h-full rounded-lg" />
    </div>
    
    <div className="md:w-2/3 flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full ml-auto" />
      </div>
      
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      
      <Skeleton className="h-4 w-full mb-1.5" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

// Loading skeleton for featured section
const FeaturedSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
    <div className="lg:col-span-8">
      <Skeleton className="w-full h-[450px] rounded-xl" />
    </div>
    <div className="lg:col-span-4 grid grid-cols-1 gap-6">
      <Skeleton className="w-full h-[215px] rounded-xl" />
      <Skeleton className="w-full h-[215px] rounded-xl" />
    </div>
  </div>
);

export default News;
