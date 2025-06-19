import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      toast.success("Thank you for subscribing!", {
        description: "You've been added to our newsletter list.",
      });
      setEmail("");
      setLoading(false);
    }, 800);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-background"
      />
      <Button 
        type="submit" 
        className="w-full"
        disabled={loading}
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default NewsletterSubscription; 