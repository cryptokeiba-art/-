import React, { useState } from 'react';
import { Check, ArrowRight, Home, Users, Globe, Landmark, CreditCard, Wallet } from 'lucide-react';
import { curriculumData } from './Curriculum'; // Curriculumからモジュールデータをインポート

type PlanTab = 'new' | 'existing';

const NewStudentPlans = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
    {/* Plan 1: Osaka */}
    <div className="rounded-2xl border-2 border-teal-500 bg-zinc-900 p-8 shadow-2xl shadow-teal-500/20 flex flex-col">
      <div className="flex-grow">
        <div className="flex items-center gap-3">
          <Home className="w-7 h-7 text-teal-400" />
          <h3 className="text-2xl font-semibold text-white font-serif">プレミアム対面コース</h3>
        </div>
        <p className="mt-1 text-zinc-400 text-sm">【大阪本校】</p>
        <p className="mt-4 text-zinc-300">全カリキュラムを対面で。深い理解と実践力を養成する最上位コース。</p>
        <div className="mt-6">
          <span className="text-5xl font-extrabold tracking-tight text-white">¥298,000</span>
          <span className="text-lg font-medium text-zinc-400"> (税込)</span>
        </div>
        <ul role="list" className="mt-6 space-y-3 text-sm leading-6 text-zinc-300">
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />全モジュールの対面講義</li>
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />完全オンラインコースの全コンテンツ</li>
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />プライベートコミュニティ</li>
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />永久アクセス権 &amp; 将来のアップデート</li>
        </ul>
      </div>
      <a href="#" className="mt-8 flex w-full items-center justify-center rounded-md bg-teal-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-teal-600/30 transition-all duration-300 hover:bg-teal-700 transform hover:scale-105">
        プレミアム対面コースに申し込む
      </a>
    </div>

    {/* Plan 2: Tokyo/Nagoya */}
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-8 flex flex-col">
      <div className="flex-grow">
        <div className="flex items-center gap-3">
          <Users className="w-7 h-7 text-teal-400" />
          <h3 className="text-2xl font-semibold text-white font-serif">ハイブリッド集中コース</h3>
        </div>
        <p className="mt-1 text-zinc-400 text-sm">【東京・名古屋】</p>
        <p className="mt-4 text-zinc-300">対面集中講座とオンライン学習の組み合わせで、効率的に本質を学ぶ。</p>
        <div className="mt-6">
          <span className="text-5xl font-extrabold tracking-tight text-white">¥248,000</span>
          <span className="text-lg font-medium text-zinc-400"> (税込)</span>
        </div>
        <ul role="list" className="mt-6 space-y-3 text-sm leading-6 text-zinc-300">
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />1-Day 対面集中ブートキャンプ</li>
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />完全オンラインコースの全コンテンツ</li>
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />プライベートコミュニティ</li>
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />永久アクセス権 &amp; 将来のアップデート</li>
        </ul>
      </div>
       <a href="#" className="mt-8 flex w-full items-center justify-center rounded-md bg-zinc-700 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-zinc-600">
        ハイブリッドコースに申し込む
      </a>
    </div>
    
    {/* Plan 3: Online */}
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-8 flex flex-col">
       <div className="flex-grow">
        <div className="flex items-center gap-3">
          <Globe className="w-7 h-7 text-teal-400" />
          <h3 className="text-2xl font-semibold text-white font-serif">完全オンラインコース</h3>
        </div>
        <p className="mt-1 text-zinc-400 text-sm">【全国対応】</p>
        <p className="mt-4 text-zinc-300">時間と場所を選ばずに、自分のペースでわびさびトレードの全てを学ぶ。</p>
        <div className="mt-6">
          <span className="text-5xl font-extrabold tracking-tight text-white">¥198,000</span>
          <span className="text-lg font-medium text-zinc-400"> (税込)</span>
        </div>
        <ul role="list" className="mt-6 space-y-3 text-sm leading-6 text-zinc-300">
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />HDビデオレッスン全5モジュール</li>
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />独自のオプトマEMAインジケーター</li>
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />プライベートコミュニティ</li>
          <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-teal-500" />永久アクセス権 &amp; 将来のアップデート</li>
        </ul>
      </div>
      <a href="#" className="mt-8 flex w-full items-center justify-center rounded-md bg-zinc-700 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-zinc-600">
        オンラインコースに申し込む
      </a>
    </div>
  </div>
);

