import { useState } from 'react';

const Classification = ({ tags, onTagClick }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [category]; 

    setSelectedCategories(updatedCategories);
    onTagClick(category);
  };

  const getCategoryClass = (category) =>
    selectedCategories.includes(category) ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300';

  return (
    <div className="flex flex-wrap justify-start p-4 space-y-2 w-full">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`cursor-pointer mr-4 mb-2 px-4 py-2 rounded-full border ${getCategoryClass(tag)}`}
          onClick={() => handleCategoryClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Classification;
