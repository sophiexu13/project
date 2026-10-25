import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Share your story" };

const formUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeVrMA4r4Tkbw5a7_TBdq_fPbJTYAuA8YmxU-ZP_16kTmQDKA/viewform";

export default function ShareYourStoryPage() {
  return (
    <main id="main" className="page page-wide">
      <PageHeader
        title="Share your story"
        subtitle="With a parent or guardian's permission, I'd love to feature your experience, anonymously if you prefer. Every submission is read before anything is used."
      />
      <section className="card panel rise rise-2">
        <a className="btn btn-secondary" href={formUrl} target="_blank" rel="noopener noreferrer">
          Open the form in a new tab
        </a>
        <div className="form-frame">
          <iframe src={formUrl + "?embedded=true"} title="Share your story form">
            <a href={formUrl}>Open the Share your story form</a>
          </iframe>
        </div>
      </section>
    </main>
  );
}
