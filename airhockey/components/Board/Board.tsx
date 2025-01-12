/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect, useRef } from 'react';

import { GameEndDialog } from '../GameEndDialog/GameEndDialog';
import { IStick } from '../../types/Sticks';

import {
  GameWrapperDiv,
  GameWrapperTitleP,
  BoardContainerDiv,
  LeftGatesDiv,
  RightGatesDiv,
  WrapperCirclesDiv,
  WrapperCirclesSpan,
  LineLeftCenterSpan,
  BoardCircleCenterDiv,
  BoardCircleCenterInnerDiv,
  BoardCircleCenterInnerDotDiv,
  LineRightCenterSpan,
  BoardScoreDiv,
  BoardScoreLeftDiv,
  BoardScoreRightDiv,
  ScoreLeftSpan,
  ScoreRightSpan,
  CanvasContainer,
  GameOverP,
} from './index';

export const Board = () => {
  let oldInnerWidth = innerWidth;
  const [boardContainerWidth, setBoardContainerWidth] = useState(
    innerWidth * 0.7 + 26 > 1440 ? 1440 : innerWidth * 0.7 + 26,
  );
  const [boardContainerHeight, setBoardContainerHeight] = useState(
    (innerWidth * 0.72 + 26) / 2 > 750 ? 750 : (innerWidth * 0.72 + 26) / 2,
  );
  const [widthBoard, setWidthBoard] = useState(
    boardContainerWidth > 1414 ? 1414 : boardContainerWidth - 26,
  );
  const [heightBoard, setHeightBoard] = useState(
    boardContainerHeight > 723 ? 723 : boardContainerHeight - 26,
  );

  const [titleStatus] = useState(false);
  const [gameStatus, setGameStatus] = useState(true);
  const [gameOverStatus] = useState(false);
  let requestID: number | null = null;
  const [mouseLeftScore, setMouseLeftScore] = useState(0);
  const [mouseRightScore, setMouseRightScore] = useState(0);
  const washerRadius = widthBoard * 0.02;
  const mouseRadius = widthBoard * 0.03;

  const [washer] = useState({
    x: widthBoard / 2,
    y: heightBoard / 2,
    washerSpeed: 10,
    speedX: 0,
    speedY: 0,
    dx: 5,
    dy: 5,
  });
  const [mouseLeft] = useState<IStick>({
    x: widthBoard / 6,
    y: heightBoard / 2,
    prevX: 1,
    prevY: 1,
    dx: 0,
    dy: 0,
    score: 0,
  });
  const [mouseRight] = useState<IStick>({
    x: widthBoard / 1.2,
    y: heightBoard / 2,
    prevX: 10,
    prevY: 10,
    dx: 0,
    dy: 0,
    score: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const animate = () => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx === null || ctx === undefined) {
      return;
    }
    const washerInitialPosition = (x: number, y: number) => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx?.beginPath();
      ctx?.arc(x, y, washerRadius, 0, (Math.PI / 180) * 360);
      ctx!.fillStyle = 'black';
      ctx!.shadowBlur = 5;
      ctx!.shadowColor = 'black';
      ctx!.closePath();
      ctx!.fill();
    };
    washerInitialPosition(washer.x, washer.y);

    const stickLeftInitialPosition = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.arc(x, y, mouseRadius, 0, (Math.PI / 180) * 360);
      ctx!.fillStyle = 'blue';
      ctx!.shadowColor = 'black';
      ctx?.closePath();
      ctx?.fill();
    };
    stickLeftInitialPosition(mouseLeft.x, mouseLeft.y);

    const stickRightInitialPosition = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.arc(x, y, mouseRadius, 0, (Math.PI / 180) * 360);
      ctx!.fillStyle = 'red';
      ctx!.shadowColor = 'black';
      ctx!.shadowBlur = 1;
      ctx?.closePath();
      ctx?.fill();
    };
    stickRightInitialPosition(mouseRight.x, mouseRight.y);

    requestAnimationFrame(animate);
  };

  const mousemoveHandler = (event: MouseEvent) => {
    const boardContainerWidth = innerWidth * 0.7 + 26 > 1440 ? 1440 : innerWidth * 0.7 + 26;
    const widthBoard = boardContainerWidth > 1414 ? 1414 : boardContainerWidth - 26;
    const centerX = widthBoard / 2;
    const boardContainerHeight =
      (innerWidth * 0.72 + 26) / 2 > 750 ? 750 : (innerWidth * 0.72 + 26) / 2;
    const heightBoard = boardContainerHeight > 723 ? 723 : boardContainerHeight - 26;
    const mouseRadius = widthBoard * 0.03;
    const rect = canvasRef.current?.getBoundingClientRect();

    const relativeX = event.clientX - rect!.left;
    const relativeY = event.clientY - rect!.top;

    if (relativeX > centerX && relativeX < widthBoard - mouseRadius) {
      mouseRight.x = relativeX;
    }
    if (relativeY > mouseRadius && relativeY < heightBoard - mouseRadius) {
      mouseRight.y = relativeY;
    }
  };

  const update = () => {
    const boardContainerWidth = innerWidth * 0.7 + 26 > 1440 ? 1440 : innerWidth * 0.7 + 26;
    const boardContainerHeight =
      (innerWidth * 0.72 + 26) / 2 > 750 ? 750 : (innerWidth * 0.72 + 26) / 2;
    const widthBoard = boardContainerWidth > 1414 ? 1414 : boardContainerWidth - 26;
    const heightBoard = boardContainerHeight > 723 ? 723 : boardContainerHeight - 26;
    const washerRadius = widthBoard * 0.02;
    const mouseRadius = widthBoard * 0.03;

    // условие отскакивания шайбы от верхней и нижней стенок
    if (
      washer.y + washer.speedY > heightBoard - washerRadius ||
      washer.y + washer.speedY < washerRadius
    ) {
      washer.speedY *= -1;
    }

    // условие отскакивания шайбы от стенок справа и слева и логика достижения цели
    if (washer.y > heightBoard * 0.31 && washer.y < heightBoard * 0.69) {
      if (washer.x + washer.speedX > widthBoard + washerRadius) {
        washer.x = widthBoard / 2 - widthBoard * 0.14;
        washer.y = heightBoard / 2;
        washer.speedX = 0;
        washer.speedY = 0;
        mouseRight.score += 1;
        setMouseRightScore(mouseRight.score);
      } else if (washer.x + washer.speedX < 0) {
        washer.x = widthBoard / 2 + widthBoard * 0.14;
        washer.y = heightBoard / 2;
        washer.speedX = 0;
        washer.speedY = 0;
        mouseLeft.score += 1;
        setMouseLeftScore(mouseLeft.score);
      }
    } else if (washer.x + washer.speedX > widthBoard - washerRadius) {
      washer.x = widthBoard - washerRadius;
      washer.speedX *= -1;
    } else if (washer.x + washer.speedX < washerRadius) {
      washer.x = washerRadius;
      washer.speedX *= -1;
    }

    const a = Math.abs(washer.x - mouseLeft.x);
    const b = Math.abs(washer.y - mouseLeft.y);
    const c = Math.sqrt(a ** 2 + b ** 2);

    const a2 = Math.abs(washer.x - mouseRight.x);
    const b2 = Math.abs(washer.y - mouseRight.y);
    const c2 = Math.sqrt(a2 ** 2 + b2 ** 2);

    // удар по шайбе для правой колотушки
    if (c2 < mouseRadius + washerRadius) {
      let dx = washer.x - mouseRight.x;
      let dy = washer.y - mouseRight.y;
      dx /= 25;
      dy /= 25;
      washer.speedX = dx * washer.washerSpeed;
      washer.speedY = dy * washer.washerSpeed;
    }

    // удар по шайбе для левой колотушки
    if (c < mouseRadius + washerRadius) {
      let cdx = washer.x - mouseLeft.x;
      let cdy = washer.y - mouseLeft.y;
      cdx /= 25;
      cdy /= 25;
      washer.speedX = cdx * washer.washerSpeed;
      washer.speedY = cdy * washer.washerSpeed;
    }

    washer.x += washer.speedX;
    washer.y += washer.speedY;

    washer.speedX *= 0.99;
    washer.speedY *= 0.99;

    // левая колотушка
    let stepY = widthBoard > 1000 ? 6 : 3;
    const stepXToWasher = widthBoard > 1000 ? 7 : 3;
    const stepXBack = widthBoard > 1000 ? 5 : 3;
    const indWasher = 100;

    // логика по х
    if (Math.abs(washer.speedX) + Math.abs(washer.speedY) < 18 && washer.x <= widthBoard / 2) {
      if (washer.x - washerRadius > mouseLeft.x) {
        mouseLeft.x += stepXToWasher;
      } else {
        mouseLeft.x -= stepXToWasher;
      }
    } else if (mouseLeft.x > widthBoard / 28) {
      mouseLeft.x -= stepXBack;
    }

    // если шайба находится позади левой колотушки, она перемещается в сторону.
    if (
      washer.x < mouseLeft.x &&
      washer.y > mouseLeft.y - washerRadius &&
      washer.y < mouseLeft.y + washerRadius
    ) {
      stepY = widthBoard > 1000 ? -7 : -3;
    }

    // предотвращение коллизий левой колотушки и шайбы
    if (washer.x < indWasher && (washer.y > heightBoard - indWasher || washer.y < indWasher)) {
      stepY = widthBoard > 1000 ? -7 : -3;
    }

    // логика по у
    if (mouseLeft.y < washer.y) {
      mouseLeft.y += stepY;
    }
    if (mouseLeft.y > washer.y) {
      mouseLeft.y -= stepY;
    }

    // проверка что левая колотушка на поле
    if (mouseLeft.x < widthBoard / 28) {
      mouseLeft.x = widthBoard / 28;
    }
    if (mouseLeft.y < heightBoard / 14) {
      mouseLeft.y = heightBoard / 14;
    }
    if (mouseLeft.y > heightBoard - heightBoard / 14) {
      mouseLeft.y = heightBoard - heightBoard / 14;
    }

    // проверка что шайба на поле
    if (washer.y < washerRadius) {
      washer.y = washerRadius;
    }
    if (washer.y > heightBoard - washerRadius) {
      washer.y = heightBoard - washerRadius;
    }

    start();
  };

  const start = () => {
    requestID = requestAnimationFrame(update);
    if (mouseLeft.score === 7 || mouseRight.score === 7) {
      cancelAnimationFrame(requestID);
      requestID = null;
      setGameStatus(false);
    }
  };

  const listener = () => {
    canvasRef.current?.addEventListener('mousemove', mousemoveHandler);
  };

  useEffect(() => {
    listener();
    animate();
  }, [mouseLeft.x, mouseLeft.y, mouseRight.x, mouseRight.y]);

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (Math.abs(oldInnerWidth - innerWidth) < 30) return;
      oldInnerWidth = innerWidth;
      setBoardContainerWidth(innerWidth * 0.7 + 26 > 1440 ? 1440 : innerWidth * 0.7 + 26);
      setBoardContainerHeight(
        (innerWidth * 0.72 + 26) / 2 > 750 ? 750 : (innerWidth * 0.72 + 26) / 2,
      );
    });
  }, [innerWidth]);

  useEffect(() => {
    setWidthBoard(boardContainerWidth > 1414 ? 1414 : boardContainerWidth - 26);
    setHeightBoard(boardContainerHeight > 723 ? 723 : boardContainerHeight - 26);
  }, [boardContainerWidth, boardContainerHeight]);

  return (
    <GameWrapperDiv>
      {!gameStatus && <GameEndDialog left={mouseLeftScore} />}
      <GameWrapperTitleP titleStatus={titleStatus} gameStatus={gameStatus}>
        {gameStatus ? 'GAME TIME!' : 'GAME END'}
      </GameWrapperTitleP>
      <GameOverP gameOverStatus={gameOverStatus}>GAME OVER</GameOverP>
      <BoardContainerDiv width={`${boardContainerWidth}px`} height={`${boardContainerHeight}px`}>
        <LeftGatesDiv width={`${mouseRadius * 3.472}px`} heightNumber={mouseRadius * 3.472 * 2} />
        <WrapperCirclesDiv>
          <WrapperCirclesSpan width={`${mouseRadius * 2}px`} />
          <WrapperCirclesSpan width={`${mouseRadius * 2}px`} />
        </WrapperCirclesDiv>
        <LineLeftCenterSpan />
        <BoardCircleCenterDiv width={`${mouseRadius * 3.472}px`}>
          <BoardCircleCenterInnerDiv width={`${mouseRadius * 3.472 - 10}px`}>
            <BoardCircleCenterInnerDotDiv />
          </BoardCircleCenterInnerDiv>
        </BoardCircleCenterDiv>
        <LineRightCenterSpan />
        <WrapperCirclesDiv>
          <WrapperCirclesSpan width={`${mouseRadius * 2}px`} />
          <WrapperCirclesSpan width={`${mouseRadius * 2}px`} />
        </WrapperCirclesDiv>
        <RightGatesDiv width={`${mouseRadius * 3.472}px`} heightNumber={mouseRadius * 3.472 * 2} />
        <CanvasContainer ref={canvasRef} width={`${widthBoard}px`} height={`${heightBoard}px`} />
      </BoardContainerDiv>
      <BoardScoreDiv>
        <BoardScoreLeftDiv>
          <ScoreLeftSpan>{mouseLeftScore}</ScoreLeftSpan>
        </BoardScoreLeftDiv>
        <BoardScoreRightDiv>
          <ScoreRightSpan>{mouseRightScore}</ScoreRightSpan>
        </BoardScoreRightDiv>
      </BoardScoreDiv>
    </GameWrapperDiv>
  );
};
