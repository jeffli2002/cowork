
import React from 'react';
import { SectionKey } from '../types';

interface SidebarProps {
  activeSection: SectionKey;
  onSectionSelect: (key: SectionKey) => void;
  sections: Record<SectionKey, { title: string; icon: string }>;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionSelect, sections }) => {
  return (
    <div className="w-68 h-screen fixed top-16 left-0 bg-white border-r border-slate-200 flex flex-col hidden md:flex shrink-0">
      <div className="p-8 border-b border-slate-100 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#D97757] rounded-xl flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-users-cog"></i>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">Cowork Guide</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-8 px-5">
        <div className="space-y-1.5">
          {(Object.keys(sections) as SectionKey[]).map((key) => {
            const section = sections[key];
            const isActive = activeSection === key;
            return (
              <button
                key={key}
                onClick={() => onSectionSelect(key)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                  isActive 
                    ? 'bg-[#f5f3ef] text-[#D97757] shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <i className={`fas ${section.icon} w-5 text-center ${isActive ? 'text-[#D97757]' : 'text-slate-400'}`}></i>
                {section.title}
              </button>
            );
          })}
        </div>
        
        <div className="mt-12 px-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-6">Support & Community</h4>
          <a 
            href="https://github.com/anthropics" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3.5 text-sm font-medium text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <i className="fab fa-github w-5 text-center opacity-70"></i> GitHub
          </a>
          <a 
            href="https://discord.gg/anthropic" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <i className="fab fa-discord w-5 text-center opacity-70"></i> Official Discord
          </a>
        </div>
      </nav>
      
      <div className="p-6 border-t border-slate-100 bg-slate-50/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Systems Operational</span>
        </div>
        <p className="text-[10px] text-slate-400">Version 1.1.0-release</p>
      </div>
    </div>
  );
};

export default Sidebar;
