import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StoryForm, type GoogleFormField } from "@/components/StoryForm";

export const metadata: Metadata = { title: "Share your story" };
export const dynamic = "force-dynamic";

const formUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeVrMA4r4Tkbw5a7_TBdq_fPbJTYAuA8YmxU-ZP_16kTmQDKA/viewform";
const responseUrl = formUrl.replace(/\/viewform(?:\?.*)?$/, "/formResponse");

function decodeHtml(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

async function getGoogleFormFields(): Promise<GoogleFormField[]> {
  try {
    const response = await fetch(formUrl, { cache: "no-store" });
    if (!response.ok) return [];

    const html = await response.text();
    const inputTags = html.match(/<input\b[^>]*\btype="hidden"[^>]*>/gi) ?? [];

    return inputTags.flatMap((tag) => {
      const name = tag.match(/\bname="([^"]*)"/i)?.[1];
      const value = tag.match(/\bvalue="([^"]*)"/i)?.[1] ?? "";
      return name ? [{ name, value: decodeHtml(value) }] : [];
    });
  } catch {
    return [];
  }
}

export default async function ShareYourStoryPage() {
  const hiddenFields = await getGoogleFormFields();
  const formReady = hiddenFields.some((field) => field.name === "fbzx");

  return (
    <main id="main" className="page page-wide share-page">
      <PageHeader
        title="Share your story"
        subtitle="With a parent or guardian's permission, I'd love to feature your experience, anonymously if you prefer. Every submission is read before anything is used."
      />
      <section className="card panel share-card rise rise-2" aria-label="Share your story form">
        <StoryForm
          hiddenFields={hiddenFields}
          formReady={formReady}
          formUrl={formUrl}
          responseUrl={responseUrl}
        />
      </section>
    </main>
  );
}
