import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faBook, faUser, faUserFriends, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
// import logo from '../assets/logo.png';

const IconWithTooltip = ({ icon, title }) => {
  return (
    <Tooltip title={title} arrow>
      <div className="flex items-center justify-center p-2"> {/* Added padding */}
        <FontAwesomeIcon icon={icon} size="3x" />
      </div>
    </Tooltip>
  );
};

const Navigation = () => {
  return (
    <div className="flex justify-start">
      <div className="flex space-x-8 items-center ml-10"> {/* Adjusted spacing and margin */}
        <Link to="/add" className="flex items-center justify-center">
          <IconWithTooltip icon={faPlus} title="Add" />
        </Link>
        <Link to="/addCharacter" className="flex items-center justify-center">
          <IconWithTooltip icon={faUser} title="Character" />
        </Link>
        <Link to="/CharacterLibrary" className="flex items-center justify-center">
          <IconWithTooltip icon={faUserFriends} title="CharacterLibrary" /> 
        </Link>
        <Link to="/Library" className="flex items-center justify-center">
          <IconWithTooltip icon={faBook} title="Library" />
        </Link>
        <Link to="/menu" className="flex items-center justify-center">
          <IconWithTooltip icon={faBars} title="Menu" />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
