import React from "react";
import styles from "./PlayEpisodeButton.module.css";

/**
 * Play Episode Button Component
 *
 * A button that triggers the audio player modal for a specific episode.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onPlay - Function to call when play button is clicked
 * @param {string} props.size - Size of the button ('small' or 'large')
 * @returns {JSX.Element} The play episode button component
 */
export default function PlayEpisodeButton({ onPlay, size = "small" }) {
  return (
    <button
      className={`${styles.playButton} ${styles[size]}`}
      onClick={onPlay}
      title="Play Episode"
    >
      <span className={styles.playIcon}>▶️</span>
      <span className={styles.playText}>Play</span>
    </button>
  );
}
