import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (timestamp: string) => {
  try {
    return format(new Date(timestamp), 'MMM d, yyyy');
  } catch (error) {
    return format(new Date(), 'MMM d, yyyy');
  }
};

export const getReadingTime = (content: string | undefined): number => {
  if (!content) return 3; // Default if no content
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};
