import { Link } from 'react-router-dom';
import { Newspaper, Github, Twitter, Youtube, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ItsNew</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The latest news, tournaments, guides, and updates for competitive gamers.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com/Testinfd/itsnew" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/news" className="text-muted-foreground hover:text-primary transition-colors">News</Link></li>
              <li><Link to="/tournaments" className="text-muted-foreground hover:text-primary transition-colors">Tournaments</Link></li>
              <li><Link to="/teams" className="text-muted-foreground hover:text-primary transition-colors">Teams</Link></li>
              <li><Link to="/players" className="text-muted-foreground hover:text-primary transition-colors">Players</Link></li>
              <li><Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors">Guides</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/partners" className="text-muted-foreground hover:text-primary transition-colors">Partners</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/advertise" className="text-muted-foreground hover:text-primary transition-colors">Advertise</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ItsNew. All rights reserved.</p>
          <p className="md:mt-0 mt-4">Made with ❤️ by Testinfd</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 