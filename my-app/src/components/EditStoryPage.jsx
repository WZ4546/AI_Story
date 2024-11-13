import { useState, useEffect } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const EditStoryPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [story, setStory] = useState(state?.story || null);
  const [editedThema, setEditedThema] = useState(story?.thema || '');
  const [color, setColor] = useState('black');

  // Change color when the button is clicked
  const handleClick = () => {
    setColor('pink');
    setTimeout(() => {
      setColor('black');
    }, 300);
  };

  // Fetch story data
  useEffect(() => {
    if (!story) {
      const fetchStory = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/story/${id}`);
          setStory(response.data);
          setEditedThema(response.data.thema); // Initialize the edited theme field
        } catch (error) {
          console.error('Error fetching story details:', error);
        }
      };
      fetchStory();
    }
  }, [id, story]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/story/${id}`, {
        ...story,
        thema: editedThema, // Update the theme field
      });
      alert('Story theme updated successfully!');
      navigate(`/story/${id}`); // Return to the detail page after saving
    } catch (error) {
      console.error('Error saving story theme:', error);
      alert('Failed to save story theme. Please try again.');
    }
  };

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-pink-50">
      <div className="flex-1 h-screen w-full">
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
            <SearchBar className="w-fit" />
          </div>
        </div>

        <div className="flex bg-white h-5/6 w-11/12 rounded-2xl pt-10 pr-10 pb-10 overflow-auto ml-auto mr-auto mt-[0.5%] justify-center items-center">
          <div className="w-full md:w-3/5 flex flex-col items-start justify-start">
            <div className="flex w-full items-start">
              <div onClick={handleClick} style={{ cursor: 'pointer', fontSize: '24px', color }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <h1 className="font-serif font-semibold text-2xl ml-2">Edit Story</h1>
            </div>

            <div className="flex flex-col items-center w-full mt-4">
              <img src={story.backgroundImage} alt={story.title} className="w-full max-w-lg h-auto object-contain rounded-lg mb-4" />

              <h1 className="text-3xl font-serif font-bold mb-2">{story.title}</h1>
              <h1 className="text-lg font-serif mb-2">Published on: {story.createdAt}</h1>

              <div className="w-full flex flex-col mt-4">
                <label className="font-bold text-lg mb-2">Edit Theme:</label>
                <textarea
                  value={editedThema}
                  onChange={(e) => setEditedThema(e.target.value)}
                  className="border border-gray-300 rounded-md p-4 h-48 resize-none w-full text-lg"
                  placeholder="Please enter the new theme..."
                />
                <button
                  onClick={handleSave}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faSave} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStoryPage;
