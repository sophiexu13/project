export const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/episodes", label: "Episodes" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About us" },
] as const;

export const ctaItem = { href: "/share-your-story", label: "Share your story" } as const;

export const showPoints = [
  "A space where teens talk openly about mental health, without being told how to feel.",
  "Doctors and researchers join episodes so the information is accurate, not just anecdotal.",
  "You can send in questions anonymously. Episodes get built around what's actually on people's minds.",
  "The focus is on being heard, not \"fixed.\" No one-size-fits-all advice.",
  "Coping strategies you can actually use, alongside the harder conversations.",
] as const;

// Where the podcast sign-up form sends emails (for example a Formspree or Buttondown URL).
// Leave empty until a service is set up.
export const podcastSignupEndpoint = "";

export const posts = [
  {
    slug: "why-is-it-so-hard-to-talk-about",
    title: "Mental health is part of life. So why is it still so hard to talk about?",
    author: "Sophie Xu",
    excerpt: "Real conversations. Real experiences. Why we started Louder Than Your Thoughts.",
  },
] as const;
