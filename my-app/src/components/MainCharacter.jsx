function MainCharacter({ imageUrl, name, description }) {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md ml-10 mt-5">
            {/* Circle Image on the left */}
            <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
                <img src={imageUrl} alt="Character" className="w-full h-full object-cover" />
            </div>

            {/* Text on the right */}
            <div>
                <h2 className="text-xl font-bold mb-2">{name}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
}

export default MainCharacter;
