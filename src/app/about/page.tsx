import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main id="main" className="page about-page">
      <PageHeader
        title="Our Story"
        subtitle="It started with a teenage girl who wanted to create a space where girls could talk openly about anything."
      />

      <section className="about-founder rise rise-2" aria-labelledby="sophie-story-title">
        <header className="about-founder-head">
          <p className="eyebrow">FOUNDER</p>
          <h2 id="sophie-story-title">Sophie’s Story</h2>
          <p className="about-location">Rooted in SoCal</p>
        </header>

        <div className="about-founder-grid">
          <div className="about-bio">
            <p>
              Her journey with Girls Who Rise began with a simple idea: to create a space where girls could talk openly about what they’re going through and feel less alone.
            </p>
            <p>
              What began as a personal project grew into a podcast and platform focused on the conversations that can be difficult to start. Through Girls Who Rise, she hopes to make those conversations easier to have and remind girls they don’t have to figure everything out on their own.
            </p>
            <p>
              She leads Girls Who Rise’s content, podcast, and community, building a space where girls can connect through honest conversations and real experiences.
            </p>
          </div>

          <div className="about-gallery" aria-label="Photos of Sophie Xu">
            <figure className="about-photo about-photo-one">
              <img src="/sophie-portrait.jpg" alt="Sophie Xu by the ocean at sunset" />
            </figure>
            <figure className="about-photo about-photo-two">
              <img src="/sophie-beach.jpg" alt="Sophie Xu at the beach" />
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
}
