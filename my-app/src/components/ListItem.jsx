import { FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ListItem = ({ imageSrc, name, description, status, rating, profileImages }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
      {/* Main Image */}
      <img
        src={imageSrc}
        alt={name}
        className="w-24 h-24 object-cover rounded-lg mr-4"
      />

      {/* Content */}
      <div className="flex-grow">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600">{description}</p>

        {/* Display the status */}
        <p className="text-yellow-600 font-bold">Status: {status}</p>

        {/* Profile Images */}
        {profileImages && profileImages.length > 0 && (
          <div className="mt-4 flex space-x-2">
            {profileImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Profile ${index + 1}`}
                className="w-10 h-10 object-cover rounded-full border-2 border-gray-300"
              />
            ))}
          </div>
        )}
      </div>

      {/* Rating and Like Icon */}
      <div className="flex items-center">
        <span className="text-yellow-500 font-semibold text-lg mr-2">{rating}</span>
        <FaHeart className="text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};


// Prop types validation
ListItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  profileImages: PropTypes.arrayOf(PropTypes.string), // New prop for profile images
  status: PropTypes.string.isRequired, // New prop for status
};

export default ListItem;
