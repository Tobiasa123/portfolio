'use client';

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string | null;
}

interface BlogSectionProps {
  limit?: number; 
}

export default function BlogSection({ limit = 1 }: BlogSectionProps) {
  const t = useTranslations("public"); // still using "public" namespace

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/blog?limit=${limit}`, { cache: "no-store" });
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  if (loading) return <p>{t("blogSection.loading")}</p>;
  if (!posts.length) return <p>{t("blogSection.noPosts")}</p>;

  return (
    <div className="flex flex-col gap-4 w-full border bg-bg rounded-md">
      {posts.map((post) => (
        <div key={post.id} className="p-4 text-surface-fg">
          <h2 className="text-xl font-semibold mb-2">{t("blogSection.recent")}</h2>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm opacity-70">
            {t("blogSection.by")} {post.author}
          </p>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
