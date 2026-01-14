
import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onToggleMobileMenu, isMobileMenuOpen }) => {
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
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-4 md:px-8">
      <div className="flex items-center gap-4 w-full max-w-7xl mx-auto">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Toggle Menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>

        {/* Logo (visible on mobile only since desktop has it in sidebar) */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 bg-[#D97757] rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-users-cog"></i>
          </div>
          <span className="font-bold text-lg text-slate-900 truncate max-w-[120px]">Cowork</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="w-full relative group">
            <div className={`
              relative flex items-center w-full rounded-full transition-all duration-200 border
              ${isFocused 
                ? 'bg-white border-[#D97757] ring-4 ring-[#D97757]/10 shadow-lg shadow-[#D97757]/5' 
                : 'bg-slate-100 border-transparent hover:bg-slate-200/70'
              }
            `}>
              <div className="pl-4 pr-2 text-slate-400">
                <i className="fas fa-search text-sm"></i>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search guide... (Cmd + K)"
                className="w-full bg-transparent py-2 px-2 text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
              />
              <div className="hidden sm:flex items-center pr-3 pointer-events-none">
                <kbd className="px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded shadow-sm uppercase tracking-tighter">
                  ⌘ K
                </kbd>
              </div>
            </div>
          </form>
        </div>

        {/* Right side spacer/actions */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://github.com/anthropics" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-slate-900 transition-colors p-2"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
