import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Instructor from './components/Instructor';
import Curriculum from './components/Curriculum';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Schedule from './components/Schedule';
import BlogPreview from './components/BlogPreview';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BlogIndexPage from './components/BlogIndexPage';
import BlogPostPage from './components/BlogPostPage';
import EditPostModal from './components/EditPost-Modal';
import AiPostGeneratorModal from './components/AiPostGeneratorModal';
import { getPosts } from './lib/posts';
import type { Post } from './types';

type View = 'main' | 'blogIndex' | 'blogPost';
const POSTS_STORAGE_KEY = 'wabisabi_posts';

const App: React.FC = () => {
  const [view, setView] = useState<View>('main');
  const [currentPostSlug, setCurrentPostSlug] = useState<string | null>(null);
  
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const savedPosts = window.localStorage.getItem(POSTS_STORAGE_KEY);
      if (savedPosts) {
        return JSON.parse(savedPosts);
      }
    } catch (error) {
      console.error("Error reading posts from localStorage", error);
    }
    const initialPosts = getPosts();
    window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(initialPosts));
    return initialPosts;
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error("Error saving posts to localStorage", error);
    }
  }, [posts]);

  const handleSelectPost = (slug: string) => {
    setCurrentPostSlug(slug);
    setView('blogPost');
    window.scrollTo(0, 0);
  };

  const handleViewBlogIndex = () => {
    setView('blogIndex');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setView('main');
    window.scrollTo(0, 0);
  }

  const slugify = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  const handleSavePost = (postToSave: Post) => {
    const isNewPost = postToSave.slug.startsWith('new-post-');
    
    if (isNewPost) {
      let newSlug = slugify(postToSave.title);
      let counter = 1;
      while (posts.some(p => p.slug === newSlug)) {
        newSlug = `${slugify(postToSave.title)}-${counter}`;
        counter++;
      }
      const finalNewPost = { ...postToSave, slug: newSlug };
      setPosts([finalNewPost, ...posts]);
    } else {
      setPosts(posts.map(p => p.slug === postToSave.slug ? postToSave : p));
    }
    setPostToEdit(null);
  };

  const handleInitiateNewPost = () => {
    const newPostTemplate: Post = {
      slug: `new-post-${Date.now()}`,
      title: '',
      excerpt: '',
      date: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: 'クリプトモネダス',
      tags: [],
      imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400`,
      content: '',
    };
    setPostToEdit(newPostTemplate);
  };

  const handleAiGeneratedPost = (generatedPost: Partial<Post>) => {
    const newPostFromAi: Post = {
      slug: `new-post-${Date.now()}`,
      title: generatedPost.title || '無題の記事',
      excerpt: generatedPost.excerpt || '',
      date: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: 'クリプトモネダス',
      tags: generatedPost.tags || [],
      imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400`,
      content: generatedPost.content || '',
    };
    setIsAiModalOpen(false);
    setPostToEdit(newPostFromAi);
  };


  const renderContent = () => {
    const currentPost = posts.find(p => p.slug === currentPostSlug);
    switch (view) {
      case 'blogPost':
        return currentPost ? (
          <BlogPostPage 
            post={currentPost} 
            onBack={handleViewBlogIndex}
            isEditMode={isEditMode}
            onEditPost={setPostToEdit} 
          />
        ) : null;
      case 'blogIndex':
        return (
          <BlogIndexPage 
            posts={posts} 
            onSelectPost={handleSelectPost} 
            isEditMode={isEditMode}
            onEditPost={setPostToEdit}
            onCreatePost={handleInitiateNewPost}
            onOpenAiModal={() => setIsAiModalOpen(true)}
          />
        );
      case 'main':
      default:
        return (
          <>
            <Hero />
            <Features />
            <Instructor />
            <Curriculum />
            <Testimonials />
            <Pricing />
            <Schedule />
            <BlogPreview 
              posts={posts.slice(0, 3)} 
              onPostSelect={handleSelectPost} 
              onViewAll={handleViewBlogIndex}
              isEditMode={isEditMode}
              onEditPost={setPostToEdit}
            />
            <FAQ />
          </>
        );
    }
  };


  return (
    <div className="bg-zinc-950 text-zinc-300 antialiased selection:bg-teal-500 selection:text-white">
      <Header 
        onGoHome={handleGoHome} 
        isEditMode={isEditMode} 
        onToggleEditMode={() => setIsEditMode(!isEditMode)} 
      />
      <main>
        {renderContent()}
      </main>
      <Footer />
      {postToEdit && (
        <EditPostModal
          post={postToEdit}
          onSave={handleSavePost}
          onClose={() => setPostToEdit(null)}
        />
      )}
      {isAiModalOpen && (
        <AiPostGeneratorModal
          onClose={() => setIsAiModalOpen(false)}
          onPostGenerated={handleAiGeneratedPost}
        />
      )}
    </div>
  );
};

export default App;