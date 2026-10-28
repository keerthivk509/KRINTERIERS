import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { getPage } from "../api.js";
import { Reveal } from "../components/Motion.jsx";

/* Plain text from the CMS becomes paragraphs; HTML from a rich-text editor is sanitised first. */
function renderContent(content) {
  const text = String(content || "");
  if (/<[a-z][\s\S]*>/i.test(text))
    return (
      <div
        className="subpage-body"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
      />
    );
  return (
    <div className="subpage-body">
      {text
        .split(/\n{1,}/)
        .filter(Boolean)
        .map((p, i) => (
          <p key={i}>{p}</p>
        ))}
    </div>
  );
}

export default function SubPage() {
  const { slug } = useParams();
  const [state, setState] = useState({ status: "loading", page: null });
  const [heroReady, setHeroReady] = useState(false);
  console.log("state", state);
  useEffect(() => {
    const ctrl = new AbortController();
    setState({ status: "loading", page: null });
    setHeroReady(false);
    getPage(slug, ctrl.signal)
      .then((page) => {
        if (ctrl.signal.aborted) return;
        document.title = `${page.title} | KR`;
        setState({ status: "ready", page });
      })
      .catch((err) => {
        if (!ctrl.signal.aborted && err.name !== "AbortError")
          setState({
            status: err.status === 404 ? "missing" : "error",
            page: null,
          });
      });
    return () => ctrl.abort();
  }, [slug]);
  console.log("state", state);
  if (state.status === "loading")
    return (
      <div className="subpage-skeleton" aria-busy="true">
        <div className="skeleton-hero" />
        <div className="container">
          <div className="skeleton-line w60" />
          <div className="skeleton-line" />
          <div className="skeleton-line w80" />
        </div>
      </div>
    );

  if (state.status !== "ready")
    return (
      <section className="subpage-message">
        <div className="container text-center">
          <p className="eyebrow">
            {state.status === "missing"
              ? "PAGE NOT FOUND"
              : "SOMETHING WENT WRONG"}
          </p>
          <h1>
            {state.status === "missing"
              ? "We couldn’t find that page"
              : "We couldn’t load this page"}
          </h1>
          <p className="muted-copy">
            {state.status === "missing"
              ? "It may have been moved or removed."
              : "Please check your connection and try again."}
          </p>
          <Link className="btn btn-burgundy" to="/">
            Back to Home
          </Link>
        </div>
      </section>
    );
  console.log("state", state);
  const { page } = state;
  return (
    <article className="subpage" key={slug}>
      <header className="subpage-hero">
        {page.image && (
          <img
            src={page.image}
            alt=""
            onLoad={() => setHeroReady(true)}
            onError={() => setHeroReady(true)}
            className={heroReady ? "is-ready" : ""}
          />
        )}
        <div className="hero-shade" />
        <div className="container subpage-hero-copy">
          <nav className="breadcrumb-trail" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {page.parent && (
              <>
                <i className="bi bi-chevron-right" />
                <span>{page.parent}</span>
              </>
            )}
            <i className="bi bi-chevron-right" />
            <span>{page.title}</span>
          </nav>
          <h1 className="subpage-title">
            <span>{page.title}</span>
          </h1>
          {page.subtitle && <p className="subpage-subtitle">{page.subtitle}</p>}
        </div>
      </header>

      <section className="section-space">
        <div className="container">
          <Reveal className="subpage-content">
            {renderContent(page.content)}
          </Reveal>
          {page.images.length > 0 && (
            <div className="row g-4 subpage-gallery">
              {page.images.map((src, i) => (
                <Reveal
                  variant="zoom"
                  delay={(i % 3) * 100}
                  className="col-12 col-md-6 col-lg-4"
                  key={src + i}
                >
                  <figure className="subpage-figure">
                    <img
                      src={src}
                      alt={`${page.title} ${i + 1}`}
                      loading="lazy"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="subpage-cta">
        <Reveal className="container text-center">
          <p className="eyebrow light-eyebrow">LET’S TALK</p>
          <h2>Ready to start your project?</h2>
          <a className="btn btn-gold" href="#contact">
            Get it now <i className="bi bi-arrow-right ms-2" />
          </a>
        </Reveal>
      </section>
    </article>
  );
}
