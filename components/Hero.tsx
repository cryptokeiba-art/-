import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-zinc-900 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 leading-tight md:leading-snug font-serif">
          <span className="text-teal-400">静寂</span>の中で、相場の本質を見抜く
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-400">
          ニュース、専門家の意見、市況コメント — あらゆる外部ノイズを遮断し、チャートそのものが語る声に耳を澄ます。本当に必要な道具だけで相場の機微を察知し、静かに、そして継続的に利益を積み上げる。それが『わびさびトレード』です。
        </p>
        <div className="mt-10 flex flex-col justify-center items-center gap-4">
          <p className="text-sm text-zinc-400 tracking-wider">【第一期生募集】定員20名に達し次第、受付を終了します。</p>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-teal-600 rounded-lg shadow-lg shadow-teal-600/30 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-zinc-950 transition-all duration-300 transform hover:scale-105"
          >
            講座詳細・申込はこちら
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Dummy import for lucide-react
const LucideLoader = () => ArrowRight;

export default Hero;