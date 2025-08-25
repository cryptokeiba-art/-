import React, { useState } from 'react';
import type { FAQItem } from '../types';
import { ChevronDown } from 'lucide-react';

const faqData: FAQItem[] = [
    {
        question: "この講座は初心者向けですか？",
        answer: "もちろんです。モジュール1では基礎から始め、高度な独自戦略に進む前に強力な土台を築きます。全くの初心者でも、ある程度の経験がある方でも、非常に価値を見出していただけるはずです。"
    },
    {
        question: "なぜ募集人数を20名に限定しているのですか？",
        answer: "講師であるクリモネが、受講生一人ひとりの進捗を丁寧に把握し、質の高いフィードバックを提供するためです。これは一方的な講義ではなく、あなたのトレード技術を本気で引き上げるための『塾』です。そのため、質の維持を最優先し、少人数制を採用しています。"
    },
    {
        question: "どのような支払い方法がありますか？",
        answer: "お支払い方法は「銀行振込」「クレジットカード」「現金払い」の3種類をご用意しています。銀行振込とクレジットカード払いは全コースでご利用可能です。現金払いは、プレミアム対面コース（大阪）およびハイブリッド集中コース（東京・名古屋）にご参加の方に限り、講座初日に会場で直接お支払いいただけます。"
    },
    {
        question: "東京や名古屋ではどのような形式で受講できますか？",
        answer: "東京・名古屋では「ハイブリッド集中コース」を提供しています。これは、1日（または週末）の対面集中講座で手法の神髄を直接学び、その後、全ての教材が収録されたオンラインコースでご自身のペースで学習を深めていただく形式です。これにより、移動の負担を最小限に抑えつつ、大阪本校と同じ内容を完全にマスターできます。"
    },
    {
        question: "過去に単発講座を受けましたが、割引はありますか？",
        answer: "はい。過去に受講いただいた方には、2つのオプションをご用意しています。1つ目は、学習したいモジュールだけを個別に追加購入できる「モジュール単位受講」。2つ目は、過去にお支払いいただいた受講料を考慮した特別価格で、全てのコース内容（オンライン教材含む）にアクセスできる「アップグレードプラン」です。詳細はお気軽にお問い合わせください。"
    },
    {
        question: "このシステムはどの市場で機能しますか？",
        answer: "クリモネサイクル、オプトマEMA、需給分析の原則は普遍的です。私たちのシステムは、FX、株式、暗号資産、コモディティに適用できます。講座全体を通して、さまざまな市場からの例を提供します。"
    },
    {
        question: "何か特別なソフトウェアは必要ですか？",
        answer: "TradingView（無料版あり）、MetaTrader、Thinkorswimなど、カスタムEMA入力が可能なチャートプラットフォームが必要です。当社独自のインジケーターはTradingView用に提供されます。"
    },
    {
        question: "返金ポリシーはありますか？",
        answer: "はい、30日間の返金保証を提供しています。最初の2つのモジュールを完了し、この講座が自分に合わないと感じた場合は、サポートチームにご連絡いただければ全額返金いたします。私たちは提供する価値に自信を持っています。"
    },
];

interface AccordionItemProps {
    item: FAQItem;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-zinc-800/50">
            <button
                className="w-full flex justify-between items-center py-5 text-left"
                onClick={onClick}
            >
                <span className="font-semibold text-lg text-white">{item.question}</span>
                <ChevronDown
                    className={`h-6 w-6 text-zinc-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-400' : ''}`}
                />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <p className="pb-5 text-zinc-400">{item.answer}</p>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">よくあるご質問</h2>
                    <p className="mt-4 text-lg text-zinc-400">ご質問はありますか？私たちがお答えします。ここにあなたの質問がない場合は、お気軽にサポートチームにお問い合わせください。</p>
                </div>
                <div className="mt-16 max-w-3xl mx-auto">
                    {faqData.map((item, index) => (
                        <AccordionItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};


// Dummy import
const LucideLoader = () => ChevronDown;

export default FAQ;