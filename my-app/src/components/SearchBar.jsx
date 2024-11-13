import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ placeholder = "Search..." }) => {
  return (
    <div className="flex items-center bg-gray-200 rounded-full w-1/5 p-1 shadow-md">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-transparent text-gray-700 placeholder-gray-400 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none">
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </button>
    </div>
  );
};

export default SearchBar;
