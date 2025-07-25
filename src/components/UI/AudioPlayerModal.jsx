import React, { useState, useRef, useEffect } from "react";
import styles from "./AudioPlayerModal.module.css";

/**
 * Audio Player Modal Component
 *
 * A modal that appears at the bottom of the screen with audio player controls.
 * Plays podcast episodes with basic controls (play/pause, progress, volume).
 *
 * @param {Object} props - Component props
 * @param {Object} props.episode - Episode object with audio file and metadata
 * @param {string} props.podcastTitle - Title of the podcast
 * @param {string} props.seasonTitle - Title of the season
 * @param {string} props.episodeImage - Image URL for the episode
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @returns {JSX.Element} The audio player modal component
 */
export default function AudioPlayerModal({
  episode,
  podcastTitle,
  seasonTitle,
  episodeImage,
  isOpen,
  onClose,
}) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [episode]);

  // Play/Pause functionality
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Format time display
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!isOpen || !episode) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.audioPlayer}>
        <audio
          ref={audioRef}
          src={episode.file}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Close button */}
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        {/* Episode Info */}
        <div className={styles.episodeInfo}>
          <img
            src={episodeImage}
            alt="Episode cover"
            className={styles.episodeImage}
          />
          <div className={styles.episodeDetails}>
            <h4 className={styles.episodeTitle}>{episode.title}</h4>
            <p className={styles.podcastInfo}>
              {podcastTitle} • {seasonTitle}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className={styles.playerControls}>
          <button className={styles.playButton} onClick={togglePlayPause}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          {/* Progress Bar */}
          <div className={styles.progressContainer}>
            <span className={styles.timeDisplay}>
              {formatTime(currentTime)}
            </span>
            <div
              className={styles.progressBar}
              ref={progressRef}
              onClick={handleProgressClick}
            >
              <div
                className={styles.progressFill}
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
            </div>
            <span className={styles.timeDisplay}>{formatTime(duration)}</span>
          </div>

          {/* Volume Control */}
          <div className={styles.volumeControl}>
            <span className={styles.volumeIcon}>🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeSlider}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
