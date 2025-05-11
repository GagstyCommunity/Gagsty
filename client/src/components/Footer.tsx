import { FaTelegram, FaDiscord, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-darkBase border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/create-game" className="text-gray-400 hover:text-primary">Create Game</Link></li>
              <li><Link href="/games" className="text-gray-400 hover:text-primary">Game Directory</Link></li>
              <li><Link href="/earn" className="text-gray-400 hover:text-primary">Earn & Badges</Link></li>
              <li><Link href="/token" className="text-gray-400 hover:text-primary">Gagsty Token</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="https://t.me/gagsty" className="text-gray-400 hover:text-primary">Telegram Channel</a></li>
              <li><a href="https://discord.gg/gagsty" className="text-gray-400 hover:text-primary">Discord Server</a></li>
              <li><Link href="/learn" className="text-gray-400 hover:text-primary">Learn Hub</Link></li>
              <li><Link href="/partners" className="text-gray-400 hover:text-primary">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-gray-400 hover:text-primary">Documentation</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-primary">About Us</Link></li>
              <li><Link href="/help" className="text-gray-400 hover:text-primary">Help Center</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-primary">Terms & Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://t.me/gagsty" className="text-gray-400 hover:text-primary"><FaTelegram size={24} /></a>
              <a href="https://discord.gg/gagsty" className="text-gray-400 hover:text-primary"><FaDiscord size={24} /></a>
              <a href="https://youtube.com/@gagsty" className="text-gray-400 hover:text-primary"><FaYoutube size={24} /></a>
              <a href="https://twitter.com/gagstygames" className="text-gray-400 hover:text-primary"><FaTwitter size={24} /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Gagsty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;