const ExistingStudentPlans = () => (
  <div className="mt-12">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white font-serif">必要な知識を、ピンポイントで。</h3>
      <p className="mt-2 text-zinc-400">過去に単発講座を受講された方は、学習したいモジュールを個別にご購入いただけます。</p>
    </div>
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {curriculumData.slice(1).map((module) => ( // 基礎モジュールを除外
        <div key={module.title} className="rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-6 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-white text-lg">{module.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              {module.lessons.map(lesson => (
                <li key={lesson} className="flex items-start gap-x-2">
                  <Check className="h-4 w-4 mt-1 flex-none text-teal-500" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-3xl font-bold text-white">¥49,800 <span className="text-base font-medium text-zinc-400">(税込)</span></p>
            <a href="#" className="mt-4 flex w-full items-center justify-center rounded-md bg-teal-800/50 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-700/50">
              このモジュールを追加
            </a>
          </div>
        </div>
      ))}
    </div>
     <div className="mt-12 text-center text-zinc-400">
        <p>全コースへのアップグレードをご希望の方は、<a href="#" className="text-teal-400 hover:underline">こちらからお問い合わせ</a>ください。過去の受講料を考慮した特別価格をご案内します。</p>
      </div>
  </div>
);


const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlanTab>('new');

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">あなたに合った学び方を選ぶ</h2>
          <p className="mt-4 text-lg text-zinc-400">一度きりのお支払いで、生涯使えるトレード技術を。あなたの目標とライフスタイルに合わせて、最適なプランをお選びください。</p>
          <p className="mt-6 text-teal-300 bg-teal-900/50 inline-block px-4 py-2 rounded-full border border-teal-700"><strong>【第一期生 限定20名】</strong>講師が一人ひとりと向き合う、プレミアムな学習環境です。</p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="relative flex rounded-full bg-zinc-800 p-1">
            <button
              onClick={() => setActiveTab('new')}
              className={`relative w-1/2 rounded-full py-2 px-6 text-sm font-medium transition-colors ${
                activeTab === 'new' ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              新規で学ぶ方
            </button>
            <button
              onClick={() => setActiveTab('existing')}
              className={`relative w-1/2 rounded-full py-2 px-6 text-sm font-medium transition-colors ${
                activeTab === 'existing' ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              再受講・モジュール追加の方
            </button>
             <div
              className={`absolute top-0 bottom-0 m-1 w-[calc(50%-0.25rem)] rounded-full bg-teal-600/50 transition-transform duration-300 ease-in-out ${
                activeTab === 'new' ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{ width: 'calc(50% - 0.25rem)' }}
            />
          </div>
        </div>
        
        {activeTab === 'new' ? <NewStudentPlans /> : <ExistingStudentPlans />}

        <div className="mt-20 max-w-5xl mx-auto border-t border-zinc-800/50 pt-10">
          <h3 className="text-2xl font-bold text-center text-white font-serif">お支払い方法について</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-zinc-950/50 p-6 rounded-lg border border-zinc-800/50">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4 mx-auto">
                  <Landmark className="h-6 w-6 text-teal-400" />
              </div>
              <h4 className="text-xl font-semibold text-white">銀行振込</h4>
              <p className="mt-2 text-zinc-400">お申し込み後、振込先口座情報をメールにてご案内します。お手数ですが、振込手数料はご負担くださいますようお願いいたします。</p>
            </div>
            <div className="bg-zinc-950/50 p-6 rounded-lg border border-zinc-800/50">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4 mx-auto">
                  <CreditCard className="h-6 w-6 text-teal-400" />
              </div>
              <h4 className="text-xl font-semibold text-white">クレジットカード</h4>
              <p className="mt-2 text-zinc-400">ご希望の方には、安全な決済サービス(Square等)を通じて個別に請求書をお送りします。分割払いも可能ですので、お申し込み時にお知らせください。</p>
            </div>
            <div className="bg-zinc-950/50 p-6 rounded-lg border border-zinc-800/50">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4 mx-auto">
                  <Wallet className="h-6 w-6 text-teal-400" />
              </div>
              <h4 className="text-xl font-semibold text-white">現金払い (対面限定)</h4>
              <p className="mt-2 text-zinc-400">プレミアム対面・ハイブリッドコースにご参加の方限定で、講座初日に会場で直接お支払いいただけます。</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// We need to import the curriculum data to power the "existing student" plans
// so we also need a dummy component to ensure it's bundled.
// This is a workaround for the single-file build environment.
const CurriculumViewer = () => {
    const data = curriculumData;
    return <div style={{display: 'none'}}>{JSON.stringify(data)}</div>
}


// Dummy imports
const LucideLoader = () => [Check, ArrowRight, Home, Users, Globe, Landmark, CreditCard, Wallet, CurriculumViewer];

export default Pricing;