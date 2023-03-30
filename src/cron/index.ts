import { CRONContent } from './content';

export class Cron {
  constructor() {
    this.content();
  }

  private content() {
    setInterval(() => {
      CRONContent();
    }, 1000 * 60);
  }
}
