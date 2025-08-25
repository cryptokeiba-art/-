import React from 'react';
import type { Post } from '../types';
import { ArrowRight, Pencil } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onPostSelect: (slug: string) => void;
  isEditMode: boolean;
  onEditPost: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPostSelect, isEditMode, onEditPost }) => {
  return (
    <div className="bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden flex flex-col group transition-all duration-300 hover:border-teal-500/50 hover:bg-zinc-900 hover:-translate-y-1 relative">
      {isEditMode && (
        <button 
          onClick={() => onEditPost(post)}
          className="absolute top-2 right-2 z-10 p-2 bg-teal-600/80 text-white rounded-full hover:bg-teal-500 transition-all duration-200"
          aria-label="記事を編集"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}
      <div onClick={() => onPostSelect(post.slug)} className="block cursor-pointer">
        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-sm text-zinc-400">{post.date}</p>
          <h3 className="mt-2 text-xl font-bold text-white font-serif group-hover:text-teal-400 transition-colors">
            <span onClick={() => onPostSelect(post.slug)} className="cursor-pointer">{post.title}</span>
          </h3>
          <p className="mt-3 text-zinc-400 text-sm leading-relaxed">{post.excerpt}</p>
        </div>
        <div className="mt-4">
           <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="inline-block bg-teal-900/50 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full border border-teal-800/50">
                {tag}
              </span>
            ))}
          </div>
          <button onClick={() => onPostSelect(post.slug)} className="inline-flex items-center mt-6 text-sm font-semibold text-teal-400 hover:text-teal-300">
            続きを読む <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface BlogPreviewProps {
  posts: Post[];
  onPostSelect: (slug: string) => void;
  onViewAll: () => void;
  isEditMode: boolean;
  onEditPost: (post: Post) => void;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ posts, onPostSelect, onViewAll, isEditMode, onEditPost }) => {

  return (
    <section id="blog" className="py-20 sm:py-24 bg-zinc-950/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">クリモネの視点：トレードコラム</h2>
          <p className="mt-4 text-lg text-zinc-400">「わびさびトレード」の哲学、最新の相場分析、トレーダーとしての心構えなどを発信します。</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} onPostSelect={onPostSelect} isEditMode={isEditMode} onEditPost={onEditPost} />
          ))}
        </div>
        <div className="mt-16 text-center">
            <button
              onClick={onViewAll}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-zinc-700/50 rounded-lg border border-zinc-600 hover:bg-zinc-700 hover:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-zinc-950 transition-all duration-300"
            >
              すべての記事を見る
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </div>
      </div>
    </section>
  );
};

// Dummy import
const LucideLoader = () => [ArrowRight, Pencil];

export default BlogPreview;