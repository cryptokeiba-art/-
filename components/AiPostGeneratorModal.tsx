import React, { useState } from 'react';
import { X, Sparkles, Lightbulb, Loader2 } from 'lucide-react';
import { generatePostIdeas, generateFullPost } from '../lib/gemini';
import type { Post } from '../types';

interface AiPostGeneratorModalProps {
  onClose: () => void;
  onPostGenerated: (postData: Partial<Post>) => void;
}

const AiPostGeneratorModal: React.FC<AiPostGeneratorModalProps> = ({ onClose, onPostGenerated }) => {
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGetIdeas = async () => {
    setIsLoadingIdeas(true);
    setError(null);
    setIdeas([]);
    try {
      const suggestedIdeas = await generatePostIdeas();
      if (suggestedIdeas.length > 0) {
        setIdeas(suggestedIdeas);
      } else {
        setError("アイデアを生成できませんでした。もう一度お試しください。");
      }
    } catch (e) {
      setError("エラーが発生しました。");
    } finally {
      setIsLoadingIdeas(false);
    }
  };

  const handleGeneratePost = async (topic: string) => {
    if (!topic) return;
    setIsGeneratingPost(true);
    setError(null);
    try {
      const postData = await generateFullPost(topic);
      if (postData) {
        onPostGenerated(postData);
      } else {
         setError("記事を生成できませんでした。もう一度お試しください。");
      }
    } catch (e) {
       setError("エラーが発生しました。");
    } finally {
      setIsGeneratingPost(false);
    }
  };

  const isLoading = isLoadingIdeas || isGeneratingPost;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      aria-labelledby="ai-generator-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>
      <div className="relative bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
          <h2 id="ai-generator-title" className="text-xl font-bold text-white font-serif flex items-center">
            <Sparkles className="h-6 w-6 mr-3 text-teal-400" />
            AI 記事ジェネレーター
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
            aria-label="閉じる"
            disabled={isLoading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md text-sm">{error}</p>}
          
          {isGeneratingPost && (
            <div className="text-center p-8">
              <Loader2 className="h-12 w-12 mx-auto animate-spin text-teal-400" />
              <p className="mt-4 text-zinc-300">AIが記事を執筆中です...<br/>これには最大で1分ほどかかる場合があります。</p>
            </div>
          )}

          {!isGeneratingPost && (
            <>
              <div>
                <button
                  onClick={handleGetIdeas}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-teal-600 rounded-lg shadow-lg shadow-teal-600/30 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-zinc-950 transition-all duration-300 disabled:bg-teal-800 disabled:cursor-not-allowed"
                >
                  {isLoadingIdeas ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Lightbulb className="mr-2 h-5 w-5" />
                      アイデアを提案してもらう
                    </>
                  )}
                </button>
              </div>

              {isLoadingIdeas && <p className="text-center text-zinc-400">アイデアを考えています...</p>}

              {ideas.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-zinc-800/50">
                  <h3 className="font-semibold text-white">AIからの提案:</h3>
                  {ideas.map((idea, index) => (
                    <button
                      key={index}
                      onClick={() => handleGeneratePost(idea)}
                      className="w-full text-left p-3 bg-zinc-800/50 border border-zinc-700 rounded-md hover:bg-zinc-800 hover:border-teal-500 transition-colors"
                    >
                      {idea}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative pt-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-zinc-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-zinc-900 px-2 text-sm text-zinc-400">または</span>
                </div>
              </div>

              <div>
                <label htmlFor="customTopic" className="block text-sm font-medium text-zinc-300 mb-2">
                  自分でトピックを入力する:
                </label>
                <input
                  type="text"
                  id="customTopic"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="例: 市場心理とどう向き合うか"
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                />
                <button
                  onClick={() => handleGeneratePost(customTopic)}
                  disabled={!customTopic || isLoading}
                  className="w-full mt-3 flex items-center justify-center px-6 py-2 text-sm font-semibold text-white bg-zinc-600 rounded-md hover:bg-zinc-500 transition-all duration-300 disabled:bg-zinc-700 disabled:cursor-not-allowed"
                >
                  この記事を生成
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Dummy import
const LucideLoader = () => [X, Sparkles, Lightbulb, Loader2];

export default AiPostGeneratorModal;