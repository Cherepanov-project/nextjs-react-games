import React, { useMemo } from 'react';

import { RootState } from '../../../store';
import { useAppSelector } from '../../../hooks';

import styles from './Character.module.scss';

const Character: React.FC = () => {
  const wallkickersState = (state: RootState) => state.wallkickers;
  const wallkickersData = useAppSelector(wallkickersState);
  const { character } = wallkickersData;
  const {
    characterHooked,
    characterDirection,
    characterBottom,
    characterLeft,
    characterOneTimeJumps,
  } = character;

  const characterStyle = useMemo(
    () => ({ bottom: characterBottom, left: characterLeft }),
    [characterBottom, characterLeft],
  );

  if (characterDirection === 'left') {
    if (characterHooked) {
      return <div className={styles.characterWallHoldLeft} style={characterStyle} />;
    }
    if (characterOneTimeJumps === 1) {
      return <div className={styles.characterJumpRight} style={characterStyle} />;
    }
    if (characterOneTimeJumps >= 2) {
      return <div className={styles.characterAirSpinRight} style={characterStyle} />;
    }
  }

  if (characterDirection === 'right') {
    if (characterHooked) {
      return <div className={styles.characterWallHoldRight} style={characterStyle} />;
    }
    if (characterOneTimeJumps === 1) {
      return <div className={styles.characterJumpLeft} style={characterStyle} />;
    }
    if (characterOneTimeJumps >= 2) {
      return <div className={styles.characterAirSpinLeft} style={characterStyle} />;
    }
  }

  return null;
};

export default Character;
