import React, { useState } from 'react';
import type { Module } from '../types';
import { ChevronDown, BookOpen, Check } from 'lucide-react';

export const curriculumData: Module[] = [
    {
      title: "モジュール1：基礎 - 市場の原則",
      lessons: ["市場構造の理解", "トレーディングの心理学", "リスク管理の基礎", "トレーディング環境の構築"]
    },
    {
      title: "モジュール2：クリモネサイクルの解明",
      lessons: ["サイクル分析入門", "高値と安値の特定", "時間ベースのサイクル予測", "サイクルとプライスアクションの統合"]
    },
    {
      title: "モジュール3：オプトマEMAシステム",
      lessons: ["なぜ標準的なEMAは機能しないのか", "当社独自のEMA設定", "オプトマEMAによるトレンドの特定", "クロスオーバーとバウンス戦略"]
    },
    {
      title: "モジュール4：需給分析 - 市場の内実を読む",
      lessons: ["ローソク足から市場心理を読む", "出来高プロファイル入門", "価格帯別出来高の活用法", "ローソク足と出来高の統合分析"]
    },
    {
      title: "モジュール5：統合 - すべてを結びつける",
      lessons: ["トレーディングプランの作成", "高確率なセットアップ", "戦略のバックテスト", "ライブトレードの解説"]
    }
];

interface AccordionItemProps {
    module: Module;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ module, isOpen, onClick }) => {
    return (
        <div className="border border-zinc-800/50 rounded-lg overflow-hidden">
            <button
                className="w-full flex justify-between items-center p-5 text-left bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
                onClick={onClick}
            >
                <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-3 text-teal-400 flex-shrink-0" />
                    <span className="font-semibold text-lg text-white">{module.title}</span>
                </div>
                <ChevronDown
                    className={`h-6 w-6 text-zinc-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-5 bg-zinc-950/50">
                    <ul className="space-y-3">
                        {module.lessons.map((lesson, index) => (
                            <li key={index} className="flex items-center text-zinc-300">
                                <Check className="h-4 w-4 mr-3 text-teal-500 flex-shrink-0" />
                                {lesson}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Curriculum: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="curriculum" className="py-20 sm:py-24 bg-zinc-950/70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">講座内容</h2>
                    <p className="mt-4 text-lg text-zinc-400">基礎知識から実践的な上級戦略までを網羅した、ステップバイステップのロードマップ。各モジュールは前のモジュールの上に構築され、包括的なトレーディングシステムを形成します。</p>
                </div>
                <div className="mt-16 max-w-3xl mx-auto space-y-4">
                    {curriculumData.map((module, index) => (
                        <AccordionItem
                            key={index}
                            module={module}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Dummy imports
const LucideLoader = () => [ChevronDown, BookOpen, Check];

export default Curriculum;