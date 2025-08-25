export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface Module {
  title: string;
  lessons: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  tags: string[];
  imageUrl: string;
  content: string;
}