import Opponent from './Opponent';
import classes from './Opponents.module.scss';

const Opponents = () => (
  <div className={classes.opponents}>
    <Opponent />
    <Opponent />
  </div>
);

export default Opponents;
