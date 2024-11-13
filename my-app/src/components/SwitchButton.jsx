import { useState } from 'react';

const SwitchButton = ({ leftLabel = "Left", rightLabel = "Right" }) => {
  const [selected, setSelected] = useState(leftLabel);

  const handleSwitch = (label) => {
    setSelected(label);
  };

  return (
    <div className="flex justify-center items-center p-2 bg-gray-200 rounded-full w-1/2 mx-auto mt-5">
      <button
        onClick={() => handleSwitch(leftLabel)}
        className={`flex-1 py-2 text-center rounded-full ${
          selected === leftLabel ? 'bg-blue-500 text-white' : 'bg-white text-black'
        }`}
      >
        {leftLabel}
      </button>
      <button
        onClick={() => handleSwitch(rightLabel)}
        className={`flex-1 py-2 text-center rounded-full ml-2 ${
          selected === rightLabel ? 'bg-blue-500 text-white' : 'bg-white text-black'
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
};

export default SwitchButton;
