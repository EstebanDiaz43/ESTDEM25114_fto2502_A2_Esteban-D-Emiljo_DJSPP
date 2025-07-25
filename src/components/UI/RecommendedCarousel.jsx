import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendedCarousel.module.css";

/**
 * Recommended Podcasts Carousel Component
 *
 * Displays a horizontal scrollable carousel of recommended podcasts.
 * Shows at least 9 podcasts with navigation arrows and smooth scrolling.
 *
 * @param {Object} props - Component props
 * @param {Array} props.podcasts - Array of all available podcasts
 * @returns {JSX.Element} The recommended podcasts carousel component
 */
export default function RecommendedCarousel({ podcasts }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [recommendedPodcasts, setRecommendedPodcasts] = useState([]);

  // Get recommended podcasts (at least 9)
  useEffect(() => {
    if (podcasts && podcasts.length > 0) {
      // Get a mix of recent and popular podcasts for recommendations
      const shuffled = [...podcasts]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.max(9, Math.min(15, podcasts.length)));
      setRecommendedPodcasts(shuffled);
    }
  }, [podcasts]);

  // Handle navigation to podcast detail
  const handlePodcastClick = (podcast) => {
    navigate(`/show/${podcast.id}`, { state: { genres: podcast.genres } });
  };

  // Handle scroll navigation
  const scroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = 320; // Width of one card plus gap
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  // Update scroll button states
  const updateScrollButtons = () => {
    const container = carouselRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  // Listen for scroll events
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => updateScrollButtons();
    container.addEventListener("scroll", handleScroll);

    // Initial check
    updateScrollButtons();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [recommendedPodcasts]);

  if (!recommendedPodcasts.length) return null;

  return (
    <section className={styles.recommendedSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recommended for You</h2>
        <p className={styles.subtitle}>
          Discover amazing podcasts you might love
        </p>
      </div>

      <div className={styles.carouselContainer}>
        {/* Left Arrow */}
        <button
          className={`${styles.navButton} ${styles.leftButton}`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          &#8249;
        </button>

        {/* Carousel */}
        <div className={styles.carousel} ref={carouselRef}>
          {recommendedPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className={styles.carouselCard}
              onClick={() => handlePodcastClick(podcast)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className={styles.podcastImage}
                />
                <div className={styles.overlay}>
                  <span className={styles.playIcon}>▶</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.podcastTitle}>{podcast.title}</h3>
                <p className={styles.seasonsCount}>
                  {podcast.seasons} season{podcast.seasons !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`${styles.navButton} ${styles.rightButton}`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
