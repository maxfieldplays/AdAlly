import React, { useState, useEffect } from 'react';
import { User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface NavigationProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  user: User | null;
  onLogin: () => void;
  onSignup: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeItem, 
  setActiveItem, 
  user, 
  onLogin, 
  onSignup 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const publicNavItems = [
    { id: "home", label: "Home Page" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
  ];

  const userNavItems = [
    { id: "home", label: "Home Page" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing", label: "Pricing" },
    { id: "dashboard", label: "Dashboard" },
    { id: "about", label: "About Us" },
  ];

  const adminNavItems = [
    { id: "home", label: "Home Page" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing", label: "Pricing" },
    { id: "admin-chat", label: "Chat Admin" },
    { id: "dashboard", label: "Dashboard" },
    { id: "about", label: "About Us" },
  ];

  const navItems = user?.email?.includes('admin') ? adminNavItems : user ? userNavItems : publicNavItems;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-lg backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'} border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Adally"
              className="h-8 sm:h-10 lg:h-12 w-auto transition-all duration-300 hover:scale-105"
            />
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`relative px-3 py-2 text-base lg:text-lg font-medium transition-all duration-300 overflow-hidden ${
                    activeItem === item.id
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeItem === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-black via-gray-700 to-gray-500 rounded-full" />
                  )}
                  <div 
                    className={`absolute inset-0 bg-gray-100 rounded-lg transform scale-x-0 transition-transform duration-300 origin-left ${activeItem === item.id ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}`}
                    style={{ transform: activeItem === item.id ? 'scaleX(1)' : 'scaleX(0)' }}
                  />
                </button>
              ))}
            </div>
            
            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={() => setActiveItem('dashboard')}
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <UserIcon className="w-4 h-4" />
                Dashboard
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={onLogin}
                  className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={onSignup}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <div
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <div
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg mt-2 border border-gray-200 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  activeItem === item.id
                    ? "text-black bg-gray-100"
                    : "text-gray-600 hover:text-black hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => {
                    onLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={() => {
                    onSignup();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;