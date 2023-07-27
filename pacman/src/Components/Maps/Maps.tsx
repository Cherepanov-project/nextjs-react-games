import Link from 'next/link';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { setSelectedMaps } from '../../Store/menuSlice';

import classes from './Maps.module.scss';

const Maps = () => {
  const dispatch = useAppDispatch();
  const mapsBtns = useAppSelector((state) => state.menuSlice.mapsBtns);

  const playSound = () => {
    const audio = new Audio('/audio/btn.mp3');
    audio.autoplay = true;
    audio.volume = 0.17;
    return true;
  };

  const navigateToMenu = () => {
    playSound();
  };

  const handleChangeMap = (value: number) => {
    playSound();
    dispatch(setSelectedMaps(value));
  };

  return (
    <div className={classes.menu}>
      <div className={classes.header}>
        <Link href="./" passHref>
          <button className={classes.back} onClick={navigateToMenu}>
            {'<'}
          </button>
        </Link>
        <div className={classes.title}>MAPS</div>
      </div>
      <div className={classes.buttons}>
        <div className={classes.play_container}>
          {mapsBtns.map((btn, index) => (
            <div className={classes.map_card} key={index}>
              <img src={btn.image.src} className={classes.map_image} alt="Maps" />
            </div>
          ))}
        </div>
        <div className={classes.play_container}>
          {mapsBtns.map(({ name, id, selected }, index) => (
            <button
              className={selected ? classes.selected : classes.btn}
              key={id}
              onClick={() => handleChangeMap(index)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maps;
