import Link from 'next/link';
import React from 'react';

// import sound from '../../sounds/btn.mp3';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { setSelectedDifficulty, setSelectedGhosts } from '../../Store/menuSlice';

import classes from './Setting.module.scss';

const Settings = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ghostBtns = useAppSelector((state) => state.menuSlice.ghostBtns);
  const DifficultyBtns = useAppSelector((state) => state.menuSlice.DifficultyBtns);

  const playSound = () => {
    const audio = new Audio('/audio/btn.mp3');
    // audio.src = sound;
    audio.autoplay = true;
    audio.volume = 0.17;

    return true;
  };

  const navigateToMenu = () => {
    playSound();
    // navigate('/');
  };

  const handleChangeGhost = (value: number) => {
    playSound();
    dispatch(setSelectedGhosts(value));
  };

  const handleChangeDifficulty = (value: number) => {
    playSound();
    dispatch(setSelectedDifficulty(value));
  };

  return (
    <div className={classes.menu}>
      <div className={classes.header}>
        <Link href="./">
          <button className={classes.back} onClick={navigateToMenu}>
            {'<'}
          </button>
        </Link>
        <div className={classes.title}>SETTINGS</div>
      </div>
      <div className={classes.buttons}>
        <div className={classes.play_container}>
          <p className={classes.btn_title}>GHOSTS: </p>
          {ghostBtns.map(({ id, name, selected }, index) => (
            <button
              className={selected ? classes.selected : classes.btn}
              key={id}
              onClick={() => handleChangeGhost(index)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className={classes.play_container}>
          <p className={classes.btn_title}>DIFFICULTY: </p>
          {DifficultyBtns.map(({ id, name, selected }, index) => (
            <button
              className={selected ? classes.selected : classes.btn}
              key={id}
              onClick={() => handleChangeDifficulty(index)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
