import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main id="main" className="page">
      <PageHeader
        title="Hi, I’m Sophie."
        subtitle="I’m a teen and the person behind Girls Who Rise."
      />
      <section className="card host-card rise rise-2">
        <img className="host-photo" src="/sophie-beach.jpg" alt="Sophie Xu at the beach at sunset" />
        <div>
          <h3>Sophie Xu</h3>
          <span className="host-role">Founder &amp; host</span>
          <p className="muted">
            I started Girls Who Rise because talking about mental health can sometimes feel like one more burden to carry. As a teen balancing school and volleyball, I know how demanding it can be to keep up with everything while trying to make myself and my coaches proud. When things get tough, it can be hard to find the words or make room to ask for support. I wanted to create a space where girls can talk honestly, feel understood, and know they don’t have to figure everything out alone.
          </p>
        </div>
      </section>
    </main>
  );
}
