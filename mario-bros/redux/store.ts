import { createStore } from 'redux';

const reducer = (state = 30, action: any) => {
  switch (action.type) {
    case 'DEC':
      return state - 1;
    default:
      return state;
  }
};

export const store = createStore(reducer);

export function decTime() {
  return {
    type: 'DEC',
  };
}
