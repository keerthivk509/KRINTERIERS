import React, { useEffect, useState } from "react";
import { Marquee, SplitText } from "../MotionNew";
import "./Reviews.css";
import { getPublicReviews } from "../../api";

const defaultReviews = {
  title: "Loved by the people who sit in them",
  text: "From everyday comfort to timeless design, our pieces are made to become part of your home.",
  items: [
    [
      "Sophia Bennett",
      "Marketing Lead",
      "The piece looks incredible in our living room and is surprisingly comfortable. The quality feels premium without being overdone.",
      5,
    ],
    [
      "Ava Mitchell",
      "Operations Manager",
      "Simple, comfortable, and beautifully made. It fits perfectly around our dining table.",
      5,
    ],
    [
      "Noah Foster",
      "Sales Manager",
      "Delivery was smooth and the finish is exactly what we hoped for.",
      5,
    ],
    [
      "Alex Carter",
      "Product Manager",
      "Easily the most considered furniture we have bought.",
      5,
    ],
    [
      "James Parker",
      "IT Specialist",
      "Solid, calm, and well made. We get compliments all the time.",
      5,
    ],
  ],
};

export function Reviews() {
  const [reviewItems, setReviewItems] = useState(defaultReviews.items);

  useEffect(() => {
    let cancelled = false;

    const loadReviews = async () => {
      try {
        const data = await getPublicReviews();

        // Support either an array or an API response like { reviews: [...] }
        const apiReviews = Array.isArray(data)
          ? data
          : Array.isArray(data?.reviews)
            ? data.reviews
            : [];

        const usable = apiReviews
          .filter(
            (item) =>
              item &&
              typeof item.name === "string" &&
              item.name.trim() &&
              typeof item.review === "string" &&
              item.review.trim(),
          )
          .map((item) => [
            item.name,
            item.role || "",
            item.review,
            Math.max(1, Math.min(5, Number(item.rating) || 5)),
          ]);

        if (!cancelled) {
          // Use default testimonials if the API returns no valid reviews.
          setReviewItems(usable.length ? usable : defaultReviews.items);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Public reviews:", error);
          setReviewItems(defaultReviews.items);
        }
      }
    };

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  const reviews = {
    ...defaultReviews,
    items: reviewItems,
  };

  const Card = ({ r }) => {
    const rating = Number.isFinite(r[3]) ? Math.max(1, Math.min(5, r[3])) : 5;

    return (
      <figure className="review">
        <div
          className="stars"
          role="img"
          aria-label={`${rating} out of 5 stars`}
        >
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>

        <blockquote>{r[2]}</blockquote>

        <figcaption>
          <b>{r[0]}</b>
          <span>{r[1]}</span>
        </figcaption>
      </figure>
    );
  };

  return (
    <section className="section reviews-section">
      <div className="container">
        <div className="split-head reviews-heading">
          <div className="reviews-title">
            <SplitText text={reviews.title} className="h2" />
          </div>
        </div>
      </div>

      <div className="reviews-marquee reviews-marquee-top">
        <Marquee speed={45}>
          {reviews.items.map((r, i) => (
            <Card key={`${r[0]}-top-${i}`} r={r} />
          ))}
        </Marquee>
      </div>

      <div className="reviews-marquee reviews-marquee-bottom">
        <Marquee speed={55} reverse>
          {[...reviews.items].reverse().map((r, i) => (
            <Card key={`${r[0]}-bottom-${i}`} r={r} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export default Reviews;
