import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { store, decTime } from '../redux/store';

import Timer from './Timer';
import Camera from './Camera';
import { loadEntities } from './Entityes';
import { createCameraLayer, createCollisionLayer } from './Layers';
import { setupKeyboard } from './setupKeyboard';
import styles from './game.module.scss';
import { loadLevel } from './levels/loadLevel';

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [seconds, setSeconds] = useState(30);
  let interval: any;
  useEffect(() => {
    interval = setInterval(() => {
      store.dispatch(decTime());
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    Promise.all([loadEntities(), loadLevel('1-1.json')]).then(([entities, loadLevel]) => {
      const camera = new Camera();

      const mario = entities.mario();

      mario.pos.set(80, 186);

      const goomba = entities.goomba();
      const koopa = entities.koopa();

      goomba.pos.set(390, 266);
      koopa.pos.set(420, 266);

      createCollisionLayer(loadLevel);
      createCameraLayer(camera);

      loadLevel.entities.add(mario);
      loadLevel.entities.add(goomba);
      loadLevel.entities.add(koopa);
      const input = setupKeyboard(mario);
      input.listenTo(window);

      const timer = new Timer(1 / 30);

      timer.update = function update(deltaTime: number) {
        loadLevel.update(deltaTime);

        if (mario.pos.x > 200) {
          camera.pos.x = mario.pos.x - 200;
        }

        loadLevel.comp.draw(ctx, camera);
      };

      timer.start();
      // eslint-disable-next-line prettier/prettier
    }
    );
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.canvas} width="600" height="400" />
      {createPortal(
        <div className={styles.timer}>TIME {seconds > 0 ? seconds : 0}</div>,
        document.body,
      )}
    </div>
  );
};

export { Game };
