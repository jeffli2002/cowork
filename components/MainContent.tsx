
import React from 'react';
import { Section } from '../types';

interface MainContentProps {
  section: Section;
  loading: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ section, loading }) => {
  // Helper to extract YouTube ID from various URL formats
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Find all YouTube links in a string (for fallback extraction from text)
  const extractYoutubeLinksFromText = (text: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({ title: 'Feature Video', uri: match[0] });
    }
    return matches;
  };

  // Enhanced markdown renderer
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentCodeBlock: string[] = [];
    let isInsideCodeBlock = false;

    lines.forEach((line, idx) => {
      if (line.trim().startsWith('```')) {
        if (isInsideCodeBlock) {
          elements.push(
            <pre key={`code-${idx}`}>
              <code>{currentCodeBlock.join('\n')}</code>
            </pre>
          );
          currentCodeBlock = [];
          isInsideCodeBlock = false;
        } else {
          isInsideCodeBlock = true;
        }
        return;
      }

      if (isInsideCodeBlock) {
        currentCodeBlock.push(line);
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(<h1 key={idx} className="text-4xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">{line.replace('# ', '')}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={idx} className="text-2xl font-bold text-slate-800 mt-10 mb-4">{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={idx} className="text-xl font-semibold text-slate-800 mt-6 mb-3">{line.replace('### ', '')}</h3>);
      } 
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(<li key={idx} className="ml-6 list-disc mb-1 text-slate-700">{processInlineStyles(line.substring(2))}</li>);
      } 
      else if (line.trim() === '') {
        elements.push(<div key={idx} className="h-4" />);
      } 
      else {
        elements.push(<p key={idx} className="text-slate-700 leading-relaxed mb-4">{processInlineStyles(line)}</p>);
      }
    });

    return elements;
  };

  const processInlineStyles = (text: string) => {
    // Match markdown links [text](url), bold **text**, and code `text`
    const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      // Markdown link: [text](url)
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const [, linkText, linkUrl] = linkMatch;
        return (
          <a
            key={i}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D97757] hover:text-[#c06548] underline font-medium transition-colors"
          >
            {linkText}
          </a>
        );
      }
      // Bold text: **text**
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      // Code: `text`
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  // Combine sources from metadata and links found in the text
  const metadataYoutube = section.sources?.filter(s => 
    s.uri.includes('youtube.com') || s.uri.includes('youtu.be')
  ) || [];
  
  const textYoutube = section.content ? extractYoutubeLinksFromText(section.content) : [];
  
  // Deduplicate by video ID
  const allYoutubeSources: Array<{title: string, uri: string}> = [];
  const seenIds = new Set();
  
  [...metadataYoutube, ...textYoutube].forEach(s => {
    const id = getYoutubeId(s.uri);
    if (id && !seenIds.has(id)) {
      seenIds.add(id);
      allYoutubeSources.push(s);
    }
  });

  return (
    <div className="flex-1 min-h-screen bg-white max-w-4xl mx-auto px-6 py-12 md:px-12">
      {loading ? (
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-slate-100 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-100 rounded"></div>
            <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            <div className="h-4 bg-slate-100 rounded w-4/6"></div>
          </div>
          <div className="h-64 bg-slate-50 rounded-xl"></div>
        </div>
      ) : (
        <article className="prose prose-slate max-w-none">
          <header className="mb-10">
            <div className="flex items-center gap-4 text-[#D97757] mb-4">
              <i className={`fas ${section.icon} text-2xl`}></i>
              <span className="text-sm font-bold uppercase tracking-widest">Guide Section</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">{section.title}</h1>
          </header>

          <div className="content-area">
            {section.content ? renderMarkdown(section.content) : (
              <p className="text-slate-400 italic">No content available for this section yet.</p>
            )}
          </div>

          {allYoutubeSources.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <i className="fab fa-youtube text-red-600"></i>
                Video Resources
              </h4>
              <div className="grid grid-cols-1 gap-10">
                {allYoutubeSources.map((source, idx) => {
                  const videoId = getYoutubeId(source.uri);
                  if (!videoId) return null;
                  
                  return (
                    <div key={idx} className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/30 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="aspect-video w-full bg-slate-900 relative">
                        <iframe
                          className="h-full w-full relative z-10"
                          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                          title={source.title || "YouTube Video"}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                        {/* Fallback UI if embed is blocked or unavailable */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-100 text-slate-500 z-0">
                          <i className="fas fa-video-slash text-4xl mb-4"></i>
                          <p className="text-sm font-medium mb-4">Video might be restricted from embedding.</p>
                          <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 bg-[#D97757] text-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#c06548] transition-all"
                          >
                            <i className="fab fa-youtube"></i>
                            Watch on YouTube
                          </a>
                        </div>
                      </div>
                      <div className="p-6 bg-white border-t border-slate-100">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h5 className="font-bold text-slate-900 text-lg mb-1">{source.title || "Feature Overview"}</h5>
                            <p className="text-slate-500 text-xs flex items-center gap-2">
                              <i className="fas fa-info-circle text-slate-400"></i>
                              Official tutorial resource
                            </p>
                          </div>
                          <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 text-[#D97757] hover:underline font-bold text-sm whitespace-nowrap"
                          >
                            Open Link <i className="fas fa-external-link-alt text-[10px]"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      )}
    </div>
  );
};

export default MainContent;
