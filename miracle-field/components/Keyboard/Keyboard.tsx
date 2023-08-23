import { arrayOfSymbols } from '../../utils/arrayOfSymbols';

import classes from './Keyboard.module.scss';

const Keyboard = () => {
  const btns = arrayOfSymbols.map((el) => (
    <button type="button" key={el} className={classes.key}>
      {el}
    </button>
  ));
  return <div className={classes.keyboard}>{btns}</div>;
};

export default Keyboard;
