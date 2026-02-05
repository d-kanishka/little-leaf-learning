import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioContext";
import HomePage from "./pages/HomePage";
import AnimalsPage from "./pages/AnimalsPage";
import PlantsPage from "./pages/PlantsPage";
import WeatherPage from "./pages/WeatherPage";
import SeasonsPage from "./pages/SeasonsPage";
import GamesPage from "./pages/GamesPage";
// Animal Games
import AnimalTapLearnGame from "./pages/games/animals/TapLearnGame";
import AnimalDragDropGame from "./pages/games/animals/DragDropGame";
import AnimalSoundMatchGame from "./pages/games/animals/SoundMatchGame";
import AnimalColoringGame from "./pages/games/animals/ColoringGame";
// Plant Games
import PlantTapPartGame from "./pages/games/plants/TapPartGame";
import GrowPlantGame from "./pages/games/plants/GrowPlantGame";
import PlantMatchingGame from "./pages/games/plants/MatchingGame";
import PlantColoringGame from "./pages/games/plants/ColoringGame";
// Weather Games
import WeatherTodayGame from "./pages/games/weather/TodayWeatherGame";
import WeatherMatchingGame from "./pages/games/weather/MatchingGame";
import DressWeatherGame from "./pages/games/weather/DressWeatherGame";

// Season Games
import SeasonWheelGame from './pages/games/seasons/WheelGame';
import SeasonMatchingGame from './pages/games/seasons/MatchingGame';
import SeasonDrawingGame from './pages/games/seasons/DrawingGame';
import NotFound from "./pages/NotFound";
import FormPage from "./pages/FormPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AudioProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/animals" element={<AnimalsPage />} />
            <Route path="/plants" element={<PlantsPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/seasons" element={<SeasonsPage />} />
            <Route path="/games" element={<GamesPage />} />
             <Route path="/games-preference" element={<FormPage />} />
            {/* Animal Games */}
            <Route path="/games/animals/tap-learn" element={<AnimalTapLearnGame />} />
            <Route path="/games/animals/drag-drop" element={<AnimalDragDropGame />} />
            <Route path="/games/animals/sound-match" element={<AnimalSoundMatchGame />} />
            <Route path="/games/animals/coloring" element={<AnimalColoringGame />} />    
            {/* Plant Games */}
            <Route path="/games/plants/tap-part" element={<PlantTapPartGame />} />
            <Route path="/games/plants/grow" element={<GrowPlantGame />} />
            <Route path="/games/plants/matching" element={<PlantMatchingGame />} />
            <Route path="/games/plants/coloring" element={<PlantColoringGame />} />
            {/* Weather Games */}
            <Route path="/games/weather/today" element={<WeatherTodayGame />} />
            <Route path="/games/weather/matching" element={<WeatherMatchingGame />} />
            <Route path="/games/weather/dress" element={<DressWeatherGame />} />
            {/* Season Games */}
            <Route path="/games/seasons/drawing" element={<SeasonDrawingGame />} />
            <Route path="/games/seasons/wheel" element={<SeasonWheelGame />} />
            <Route path="/games/seasons/matching" element={<SeasonMatchingGame />} />
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;