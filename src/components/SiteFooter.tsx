import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-card">
          <div className="footer-main">
            <div>
              <p className="footer-title">Louder Than Your Thoughts</p>
              <p className="footer-sub">A mental health organization for teens, started by Sophie Xu.</p>
            </div>
            <Link href="/share-your-story" className="footer-btn">Contact us</Link>
          </div>
          <div className="footer-fine">
            <ul className="foot-links">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Spotify</li>
            </ul>
            <p>
              Louder Than Your Thoughts offers peer support and general education. It is not a substitute for
              professional medical or mental health advice. If you are in crisis, call or text 988, or call 911.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
