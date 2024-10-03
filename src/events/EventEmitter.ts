
import { EventEmitter, } from 'events';


class AppEventEmitter extends EventEmitter{}

const eventsEmitter = new AppEventEmitter(); 

export default eventsEmitter