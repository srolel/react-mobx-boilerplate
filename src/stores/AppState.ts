import { observable, action } from 'mobx';

const hasWindow = typeof window !== 'undefined';

export interface AppStateProps {
  timer: number;
}

/*
* This is the entry point for the app's state. All stores should go here.
*/
class AppState implements AppStateProps {
  @observable timer = 0;
  @observable message = '';

  intervalId: any;

  constructor() {
    if (hasWindow) {
      this.intervalId = setInterval(this.incrementTimer, 1000);
    }
  }

  @action incrementTimer = () => {
    this.timer += 1;
  }

  @action setMessage(message: string) {
    this.message = message;
  }

  @action resetTimer() {
    this.timer = 0;
  }

  reload(store: AppStateProps) {
    Object.assign(this, store);
    return this;
  }

  unload() {
    clearInterval(this.intervalId);
  }
}

export default AppState;