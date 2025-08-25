import React from 'react';
import { CalendarDays, MapPin, ExternalLink } from 'lucide-react';

interface ScheduleItem {
  title: string;
  location: string;
  dates: { label: string; date: string }[];
  status: string;
  statusColor: string;
}

const scheduleData: ScheduleItem[] = [
  {
    title: 'プレミアム対面コース',
    location: '大阪本校',
    dates: [
      { label: '第一期 開講日', date: '2024年10月5日 (土)' },
      { label: '申込締切', date: '2024年9月27日 (金)' },
    ],
    status: '募集中',
    statusColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
  },
  {
    title: 'ハイブリッド集中コース',
    location: '東京・名古屋',
    dates: [
      { label: '第一期 集中講座', date: '2024年11月16日 (土)' },
      { label: '申込締切', date: '2024年11月8日 (金)' },
    ],
    status: '満席間近',
    statusColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  },
  {
    title: '完全オンラインコース',
    location: '全国対応',
    dates: [
      { label: '受講開始', date: 'お申し込み後、即時開始可能' },
      { label: '申込期間', date: '常時受付中' },
    ],
    status: '受付中',
    statusColor: 'bg-zinc-600/50 text-zinc-300 border border-zinc-500/30',
  },
];

const Schedule: React.FC = () => {
  return (
    <section id="schedule" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">開催日程</h2>
          <p className="mt-4 text-lg text-zinc-400">あなたの学びのスタイルに合わせたコースの開催日程です。席には限りがございますので、お早めにご検討ください。</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {scheduleData.map((item, index) => (
            <div key={index} className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800/50 flex flex-col transition-all duration-300 hover:border-teal-500/50 hover:bg-zinc-900 hover:-translate-y-1">
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif">{item.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-zinc-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
                <ul className="mt-6 space-y-4 border-t border-zinc-800/50 pt-6">
                  {item.dates.map((d, i) => (
                    <li key={i} className="flex items-center text-zinc-300">
                      <CalendarDays className="h-5 w-5 mr-3 text-teal-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-zinc-400">{d.label}</p>
                        <p className="font-semibold">{d.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <a 
              href="#" // ここにGoogleスプレッドシートの公開リンクを挿入します
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-zinc-700/50 rounded-lg border border-zinc-600 hover:bg-zinc-700 hover:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-zinc-950 transition-all duration-300"
            >
              最新の詳しい日程はこちら (Googleスプレッドシート)
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
        </div>
      </div>
    </section>
  );
};

// Dummy imports
const LucideLoader = () => [CalendarDays, MapPin, ExternalLink];

export default Schedule;