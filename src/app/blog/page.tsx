import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { posts } from "@/lib/content";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <main id="main" className="page page-wide">
      <PageHeader title="Blog" subtitle="Stories and thoughts from the Louder Than Your Thoughts team." />
      <div className="post-list rise rise-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card post-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <span className="post-meta">By {post.author}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
