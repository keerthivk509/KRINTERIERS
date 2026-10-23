import { Link } from "react-router-dom";
import { useServices } from "../hooks/useServices";
import { content } from "../data/content";

export default function Footer() {
  const { services } = useServices();
  const f = content.footer;
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <small>Based in</small>
          <p>{f.address}</p>
        </div>
        <div>
          <small>Call us</small>
          <p>{f.phone}</p>
          <a href={`mailto:${f.email}`}>{f.email}</a>
        </div>
        <div>
          <small>Services</small>
          {services.map((s) => (
            <Link key={s.id} to={`/services/${s.slug}`}>
              {s.title}
            </Link>
          ))}
        </div>
        <div>
          <small>Follow</small>
          <a href="https://x.com">X.com</a>
          <a href="https://instagram.com">Instagram</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">
        DREAMSPACE
      </div>
    </footer>
  );
}
