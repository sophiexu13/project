"use client";

import { useState } from "react";
import { podcastSignupEndpoint } from "@/lib/content";

type Status = "idle" | "sending" | "done" | "error";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!podcastSignupEndpoint) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(podcastSignupEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="signup-note" role="status">Thanks! We&apos;ll email you when the podcast launches.</p>;
  }

  return (
    <>
      <form className="signup" onSubmit={onSubmit}>
        <label htmlFor="signup-email" className="sr-only">Email address</label>
        <input
          id="signup-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Signing up…" : "Sign up"}
        </button>
      </form>
      {status === "error" && (
        <p className="signup-note" role="alert">Sign-up isn&apos;t working right now. Please try again later.</p>
      )}
    </>
  );
}
