import React from 'react';
import type { Post } from '../types';
import { ArrowLeft, Calendar, User, Tag, Pencil } from 'lucide-react';

interface BlogPostPageProps {
  post: Post;
  onBack: () => void;
  isEditMode: boolean;
  onEditPost: (post: Post) => void;
}

const parseMarkdown = (text: string): string => {
  if (!text) return '';

  // Process block-level elements first (images on their own line)
  const blocks = text.split('\n').map(block => {
    // Image tag on its own line
    const imageRegex = /^\!\[(.*?)\]\((.*?)\)$/;
    if (imageRegex.test(block.trim())) {
      return block.trim().replace(imageRegex, '<p><img src="$2" alt="$1" class="rounded-lg shadow-lg my-6 mx-auto w-full max-w-2xl" /></p>');
    }
    return block;
  });

  const processedText = blocks.join('\n');

  // Process paragraphs and other elements
  return processedText.split('\n\n').filter(block => block.trim() !== '').map(block => {
     // Handle paragraphs that have already been processed (like images)
    if (block.startsWith('<p><img')) {
      return block;
    }

    // Heading
    if (block.startsWith('## ')) {
      return `<h2>${block.substring(3)}</h2>`;
    }
    if (block.startsWith('# ')) {
      return `<h1>${block.substring(2)}</h1>`;
    }

    // List
    if (block.startsWith('* ') || block.startsWith('- ')) {
      const listItems = block.split('\n').map(item => {
        const content = item.replace(/^[-*]\s*/, '');
        const processedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
        return `<li>${processedContent}</li>`;
      }).join('');
      return `<ul>${listItems}</ul>`;
    }

    // Paragraph with inline styles (including inline images)
    const processedBlock = block
      .replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg shadow-lg my-4 inline-block" />')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');

    return `<p>${processedBlock}</p>`;
  }).join('');
};


const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack, isEditMode, onEditPost }) => {
  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-2xl">記事を読み込んでいます...</p>
      </div>
    );
  }

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            記事一覧に戻る
          </button>
          {isEditMode && (
            <button
              onClick={() => onEditPost(post)}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-all duration-300"
            >
              <Pencil className="mr-2 h-4 w-4" />
              この記事を編集
            </button>
          )}
        </div>


        <article>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 leading-tight md:leading-snug font-serif">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400">
            {post.author && (
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </div>
          
          <img
            src={post.imageUrl}
            alt={post.title}
            className="mt-8 w-full rounded-lg shadow-2xl shadow-zinc-950/50 border border-zinc-800/50 aspect-video object-cover"
          />

          <div 
            className="prose prose-invert prose-lg max-w-none mt-12 text-zinc-300 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
          />

          <div className="mt-12 pt-8 border-t border-zinc-800/50">
             <div className="flex flex-wrap items-center gap-3">
               <Tag className="h-5 w-5 text-zinc-500" />
               <span className="text-sm font-semibold text-zinc-400">タグ:</span>
                {post.tags.map(tag => (
                  <span key={tag} className="inline-block bg-zinc-800 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
          </div>
        </article>
      </div>
    </div>
  );
};

// Dummy import
const LucideLoader = () => [ArrowLeft, Calendar, User, Tag, Pencil];

export default BlogPostPage;