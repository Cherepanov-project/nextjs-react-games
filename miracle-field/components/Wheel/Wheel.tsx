import { useState } from 'react';

import { getRndInteger } from '../../utils/getRandomInteger';

import classes from './Wheel.module.scss';

const Wheel = () => {
  //количество очков получается из поворота колеса деленое на 5 
  const [rotate, setRotate] = useState(0);

  const spin = () => {
    setRotate(getRndInteger(360, 2160));
  };

  return (
    <>
      <div className={classes.wheel} style={{ transform: `rotate(${rotate}deg)` }} />
      <button type="button" className={classes.spin} onClick={spin}>
        SPIN
      </button>
    </>
  );
};

export default Wheel;
