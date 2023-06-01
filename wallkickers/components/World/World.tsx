import React, { useEffect, useState } from 'react';

import Character from '../Character';
import StartLocation from '../StartLocation';
import { RootState } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  changeCharacterBottom,
  changeHeightCharacter,
  changeStart,
  characterChangeDirection,
  characterChangeHooked,
  characterChangeJump,
  characterChangeLeft,
} from '../../store/wallkickersSlice';

import styles from './World.module.scss';

const World: React.FC = () => {
  const dispatch = useAppDispatch();
  const wallkickersState = (state: RootState) => state.wallkickers;
  const getWallkickersState = useAppSelector(wallkickersState);
  const { walls } = getWallkickersState;
  const { character } = getWallkickersState;
  const {
    characterDirection,
    characterLeft,
    characterHooked,
    characterBottom,
    characterOneTimeJumps,
  } = character;

  const [startJump, setStartJump] = useState<null | number>(null);
  const [jumpTimer, setJumpTimer] = useState<null | number>(null);
  const [isCharacterHooked, setIsCharacterHooked] = useState(false);

  const changeDirection = (): void => {
    dispatch(characterChangeDirection(characterDirection === 'left' ? 'right' : 'left'));
  };

  const changeCharacterX = (): void => {
    const newLeft = characterLeft + 5;
    const newRight = characterLeft - 5;
    if (characterDirection === 'left') {
      dispatch(characterChangeLeft(newLeft));
    }
    if (characterDirection === 'right') {
      dispatch(characterChangeLeft(newRight));
    }

    if (characterLeft >= 600) {
      dispatch(characterChangeLeft(10));
    }
    if (characterLeft <= 0) {
      dispatch(characterChangeLeft(590));
    }
  };

  function characterGetHoldWall(): void {
    walls.forEach((wall) => {
      const wallBottom = wall.bottom;
      const wallLeft = wall.left;
      const wallWidth = wall.width;
      const wallHeight = wall.height;
      const checkYHooked = wallBottom + wallHeight;
      const checkXLeftHooked = wallLeft + wallWidth + 10;
      const checkXRightHooked = wallLeft - wallWidth - 10;

      if (characterBottom > wallBottom && characterBottom <= checkYHooked) {
        if (characterLeft === checkXLeftHooked) {
          setIsCharacterHooked(true);
          if (isCharacterHooked) {
            dispatch(characterChangeHooked(true));
          }
          dispatch(characterChangeJump(0));
          dispatch(characterChangeDirection('left'));
        }
        if (characterLeft === checkXRightHooked) {
          setIsCharacterHooked(true);
          if (isCharacterHooked) {
            dispatch(characterChangeHooked(true));
          }
          dispatch(characterChangeDirection('right'));
          dispatch(characterChangeJump(0));
        }
      }
      return null;
    });
  }

  const changeCharacterY = (): void => {
    if (characterBottom >= 446) {
      dispatch(changeStart(false));
    }
    if (characterBottom > 0 && characterBottom < 446) {
      const newBottom = characterBottom + 5;
      dispatch(changeCharacterBottom(newBottom));
      dispatch(changeStart(true));
    }
  };

  const applyGravity = (): void => {
    if (!characterHooked) {
      const newBottom = characterBottom - 10;
      dispatch(changeCharacterBottom(newBottom));
      changeCharacterX();
    }
  };

  console.log(characterHooked);

  const jumpEvent = (): void => {
    if (characterOneTimeJumps === 4) return;
    if (isCharacterHooked) return;
    const newWalls = walls.map((wall) => {
      const wallBottom = wall.bottom;
      const wallHeight = wall.height;
      const newBottom = wallBottom - 5;
      const newWall = 892 + wallHeight;
      if (wallBottom <= (wallBottom + wallHeight + 5) * -1) {
        return { ...wall, bottom: newWall };
      }
      return { ...wall, bottom: newBottom };
    });
    if (characterOneTimeJumps === 0) {
      dispatch(characterChangeHooked(false));
      changeCharacterX();
      changeCharacterY();
      dispatch(changeHeightCharacter(newWalls));
      dispatch(characterChangeJump(1));
    }
    if (characterOneTimeJumps === 1) {
      changeCharacterX();
      changeCharacterY();
      dispatch(changeHeightCharacter(newWalls));
    }
    if (characterOneTimeJumps === 2) {
      dispatch(characterChangeJump(3));
      changeDirection();
    }
    if (characterOneTimeJumps === 3) {
      changeCharacterX();
      changeCharacterY();
      dispatch(changeHeightCharacter(newWalls));
    }
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      setJumpTimer(() => Date.now());
      if (startJump === null) {
        setStartJump(Date.now() + 1400);
      }
      if (characterOneTimeJumps === 3 && startJump < jumpTimer) {
        dispatch(characterChangeJump(4));
      }
      if (startJump && startJump > jumpTimer) {
        if (characterOneTimeJumps === 4 && startJump > jumpTimer) {
          jumpEvent();
        }
        if (jumpTimer < startJump && characterOneTimeJumps < 4) {
          jumpEvent();
        }
      }
      if (startJump < jumpTimer) {
        applyGravity();
      }
    }
  };

  const handleKeyUp = (): void => {
    setStartJump(() => null);
    setIsCharacterHooked(false);
    if (characterOneTimeJumps === 1 && !characterHooked) {
      dispatch(characterChangeJump(2));
    }
  };

  useEffect(() => {
    if (isCharacterHooked) {
      dispatch(characterChangeHooked(true));
    }
  }, [isCharacterHooked]);

  useEffect(() => {
    characterGetHoldWall();
  }, [character, walls]);

  useEffect(() => {
    let gravityInterval: any;
    if (!characterHooked) {
      gravityInterval = setInterval(() => {
        applyGravity();
      }, 100);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(gravityInterval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [character, jumpTimer, walls]);

  return (
    <div className={styles.world}>
      <div className={styles.test} />
      <Character />
      <StartLocation />
    </div>
  );
};

export default World;
