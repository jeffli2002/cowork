
import React, { useState, useEffect, useRef } from 'react';
import { Locale } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  onToggleMobileMenu,
  isMobileMenuOpen,
  locale,
  onLocaleChange
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <header className="fixed top-0 left-0 md:left-[272px] right-0 z-50 w-full md:w-[calc(100%-272px)] bg-[#faf9f5]/85 backdrop-blur-md border-b border-[rgba(20,20,19,0.08)] h-16 flex items-center px-4 md:px-8">
      <div className="flex items-center justify-between gap-6 w-full">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Toggle Menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>

        {/* Brand/Logo - Same as Sidebar */}
        <a 
          href="index.html" 
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 bg-[#D97757] rounded-xl flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-users-cog"></i>
          </div>
          <span className="font-bold text-lg text-slate-900 uppercase tracking-wider hidden sm:block" style={{ fontFamily: '"Poppins", Arial, sans-serif', letterSpacing: '0.04em' }}>
            Cowork
          </span>
        </a>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-5" aria-label="Primary">
          <a 
            href="index.html#features" 
            className="text-sm text-slate-700 hover:text-slate-900 uppercase tracking-wide relative transition-colors"
            style={{ fontSize: '14px', letterSpacing: '0.02em' }}
          >
            Features
            <span className="absolute left-0 bottom-[-6px] w-0 h-0.5 bg-[#D97757] transition-all duration-300 hover:w-full"></span>
          </a>
          <a 
            href="index.html#workflow" 
            className="text-sm text-slate-700 hover:text-slate-900 uppercase tracking-wide relative transition-colors"
            style={{ fontSize: '14px', letterSpacing: '0.02em' }}
          >
            How it works
            <span className="absolute left-0 bottom-[-6px] w-0 h-0.5 bg-[#D97757] transition-all duration-300 hover:w-full"></span>
          </a>
          <a 
            href="index.html#safety" 
            className="text-sm text-slate-700 hover:text-slate-900 uppercase tracking-wide relative transition-colors"
            style={{ fontSize: '14px', letterSpacing: '0.02em' }}
          >
            Safety
            <span className="absolute left-0 bottom-[-6px] w-0 h-0.5 bg-[#D97757] transition-all duration-300 hover:w-full"></span>
          </a>
          <a 
            href="guide.html" 
            className="text-sm text-slate-900 font-semibold uppercase tracking-wide relative transition-colors"
            style={{ fontSize: '14px', letterSpacing: '0.02em' }}
          >
            Guide
            <span className="absolute left-0 bottom-[-6px] w-full h-0.5 bg-[#D97757]"></span>
          </a>
          <a 
            href="index.html#faq" 
            className="text-sm text-slate-700 hover:text-slate-900 uppercase tracking-wide relative transition-colors"
            style={{ fontSize: '14px', letterSpacing: '0.02em' }}
          >
            FAQ
            <span className="absolute left-0 bottom-[-6px] w-0 h-0.5 bg-[#D97757] transition-all duration-300 hover:w-full"></span>
          </a>
        </nav>

        {/* Search Bar - Compact version */}
        <div className="hidden md:flex flex-1 max-w-xs mx-4">
          <form onSubmit={handleSubmit} className="w-full relative">
            <div className={`
              relative flex items-center w-full rounded-full transition-all duration-200 border
              ${isFocused 
                ? 'bg-white border-[#D97757] ring-2 ring-[#D97757]/10 shadow-md' 
                : 'bg-slate-100/80 border-transparent hover:bg-slate-200/70'
              }
            `}>
              <div className="pl-3 pr-2 text-slate-400">
                <i className="fas fa-search text-xs"></i>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search..."
                className="w-full bg-transparent py-1.5 px-1 text-xs text-slate-900 focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </form>
        </div>

        {/* Right side CTA */}
        <div className="flex items-center gap-3">
          {/* Language Dropdown */}
          <div className="hidden md:block relative">
            <select 
              aria-label="Language"
              className="appearance-none rounded-full border border-[rgba(20,20,19,0.2)] bg-[#faf9f5] px-4 py-1.5 pr-8 text-xs uppercase tracking-wider cursor-pointer hover:bg-white transition-colors"
              style={{ fontFamily: '"Poppins", Arial, sans-serif', letterSpacing: '0.08em' }}
              value={locale}
              onChange={(event) => onLocaleChange(event.target.value as Locale)}
            >
              <option value="en">English</option>
              <option value="zh">简体中文</option>
              <option value="ja">日本語</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#D97757] text-xs">v</div>
          </div>

          {/* Get Started Button */}
          <a 
            href="index.html" 
            className="hidden md:flex items-center px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-medium uppercase tracking-wide hover:bg-slate-800 transition-colors shadow-sm"
            style={{ fontFamily: '"Poppins", Arial, sans-serif', letterSpacing: '0.04em' }}
          >
            Get Started
          </a>

          {/* Mobile Search Icon */}
          <button
            onClick={() => inputRef.current?.focus()}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Search"
          >
            <i className="fas fa-search text-lg"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
