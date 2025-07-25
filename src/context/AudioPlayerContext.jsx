import React, { createContext, useContext, useState } from 'react';

/**
 * Audio Player Context
 * 
 * Provides global state management for the audio player modal.
 * This allows the audio player to persist across page navigation.
 */
const AudioPlayerContext = createContext();

/**
 * Hook to use the audio player context
 * @returns {Object} Audio player context value
 */
export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};

/**
 * Audio Player Provider Component
 * 
 * Wraps the application to provide global audio player state.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The provider component
 */
export function AudioPlayerProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [podcastTitle, setPodcastTitle] = useState('');
  const [seasonTitle, setSeasonTitle] = useState('');
  const [episodeImage, setEpisodeImage] = useState('');

  /**
   * Play an episode in the audio player
   * @param {Object} episode - Episode object with audio file and metadata
   * @param {string} podcast - Title of the podcast
   * @param {string} season - Title of the season
   * @param {string} image - Image URL for the episode
   */
  const playEpisode = (episode, podcast, season, image) => {
    setCurrentEpisode(episode);
    setPodcastTitle(podcast);
    setSeasonTitle(season);
    setEpisodeImage(image);
    setIsPlayerOpen(true);
  };

  /**
   * Close the audio player
   */
  const closePlayer = () => {
    setIsPlayerOpen(false);
    // Don't clear the episode data immediately to allow for smooth transitions
    setTimeout(() => {
      if (!isPlayerOpen) {
        setCurrentEpisode(null);
        setPodcastTitle('');
        setSeasonTitle('');
        setEpisodeImage('');
      }
    }, 300); // Match the CSS animation duration
  };

  const value = {
    currentEpisode,
    isPlayerOpen,
    podcastTitle,
    seasonTitle,
    episodeImage,
    playEpisode,
    closePlayer,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
