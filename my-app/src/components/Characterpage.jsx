import { useState } from "react";
import Navigation from "./Navigation";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import SearchBar from "./SearchBar";

function Characterpage() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const [background, setBackground] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [error, setError] = useState("");

  const addTag = () => {
    if (tag.trim()) {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Convert image to base64 string
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  const saveCharacterInfo = () => {
    const characterInfo = {
      name: characterName,
      background: background,
      tags: tags,
      profileImage: profileImage,
    };

    setConfirmationData(characterInfo);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      await sendCharacterInfoToBackend(confirmationData);
      setShowConfirmation(false);
      alert("Character info saved successfully!");
    } catch (error) {
      console.error("Failed to save character info:", error);
      setError("Failed to save character info");
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const sendCharacterInfoToBackend = async (characterData) => {
    try {
      const payload = {
        name: characterData.name,
        background: characterData.background,
        tags: characterData.tags.join(","),
        profileImage: characterData.profileImage,
      };

      // Send POST request to backend
      const response = await fetch("http://localhost:8080/api/characters/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save character data");
      }

      const result = await response.text();
      console.log("Backend Response:", result);
    } catch (error) {
      console.error("Error sending data to backend:", error);
      throw new Error("Error sending data to backend");
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
      <div className="flex-1 bg-pink-50 p-5">
        <div className="flex">
          <div className="flex-shrink-0 w-1/3">
            <div className="border-4 border-gray-300 rounded-lg p-3 mb-4">
              <img
                src={profileImage || "/path/to/default/image.png"}
                alt="Character"
                className="object-cover rounded-lg w-full h-auto"
              />
            </div>

            <div>
              <input
                type="file"
                onChange={handleImageChange}
                className="border border-spacing-1 rounded-md h-10 text-sm p-2 mb-4"
              />
            </div>
          </div>

          <div className="flex-1 pl-5">
            <div className="mb-4">
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter character name"
                className="border border-spacing-1 rounded-md h-10 text-sm p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <textarea
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="Enter character background"
                className="border border-spacing-1 rounded-md text-sm p-2 w-full h-24"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Add a tag"
                className="border border-spacing-1 rounded-md h-10 text-sm p-2"
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
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2"
                >
                  #{t}
                </span>
              ))}
            </div>

            <button
              onClick={saveCharacterInfo}
              className="bg-black text-white rounded-md p-2 font-serif"
            >
              Save Character Info
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">Confirm Save</h2>
              <div className="mb-4">
                <img
                  src={confirmationData.profileImage || "/path/to/default/image.png"}
                  alt="Character"
                  className="object-cover rounded-lg w-15 h-10 mb-4"
                />
                <p><strong>Name:</strong> {confirmationData.name}</p>
                <p><strong>Background:</strong> {confirmationData.background}</p>
                <p><strong>Tags:</strong> {confirmationData.tags.join(", ")}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  className="bg-black text-white rounded-md p-2 mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white rounded-md p-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default Characterpage;
