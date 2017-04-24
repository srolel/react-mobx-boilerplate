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

  constructor() {
    if (hasWindow) {
      setInterval(this.incrementTimer, 1000);
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
}

export default AppState;