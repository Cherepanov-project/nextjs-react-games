/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  map1,
  map2,
  map3,
  ghostLocations,
  pacmanFrames,
} from '../../constants/constants';
import { Pacman } from '../../Core/pacman';
import { Ghost } from '../../Core/ghost';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';

import classes from './Game.module.scss';

const Game = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ghostCount = useAppSelector((state) => state.menuSlice.ghostCount);
  const difficulty = useAppSelector((state) => state.menuSlice.speed);
  const ghostBtns = useAppSelector((state) => state.menuSlice.ghostBtns);
  const mapsBtns = useAppSelector((state) => state.menuSlice.mapsBtns);

  const [lives, setLives] = React.useState(3);
  const [foodCount, setFoodCount] = React.useState(0);
  const [score, setScore] = React.useState(0);

  const ghostSelect = ghostBtns.filter((el) => el.selected);
  const mapEl = mapsBtns.filter((el) => el.selected);
  let map = [...map1];
  if (mapEl[0].id === 1) {
    map = [...map1];
  } else if (mapEl[0].id === 2) {
    map = [...map2];
  } else if (mapEl[0].id === 3) {
    map = [...map3];
  }

  const fps = 30;
  const oneBlockSize = 20;
  const wallColor = '#342DCA';
  const wallSpaceWidth = oneBlockSize / 1.5;
  const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
  const wallInnerColor = 'black';
  const foodColor = '#FEB897';
  let ghosts: any = [];
  let pacman: any;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      return;
    }

    const createRect = (x: number, y: number, width: number, height: number, color: string) => {
      canvasContext.fillStyle = color;
      canvasContext.fillRect(x, y, width, height);
    };

    const drawWalls = () => {
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
          if (map[i][j] === 1) {
            createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, wallColor);
          }
          if (j > 0 && map[i][j - 1] === 1) {
            createRect(
              j * oneBlockSize,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth + wallOffset,
              wallSpaceWidth,
              wallInnerColor,
            );
          }
          if (j < map[0].length - 1 && map[i][j + 1] === 1) {
            createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth + wallOffset,
              wallSpaceWidth,
              wallInnerColor,
            );
          }
          if (i > 0 && map[i - 1][j] === 1) {
            createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize,
              wallSpaceWidth,
              wallSpaceWidth + wallOffset,
              wallInnerColor,
            );
          }
          if (i < map.length - 1 && map[i + 1][j] === 1) {
            createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth,
              wallSpaceWidth + wallOffset,
              wallInnerColor,
            );
          }
        }
      }
    };

    const drawFoods = () => {
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
          if (map[i][j] === 2) {
            createRect(
              j * oneBlockSize + oneBlockSize / 3,
              i * oneBlockSize + oneBlockSize / 3,
              oneBlockSize / 3,
              oneBlockSize / 3,
              foodColor,
            );
          }
        }
      }
    };

    const drawScore = () => {
      canvasContext.font = '20px Emulogic';
      canvasContext.fillStyle = 'white';
      canvasContext.fillText(`Score: ${score}`, 0, oneBlockSize * (map.length + 1) + 10);
    };

    const drawLives = () => {
      canvasContext.font = '20px Emulogic';
      canvasContext.fillStyle = 'white';
      canvasContext.fillText('Lives: ', 220, oneBlockSize * (map.length + 1) + 10);
      for (let i = 0; i < lives; i++) {
        canvasContext.drawImage(
          pacmanFrames,
          2 * oneBlockSize,
          0,
          oneBlockSize,
          oneBlockSize,
          350 + i * oneBlockSize,
          oneBlockSize * map.length + 10,
          oneBlockSize,
          oneBlockSize,
        );
      }
    };

    const drawGameOver = () => {
      canvasContext.font = '40px Emulogic';
      canvasContext.fillStyle = 'white';
      canvasContext.fillText('Game Over!', 20, 200);
    };

    const gameOver = () => {
      drawGameOver();
      clearInterval(gameInterval);
    };

    const drawWin = () => {
      canvasContext.font = '40px Emulogic';
      canvasContext.fillStyle = 'white';
      canvasContext.fillText('You Win!', 60, 200);
    };

    const createNewPacman = () => {
      pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 8,
        canvasContext,
        map,
        ghosts,
      );
    };

    const pacmanEat = () => {
      if (pacman.eat()) {
        setScore(score++);
      }
    };

    const restartGame = () => {
      createNewPacman();
      createGhosts();
      setLives(lives--);
    };

    let createGhosts = () => {
      let pos1 = 0;
      let pos2 = 0;
      ghosts = [];
      for (let i = 0; i < ghostCount; i++) {
        if (i === 0) {
          pos1 = 10;
          pos2 = 10;
        } else if (i === 1) {
          pos1 = 10;
          pos2 = 10;
        } else if (i === 2) {
          pos1 = 10;
          pos2 = 12;
        } else if (i === 3) {
          pos1 = 8;
          pos2 = 10;
        } else {
          pos1 = 10;
          pos2 = 10;
        }

        const newGhost = new Ghost(
          pos1 * oneBlockSize + (i % 2 === 0 ? 0 : 1) * oneBlockSize,
          pos2 * oneBlockSize + (i % 2 === 0 ? 0 : 1) * oneBlockSize,
          // 200, // тута спавн по x
          // 200, // тута спавен по Y
          oneBlockSize,
          oneBlockSize,
          pacman.speed / difficulty,
          ghostLocations[i % 4].x,
          ghostLocations[i % 4].y,
          124,
          116,
          8,
          canvasContext,
          pacman,
          map,
        );
        ghosts.push(newGhost);
      }
    };

    const drawGhosts = () => {
      for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
      }
    };

    const gameLoop = () => {
      draw();
      update();
    };

    const checkGhostCollision = () => {
      for (let i = 0; i < ghosts.length; i++) {
        const ghost = ghosts[i];
        if (ghost.getMapX() === pacman.getMapX() && ghost.getMapY() === pacman.getMapY()) {
          return true;
        }
      }
      return false;
    };

    let update = () => {
      pacmanEat();
      pacman.moveProcess();

      for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveProcess();
      }

      if (score >= foodCount / 2) {
        drawWin();
        clearInterval(gameInterval);
      }

      if (checkGhostCollision()) {
        pacman = null;
        restartGame();
      }

      if (lives === 0) {
        drawGameOver();
        clearInterval(gameInterval);
      }

      if (window.location.pathname !== '/Game') {
        clearInterval(gameInterval);
      }
    };

    let draw = () => {
      createRect(0, 0, canvas.width, canvas.height, 'black');
      drawWalls();
      drawFoods();
      pacman.draw();
      drawScore();
      drawGhosts();
      drawLives();
    };

    let gameInterval = setInterval(gameLoop, 1000 / fps);

    window.addEventListener('keydown', ({ key }) => {
      const k = key;

      setTimeout(() => {
        if (k === 'a' || k === 'ArrowLeft' || k === 'ф') {
          // left
          pacman.nextDirection = DIRECTION_LEFT;
        } else if (k === 'w' || k === 'ArrowUp' || k === 'ц') {
          // up
          pacman.nextDirection = DIRECTION_UP;
        } else if (k === 'd' || k === 'ArrowRight' || k === 'в') {
          // right
          pacman.nextDirection = DIRECTION_RIGHT;
        } else if (k === 's' || k === 'ArrowDown' || k === 'ы') {
          // bottom
          pacman.nextDirection = DIRECTION_BOTTOM;
        }

        if (k === 'r') {
          createNewPacman();
        }
      }, 1);
    });

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 2) {
          setFoodCount(foodCount + 1);
        }
      }
    }

    createNewPacman();
    createGhosts();
    gameLoop();
  }, []);

  const playSound = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const audio = new Audio('/audio/btn.mp3');
    // audio.src = sound;
    audio.autoplay = true;
    audio.volume = 0.17;
    return true;
  };

  const navigateToMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound(e);
    // navigate('/');
  };

  return (
    <div className={classes.game}>
      <button className={classes.back} onClick={navigateToMenu}>
        {'<'}
      </button>
      <canvas id="canvas" width="418" height="500" ref={canvasRef} />
      <img src={pacmanFrames.src} alt="pacman-frames" />
    </div>
  );
};

export default Game;
