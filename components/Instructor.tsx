import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

const Instructor: React.FC = () => {
  return (
    <section className="bg-zinc-900 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 lg:w-5/12">
            <img
              src="https://picsum.photos/id/1005/800/800"
              alt="Course Instructor"
              className="rounded-full aspect-square object-cover shadow-2xl shadow-zinc-950/50 border-4 border-zinc-700"
            />
          </div>
          <div className="md:w-1/2 lg:w-7/12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">講師紹介</h2>
            <p className="mt-4 text-2xl font-semibold text-teal-400 font-serif">クリプトモネダス（クリモネ）</p>
            <p className="mt-4 text-lg text-zinc-400">
              翻訳会社の経営者から転身した異色のプロトレーダー。言葉の機微を読み解くように、相場の本質を追求する中で「わびさびトレード」の原型を構築。複雑な市場から本質的な情報を抽出し、個人投資家が自立するための普遍的な技術を伝えることを使命と考えている。
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-zinc-300">23年以上の市場経験（先物歴12年）</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-zinc-300">数億円規模の自己資産を運用</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-zinc-300">8年以上にわたるSNSでの情報発信実績</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Dummy imports
const LucideLoader = () => [Award, CheckCircle];

export default Instructor;