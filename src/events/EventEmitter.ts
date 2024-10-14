
class AppEventEmitter extends Window {
  private static instance: AppEventEmitter;
  static eventEMitterInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AppEventEmitter();
    return this.instance;
  }
}

const eventsEmitter = AppEventEmitter.eventEMitterInstance();

export default eventsEmitter;
