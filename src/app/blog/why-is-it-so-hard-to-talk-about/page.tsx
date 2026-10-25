import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "@/components/Check";
import { PageHeader } from "@/components/PageHeader";
import { posts, showPoints } from "@/lib/content";

const post = posts[0];

export const metadata: Metadata = { title: post.title };

export default function BlogPostPage() {
  return (
    <main id="main" className="page">
      <Link href="/blog" className="back-link">&larr; All posts</Link>
      <PageHeader title={post.title} subtitle={`By ${post.author}`} />
      <section className="card panel rise rise-2">
        <p className="lead">
          The Louder Than Your Thoughts podcast makes conversations about mental health easier, more honest, and more
          relatable.
        </p>
        <p className="muted" style={{ marginBottom: 0 }}>
          Hosted by Sophie Xu, the show talks about what teens actually experience, from school stress and friendships to
          emotions, confidence, and everything in between. Through real conversations, personal stories, expert
          perspectives, and reliable resources, it&apos;s a space where teens can learn, share, and feel less alone.
        </p>
      </section>
      <ul className="card checklist rise rise-3" style={{ marginTop: 16 }}>
        {showPoints.map((point) => (
          <li key={point}>
            <Check />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
