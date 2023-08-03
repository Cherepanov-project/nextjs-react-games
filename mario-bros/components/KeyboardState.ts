const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
  public keyStates: Map<any, any>;

  public keyMap: Map<any, any>;

  constructor() {
    this.keyStates = new Map(); // кнопка вкл выкл
    this.keyMap = new Map(); // таблица кодов кнопки и состояния для кнопки
  }

  addMapping(code: any, callback: any) {
    this.keyMap.set(code, callback); // добавляем в таблицу код кнопки, коллбэк для кнопки
  }

  // функция вызывает коллбэк для назначенной кнопки и обновляет для нее состояние
  handleEvent(event: any) {
    const { code } = event;

    console.log('CODE OF EVENT', code);

    if (!this.keyMap.has(code)) {
      return false;
    }

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);
    this.keyMap.get(code)(keyState); // вызываем коллбэк для определенной кнопки
  }

  listenTo(window: any) {
    ['keydown', 'keyup'].forEach((eventName) => {
      window.addEventListener(eventName, (event: any) => {
        this.handleEvent(event);
      });
    });
  }
}
