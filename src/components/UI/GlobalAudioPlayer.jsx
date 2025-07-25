import React from "react";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import AudioPlayerModal from "./AudioPlayerModal";

/**
 * Global Audio Player Component
 *
 * Renders the audio player modal using global state.
 * This component is rendered at the app level to persist across page changes.
 *
 * @returns {JSX.Element|null} The global audio player component
 */
export default function GlobalAudioPlayer() {
  const {
    currentEpisode,
    isPlayerOpen,
    podcastTitle,
    seasonTitle,
    episodeImage,
    closePlayer,
  } = useAudioPlayer();

  return (
    <AudioPlayerModal
      episode={currentEpisode}
      podcastTitle={podcastTitle}
      seasonTitle={seasonTitle}
      episodeImage={episodeImage}
      isOpen={isPlayerOpen}
      onClose={closePlayer}
    />
  );
}
