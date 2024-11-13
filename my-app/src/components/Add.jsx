import { useState, useEffect } from 'react';
import Navigation from "./Navigation";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import SearchBar from "./SearchBar";
import Character from './Character';
import axios from 'axios';

function Add() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [StoryName, setStoryName] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [characterActions, setCharacterActions] = useState({});
  const [generatedStory, setGeneratedStory] = useState("");
  const navigate = useNavigate();

  const handleCharacterSelect = (character) => {
    if (!selectedCharacters.find((c) => c.id === character.id)) {
      setSelectedCharacters([...selectedCharacters, character]);
      setCharacterActions({ ...characterActions, [character.id]: "" });
    }
  };


  const generateAndSaveStory = async () => {
    const payload = {
      storyName: StoryName,
      storyBackground: description,
      backgroundImage: backgroundImage,
      tags: tags.join(','),
      charactersBackground: selectedCharacters.map((char) => ({
        name: char.name,
        action: characterActions[char.id],
      })),
    };

    try {
      const response = await fetch('http://localhost:8080/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const result = await response.json();
      console.log('Generated Story:', result.story);

      // 生成成功后立即保存故事
      const storyPayload = {
        title: StoryName,
        description: description,
        thema: result.story,
        backgroundImage: backgroundImage,
        tags: tags.join(','),
        characters: selectedCharacters.map((char) => char.id),
      };

      await saveStory(storyPayload);
    } catch (error) {
      console.error('Error generating or saving story:', error);
      alert('An error occurred while generating or saving the story.');
    }
  };

  const saveStory = async (storyPayload) => {
    try {
      const response = await axios.post('http://localhost:8080/api/stories', storyPayload);
      if (response.status === 200 || response.status === 201) {
        alert('Story saved successfully!');
        navigate('/home');
      } else {
        throw new Error('Failed to save story');
      }
    } catch (error) {
      console.error('Error saving story:', error);
      alert('An error occurred while saving the story.');
    }
  };

  // Update character actions in the story
  const handleActionChange = (id, action) => {
    setCharacterActions({ ...characterActions, [id]: action });
  };

  // Remove selected character
  const handleRemoveCharacter = (id) => {
    setSelectedCharacters(selectedCharacters.filter((character) => character.id !== id));
    const updatedActions = { ...characterActions };
    delete updatedActions[id];
    setCharacterActions(updatedActions);
  };

  // Fetch characters based on search term
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/characters?name=${searchTerm}`);
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchCharacters();
      } else {
        setCharacters([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Add a tag to the list of tags
  const addTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  // Handle background image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-pink-50">
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
      <div className="flex-1 bg-pink-50 p-5 overflow-auto">
        <div className="flex flex-wrap">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <div className="border-4 border-gray-300 rounded-lg p-3 mb-4">
              <img
                src={backgroundImage || "/path/to/default/image.png"}
                alt="Story Background"
                className="object-cover rounded-lg w-full h-auto"
              />
            </div>

            <div>
              <input
                type="file"
                onChange={handleImageChange}
                className="border border-spacing-1 rounded-md h-10 text-sm p-2 mb-4 w-full"
              />
            </div>
          </div>

          <div className="flex-1 md:pl-5">
            <div className="mb-4">
              <input
                type="text"
                value={StoryName}
                onChange={(e) => setStoryName(e.target.value)}
                placeholder="Give your story a name"
                className="border border-spacing-1 rounded-md h-10 text-sm p-2 w-full"
              />
            </div>
      
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for characters by name"
                className="border border-spacing-1 rounded-md h-10 text-sm p-2 w-full"
              />
            </div>

            <div className="flex overflow-x-auto space-x-8 mt-4" style={{ whiteSpace: 'nowrap' }}>
              {characters.length > 0 ? (
                characters
                  .filter((character) =>
                    character.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((character) => (
                    <div key={character.id} className="inline-block">
                      <Character
                        image={`data:image/jpeg;base64,${
                          character.profileImage
                            ? character.profileImage.replace(/^data:image\/jpeg;base64,/, "")
                            : ""
                        }`}
                        name={character.name}
                        onClick={() => handleCharacterSelect(character)}
                      />
                    </div>
                  ))
              ) : (
                <p>No characters found</p>
              )}
            </div>

            <div className="mt-4">
              {selectedCharacters.map((character) => (
                <div key={character.id} className="flex items-center space-x-4 mb-4">
                  <div>
                    <Character
                      image={`data:image/jpeg;base64,${
                        character.profileImage
                          ? character.profileImage.replace(/^data:image\/jpeg;base64,/, "")
                          : ""
                      }`}
                      name={character.name}
                    />
                    
                  </div>
                  <input
                    type="text"
                    value={characterActions[character.id]}
                    onChange={(e) => handleActionChange(character.id, e.target.value)}
                    placeholder={`What does ${character.name} do in the story?`}
                    className="border border-spacing-1 rounded-md h-10 text-sm p-2 w-full"
                  />
                  <button
                    onClick={() => handleRemoveCharacter(character.id)}
                    className="bg-red-500 text-white rounded-md p-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Give your story a background"
                className="border border-spacing-1 rounded-md text-sm p-2 w-full h-24"
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Add a tag"
                className="border border-spacing-1 rounded-md h-10 text-sm p-2 flex-grow"
              />
              <button
                onClick={addTag}
                className="ml-2 bg-black text-white rounded-md p-2 h-10 font-serif"
              >
                Add Tag
              </button>
            </div>
            <div className="mb-4">
              {tags.map((t, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={generateAndSaveStory} 
              className="bg-blue-500 text-white rounded-md p-2 mt-4"
            >
              Generate and Save Story with AI
            </button>
            {generatedStory && (
              <div className="mt-4 bg-gray-100 p-4 rounded-md">
                <h2 className="text-xl font-bold mb-2">Generated Story:</h2>
                <p>{generatedStory}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
