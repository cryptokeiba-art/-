import React, { useState, useEffect, useRef } from 'react';
import type { Post } from '../types';
import { X, Heading2, Bold, Italic, List } from 'lucide-react';

interface EditPostModalProps {
  post: Post;
  onSave: (updatedPost: Post) => void;
  onClose: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Post>>({});
  const [tagsInput, setTagsInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  
  const handleFormat = (format: 'h2' | 'bold' | 'italic' | 'list') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let newText = '';
    
    const applyFormat = (prefix: string, suffix: string = '') => {
      const textToFormat = selectedText || '';
      newText = prefix + textToFormat + suffix;
      const updatedValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
      setFormData(prev => ({...prev, content: updatedValue}));

      setTimeout(() => {
        textarea.focus();
        if (selectedText) {
             textarea.setSelectionRange(start + prefix.length, start + prefix.length + textToFormat.length);
        } else {
             textarea.setSelectionRange(start + prefix.length, start + prefix.length);
        }
      }, 0);
    };

    switch (format) {
        case 'h2':
            applyFormat('## ');
            break;
        case 'bold':
            applyFormat('**', '**');
            break;
        case 'italic':
            applyFormat('*', '*');
            break;
        case 'list':
            const lines = selectedText.split('\n');
            const formattedLines = lines.map(line => line.trim() ? `- ${line}` : '');
            newText = formattedLines.join('\n');
            const updatedValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
            setFormData(prev => ({...prev, content: updatedValue}));
            setTimeout(() => {
              textarea.focus();
              textarea.setSelectionRange(start, start + newText.length);
            }, 0);
            break;
    }
  };


  const isNewPost = post.slug.startsWith('new-post-');

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
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
              <label htmlFor="imageUrl" className="block text-sm font-medium text-zinc-300 mb-2">画像URL</label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleChange}
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                placeholder="https://example.com/image.jpg"
                required
              />
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
                <div className="flex items-center gap-1 p-2 bg-zinc-800/50 border-b border-zinc-700 text-zinc-300">
                  <button type="button" title="見出し (H2)" onClick={() => handleFormat('h2')} className="p-2 rounded hover:bg-zinc-700"><Heading2 className="h-5 w-5" /></button>
                  <button type="button" title="太字" onClick={() => handleFormat('bold')} className="p-2 rounded hover:bg-zinc-700"><Bold className="h-5 w-5" /></button>
                  <button type="button" title="イタリック" onClick={() => handleFormat('italic')} className="p-2 rounded hover:bg-zinc-700"><Italic className="h-5 w-5" /></button>
                  <button type="button" title="箇条書き" onClick={() => handleFormat('list')} className="p-2 rounded hover:bg-zinc-700"><List className="h-5 w-5" /></button>
                </div>
                <textarea
                  ref={textareaRef}
                  name="content"
                  id="content"
                  rows={12}
                  value={formData.content || ''}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 text-white p-2 outline-none transition resize-y"
                  required
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
    </div>
  );
};

// Dummy import
const LucideLoader = () => [X, Heading2, Bold, Italic, List];

export default EditPostModal;