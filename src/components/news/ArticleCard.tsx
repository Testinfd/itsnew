import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, BookmarkCheck, Bookmark, Calendar, User } from "lucide-react";
import { useState } from "react";
import { cn, formatDate, getReadingTime } from "@/lib/utils"; // Import getReadingTime
import { toast } from "sonner";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  views?: number;
  isPremium?: boolean;
  timestamp?: string;
}

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal";
  size?: "sm" | "md" | "lg";
  showExcerpt?: boolean;
}

const ArticleCard = ({
  article,
  variant = "default",
  size = "md",
  showExcerpt = true,
}: ArticleCardProps) => {
  const [bookmarked, setBookmarked] = useState(false);
  
  // Handle bookmark click
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  // Determine classes based on variant and size
  const cardClasses = cn(
    "group overflow-hidden border border-border bg-card text-card-foreground h-full transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:border-primary/40 dark:hover:border-primary/60",
    {
      "flex": variant === "horizontal",
    }
  );
  
  const imageClasses = cn(
    "overflow-hidden aspect-video w-full",
    {
      "aspect-[4/3] max-h-48": variant === "default" && size === "sm",
      "aspect-[16/9] max-h-56": variant === "default" && size === "md",
      "aspect-[16/9] max-h-64": variant === "default" && size === "lg",
      "w-full md:w-1/3 aspect-[4/3]": variant === "horizontal",
    }
  );
  
  const contentClasses = cn(
    "flex flex-col flex-grow",
    {
      "p-3": size === "sm",
      "p-4": size === "md",
      "p-5": size === "lg",
    }
  );
  
  return (
    <Link to={`/news/article/${article.id}`} className="group">
      <Card className={cardClasses}>
        <div className={imageClasses}>
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {article.isPremium && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-primary/90 hover:bg-primary">Premium</Badge>
            </div>
          )}
        </div>
        <CardContent className={contentClasses}>
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <Link 
                to={`/category/${article.category.toLowerCase()}`} 
                className="text-xs font-medium text-muted-foreground hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                {article.category}
              </Link>
              <button 
                className="text-muted-foreground hover:text-primary"
                onClick={handleBookmarkClick}
              >
                {bookmarked ? (
                  <BookmarkCheck className="h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                </span>
              </button>
            </div>
            
            <h3 
              className={cn(
                "font-semibold group-hover:text-primary transition-colors line-clamp-2",
                {
                  "text-sm": size === "sm",
                  "text-base": size === "md",
                  "text-lg": size === "lg",
                }
              )}
            >
              {article.title}
            </h3>
            
            {showExcerpt && (
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {article.excerpt}
              </p>
            )}
          </div>
          
          <CardFooter className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 px-0 pb-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{getReadingTime(article.content)} min</span>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(article.timestamp || article.date)}</span>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
