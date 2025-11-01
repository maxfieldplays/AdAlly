import React from 'react';
import { Youtube, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-gray-50/95 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Adally" className="h-8 w-auto" />
            </div>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-md">
              Pioneering the future of storytelling through AI-powered video creation. Transform your ideas into stunning visual narratives.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-black font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">AI Video Generation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Commercial Production</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Short Film Creation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Brand Storytelling</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Motion Graphics</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-black font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="text-gray-600"><span className="block text-sm text-gray-500">Email</span>hello@imagicarts.com</li>
              <li className="text-gray-600"><span className="block text-sm text-gray-500">Phone</span>+91 79076 18219</li>
              <li className="text-gray-600"><span className="block text-sm text-gray-500">Address</span>New Delhi, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">A IMAGICARTS COMPANY © 2025 Adally. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-black transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;