import PropTypes from 'prop-types';

function Character({ image, name, onClick }) {

  const imageStyle = {
    width: '100px',       // Adjust width as needed
    height: '100px',      // Ensure height is the same as width
    borderRadius: '100%', // Makes the image circular
    objectFit: 'cover',   // Ensures the image covers the circle without distortion
    marginBottom: '8px'   // Space between the image and the name
  };

  const containerStyle = {
    textAlign: 'start',   // Aligns the text below the image
    cursor: 'pointer',    // Adds a pointer cursor to indicate it's clickable
  };

  return (
    <div style={containerStyle} onClick={onClick}>
      <img
        src={image}
        alt="Profile"
        style={imageStyle}
      />
      <div>{name}</div>
    </div>
  );
}

Character.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,  // onClick is now an optional prop
};

export default Character;
