import Link from 'next/link';
import React, { FC } from 'react';

import PacLetter from '../../assets/PacLetter.png';

import classes from './Menu.module.scss';

const Menu: FC = () => {
  const playSound = () => {
    const audio = new Audio('/audio/btn.mp3');
    audio.autoplay = true;
    audio.volume = 0.17;
    return true;
  };

  return (
    <div className={classes.menu}>
      <div className={classes.title}>
        <span> PA</span>
        <img src={PacLetter.src} className={classes.pacman_image} alt="Pac-Man" />
        <span>-MAN</span>
      </div>
      <div className={classes.buttons}>
        <div className={classes.play_container}>
          <Link href="./pacman/game" passHref>
            <button className={classes.play} onClick={playSound}>
              PLAY
            </button>
          </Link>
        </div>
        <div className={classes.options}>
          <Link href="./pacman/settings" passHref>
            <button className={classes.settings} onClick={playSound}>
              SETTINGS
            </button>
          </Link>
          <Link href="./pacman/maps" passHref>
            <button className={classes.maps} onClick={playSound}>
              MAPS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
