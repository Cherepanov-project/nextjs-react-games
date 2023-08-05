import { useEffect, useRef } from 'react';

import Timer from './Timer';
import Camera from './Camera';
import { createMario } from './MarioEntity';
import { loadLevel } from './levels/loadLevel';
import { createCameraLayer, createCollisionLayer } from './Layers';
import { setupKeyboard } from './setupKeyboard';
import { loadGoomba } from './GoombaEntity';
import styles from './game.module.scss';

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    Promise.all([createMario(), loadGoomba(), loadLevel()]).then(
      ([mario, createGoomba, loadLevel]) => {
        const camera = new Camera();
        mario.pos.set(80, 186);

        const goomba = createGoomba();

        goomba.pos.set(260, 186);

        // uncomment this for debugging
        // loadLevel.comp.layers.push(createCollisionLayer(loadLevel), createCameraLayer(camera));
        createCollisionLayer(loadLevel);
        createCameraLayer(camera);

        loadLevel.entities.add(mario);
        loadLevel.entities.add(goomba);

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

  return <canvas ref={canvasRef} className={styles.canvas} width="600" height="400" />;
};

export { Game };
