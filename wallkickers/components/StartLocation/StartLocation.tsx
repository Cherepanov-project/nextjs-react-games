import React from 'react';

import Wall from '../Wall';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';

import styles from './StartLocation.module.scss';

const StartLocation: React.FC = () => {
  const initialPositionState = (state: RootState) => state.wallkickers;
  const wallkickersState = useAppSelector(initialPositionState);
  const initialPosition = wallkickersState.walls;

  const drawWalls = () =>
    initialPosition.map((element, index) => <Wall key={index} element={element} />);

  return <div className={styles.startLocation}>{drawWalls()}</div>;
};

export default StartLocation;
