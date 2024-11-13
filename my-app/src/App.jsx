import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Register from './components/Register';
import Home from './components/home';
import Characterpage from './components/Characterpage';
import Library from './components/Library';
import StoryDetails from './components/StoryDetails';
import CharacterLibrary from './components/CharacterLibrary';
import CharacterDetail from './components/CharacterDetailPage';
import Add from './components/Add';
import EditStoryPage from './components/EditStoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addCharacter" element={<Characterpage />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/story/:id" element={<StoryDetails />} />
        <Route path="/CharacterLibrary" element={<CharacterLibrary />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/story/edit/:id" element={<EditStoryPage />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;
