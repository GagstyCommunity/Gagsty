import { Link } from "wouter";
import { FaTelegram, FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-primary font-poppins font-bold text-3xl mb-4">GAGSTY</div>
            <p className="text-gray-400 mb-4">Turn your idea into a game in minutes. No code. AI powered. Play-to-Own.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <FaTelegram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <FaDiscord className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-accent">Home</Link></li>
              <li><Link href="/#how-it-works" className="text-gray-400 hover:text-accent">How It Works</Link></li>
              <li><Link href="/games" className="text-gray-400 hover:text-accent">Game Hub</Link></li>
              <li><Link href="/create-game" className="text-gray-400 hover:text-accent">Create Game</Link></li>
              <li><Link href="/earn" className="text-gray-400 hover:text-accent">Earn & Badges</Link></li>
              <li><Link href="/token" className="text-gray-400 hover:text-accent">Token</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-accent">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent">Learn Hub</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent">Partner With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent">Gigs & Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Community</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-[#229ED9]">
                  <FaTelegram className="text-[#229ED9] mr-2" />
                  Global Channel
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-[#229ED9]">
                  <FaTelegram className="text-[#229ED9] mr-2" />
                  India Channel
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-primary">
                  <FaDiscord className="text-primary mr-2" />
                  Developer Discord
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 hover:text-[#FF8855]">
                  <FaYoutube className="text-[#FF8855] mr-2" />
                  Tutorials
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Gagsty. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
