import { observable, action } from 'mobx';

const hasWindow = typeof window !== 'undefined';

export interface AppStateProps {
  timer: number;
}

class AppState implements AppStateProps {
  @observable timer: number = 0;

  constructor() {
    if (hasWindow) {
      setInterval(() => {
        this.timer += 1;
      }, 1000);
    }
  }

  resetTimer() {
    this.timer = 0;
  }

  reload(store: AppStateProps) {
    Object.assign(this, store);
    return this;
  }
}

export default AppState;