import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-qudpro-primary text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About QudPro</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>Photography Groups</li>
              <li>Egyptian Artists</li>
              <li>Creative Hub</li>
              <li>Events</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Safety Center</li>
              <li>Community Guidelines</li>
              <li>Contact Us</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Copyright Policy</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-600" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm">
            <span>© 2024 QudPro. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span>Made with ❤️ in Egypt</span>
            <Separator orientation="vertical" className="h-4 bg-gray-600" />
            <span>Powered by QudSystem</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;