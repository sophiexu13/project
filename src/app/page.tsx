import Link from "next/link";
import { Check } from "@/components/Check";
import { SignupForm } from "@/components/SignupForm";
import { showPoints } from "@/lib/content";

const offerings = [
  { href: "/episodes", title: "Podcast", text: "Conversations with teens and experts. Coming soon." },
  { href: "/resources", title: "Resources", text: "Crisis lines, peer support, and places to find care." },
  { href: "/share-your-story", title: "Share your story", text: "Send a question or an experience. You can stay anonymous." },
] as const;

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero">
        <div className="wrap hero-split">
          <figure className="photocard rise">
            <span className="photocard-tape" aria-hidden="true" />
            <img src="/sophie-portrait.jpg" alt="Portrait of Sophie Xu" />
            <figcaption>
              <span className="photocard-name">Sophie Xu, founder</span>
              <span className="photocard-quote">&ldquo;So I started building what I wished existed.&rdquo;</span>
            </figcaption>
          </figure>
          <div className="rise rise-2">
            <h1>Empowering a Generation of Girls to Feel Heard</h1>
            <p className="hero-sub">
              Louder Than Your Thoughts is a mental health organization for teens, started by Sophie Xu. Our podcast is
              coming soon.
            </p>
            <SignupForm />
          </div>
        </div>
        <div className="wrap">
          <div className="offer-row rise rise-2">
            {offerings.map((item) => (
              <Link key={item.href} href={item.href} className="card offer">
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="card feature">
            <div>
              <h2>Meet Sophie Xu</h2>
              <p className="muted">
                &ldquo;I&apos;m a teenager who got tired of mental health content that either felt too clinical or too
                vague to actually help. So I started building what I wished existed.&rdquo;
              </p>
              <Link href="/about" className="btn btn-secondary">About us</Link>
            </div>
            <img className="feature-photo" src="/sophie-beach.jpg" alt="Sophie Xu at the beach at sunset" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2 className="section-title">Mental health is part of life. So why is it still so hard to talk about?</h2>
            <p>
              Louder Than Your Thoughts is a teen mental health podcast made to make those conversations easier, more
              honest, and more relatable.
            </p>
            <p>
              Hosted by Sophie Xu, the show talks about what teens actually experience, all the way from school stress and
              friendships to emotions, confidence, and everything in between. Through real conversations, personal
              stories, expert perspectives, and reliable resources, it&apos;s a space where teens can learn, share, and
              feel less alone.
            </p>
          </div>
          <ul className="card checklist">
            {showPoints.map((point) => (
              <li key={point}>
                <Check />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
