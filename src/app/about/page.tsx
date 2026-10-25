import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main id="main" className="page">
      <PageHeader
        title="Who's behind the mic"
        subtitle="I'm a teenager who got tired of mental health content that either felt too clinical or too vague to actually help. So I started building what I wished existed."
      />
      <section className="card host-card rise rise-2">
        <img className="host-photo" src="/sophie-beach.jpg" alt="Sophie Xu at the beach at sunset" />
        <div>
          <h3>Sophie Xu</h3>
          <span className="host-role">Founder &amp; host</span>
          <p className="muted">
            Researches the topics, finds the experts, and hosts every conversation, from the first question to the last
            word.
          </p>
        </div>
      </section>
    </main>
  );
}
