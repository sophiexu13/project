"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export type GoogleFormField = { name: string; value: string };

type StoryFormProps = {
  hiddenFields: GoogleFormField[];
  formReady: boolean;
  formUrl: string;
  responseUrl: string;
};

const discussionOptions = [
  "Why it happens",
  "Advice or ways to handle it",
  "How to talk about it",
  "Different perspectives from other teens",
  "What expert/research say",
  "I just want it to be talked about",
];

const useOptions = [
  "Yes, you can discuss it anonymously",
  "Yes, but only as inspiration for a topic",
  "No, just sharing",
];

export function StoryForm({ hiddenFields, formReady, formUrl, responseUrl }: StoryFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [otherSelected, setOtherSelected] = useState(false);
  const [responseFrameReady, setResponseFrameReady] = useState(false);
  const submissionStarted = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const frame = document.querySelector<HTMLIFrameElement>("#gwr-google-form-response");
    if (frame?.contentDocument?.readyState === "complete") setResponseFrameReady(true);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!formReady || !responseFrameReady || status !== "idle") {
      event.preventDefault();
      return;
    }

    submissionStarted.current = true;
    setStatus("submitting");
    timeout.current = setTimeout(() => {
      submissionStarted.current = false;
      setStatus("error");
    }, 20000);
  }

  function handleGoogleResponse() {
    if (!submissionStarted.current) {
      setResponseFrameReady(true);
      return;
    }
    submissionStarted.current = false;
    if (timeout.current) clearTimeout(timeout.current);
    setStatus("success");
  }

  return (
    <>
      <div className="story-form-heading">
        <p className="eyebrow">GIRLS WHO RISE</p>
        <h2 id="story-form-heading">What's on your Mind?</h2>
        <p>
          Have something on your mind? Share a topic, question, experience, or thought you'd like us to
          talk about on the podcast!
        </p>
      </div>

      {status === "success" ? (
        <div className="story-form-message story-form-success" role="status" aria-live="polite">
          <span className="story-form-check" aria-hidden="true">✓</span>
          <div>
            <h3>Thank you for sharing.</h3>
            <p>Your response was sent to our Google Form. We’re grateful you trusted us with it.</p>
            <a href={formUrl} target="_blank" rel="noopener noreferrer">
              Submit another response
            </a>
          </div>
        </div>
      ) : status === "error" ? (
        <div className="story-form-message story-form-error" role="alert">
          <div>
            <h3>We couldn’t confirm the submission.</h3>
            <p>
              It may not have reached Google Forms. Please open the original form to make sure your
              response is received.
            </p>
            <a className="btn btn-primary" href={formUrl} target="_blank" rel="noopener noreferrer">
              Open Google Form
            </a>
          </div>
        </div>
      ) : !formReady ? (
        <div className="story-form-message" role="status">
          <div>
            <h3>The form couldn’t load right now.</h3>
            <p>You can still share your response directly with Google Forms.</p>
            <a className="btn btn-primary" href={formUrl} target="_blank" rel="noopener noreferrer">
              Open Google Form
            </a>
          </div>
        </div>
      ) : (
        <form
          className="story-form"
          action={responseUrl}
          method="post"
          target="gwr-google-form-response"
          onSubmit={handleSubmit}
        >
          {hiddenFields.map((field, index) => (
            <input key={`${field.name}-${index}`} type="hidden" name={field.name} value={field.value} />
          ))}

          <div className="story-question">
            <label className="story-label" htmlFor="story-topic">
              What would you like us to talk about? <span className="required-mark" aria-hidden="true">*</span>
            </label>
            <p className="story-hint" id="story-topic-hint">
              Ex: Feeling left out even if you have friends.
            </p>
            <input
              className="story-text-input"
              id="story-topic"
              name="entry.820445172"
              type="text"
              aria-describedby="story-topic-hint"
              autoComplete="off"
              required
            />
          </div>

          <div className="story-question">
            <label className="story-label" htmlFor="story-specific">
              Is there anything specific you want us to address? <span className="story-optional">Optional</span>
            </label>
            <input
              className="story-text-input"
              id="story-specific"
              name="entry.1455160313"
              type="text"
              autoComplete="off"
            />
          </div>

          <fieldset className="story-question story-choice-question">
            <legend className="story-label">
              What would you want us to discuss about it? <span className="story-optional">Optional</span>
            </legend>
            <div className="story-choice-list">
              {discussionOptions.map((option) => (
                <label className="story-choice" key={option}>
                  <input type="checkbox" name="entry.1935992815" value={option} />
                  <span>{option}</span>
                </label>
              ))}
              <label className="story-choice story-other-choice">
                <input
                  type="checkbox"
                  name="entry.1935992815"
                  value="__other_option__"
                  checked={otherSelected}
                  onChange={(event) => setOtherSelected(event.target.checked)}
                />
                <span>Other:</span>
                <input
                  className="story-other-input"
                  type="text"
                  name="entry.1935992815.other_option_response"
                  aria-label="Other discussion topic"
                  autoComplete="off"
                  disabled={!otherSelected}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="story-question story-choice-question">
            <legend className="story-label">
              Want us to use your response? <span className="required-mark" aria-hidden="true">*</span>
            </legend>
            <div className="story-choice-list">
              {useOptions.map((option, index) => (
                <label className="story-choice" key={option}>
                  <input
                    type="radio"
                    name="entry.2002293649"
                    value={option}
                    required={index === 0}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="story-form-actions">
            <button
              className="btn btn-primary story-submit"
              type="submit"
              disabled={status === "submitting" || !responseFrameReady}
            >
              {status === "submitting" ? "Sending…" : "Submit"}
            </button>
            <span className="story-required-note">* Required</span>
          </div>
          <p className="story-form-fallback">
            Prefer the original?{" "}
            <a href={formUrl} target="_blank" rel="noopener noreferrer">Open the Google Form</a>.
          </p>
          <iframe
            id="gwr-google-form-response"
            className="story-response-frame"
            title="Google Forms submission response"
            name="gwr-google-form-response"
            tabIndex={-1}
            aria-hidden="true"
            onLoad={handleGoogleResponse}
          />
        </form>
      )}
    </>
  );
}
