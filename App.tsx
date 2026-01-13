
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';
import Footer from './components/Footer';
import { SectionKey, DocumentationData, Locale } from './types';
import { fetchSectionContent, searchDocumentation } from './services/staticContentService';

const SECTIONS_CONFIG: Record<SectionKey, { title: string; icon: string }> = {
  introduction: { title: 'Introduction', icon: 'fa-info-circle' },
  installation: { title: 'Installation', icon: 'fa-download' },
  authentication: { title: 'Authentication', icon: 'fa-key' },
  basicUsage: { title: 'Basic Usage', icon: 'fa-terminal' },
  advancedFeatures: { title: 'Advanced Features', icon: 'fa-rocket' },
  troubleshooting: { title: 'Troubleshooting', icon: 'fa-bug' }
};

const LOCALE_KEY = 'coworkLocale';
const SUPPORTED_LOCALES: Locale[] = ['en', 'zh', 'ja', 'es', 'de', 'fr'];
const LOCALE_PREFIXES: Record<Locale, string> = {
  en: '/en/',
  zh: '/zh/',
  ja: '/ja/',
  es: '/es/',
  de: '/de/',
  fr: '/fr/'
};
const LOCALE_GUIDE_PATHS: Record<Locale, string> = {
  en: '/en/guide.html',
  zh: '/zh/guide.html',
  ja: '/ja/guide.html',
  es: '/es/guide.html',
  de: '/de/guide.html',
  fr: '/fr/guide.html'
};

const normalizeLocale = (value: string | null | undefined): Locale => {
  if (!value) {
    return 'en';
  }
  const lower = value.toLowerCase();
  if (lower.startsWith('zh')) {
    return 'zh';
  }
  if (lower.startsWith('ja')) {
    return 'ja';
  }
  if (lower.startsWith('es')) {
    return 'es';
  }
  if (lower.startsWith('de')) {
    return 'de';
  }
  if (lower.startsWith('fr')) {
    return 'fr';
  }
  return 'en';
};

const getLocaleFromPath = (): Locale | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const path = window.location.pathname;
  const matched = (Object.keys(LOCALE_PREFIXES) as Locale[]).find((locale) =>
    path.startsWith(LOCALE_PREFIXES[locale])
  );
  return matched || null;
};

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return 'en';
  }
  const pathLocale = getLocaleFromPath();
  if (pathLocale) {
    return pathLocale;
  }
  const stored = window.localStorage.getItem(LOCALE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
    return stored as Locale;
  }
  return normalizeLocale(window.navigator.language);
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('introduction');
  const [docsData, setDocsData] = useState<Partial<DocumentationData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const loadSection = useCallback(async (key: SectionKey) => {
    if (docsData[key]) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const { content, sources } = await fetchSectionContent(key, SECTIONS_CONFIG[key].title);
    
    setDocsData(prev => ({
      ...prev,
      [key]: {
        id: key,
        title: SECTIONS_CONFIG[key].title,
        icon: SECTIONS_CONFIG[key].icon,
        content,
        sources
      }
    }));
    setLoading(false);
  }, [docsData]);

  useEffect(() => {
    if (!searchQuery) {
      loadSection(activeSection);
    }
  }, [activeSection, loadSection, searchQuery]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(LOCALE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const handleLocaleChange = (nextLocale: Locale) => {
    setLocale(nextLocale);
    if (typeof window === 'undefined') {
      return;
    }
    if (window.location.pathname.endsWith('guide.html')) {
      const target = LOCALE_GUIDE_PATHS[nextLocale];
      if (target && window.location.pathname !== target) {
        window.location.href = target;
      }
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setSearchResult(null);
    setIsSearching(true);
    
    // Quick local navigation if query matches a section title exactly
    const matchedKey = (Object.keys(SECTIONS_CONFIG) as SectionKey[]).find(
      key => SECTIONS_CONFIG[key].title.toLowerCase() === query.toLowerCase()
    );

    if (matchedKey) {
      setActiveSection(matchedKey);
      setSearchQuery(''); 
      setIsSearching(false);
      return;
    }

    // Otherwise, perform local text search
    const result = await searchDocumentation(query);
    setSearchResult(result);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
  };

  const currentSection = docsData[activeSection] || {
    id: activeSection,
    title: SECTIONS_CONFIG[activeSection].title,
    icon: SECTIONS_CONFIG[activeSection].icon,
    content: ''
  };

  // Construct a virtual section for search results display
  const searchDisplaySection = {
    id: 'search',
    title: `Search: ${searchQuery}`,
    icon: 'fa-search',
    content: searchResult || '',
    sources: []
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcf9]">
      <Sidebar 
        activeSection={activeSection} 
        onSectionSelect={(key) => {
          setActiveSection(key);
          clearSearch();
        }} 
        sections={SECTIONS_CONFIG} 
      />

      <Header 
        onSearch={handleSearch} 
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        locale={locale}
        onLocaleChange={handleLocaleChange}
      />

      <div className="flex-1 flex flex-col min-w-0 md:ml-68 pt-16">

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-white w-4/5 h-full p-6 shadow-2xl animate-slide-in" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                <div className="w-9 h-9 bg-[#D97757] rounded-xl flex items-center justify-center text-white">
                  <i className="fas fa-users-cog"></i>
                </div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Cowork Guide</span>
              </div>
              <div className="space-y-1.5">
                {(Object.keys(SECTIONS_CONFIG) as SectionKey[]).map((key) => {
                  const section = SECTIONS_CONFIG[key];
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveSection(key);
                        clearSearch();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all ${
                        activeSection === key && !searchQuery ? 'bg-[#f5f3ef] text-[#D97757]' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <i className={`fas ${section.icon} w-6 text-center`}></i>
                      <span className="font-bold">{section.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-x-hidden pb-40">
          {searchQuery ? (
            <div className="max-w-4xl mx-auto px-6 py-12 md:px-12">
              <button 
                onClick={clearSearch}
                className="mb-8 flex items-center gap-2 text-sm font-bold text-[#D97757] hover:bg-[#D97757]/5 px-4 py-2 rounded-lg transition-colors w-fit"
              >
                <i className="fas fa-arrow-left"></i>
                Back to documentation
              </button>
              <MainContent section={searchDisplaySection} loading={isSearching} />
            </div>
          ) : (
            <MainContent section={currentSection} loading={loading} />
          )}
        </main>
        
        <Footer locale={locale} />
      </div>

      {/* Quick Access FAB (Mobile) */}
      {!searchQuery && (
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <button className="w-14 h-14 bg-[#D97757] text-white rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-transform hover:shadow-2xl">
            <i className="fas fa-question text-xl"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
