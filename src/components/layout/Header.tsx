import { Link } from 'react-router-dom';
import { Newspaper, Menu, Search, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Newspaper className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">ItsNew</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/news" className="text-sm font-medium hover:text-primary transition-colors">
            News
          </Link>
          <Link to="/tournaments" className="text-sm font-medium hover:text-primary transition-colors">
            Tournaments
          </Link>
          <Link to="/teams" className="text-sm font-medium hover:text-primary transition-colors">
            Teams
          </Link>
          <Link to="/guides" className="text-sm font-medium hover:text-primary transition-colors">
            Guides
          </Link>
          <Link to="/community" className="text-sm font-medium hover:text-primary transition-colors">
            Community
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="hidden md:flex">Sign In</Button>
          <Button variant="default" className="hidden md:flex">Sign Up</Button>
          
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/news" className="px-4 py-2 hover:bg-muted rounded-md">
                News
              </Link>
              <Link to="/tournaments" className="px-4 py-2 hover:bg-muted rounded-md">
                Tournaments
              </Link>
              <Link to="/teams" className="px-4 py-2 hover:bg-muted rounded-md">
                Teams
              </Link>
              <Link to="/guides" className="px-4 py-2 hover:bg-muted rounded-md">
                Guides
              </Link>
              <Link to="/community" className="px-4 py-2 hover:bg-muted rounded-md">
                Community
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/40">
                <Button variant="outline" className="w-full justify-center">Sign In</Button>
                <Button variant="default" className="w-full justify-center">Sign Up</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 