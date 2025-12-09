"use client";

import { useState, useEffect } from "react";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface BlogSectionProps {
  limit?: number; 
}

export default function BlogSection({ limit = 1 }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/blog?limit=${limit}`, { cache: "no-store" });
        const data = await res.json();
        if (data) setPosts(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [limit]);

  if (loading) return <p className="text-fg">Loading blog posts...</p>;
  if (!posts.length) return <p className="text-fg">No blog posts yet.</p>;

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border border-border rounded-base bg-surface text-surface-fg">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm opacity-70">By {post.author}</p>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
