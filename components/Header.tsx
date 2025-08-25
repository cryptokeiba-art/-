import React from 'react';
import { BarChart3, Pencil } from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, isEditMode, onToggleEditMode }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onGoHome}
          >
            <BarChart3 className="h-7 w-7 text-teal-400" />
            <span className="text-xl font-bold tracking-tight text-white font-serif">わびさびトレード塾</span>
          </div>
          <nav className="flex items-center space-x-4">
             <div className="flex items-center space-x-2 mr-4 border-r border-zinc-700/50 pr-6">
                <Pencil className={`h-5 w-5 transition-colors ${isEditMode ? 'text-teal-400' : 'text-zinc-500'}`} />
                <label htmlFor="edit-mode-toggle" className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="edit-mode-toggle" className="sr-only peer" checked={isEditMode} onChange={onToggleEditMode} />
                  <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-500/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
                <span className={`text-sm font-medium transition-colors hidden md:block ${isEditMode ? 'text-white' : 'text-zinc-400'}`}>編集モード</span>
              </div>
             <a href="#features" onClick={(e) => { e.preventDefault(); onGoHome(); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 0); }} className="text-sm font-medium text-zinc-300 hover:text-teal-400 transition-colors hidden sm:block">特徴</a>
             <a href="#schedule" onClick={(e) => { e.preventDefault(); onGoHome(); setTimeout(() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' }), 0); }} className="text-sm font-medium text-zinc-300 hover:text-teal-400 transition-colors hidden sm:block">日程</a>
             <a href="#blog" onClick={(e) => { e.preventDefault(); onGoHome(); setTimeout(() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }), 0); }} className="text-sm font-medium text-zinc-300 hover:text-teal-400 transition-colors hidden sm:block">ブログ</a>
             <a href="#pricing" onClick={(e) => { e.preventDefault(); onGoHome(); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 0); }} className="text-sm font-medium text-zinc-300 hover:text-teal-400 transition-colors hidden sm:block">価格</a>
             <a href="#faq" onClick={(e) => { e.preventDefault(); onGoHome(); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 0); }} className="text-sm font-medium text-zinc-300 hover:text-teal-400 transition-colors hidden sm:block">よくある質問</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); onGoHome(); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 0); }} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-all duration-300 shadow-lg shadow-teal-600/20">
              今すぐ申し込む
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Dummy import to ensure lucide-react is included
// In a real project, this would be managed by the bundler
const LucideLoader = () => [BarChart3, Pencil];

export default Header;