import Event from '../EventEmitter.js';

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