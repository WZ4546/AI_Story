import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import Character from './Character';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CharacterLibrary = () => {
  const [color, setColor] = useState('black');
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term

  useEffect(() => {
    // Fetch the latest characters on initial load
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/characters/latest');
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  // Function to search characters by name
  const searchCharacters = async () => {
    if (!searchTerm.trim()) {
      fetchCharacters(); // Load latest characters if search is empty
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/characters/search?name=${searchTerm}`);
      setCharacters(response.data);
    } catch (error) {
      console.error('Error searching characters:', error);
    }
  };

  const handleClick = () => {
    setColor('pink');
    setTimeout(() => {
      setColor('black');
    }, 300);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-pink-50">
      <div className="flex-1 h-screen bg-pink-50 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-2/5 justify-start">
            <div className="flex-shrink-0">
              <Link to="/home">
                < img src={logo} alt="Logo" className="w-[100px] h-auto ml-10" />
              </Link>
            </div>
            <Navigation />
          </div>
          <div className="flex justify-end w-4/5 mr-[10%]">
            {/* Search input and button */}
            <div className="flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search characters by name"
                className="border border-gray-300 rounded-md h-10 text-sm p-2 mr-2"
              />
              <button
                onClick={searchCharacters}
                className="bg-blue-500 text-white rounded-md p-2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex-col bg-white h-5/6 w-11/12 rounded-2xl p-10 overflow-auto ml-[5%] mt-[0.5%]">
          <div className="h-[100vh] flex-col justify-start w-full">
            <div className="flex w-full">
              <div className="flex-col">
                <div className="flex">
                  <div className="mr-5" onClick={handleClick} style={{ cursor: 'pointer', fontSize: '24px', color }}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>
                  <h1 className="font-serif font-semibold text-2xl">My Characters</h1>
                </div>

                <h1 className="font-serif font-semibold text-2xl mt-8">Latest Created Characters</h1>

                <div className="flex flex-wrap justify-start mt-6 gap-4">
                  {characters.map((character) => (
                    <div key={character.id} className="p-2">
                      <Link to={`/characters/${character.id}`}>
                        <Character
                          image={`data:image/jpeg;base64,${
                            character.profileImage ? character.profileImage.replace(/^data:image\/jpeg;base64,/, '') : ''
                          }`}
                          name={character.name}
                        />
                      </Link>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterLibrary;