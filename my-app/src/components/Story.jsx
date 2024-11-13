
const Story = ({ title, description, backgroundImage }) => {
  return (
    <div
      className="relative w-1/6 h-64 bg-cover bg-center rounded-lg overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-4">
        <h2 className="text-white text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-white text-base">{description}</p>
      </div>
    </div>
  );
};

export default Story;
