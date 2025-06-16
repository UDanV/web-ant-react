import { Route, Routes } from 'react-router-dom';
import { Characters } from './pages/Characters';
import {Episodes} from "./pages/Episodes.tsx";
import {Locations} from "./pages/Locations.tsx";
import CharacterDetails from "./pages/CharacterDetails.tsx";
import LocationDetails from "./pages/LocationDetails.tsx";
import EpisodeDetails from "./pages/EpisodeDetails.tsx";
import './index.css';

export const App = () => {
    return (
        <Routes>
            <Route path="/characters" element={<Characters />} />
            <Route path="/character/:characterId" element={<CharacterDetails />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/episode/:episodeId" element={<EpisodeDetails />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/location/:locationId" element={<LocationDetails />} />
        </Routes>
    );
};