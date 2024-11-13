

import { useState, useEffect } from 'react';
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import Popular from "./Popular";
import ListItem from "./ListItem";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

import axios from 'axios'; // Used to fetch data

const Home = () => {
  const [stories, setStories] = useState([]); // Store fetched stories
  const [filter, setFilter] = useState('Finished'); // Manage filter for Finished/In Progress
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term

  // Fetch stories from the backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/latest'); // API to get latest stories
        setStories(response.data); // Assume API returns a list of stories
        console.log("Fetched stories: ", response.data); // Debugging: log fetched stories
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };
    fetchStories();
  }, []);

  // Filter stories based on published status
  const filteredStories = stories.filter(story => {
    const status = story.published === true ? 'Finished' : 'In Progress';
    return status === filter; // Match filter to the status
  });


  // Search stories based on StoryName
  const searchStories = async () => {
    if (!searchTerm.trim()) {
      fetchStories(); // If search is empty, load latest stories
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/search?storyName=${searchTerm}`);
      setStories(response.data);
    } catch (error) {
      console.error('Error searching stories:', error);
    }
  };


  return (
    <div className="flex flex-col h-screen w-screen bg-pink-50">
      <div className="flex-1 h-screen bg-pink-50 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-2/5 justify-start">
            <div className="flex-shrink-0">
              <Link to="/home">
                <img src={logo} alt="Logo" className="w-[100px] h-auto ml-10" />
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
                placeholder="Search stories by name"
                className="border border-gray-300 rounded-md h-10 text-sm p-2 mr-2"
              />
              <button
                onClick={searchStories}
                className="bg-blue-500 text-white rounded-md p-2"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white h-5/6 w-11/12 rounded-2xl p-10 overflow-auto ml-[5%] mt-[0.5%]">
          <div className="h-[100vh]">
            <Popular />
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setFilter('Finished')}
                className={`px-4 py-2 rounded-md ${filter === 'Finished' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Finished
              </button>
              <button
                onClick={() => setFilter('In Progress')}
                className={`px-4 py-2 rounded-md ${filter === 'In Progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                In Progress
              </button>
            </div>

            {/* Display stories based on selected filter */}
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <Link
                  key={story.id}
                  to={{
                    pathname: `/story/${story.id}`,
                    state: { story }, // Pass the whole story object as state
                  }}
                >
                  <ListItem
                    imageSrc={story.backgroundImage} // Use story's background image
                    name={story.title} // Display story title
                    description={story.thema ? story.thema.split('.')[0] : 'No description available'} // Shorten description
                    status={filter} // Pass the filter (Finished/In Progress)
                    rating={4.5} // Assume fixed rating for now
                    profileImages={[]} // If you have additional profile images
                  />
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-600">No stories found in this category.</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
