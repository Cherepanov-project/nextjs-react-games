import React from 'react';

import World from '../World';

import styles from './Game.module.scss';

const Game = () => (
  <div className={styles.game}>
    <World />
  </div>
);

export default Game;
