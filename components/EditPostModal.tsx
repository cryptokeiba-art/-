import React, { useState, useEffect, useRef } from 'react';
import type { Post } from '../types';
import { X, Heading2, Bold, Italic, List, Sparkles, Loader2, Image, UploadCloud } from 'lucide-react';
import { formatTextWithMarkdown } from '../lib/gemini';

interface EditPostModalProps {
  post: Post;
  onSave: (updatedPost: Post) => void;
  onClose: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Post>>({});
  const [tagsInput, setTagsInput] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalTab, setImageModalTab] = useState<'url' | 'upload'>('url');
  const [imageUrlToAdd, setImageUrlToAdd] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
    });
    setTagsInput(post.tags.join(', '));
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
    onSave({ ...post, ...formData, tags: updatedTags });
  };
  
  const handleMainImageUploadClick = () => {
    mainImageInputRef.current?.click();
  };

  const handleMainImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, imageUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };


  const insertText = (text: string, selectionOffset: number, selectionLength: number = 0) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const updatedValue = textarea.value.substring(0, start) + text + textarea.value.substring(end);
    setFormData(prev => ({...prev, content: updatedValue}));

    setTimeout(() => {
      textarea.focus();
      const newCursorPosition = start + selectionOffset;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition + selectionLength);
    }, 0);
  }
  
  const handleFormat = (format: 'h2' | 'bold' | 'italic' | 'list') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    switch (format) {
        case 'h2':
            insertText(`## ${selectedText}`, 3, selectedText.length);
            break;
        case 'bold':
            insertText(`**${selectedText}**`, 2, selectedText.length);
            break;
        case 'italic':
            insertText(`*${selectedText}*`, 1, selectedText.length);
            break;
        case 'list':
            const lines = selectedText.split('\n');
            const formattedLines = lines.map(line => line.trim() ? `- ${line}` : '');
            const newText = formattedLines.join('\n');
            insertText(newText, 0, newText.length);
            break;
    }
  };

  const handleConfirmUrlInsert = () => {
    if (imageUrlToAdd) {
      const textToInsert = `![画像の説明](${imageUrlToAdd})`;
      insertText(textToInsert, 2, '画像の説明'.length);
    }
    setImageUrlToAdd('');
    setIsImageModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const textToInsert = `![${file.name}](${base64String})`;
        insertText(textToInsert, 2, file.name.length);
        setIsImageModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCancelImageInsert = () => {
    setImageUrlToAdd('');
    setIsImageModalOpen(false);
  };


  const handleAiFormat = async () => {
    if (!formData.content || formData.content.trim() === '') {
      setFormatError("整形するコンテンツがありません。");
      return;
    }
    setIsFormatting(true);
    setFormatError(null);
    try {
      const formattedContent = await formatTextWithMarkdown(formData.content);
      if (formattedContent) {
        setFormData(prev => ({ ...prev, content: formattedContent }));
      } else {
        setFormatError("AIによる整形に失敗しました。");
      }
    } catch (error) {
      console.error("AI formatting failed:", error);
      setFormatError("AIによる整形中にエラーが発生しました。");
    } finally {
      setIsFormatting(false);
    }
  };


  const isNewPost = post.slug.startsWith('new-post-');

  return (
    <div 
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
      aria-labelledby="edit-post-title"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="relative bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
          <h2 id="edit-post-title" className="text-xl font-bold text-white font-serif">{isNewPost ? '新規記事を作成' : '記事を編集'}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
            aria-label="閉じる"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-2">タイトル</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                required
              />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-zinc-300 mb-2">抜粋（記事一覧で表示される短い説明文）</label>
              <textarea
                name="excerpt"
                id="excerpt"
                rows={3}
                value={formData.excerpt || ''}
                onChange={handleChange}
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                required
              />
            </div>
             <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-zinc-300 mb-2">メイン画像</label>
              <div className="relative">
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-md p-2 pr-10 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  placeholder="https://... またはアップロード"
                  required
                />
                <button
                  type="button"
                  onClick={handleMainImageUploadClick}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 hover:text-teal-400 transition-colors"
                  aria-label="メイン画像をアップロード"
                  title="メイン画像をアップロード"
                >
                  <UploadCloud className="h-5 w-5" />
                </button>
                <input
                  type="file"
                  ref={mainImageInputRef}
                  onChange={handleMainImageFileChange}
                  className="sr-only"
                  accept="image/*"
                />
              </div>
              {formData.imageUrl && formData.imageUrl.length < 5000 && (
                <div className="mt-4 bg-zinc-950/50 p-2 border border-zinc-700/50 rounded-md inline-block">
                  <img 
                    src={formData.imageUrl} 
                    alt="メイン画像プレビュー" 
                    className="max-h-48 w-auto rounded-md" 
                  />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-zinc-300 mb-2">タグ (カンマ区切り)</label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                placeholder="思考法, テクニカル分析"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-zinc-300 mb-2">本文</label>
              <div className="rounded-md border border-zinc-700 overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
                <div className="flex items-center justify-between gap-1 p-2 bg-zinc-800/50 border-b border-zinc-700 text-zinc-300">
                  <div className="flex items-center gap-1">
                    <button type="button" title="見出し (H2)" onClick={() => handleFormat('h2')} className="p-2 rounded hover:bg-zinc-700"><Heading2 className="h-5 w-5" /></button>
                    <button type="button" title="太字" onClick={() => handleFormat('bold')} className="p-2 rounded hover:bg-zinc-700"><Bold className="h-5 w-5" /></button>
                    <button type="button" title="イタリック" onClick={() => handleFormat('italic')} className="p-2 rounded hover:bg-zinc-700"><Italic className="h-5 w-5" /></button>
                    <button type="button" title="箇条書き" onClick={() => handleFormat('list')} className="p-2 rounded hover:bg-zinc-700"><List className="h-5 w-5" /></button>
                    <button type="button" title="画像挿入" onClick={() => setIsImageModalOpen(true)} className="p-2 rounded hover:bg-zinc-700"><Image className="h-5 w-5" /></button>
                  </div>
                  <button 
                    type="button" 
                    title="AIに整形させる" 
                    onClick={handleAiFormat}
                    disabled={isFormatting}
                    className="flex items-center gap-2 p-2 rounded hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFormatting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Sparkles className="h-5 w-5 text-teal-400" />
                    )}
                    <span className="hidden sm:inline text-sm">AIに整形させる</span>
                  </button>
                </div>
                {formatError && <p className="text-red-400 bg-red-900/50 p-2 text-sm">{formatError}</p>}
                <textarea
                  ref={textareaRef}
                  name="content"
                  id="content"
                  rows={12}
                  value={formData.content || ''}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 text-white p-2 outline-none transition resize-y"
                  required
                  disabled={isFormatting}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end p-4 border-t border-zinc-800/50 bg-zinc-900/50 sticky bottom-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-zinc-300 bg-zinc-700 rounded-md hover:bg-zinc-600 transition-all duration-300 mr-3"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-all duration-300"
            >
              変更を保存
            </button>
          </div>
        </form>
      </div>
      
      {isImageModalOpen && (
        <div 
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-modal-title"
        >
          <div className="bg-zinc-800 rounded-lg shadow-2xl w-full max-w-md border border-zinc-700 text-white">
            <div className="p-4 border-b border-zinc-700">
              <h3 id="image-modal-title" className="text-lg font-semibold">画像を挿入</h3>
            </div>
            
            <div className="border-b border-zinc-700 flex">
              <button 
                onClick={() => setImageModalTab('url')}
                className={`flex-1 p-3 text-sm font-medium transition-colors ${imageModalTab === 'url' ? 'bg-teal-600/30 text-teal-300' : 'text-zinc-400 hover:bg-zinc-700/50'}`}
              >
                URLで指定
              </button>
              <button 
                onClick={() => setImageModalTab('upload')}
                className={`flex-1 p-3 text-sm font-medium transition-colors ${imageModalTab === 'upload' ? 'bg-teal-600/30 text-teal-300' : 'text-zinc-400 hover:bg-zinc-700/50'}`}
              >
                アップロード
              </button>
            </div>

            <div className="p-6">
              {imageModalTab === 'url' && (
                <div>
                  <label htmlFor="imageUrlPrompt" className="block text-sm font-medium mb-2">
                    画像のURLを貼り付けてください:
                  </label>
                  <input
                    type="url"
                    id="imageUrlPrompt"
                    value={imageUrlToAdd}
                    onChange={(e) => setImageUrlToAdd(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleConfirmUrlInsert(); } }}
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                    autoFocus
                    placeholder="https://..."
                  />
                </div>
              )}

              {imageModalTab === 'upload' && (
                <div>
                  <p className="text-sm text-zinc-400 mb-3">PCから画像ファイルを選択してください。</p>
                  <label htmlFor="imageUpload" className="w-full flex flex-col items-center justify-center px-6 py-8 text-base font-bold text-white bg-zinc-700/50 rounded-lg border-2 border-dashed border-zinc-600 hover:bg-zinc-700 hover:border-teal-500 cursor-pointer transition-all duration-300">
                      <UploadCloud className="h-8 w-8 mb-2 text-zinc-400" />
                      <span className="text-teal-400">ファイルを選択</span>
                      <span className="text-xs text-zinc-500 mt-1">またはドラッグ＆ドロップ</span>
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </div>
              )}
            </div>

            <div className="p-4 flex justify-end gap-3 bg-zinc-900/50 rounded-b-lg">
              <button
                type="button"
                onClick={handleCancelImageInsert}
                className="px-4 py-2 text-sm font-semibold text-zinc-300 bg-zinc-600/50 rounded-md hover:bg-zinc-600 transition-all"
              >
                キャンセル
              </button>
              {imageModalTab === 'url' && (
                <button
                  type="button"
                  onClick={handleConfirmUrlInsert}
                  className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-all"
                >
                  挿入する
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Dummy import
const LucideLoader = () => [X, Heading2, Bold, Italic, List, Sparkles, Loader2, Image, UploadCloud];

export default EditPostModal;
