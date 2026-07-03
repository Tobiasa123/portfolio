'use client';

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { HiChevronLeft, HiChevronRight, HiOutlineClock, HiOutlinePencil } from "react-icons/hi";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string | null;
  updatedAt: string | null;
}

interface BlogSectionProps {
  pageSize?: number;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatDate(iso: string | null) {
  if (!iso) return null;
  const date = new Date(iso);
  if (isNaN(date.getTime())) return null;
  return dateFormatter.format(date);
}

export default function BlogSection({ pageSize = 1 }: BlogSectionProps) {
  const t = useTranslations("public");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursorStack, setCursorStack] = useState<(string | null)[]>([null]);
  const [pageIndex, setPageIndex] = useState(0);

  const fetchPage = useCallback(
    async (cursor: string | null) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: String(pageSize) });
        if (cursor) params.set("cursor", cursor);

        const res = await fetch(`/api/blog?${params.toString()}`, { cache: "no-store" });
        const data = await res.json();

        setPosts(Array.isArray(data.posts) ? data.posts : []);
        setHasMore(Boolean(data.hasMore));
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setPosts([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    setCursorStack([null]);
    setPageIndex(0);
    fetchPage(null);
  }, [fetchPage]);

  const goNext = () => {
    if (!hasMore || loading || !posts.length) return;
    const lastPost = posts[posts.length - 1];
    if (!lastPost.createdAt) return;
    const nextCursor = lastPost.createdAt;
    setCursorStack((prev) => [...prev.slice(0, pageIndex + 1), nextCursor]);
    setPageIndex((i) => i + 1);
    fetchPage(nextCursor);
  };

  const goPrev = () => {
    if (pageIndex === 0 || loading) return;
    const prevIndex = pageIndex - 1;
    setPageIndex(prevIndex);
    fetchPage(cursorStack[prevIndex]);
  };

  if (loading && !posts.length) {
    return <p className="portfolio-text-muted text-center">{t("blogSection.loading")}</p>;
  }
  if (!loading && !posts.length && pageIndex === 0) {
    return <p className="portfolio-text-muted text-center">{t("blogSection.noPosts")}</p>;
  }

  const post = posts[0];
  const hasPrev = pageIndex > 0;

  const createdLabel = post ? formatDate(post.createdAt) : null;
  const updatedLabel = post ? formatDate(post.updatedAt) : null;
  const wasEdited = Boolean(
    createdLabel && updatedLabel && post?.createdAt !== post?.updatedAt
  );

  return (
    <div className="flex flex-col gap-0 w-full rounded-2xl border portfolio-border-brand portfolio-surface portfolio-shadow overflow-hidden min-h-120">
      {/* Header bar */}
      <div className="px-6 md:px-8 py-4 flex items-center justify-between border-b portfolio-border portfolio-surface-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase portfolio-text-muted">
          {t("blogSection.recent")}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={goPrev}
            disabled={!hasPrev || loading}
            aria-label="Previous post"
            className="rounded-full p-1.5 portfolio-text disabled:opacity-25 disabled:cursor-not-allowed hover:portfolio-surface transition"
          >
            <HiChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs portfolio-text-muted tabular-nums w-4 text-center">
            {pageIndex + 1}
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={!hasMore || loading}
            aria-label="Next post"
            className="rounded-full p-1.5 portfolio-text disabled:opacity-25 disabled:cursor-not-allowed hover:portfolio-surface transition"
          >
            <HiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Article */}
      <AnimatePresence mode="wait">
        {post && (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="px-6 md:px-8 py-8 flex flex-col gap-4"
          >
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight portfolio-text">
              {post.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm portfolio-text-muted pb-2 border-b portfolio-border">
              <span className="font-medium portfolio-brand">{post.author}</span>

              {createdLabel && (
                <span className="inline-flex items-center gap-1.5">
                  <HiOutlineClock className="w-3.5 h-3.5" />
                  {createdLabel}
                </span>
              )}

              {wasEdited && (
                <span className="inline-flex items-center gap-1.5">
                  <HiOutlinePencil className="w-3.5 h-3.5" />
                  Updated {updatedLabel}
                </span>
              )}
            </div>

            <p className="portfolio-text leading-relaxed whitespace-pre-line">
              {post.content}
            </p>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}