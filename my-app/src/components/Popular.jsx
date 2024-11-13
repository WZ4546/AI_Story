import './style.css'; 
import image from '../assets/burgers_wife.jpeg';

const ImageContainer = () => {
  return (
    <div className="flex justify-center h-1/3">
      <div className="relative flex justify-center bg-purple-50 w-5/6 rounded-xl p-5">
        <img
          src={image} 
          alt="Description of the image"
          className="object-cover w-full h-full rounded-xl"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white bg-black bg-opacity-50 p-4 rounded-lg">
            The Most Popular Story Now!
          </h1>
        </div>

        <div className="absolute bottom-4 left-4">
          <h2 className="text-xl font-semibold text-white ml-5">
            My Love From The Star 🌟
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
