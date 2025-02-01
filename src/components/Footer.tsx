import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">About QudPro</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Photography Groups</li>
              <li>Egyptian Artists</li>
              <li>Creative Hub</li>
              <li>Events</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Safety Center</li>
              <li>Community Guidelines</li>
              <li>Contact Us</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Copyright Policy</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            <span>© 2024 QudPro. All rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.patreon.com/qudpro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="support-button"
            >
              <Heart className="w-4 h-4" />
              <span>Support Us on Patreon</span>
            </a>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with ❤️ in Egypt</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Powered by QudSystem</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;