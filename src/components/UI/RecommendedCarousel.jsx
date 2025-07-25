import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendedCarousel.module.css";
import GenreTags from "./GenreTags";

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

      // Create multiple copies for infinite loop effect
      const loopedPodcasts = [...shuffled, ...shuffled, ...shuffled];
      setRecommendedPodcasts(loopedPodcasts);
    }
  }, [podcasts]);

  // Handle navigation to podcast detail
  const handlePodcastClick = (podcast) => {
    navigate(`/show/${podcast.id}`, { state: { genres: podcast.genres } });
  };

  // Handle scroll navigation with infinite loop
  const scroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = 320; // Width of one card plus gap
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "left") {
      if (container.scrollLeft <= 0) {
        // Jump to the end when at the beginning
        container.scrollLeft = maxScrollLeft;
      } else {
        container.scrollTo({
          left: container.scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      }
    } else {
      if (container.scrollLeft >= maxScrollLeft) {
        // Jump to the beginning when at the end
        container.scrollLeft = 0;
      } else {
        container.scrollTo({
          left: container.scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Update scroll button states - always enabled for infinite loop
  const updateScrollButtons = () => {
    // For infinite loop, buttons are always enabled
    setCanScrollLeft(true);
    setCanScrollRight(true);
  };

  // Listen for scroll events and handle infinite loop positioning
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      updateScrollButtons();

      // Handle infinite loop positioning
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const oneThirdPoint = container.scrollWidth / 3;

      // If we're near the end of the first set, jump to the second set
      if (container.scrollLeft >= oneThirdPoint * 2) {
        container.scrollLeft = container.scrollLeft - oneThirdPoint;
      }
      // If we're near the beginning of the last set, jump to the middle set
      else if (container.scrollLeft <= 0) {
        container.scrollLeft = oneThirdPoint;
      }
    };

    container.addEventListener("scroll", handleScroll);

    // Initial positioning - start at the middle set
    if (recommendedPodcasts.length > 0) {
      const oneThirdPoint = container.scrollWidth / 3;
      container.scrollLeft = oneThirdPoint;
    }

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
          disabled={false}
          aria-label="Scroll left"
        >
          &#8249;
        </button>

        {/* Carousel */}
        <div className={styles.carousel} ref={carouselRef}>
          {recommendedPodcasts.map((podcast, index) => (
            <div
              key={`${podcast.id}-${index}`}
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
                {podcast.genres && podcast.genres.length > 0 && (
                  <div className={styles.genreContainer}>
                    <GenreTags genres={podcast.genres} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`${styles.navButton} ${styles.rightButton}`}
          onClick={() => scroll("right")}
          disabled={false}
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
