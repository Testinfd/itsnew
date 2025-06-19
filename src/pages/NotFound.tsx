import { Link } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <PageTransition>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </PageTransition>
  );
};

export default NotFound; 