import { useState, useEffect } from 'react';
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import Classification from "./Classification";
import Story from "./Story";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Library = () => {
  const [color, setColor] = useState('black');
  const [tags, setTags] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleClick = () => {
    setColor('pink');
    setTimeout(() => {
      setColor('black');
    }, 300);
  };


  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/stories');
        const storiesData = response.data;

        setStories(storiesData);

        const allTags = new Set();
        storiesData.forEach((story) => {
          if (story.tags) {
            story.tags.split(',').forEach((tag) => allTags.add(tag.trim()));
          }
        });

        setTags(Array.from(allTags));
      } catch (error) {
        console.error("Error fetching stories and tags:", error);
      }
    };

    fetchStories();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const filteredStories = selectedTag
    ? stories.filter((story) => story.tags && story.tags.split(',').map(tag => tag.trim()).includes(selectedTag))
    : stories;

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
            <SearchBar className="w-fit" />
          </div>
        </div>
        <div className="flex-col bg-white h-5/6 w-11/12 rounded-2xl p-10 overflow-auto ml-[5%] mt-[0.5%]">
          <div className="h-[100vh]">
            <div className="flex w-full">
              <div className="flex">
                <div className="mr-5" onClick={handleClick} style={{ cursor: 'pointer', fontSize: '24px', color }}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <h1 className="font-serif font-semibold text-2xl">Library</h1>
              </div>
            </div>
            <Classification tags={tags} onTagClick={handleTagClick} />
            <div className="flex flex-wrap justify-start w-full mt-4 gap-4">
              {filteredStories.map((story, index) => (
                <Story
                  key={index}
                  title={story.title}
                  // description={story.thema}
                  backgroundImage={story.backgroundImage || 'https://altselection.com/wp-content/uploads/2022/03/sehun-drama-high-school.jpg'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
