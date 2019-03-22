import Event from './Util/EventEmitter';

class List extends Event {
    constructor(el) {
        super();
        this.el = el;
    }
    load() {
       alert('load data');
    }
}

module.exports = List;
