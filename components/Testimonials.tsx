import React from 'react';
import type { Testimonial } from '../types';
import { Star } from 'lucide-react';

const testimonialsData: Testimonial[] = [
  {
    quote: "これはただのトレーディング講座ではありません。クリモネサイクルだけでも、私のスイングトレードを完全に変えました。市場に反応するのではなく、市場の先を行っているとようやく感じられるようになりました。",
    name: 'Sarah J.',
    role: '専業トレーダー',
    avatar: 'https://picsum.photos/id/43/100/100',
  },
  {
    quote: "最初は懐疑的でしたが、オプトマEMAシステムは純粋に天才的です。市場のノイズを大幅にフィルタリングし、信じられないほど明確なシグナルを出してくれます。参加以来、私の収益性は30%以上向上しました。",
    name: 'Michael B.',
    role: '暗号資産投資家',
    avatar: 'https://picsum.photos/id/40/100/100',
  },
  {
    quote: "アレックスが教える需給分析の方法は衝撃的です。まるで新しい言語を学んでいるようです。これまで不可能だと思っていた方法で、市場の意図を読み取れるようになりました。強くお勧めします！",
    name: 'David L.',
    role: '兼業FXトレーダー',
    avatar: 'https://picsum.photos/id/177/100/100',
  },
];

const Rating: React.FC<{ count: number }> = ({ count }) => (
    <div className="flex items-center">
        {[...Array(count)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
        ))}
    </div>
);


const Testimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">受講生の声</h2>
          <p className="mt-4 text-lg text-zinc-400">「わびさびトレード」を実践するトレーダーたちが、どのように成果を変えているかをご覧ください。</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800/50 flex flex-col">
              <div className="flex-grow">
                <Rating count={5} />
                <p className="mt-4 text-zinc-300 italic">"{testimonial.quote}"</p>
              </div>
              <div className="mt-6 flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="ml-4">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-zinc-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dummy imports
const LucideLoader = () => Star;

export default Testimonials;