"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export interface BlogPostData {
  id?: string;
  title: string;
  content: string;
  author?: string;
}

export default function BlogPostForm({
  initialData,
  onSuccess,
}: {
  initialData?: BlogPostData;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [author, setAuthor] = useState(initialData?.author || "Admin");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(initialData?.id);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const payload = { title, content, author };

  try {
    if (isEdit) {
      if (!initialData?.id) throw new Error("Missing post ID"); // <- check
    }

    const url = isEdit
      ? `/api/admin/blog/${initialData!.id}`
      : "/api/admin/blog";

    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to save post");

    onSuccess();
  } catch (err) {
    console.error("Save post error:", err);
    alert("Error saving post");
  } finally {
    setLoading(false);
  }
};


  return (
    <form className="space-y-4 p-4 border rounded bg-surface text-surface-fg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">{isEdit ? "Edit Post" : "Create New Post"}</h2>

      <input
        className="border p-2 w-full rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full rounded"
        placeholder="Content"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}
