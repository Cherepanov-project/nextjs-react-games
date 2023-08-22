import { loadMario } from './MarioEntity';
import { loadGoomba } from './GoombaEntity';
import { loadKoopa } from './CoopaEntity';

export function loadEntities() {
  const entityFactories: any = {};

  function addAs(name: string) {
    // eslint-disable-next-line no-return-assign
    return (factory: any) => (entityFactories[name as keyof typeof entityFactories] = factory);
  }

  return Promise.all([
    loadMario().then(addAs('mario')),
    loadGoomba().then(addAs('goomba')),
    loadKoopa().then(addAs('koopa')),
  ]).then(() => entityFactories);
}
