import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import Favorites from "./pages/Favorites";
import { PodcastProvider } from "./context/PodcastContext";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import { GlobalAudioPlayer } from "./components";

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in the `AudioPlayerProvider` for global audio player state.
 * - Wraps the application in the `PodcastProvider` context for global state.
 * - Includes the `Header` component, displayed on all pages.
 * - Includes the `GlobalAudioPlayer` component, displayed globally.
 * - Defines client-side routes using React Router:
 *    - "/" renders the `Home` page
 *    - "/favorites" renders the `Favorites` page
 *    - "/show/:id" renders the `ShowDetail` page for a specific podcast
 *
 * @returns {JSX.Element} The application component with routing and context.
 */
export default function App() {
  return (
    <AudioPlayerProvider>
      <Header />
      <PodcastProvider>
        <p>efubefuibeufbuifbeuifbeuib</p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path={`/show/:id`} element={<ShowDetail />} />
        </Routes>
      </PodcastProvider>
      <GlobalAudioPlayer />
    </AudioPlayerProvider>
  );
}
export default function App() {
  return (
    <>
      <Header />
      <PodcastProvider>
        <p>efubefuibeufbuifbeuifbeuib</p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/show/:id`} element={<ShowDetail />} />
        </Routes>
      </PodcastProvider>
    </>
  );
}
