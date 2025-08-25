import React from 'react';
import { BarChart3 } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <BarChart3 className="h-6 w-6 text-teal-400" />
            <span className="text-lg font-bold text-white font-serif">わびさびトレード塾</span>
          </div>
          <div className="text-sm text-zinc-400">
            <p>&copy; {currentYear} Wabisabi Trade Dojo. All Rights Reserved.</p>
            <p className="text-center sm:text-right mt-1">
              <a href="#" className="hover:text-teal-400 transition-colors">プライバシーポリシー</a> | <a href="#" className="hover:text-teal-400 transition-colors">利用規約</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Dummy import
const LucideLoader = () => BarChart3;

export default Footer;