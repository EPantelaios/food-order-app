import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={classes.returnPage}>
      <h1>No match for this page...</h1>
      <Link to="/">
        <button type="button">Return to homepage</button>
      </Link>
    </div>
  );
};

export default NotFound;
