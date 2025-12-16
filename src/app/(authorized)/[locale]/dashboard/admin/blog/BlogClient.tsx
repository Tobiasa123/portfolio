"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import BlogPostForm, { BlogPostData } from "./BlogPostForm";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string | null;
  updatedAt?: string | null;
}

export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostData | undefined>(undefined);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();

      const normalized: BlogPost[] = data.map((post: any) => ({
        id: post.id, // MUST exist for editing
        title: post.title,
        content: post.content,
        author: post.author ?? "Admin",
        createdAt: post.createdAt?._seconds
          ? new Date(post.createdAt._seconds * 1000).toISOString()
          : post.createdAt || null,
        updatedAt: post.updatedAt?._seconds
          ? new Date(post.updatedAt._seconds * 1000).toISOString()
          : post.updatedAt || null,
      }));

      setPosts(normalized);
    } catch (err) {
      console.error("Failed to fetch blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSuccess = () => {
    setShowForm(false);
    setEditingPost(undefined);
    fetchPosts();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Blog Posts</h1>

      {!showForm && (
        <Button
          text="Add New Post"
          onClick={() => {
            setEditingPost(undefined);
            setShowForm(true);
          }}
        />
      )}

      {showForm && <BlogPostForm initialData={editingPost} onSuccess={handleSuccess} />}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded bg-surface text-surface-fg">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-xs text-surface-fg/70">
              {post.author} – {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
            </p>

            <div className="flex gap-2 mt-2">
              <Button
                text="Edit"
                onClick={() => {
                  setEditingPost(post);
                  setShowForm(true);
                }}
              />
              <Button
                text="Delete"
                onClick={async () => {
                  if (!confirm("Delete this post?")) return;
                  await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
                  fetchPosts();
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
