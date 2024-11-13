import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [color, setColor] = useState("black");
  const [isEditing, setIsEditing] = useState(false); // New: Edit mode state
  const [editedCharacter, setEditedCharacter] = useState(null); // New: State to save the edited character data

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/characters/${id}`);
        setCharacter(response.data);
        setEditedCharacter(response.data); // Initialize edited character data
      } catch (error) {
        console.error("Error fetching character details:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    };

    fetchCharacterDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      try {
        await axios.delete(`http://localhost:8080/api/characters/${id}`);
        alert("Character successfully deleted");
        navigate("/characters"); // Redirect to character list page
      } catch (error) {
        console.error("Error deleting character:", error);
        setDeleteError("Failed to delete character. Please try again later.");
      }
    }
  };

  const handleClick = () => {
    setColor("pink");
    setTimeout(() => {
      setColor("black");
    }, 300);
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  // Save changes
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/characters/${id}`, editedCharacter);
      setCharacter(editedCharacter);
      setIsEditing(false);
      alert("Character information updated successfully!");

      navigate(`/characters/${id}`);
    } catch (error) {
      console.error("Error saving character information:", error);
      setError("Unable to save character information. Please try again later.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!character) {
    return <p>Loading...</p>;
  }

  const tags = Array.isArray(character.tags) ? character.tags : character.tags ? [character.tags] : [];

  return (
    <div className="flex flex-col h-screen w-screen bg-pink-50">
      {/* Top Navigation Bar */}
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

        {/* Main Content */}
        <div className="flex-col bg-white h-5/6 w-11/12 rounded-2xl p-10 overflow-auto ml-[5%] mt-[0.5%]">
          <div className="h-full flex-col justify-start w-full">
            <div className="flex w-full">
              <div className="flex-col w-full">
                {/* Back Button and Title */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className="mr-5"
                      onClick={handleClick}
                      style={{ cursor: 'pointer', fontSize: '24px', color }}
                    >
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        onClick={() => navigate("/characters")}
                      />
                    </div>
                    <h1 className="font-serif font-semibold text-2xl">Character Details</h1>
                  </div>
                  {/* Edit Button */}
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition"
                    onClick={handleEditToggle}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    {isEditing ? "Cancel Edit" : "Edit"}
                  </button>
                </div>

                <div className="flex items-start space-x-6 mt-8">
                  <div className="flex-shrink-0">
                    <img
                      src={character.profileImage}
                      alt={character.name}
                      className="rounded-lg w-48 h-auto object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      // Edit Form
                      <div className="flex flex-col">
                        <label className="font-bold text-lg mb-2">Name:</label>
                        <input
                          type="text"
                          name="name"
                          value={editedCharacter.name}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />

                        <label className="font-bold text-lg mb-2">Description:</label>
                        <textarea
                          name="background"
                          value={editedCharacter.background}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md p-2 mb-4 w-full h-32 resize-none"
                        />

                        <label className="font-bold text-lg mb-2">Tags:</label>
                        <input
                          type="text"
                          name="tags"
                          value={
                            Array.isArray(editedCharacter.tags)
                              ? editedCharacter.tags.join(', ')
                              : editedCharacter.tags
                          }
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />

                        {/* Save Button */}
                        <button
                          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 transition"
                          onClick={handleSave}
                        >
                          <FontAwesomeIcon icon={faSave} />
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      // Display Character Information
                      <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{character.name}</h1>
                        <p className="text-gray-600 mb-4">
                          <strong>Description:</strong> {character.background || "No description available."}
                        </p>
                        <p className="text-gray-600 mb-4">
                          <strong>Tags:</strong> {tags.length > 0 ? tags.join(", ") : "No tags"}
                        </p>
                        <p className="text-gray-600 mb-4">
                          <strong>Created At:</strong>{" "}
                          {character.createdAt ? new Date(character.createdAt).toLocaleString() : "Unavailable"}
                        </p>

                        {/* Delete Button */}
                        <button
                          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                          onClick={handleDelete}
                        >
                          Delete Character
                        </button>

                        {deleteError && <p className="text-red-500 mt-4">{deleteError}</p>}
                      </div>
                    )}
                  </div>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;
