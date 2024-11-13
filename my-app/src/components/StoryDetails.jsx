import { useState, useEffect } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom'; // 添加了 useNavigate
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useStorySpeech from './useStorySpeech';

const StoryDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate(); // 用于导航到编辑页面
  const [story, setStory] = useState(state?.story || null);
  const { playStoryAsSpeech } = useStorySpeech(); 
  const [color, setColor] = useState('black');
  const [comments, setComments] = useState([
    { user: "Alice", content: "Amazing story!" },
    { user: "Bob", content: "I can't wait for the next chapter." }
  ]);

  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');

  const handleClick = () => {
    setColor('pink');
    setTimeout(() => {
      setColor('black');
    }, 300);
  };

  useEffect(() => {
    if (!story) {
      const fetchStory = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/story/${id}`);
          setStory(response.data);
        } catch (error) {
          console.error('Error fetching story details:', error);
        }
      };
      fetchStory();
    }
  }, [id, story]);

  const handleAddComment = () => {
    if (username && newComment) {
      setComments([...comments, { user: username, content: newComment }]);
      setNewComment('');
      setUsername('');
    }
  };

  const handleEdit = () => {
    navigate(`/story/edit/${id}`, { state: { story } }); // 导航到编辑页面并传递 story 数据
  };

  const handlePublish = async () => {
    try {
      // Make a PUT request to update is_published to true (1)
      await axios.put(`http://localhost:8080/api/story/${id}/publish`);
      alert('Story published successfully!');

      // Update the local story state to reflect that it's published
      setStory({ ...story, is_published: true });
    } catch (error) {
      console.error('Error publishing story:', error);
      alert('Failed to publish story. Please try again.');
    }
  };

  if (!story) {
    return <div>Loading...</div>;
  }


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

        <div className="flex bg-white h-5/6 w-11/12 rounded-2xl p-10 overflow-auto ml-[5%] mt-[0.5%]">
          {/* 左侧部分展示故事详情和角色 */}
          <div className="w-3/5 flex-col justify-start">
            <div className="flex mb-5">
              <div className="mr-5" onClick={handleClick} style={{ cursor: 'pointer', fontSize: '24px', color }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <h1 className="font-serif font-semibold text-2xl">Library</h1>
            </div>

            <div className="flex flex-col items-center h-1/5 ml-10">
              <div className="relative">
                <img src={story.backgroundImage} alt={story.title} className="w-auto object-contain rounded-lg" />
              </div>
              <button
                onClick={() => playStoryAsSpeech(story.thema)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors duration-300 shadow-md"
              >
                <FontAwesomeIcon icon={faVolumeUp} />
                Read Aloud
              </button>
              <div className="flex-col mt-4">
                <h1 className="text-3xl font-serif font-bold ml-10">{story.title}</h1>
                <h1 className="text-lg font-serif ml-10">publish date: {story.createdAt}</h1>
                <h1 className="text-lg font-serif font-bold ml-10">{story.thema}</h1>
                <div className="flex gap-4 mt-4 ml-10">
                  <button 
                    onClick={handleEdit}
                    className="bg-blue-500 text-white rounded-md px-4 py-2 font-semibold hover:bg-blue-600 transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                  onClick={handlePublish}
                  className="bg-green-500 text-white rounded-md px-4 py-2 font-semibold hover:bg-green-600 transition-colors duration-300">
                    Finished
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/5 flex-col ml-5 bg-gray-100 p-5 rounded-lg">
            <h1 className="text-3xl font-serif font-bold mb-4">Comments</h1>
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="border p-3 rounded-lg bg-white">
                  <h3 className="font-bold">{comment.user}</h3>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded-md w-full mb-4"
              />
              <textarea
                placeholder="Write your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600 transition-colors duration-300"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;

