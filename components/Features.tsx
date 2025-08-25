import React from 'react';
import type { Feature } from '../types';
import { Zap, Repeat, BarChartHorizontal } from 'lucide-react';

const featuresData: Feature[] = [
  {
    icon: Repeat,
    title: 'クリモネサイクルー独自のサイクル理論',
    description: '市場サイクルを特定するための独自のアプローチを発見し、驚くほどの精度で主要な転換点を予測できるようになります。'
  },
  {
    icon: Zap,
    title: 'オプトマEMAー最適化MAを駆使する',
    description: '市場のボラティリティに適応するカスタム調整された指数平滑移動平均線（EMA）の使用法を学び、明確なエントリーおよびエグジットシグナルを得られます。'
  },
  {
    icon: BarChartHorizontal,
    title: '需給分析',
    description: 'ローソク足と出来高プロファイルで相場の内実を知る。'
  }
];

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const Icon = feature.icon;
  return (
    <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800/50 transition-all duration-300 hover:border-teal-500/50 hover:bg-zinc-900 hover:-translate-y-1">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
        <Icon className="h-6 w-6 text-teal-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-serif">{feature.title}</h3>
      <p className="text-zinc-400">{feature.description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">わびさびトレードを構成する三種の神器</h2>
          <p className="mt-4 text-lg text-zinc-400">余計なものを削ぎ落とし、本質だけを追求する。私たちの手法は、3つの強力な分析ツールを組み合わせ、相場と対話するための完全なフレームワークを提供します。</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Dummy imports for lucide-react
const LucideLoader = () => [Zap, BarChartHorizontal, Repeat];

export default Features;