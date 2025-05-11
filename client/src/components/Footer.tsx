import { useIsMobile } from "@/hooks/use-mobile";
import { FaTelegram, FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-8 ${isMobile ? 'grid-cols-2' : 'md:grid-cols-4'}`}>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-3 md:space-y-4">
              <li><a href="/create-game" className="text-sm md:text-base text-gray-300 hover:text-white">Create Game</a></li>
              <li><a href="/games" className="text-sm md:text-base text-gray-300 hover:text-white">Game Hub</a></li>
              <li><a href="/learn" className="text-sm md:text-base text-gray-300 hover:text-white">Learn</a></li>
              <li><a href="/earn" className="text-sm md:text-base text-gray-300 hover:text-white">Earn & Badges</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Ecosystem</h3>
            <ul className="mt-4 space-y-3 md:space-y-4">
              <li><a href="/token" className="text-sm md:text-base text-gray-300 hover:text-white">Gagsty Chips</a></li>
              <li><a href="/token" className="text-sm md:text-base text-gray-300 hover:text-white">GAGSTY Token</a></li>
              <li><a href="/jobs" className="text-sm md:text-base text-gray-300 hover:text-white">Jobs & Gigs</a></li>
              <li><a href="/partners" className="text-sm md:text-base text-gray-300 hover:text-white">Partners</a></li>
            </ul>
          </div>

          {/* Second row for mobile */}
          {isMobile && <div className="col-span-2 pt-2 border-t border-gray-800"></div>}

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3 md:space-y-4">
              <li><a href="/about" className="text-sm md:text-base text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="/careers" className="text-sm md:text-base text-gray-300 hover:text-white">Careers</a></li>
              <li><a href="/privacy" className="text-sm md:text-base text-gray-300 hover:text-white">Privacy</a></li>
              <li><a href="/terms" className="text-sm md:text-base text-gray-300 hover:text-white">Terms</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact & Support</h3>
            <ul className="mt-4 space-y-3 md:space-y-4">
              <li><a href="https://t.me/gagsty" className="text-sm md:text-base text-gray-300 hover:text-white">Telegram</a></li>
              <li><a href="https://discord.gg/gagsty" className="text-sm md:text-base text-gray-300 hover:text-white">Discord</a></li>
              <li><a href="/contact" className="text-sm md:text-base text-gray-300 hover:text-white">Contact</a></li>
              <li><a href="/help" className="text-sm md:text-base text-gray-300 hover:text-white">Help Center</a></li>
            </ul>
          </div>
        </div>
        <div className={`mt-8 border-t border-gray-800 pt-6 ${isMobile ? 'flex flex-col-reverse' : 'md:flex md:items-center md:justify-between'}`}>
          <div className={`flex space-x-6 ${isMobile ? 'justify-center mt-6' : 'md:order-2'}`}>
            <a href="#" className="text-gray-400 hover:text-gray-300 touch-target flex items-center justify-center">
              <span className="sr-only">Twitter</span>
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 touch-target flex items-center justify-center">
              <span className="sr-only">Discord</span>
              <FaDiscord />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 touch-target flex items-center justify-center">
              <span className="sr-only">Telegram</span>
              <FaTelegram />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 touch-target flex items-center justify-center">
              <span className="sr-only">YouTube</span>
              <FaYoutube />
            </a>
          </div>
          <p className={`text-sm md:text-base text-gray-400 ${isMobile ? 'text-center' : 'md:mt-0 md:order-1'}`}>
            &copy; 2023 Gagsty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};